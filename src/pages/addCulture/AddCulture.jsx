import React, { useEffect, useState } from "react";
import SelectField from "../../components/fields/selectfield/SelectField";
import TextArea from "../../components/fields/textarea/TextArea";
import TextField from "../../components/fields/textfield/TextField";
import { addCulture, getProvinces } from "../../redux/apiCalls";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./addculture.scss";
import app from "../../firebase";
import { useDispatch, useSelector } from "react-redux";

const AddCulture = () => {
    const [image, setImage] = useState("");
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();
    const { provinces, isFetching } = useSelector((state) => state.provinces);

    useEffect(() => {
        getProvinces(dispatch);
    }, []);

    const handleUpload = () => {
        return new Promise((resolve, reject) => {
            if (image) {
                let file = image;
                const fileName = new Date().getTime() + file.name;
                const storage = getStorage(app);
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                            default:
                        }
                    },
                    (error) => {
                        reject();
                    },
                    async () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        await getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                resolve(downloadURL);
                            }
                        );
                    }
                );
            } else {
                resolve("");
            }
        });
    };

    const handleUploads = () => {
        return new Promise((resolve, reject) => {
            if (images.length > 0) {
                var urlTemp = [];
                const promises = [];
                images.map((file) => {
                    const fileName = new Date().getTime() + file.name;
                    const storage = getStorage(app);
                    const storageRef = ref(storage, fileName);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    // Register three observers:
                    // 1. 'state_changed' observer, called any time the state changes
                    // 2. Error observer, called on failure
                    // 3. Completion observer, called on successful completion
                    promises.push(uploadTask);
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            // Observe state change events such as progress, pause, and resume
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            const progress =
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                100;
                            console.log("Upload is " + progress + "% done");
                            switch (snapshot.state) {
                                case "paused":
                                    console.log("Upload is paused");
                                    break;
                                case "running":
                                    console.log("Upload is running");
                                    break;
                                default:
                            }
                        },
                        (error) => {
                            // Handle unsuccessful uploads
                            reject();
                        },
                        async () => {
                            // Handle successful uploads on complete
                            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                            await getDownloadURL(uploadTask.snapshot.ref).then(
                                (downloadURL) => {
                                    urlTemp.push(downloadURL);
                                    if (images.length === urlTemp.length) {
                                        resolve(urlTemp);
                                    }
                                }
                            );
                        }
                    );
                });
                // Promise.all(promises)
                //     .then(() => {
                //         console.log("All images uploaded");
                //         console.log(urlTemp);
                //         resolve();
                //     })
                //     .catch((err) => console.log(err));
            } else {
                resolve();
            }
        });
    };

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prev) => [...prev, newImage]);
        }
    };

    const handleDelete = (i) => {
        setImages(images.filter((image) => image !== images[i]));
    };

    const handleSubmit = async (values) => {
        const uri = await handleUpload();
        const uris = await handleUploads();
        const culture = {
            ...values,
            img: uri,
            imgs: uris,
        };
        // console.log(culture);
        addCulture(culture, toast, setIsSubmitting);
    };

    // const date = new Date();
    // const yearToday = date.getFullyear();
    // const inputProps = [
    //     {type:"text", placeholder:"jaipong"},
    //     {type:"number", placeholder: yearToday, min:2010, max: yearToday}
    // ];

    return (
        <div className="addCulture">
            <Formik
                initialValues={{
                    name: "",
                    year: null,
                    reg_num: "",
                    desc: "",
                    province: "",
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required("Nama Seni Tari tidak boleh kosong"),
                    year: Yup.number()
                        .typeError("Tahun tidak boleh kosong")
                        .min(2010, "Tahun harus lebih besar dari atau sama dengan 2010")
                        .max(2022, "Tahun melebihi dari tahun registrasi")
                        .required("Tahun tidak boleh kosong"),
                    province: Yup.string().required("Provinsi tidak boleh kosong"),
                })}
                onSubmit={(values) => {
                    setIsSubmitting(true);
                    handleSubmit(values, setIsSubmitting);
                }}
            >
                <Form className="addCulture">
                    <TextField
                        label="Nama Seni Tari"
                        type="text"
                        name="name"
                        placeholder="Tari Jaipong"
                    />
                    <SelectField
                        options={provinces}
                        label="Provinsi"
                        name="province"
                    />
                    <TextField
                        label="Tahun Registrasi"
                        type="number"
                        name="year"
                        placeholder="2010"
                    />
                    <TextField
                        label="Nomor Registrasi"
                        type="text"
                        name="reg_num"
                        placeholder="2010000618"
                    />
                    <TextArea
                        label="Deskripsi"
                        name="desc"
                        placeholder="Kesenian Jaipongan adalah kesenian yang berasal dari Karawang dari hasil kreasi para seniman Karawang..."
                    />

                    <div className="img">
                        <div htmlFor="file">
                            Gambar Tari
                            <label htmlFor="file1" className="uploadButton">
                                <DriveFolderUploadIcon className="icon" />
                                Pilih Gambar Tari
                            </label>
                        </div>
                        <input
                            type="file"
                            id="file1"
                            onChange={(e) => setImage(e.target.files[0])}
                            style={{
                                display: "none",
                                backgroundColor: "red",
                            }}
                        />
                        {image && (
                            <div className="img-container">
                                <div className="image">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="img"
                                    />
                                    <CloseRoundedIcon
                                        onClick={() => setImage("")}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="img">
                        <div>
                            Galeri Tari
                            <label htmlFor="file2" className="uploadButton">
                                <DriveFolderUploadIcon className="icon" />
                                Pilih Gambar Galeri Tari
                            </label>
                        </div>
                        <input
                            type="file"
                            id="file2"
                            multiple
                            onChange={handleChange}
                            style={{
                                display: "none",
                                backgroundColor: "red",
                            }}
                        />
                        {images.length > 0 && (
                            <div className="images-container">
                                {images.map((image, i) => (
                                    <div className="images">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="img"
                                        />
                                        <CloseRoundedIcon
                                            onClick={() => handleDelete(i)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <CircularProgress
                                color="inherit"
                                size="1.7rem"
                                thickness={5}
                            />
                        ) : (
                            "Tambah"
                        )}
                    </button>
                </Form>
            </Formik>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default AddCulture;