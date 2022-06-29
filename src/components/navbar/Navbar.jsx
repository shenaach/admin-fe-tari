import React from "react";
import "./navbar.scss";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="wrapper">
            <div className="itemDark">
                {/* <DarkModeOutlinedIcon className="icon" /> */}
            </div>
                {/* <div className="search">
                    <input type="text" placeholder="Search..." />
                    <SearchOutlinedIcon />
                </div> */}
                <div className="items">
                    <div className="item">
                        <img
                            src="https://sekolahutsman.sch.id/wp-content/uploads/2016/03/no-profile.png"
                            alt=""
                            className="avatar"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
