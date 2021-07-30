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

            {/*<div className={styles.loginLeft}>*/}
            {/*    <div>*/}
            {/*        <a href="#" className={styles.logo} />*/}
            {/*    </div>*/}
            {/*    <div className={styles.loginLeftCenter}>*/}
            {/*        <h3 className="font-acrom-bold">Банк Асака</h3>*/}
            {/*        <p className="font-acrom-regular">*/}
            {/*            Ваш надежный партнер на финансовом рынке!*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*    <div className={styles.loginLeftBottom}>*/}
            {/*        <div*/}
            {/*            className={styles.loginLeftBottomLanguage + " font-acrom-medium"}*/}
            {/*        >*/}
            {/*            <a*/}
            {/*                href="#"*/}
            {/*                className="d-flex align-items-center"*/}
            {/*                onClick={() => setShowLanguage(!showLanguage)}*/}
            {/*                onBlur={() => setShowLanguage(false)}*/}
            {/*            >*/}
            {/*                {language === "uz" ? (*/}
            {/*                    <>*/}
            {/*                        <div className={styles.uzbekistan} /> O'zbekcha*/}
            {/*                    </>*/}
            {/*                ) : language === "kr" ? (*/}
            {/*                    <>*/}
            {/*                        <div className={styles.uzbekistan} /> Узбекча*/}
            {/*                    </>*/}
            {/*                ) : language === "en" ? (*/}
            {/*                    <>*/}
            {/*                        <div className={styles.english} /> English*/}
            {/*                    </>*/}
            {/*                ) : (*/}
            {/*                    <>*/}
            {/*                        <div className={styles.russia} /> Русский*/}
            {/*                    </>*/}
            {/*                )}*/}
            {/*                /!*<Dropdown*!/*/}
            {/*                /!*    isOpen={showLanguage}*!/*/}
            {/*                /!*    style={{*!/*/}
            {/*                /!*        bottom: "50px",*!/*/}
            {/*                /!*        width: "232px",*!/*/}
            {/*                /!*        right: "unset",*!/*/}
            {/*                /!*        left: 0,*!/*/}
            {/*                /!*    }}*!/*/}
            {/*                /!*>*!/*/}
            {/*                /!*    <div*!/*/}
            {/*                /!*        className="dropdownItem"*!/*/}
            {/*                /!*        onClick={() => changeLanguage("uz")}*!/*/}
            {/*                /!*    >*!/*/}
            {/*                /!*        <div className={styles.dropdownItemContent}>*!/*/}
            {/*                /!*            <div className="d-flex align-items-center">*!/*/}
            {/*                /!*                <div className={styles.uzbekistan} />*!/*/}
            {/*                /!*                O'zbekcha*!/*/}
            {/*                /!*            </div>*!/*/}
            {/*                /!*            <div>*!/*/}
            {/*                /!*                {language === "uz" && <div className={styles.check} />}*!/*/}
            {/*                /!*            </div>*!/*/}
            {/*                /!*        </div>*!/*/}
            {/*                /!*    </div>*!/*/}
            {/*                /!*    <div*!/*/}
            {/*                /!*        className="dropdownItem"*!/*/}
            {/*                /!*        onClick={() => changeLanguage("kr")}*!/*/}
            {/*                /!*    >*!/*/}
            {/*                /!*        <div className={styles.dropdownItemContent}>*!/*/}
            {/*                /!*            <div className="d-flex align-items-center">*!/*/}
            {/*                /!*                <div className={styles.uzbekistan} />*!/*/}
            {/*                /!*                Узбекча*!/*/}
            {/*                /!*            </div>*!/*/}
            {/*                /!*            <div>*!/*/}
            {/*                /!*                {language === "kr" && <div className={styles.check} />}*!/*/}
            {/*                /!*            </div>*!/*/}
            {/*                /!*        </div>*!/*/}
            {/*                /!*    </div>*!/*/}
            {/*                /!*    <div*!/*/}
            {/*                /!*        className="dropdownItem"*!/*/}
            {/*                /!*        onClick={() => changeLanguage("ru")}*!/*/}
            {/*                /!*    >*!/*/}
            {/*                /!*        <div className={styles.dropdownItemContent}>*!/*/}
            {/*                /!*            <div className="d-flex align-items-center">*!/*/}
            {/*                /!*                <div className={styles.russia} />*!/*/}
            {/*                /!*                Русский*!/*/}
            {/*                /!*            </div>*!/*/}
            {/*                /!*            <div>*!/*/}
            {/*                /!*                {language === "ru" && <div className={styles.check} />}*!/*/}
            {/*                /!*            </div>*!/*/}
            {/*                /!*        </div>*!/*/}
            {/*                /!*    </div>*!/*/}
            {/*                /!*    <div*!/*/}
            {/*                /!*        className="dropdownItem"*!/*/}
            {/*                /!*        onClick={() => changeLanguage("en")}*!/*/}
            {/*                /!*    >*!/*/}
            {/*                /!*        <div className={styles.dropdownItemContent}>*!/*/}
            {/*                /!*            <div className="d-flex align-items-center">*!/*/}
            {/*                /!*                <div className={styles.english} />*!/*/}
            {/*                /!*                English*!/*/}
            {/*                /!*            </div>*!/*/}
            {/*                /!*            <div>*!/*/}
            {/*                /!*                {language === "en" && <div className={styles.check} />}*!/*/}
            {/*                /!*            </div>*!/*/}
            {/*                /!*        </div>*!/*/}
            {/*                /!*    </div>*!/*/}
            {/*                /!*</Dropdown>*!/*/}
            {/*            </a>*/}
            {/*        </div>*/}
            {/*        <div className={styles.loginLeftBottomHelp + " font-acrom-medium"}>*/}
            {/*            <a*/}
            {/*                href="#"*/}
            {/*                className="d-flex align-items-center"*/}
            {/*                onClick={() => setHelp(!help)}*/}
            {/*                onBlur={() => setHelp(!help)}*/}
            {/*            >*/}
            {/*                <div className={styles.helpIcon} />*/}
            {/*                Помощь*/}
            {/*                /!*<Dropdown*!/*/}
            {/*                /!*    isOpen={help}*!/*/}
            {/*                /!*    style={{*!/*/}
            {/*                /!*        bottom: "50px",*!/*/}
            {/*                /!*        width: "368px",*!/*/}
            {/*                /!*        right: "-16px",*!/*/}
            {/*                /!*        left: "unset",*!/*/}
            {/*                /!*    }}*!/*/}
            {/*                /!*    right={true}*!/*/}
            {/*                /!*>*!/*/}
            {/*                /!*    <div className="dropdownItem">*!/*/}
            {/*                /!*        <div className={styles.dropdownItemContent}>*!/*/}
            {/*                /!*            <div className="font-acrom-medium">Телефон</div>*!/*/}
            {/*                /!*            <a*!/*/}
            {/*                /!*                href="tel:+998712005522"*!/*/}
            {/*                /!*                className="d-flex align-items-center"*!/*/}
            {/*                /!*            >*!/*/}
            {/*                /!*                <h6 className="font-acrom-bold">(+99871) 200-55-22</h6>*!/*/}
            {/*                /!*                <div className={styles.operator} />*!/*/}
            {/*                /!*            </a>*!/*/}
            {/*                /!*        </div>*!/*/}
            {/*                /!*    </div>*!/*/}
            {/*                /!*    <div className="dropdownItem">*!/*/}
            {/*                /!*        <div className={styles.dropdownItemContent}>*!/*/}
            {/*                /!*            <div className="font-acrom-medium">Email</div>*!/*/}
            {/*                /!*            <a*!/*/}
            {/*                /!*                href="mailto:office@asakabank.uz"*!/*/}
            {/*                /!*                className="d-flex align-items-center"*!/*/}
            {/*                /!*            >*!/*/}
            {/*                /!*                <h6 className="font-acrom-bold">office@asakabank.uz</h6>*!/*/}
            {/*                /!*                <div className={styles.mail} />*!/*/}
            {/*                /!*            </a>*!/*/}
            {/*                /!*        </div>*!/*/}
            {/*                /!*    </div>*!/*/}
            {/*                /!*</Dropdown>*!/*/}
            {/*            </a>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

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
