/**
 * Created by Sherlock on 06.05.2021.
 */

import React, { useState, useEffect } from "react";
import Loader from "components/Loader";
// import Dropdown from "../../components/Dropdown";
import LoginForm from "components/LoginForm";

import styles from "assets/scss/Login.module.scss";

const Login = (props) => {
    const [hiding, setHiding] = useState(false);
    const [hide, setHide] = useState(false);
    const [showLanguage, setShowLanguage] = useState(false);
    const [language, setLanguage] = useState("");
    const [help, setHelp] = useState(false);

    useEffect(() => {
        setLanguage(
            localStorage.getItem("language") ? localStorage.getItem("language") : "ru"
        );
        setTimeout(() => {
            setHiding(true);
            setTimeout(() => {
                setHide(true);
            }, 1000);
        }, 2000);
    }, []);

    const changeLanguage = (lang) => {
        localStorage.setItem("language", lang);
        setLanguage(lang);
    };

    const changeInput = () => {};
    return (
        <div className={styles.login}>
            <Loader hiding={hiding} hide={hide} />
            <div className={styles.loginRight}>
                <div className={styles.loginRightContent}>
                    <LoginForm history={props.history}/>
                </div>
                <div className={styles.loginRightFooter + " font-acrom-medium"}>
                    {/*V0.3.0 dev*/}
                </div>
            </div>
        </div>
    );
};

export default Login;
