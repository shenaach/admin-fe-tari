import React, { useEffect, useState } from "react";
import TextArea from "../../components/fields/textarea/TextArea";
import TextField from "../../components/fields/textfield/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./addprovince.scss";
import { addProvince } from "../../redux/apiCalls";

const AddProvince = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <div className="addProvince">
            <Formik
                initialValues={{
                    name: "",
                    lat: null,
                    long: null,
                    geojson: "",
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required("Nama Provinsi tidak boleh kosong"),
                    lat: Yup.number()
                        .typeError("Latitude harus berupa angka")
                        .required("Latitude tidak boleh kosong"),
                    long: Yup.number()
                        .typeError("Longitude harus berupa angka")
                        .required("Longitude tidak boleh kosong"),
                    geojson: Yup.string().required("GeoJSON tidak boleh kosong. Setidaknya masukkan { }"),
                })}
                onSubmit={(values) => {
                    setIsSubmitting(true);
                    const province = {
                        ...values,
                        geojson: JSON.parse(values.geojson),
                    };

                    addProvince(province, toast, setIsSubmitting);
                }}
            >
                <Form className="addProvince">
                    <TextField
                        label="Nama Provinsi"
                        type="text"
                        name="name"
                        placeholder="DKI Jakarta"
                    />

                    <div className="wrap">
                        <TextField
                            label="Latitude"
                            type="number"
                            name="lat"
                            placeholder="-6.211544"
                        />
                        <TextField
                            label="Longitude"
                            type="number"
                            name="long"
                            placeholder="106.845172"
                        />
                    </div>

                    <TextArea
                        label="Geojson"
                        name="geojson"
                        placeholder={`{
                            "type": "Feature",
                            "geometry": {
                              "type": "MultiPolygon",
                              "coordinates": [
                                [
                                  [
                                    [106.721344, -6.089998],
                                    [106.741844, -6.105995],
                                    `}
                    />
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

export default AddProvince;
