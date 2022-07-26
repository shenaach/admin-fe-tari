import React, { useEffect, useState } from "react";
import Datatable from "../../components/datatable/Datatable";
import { deleteCulture, getCultures } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import "./listcultures.scss";

const ListCultures = () => {
    const dispatch = useDispatch();
    const { cultures, isFetching } = useSelector((state) => state.cultures);

    useEffect(() => {
        getCultures(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteCulture(id, dispatch, toast, cultures);
    };

    const cultureColumns = [
        {
            field: "culturename",
            headerName: "Nama Tari",
            minWidth: 150,
            flex: 1,

            renderCell: (params) => {
                return params.row.name;
            },
        },
        {
            field: "province",
            headerName: "Provinsi",
            minWidth: 150,
            flex: 1,
            renderCell: (params) => {
                return params.row.province.name;
            },
        },
        {
            field: "year",
            headerName: "Tahun",
            minWidth: 60,
            flex: 1,
            renderCell: (params) => {
                return params.row.year || "-";
            },
        },
        {
            field: "desc",
            headerName: "Deskripsi",
            minWidth: 150,
            flex: 1,
            renderCell: (params) => {
                return params.row.desc || "-";
            },
        },
    ];

    return (
        <div className="listCultures">
            <div className="info">
                <h1>Data Tari</h1>
                <div className="box">
                    <h4>Tata Cara Kelola Data Tari</h4>
                    <ul className="infos">
                        <li>Klik tombol Tambah Budaya untuk menambahkan Seni Tari Baru</li>
                        <li>Lakukan pencarian dan penyaringan data untuk mencari seni tari yang diinginkan</li>
                        <li>Lakukan ubah atau hapus data pada kolom Aksi</li>
                    </ul>
                </div>
            </div>
            {isFetching ? (
                <CircularProgress />
            ) : (
                <>
                    <Datatable
                        rows={cultures}
                        columns={cultureColumns}
                        handleDelete={handleDelete}
                    />
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
                </>
            )}
        </div>
    );
};

export default ListCultures;