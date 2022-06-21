import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import { getCultures, getProvinces, getUsers } from "../../redux/apiCalls";
import "./home.scss";

const Home = () => {
    const dispatch = useDispatch();
    const { provinces } = useSelector((state) => state.provinces);
    const { users } = useSelector((state) => state.users);
    const { cultures } = useSelector((state) => state.cultures);

    useEffect(() => {
        getProvinces(dispatch);
        getUsers(dispatch);
        getCultures(dispatch);
    }, []);

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="user" value={cultures.length} />
                    <Widget type="order" value={provinces.length} />
                    <Widget type="products" value={users.length} />
                </div>
            </div>
        </div>
    );
};

export default Home;
