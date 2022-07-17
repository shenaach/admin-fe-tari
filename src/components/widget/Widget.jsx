import React from "react";
import "./widget.scss";
// import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
// import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";

const Widget = ({ type, value }) => {
    let data;
    
    switch (type) {
        case "cultures":
            data = {
                title: "Data Tari",
                isMoney: false,
                link: "lihat semua tari",
                icon: <CreditCardIcon className="icon" />,
                path: "/cultures",
            };
            break;
        case "provinces":
            data = {
                title: "Data Provinsi",
                isMoney: true,
                link: "lihat semua provinsi",
                icon: <StoreIcon className="icon" />,
                path: "/provinces",
            };
            break;
        case "users":
            data = {
                title: "Admin",
                isMoney: false,
                link: "lihat semua admin",
                icon: <PersonOutlineOutlinedIcon className="icon" />,
                path: "/users",
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{value}</span>
                <span className="link">
                    <a href={data.path}>{data.link} </a>
                </span>
            </div>
            <div className="right">
                {/* <div className="percentage positive">
                    <ArrowUpwardOutlinedIcon /> {diff}%
                </div> */}
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
