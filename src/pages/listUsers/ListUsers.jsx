import React, { useEffect, useState } from "react";
import Datatable from "../../components/datatable/Datatable";
import { deleteUser, getUsers } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./listusers.scss";

const ListUsers = () => {
    const dispatch = useDispatch();
    const { users, isFetching } = useSelector((state) => state.users);

    useEffect(() => {
        getUsers(dispatch);
    }, []);

    const handleDelete = (id) => {
        deleteUser(id, dispatch, toast);
    };

    const provinceColumns = [
        { field: "_id", headerName: "ID", minWidth: 100, flex: 1 },
        {
            field: "username",
            headerName: "Username",
            minWidth: 400,
            flex: 1,

            renderCell: (params) => {
                return params.row.name;
            },
        },
    ];

    return (
        <div className="listUsers">
            <div className="info">
                <h1>Data Admin</h1>
                <div className="box">
                    <h4>Tata Cara Kelola Data Admin</h4>
                    <ul className="infos">
                        <li>Klik tombol Tambah Admin untuk menambahkan admin baru</li>
                        <li>Lakukan pencarian data untuk mencari admin</li>
                        <li>Lakukan ubah atau hapus data pada kolom Aksi</li>
                    </ul>
                </div>
            </div>
            <Datatable
                rows={users}
                columns={provinceColumns}
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
        </div>
    );
};

export default ListUsers;
