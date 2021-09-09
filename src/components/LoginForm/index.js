/**
 * Created by Sherlock on 07.05.2021.
 */

import React, {useState} from 'react';
import styles from './LoginForm.module.scss';
import {login} from "../../redux/actions/authAction";
import {connect} from "react-redux";

const Index = (props) => {

    /*inputs values*/
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // statuses => 0 - login or register, 1 - Login, 2 - register, 3 - confirm code
    const [status, setStatus] = useState(0);

    const [texts, setTexts] = useState(["Войти", "Вход", "Новый аккаунт", "Подтвердите номер"]);

    const setFocus = (id) => {
        document.getElementById(id).focus();
    }

    const changeInput = (e) => {
        
        if (e.target.value.length > phoneNumber.length) { 
            if (phoneNumber.length === 2 || phoneNumber.length === 6 || phoneNumber.length === 9) {
                setPhoneNumber(phoneNumber  +  " "  + e.target.value.slice(-1));
            } else {
                setPhoneNumber(e.target.value)
            }
            if (e.target.value.length === 12) {
                setIsLoading(true);

                setTimeout(() => {
                    setIsLoading(false);
                    setStatus(1);
                    document.getElementById("password")?.focus();
                }, 1000)

            } else {
                setStatus(0)
            }
        } else {
            setPhoneNumber(e.target.value)
        }
    }
    const changeValue = (e) => {
        if (e.target.name === "password")
            setPassword(e.target.value);
        else if (e.target.name === "username")
            setUsername(e.target.value)
        else if (e.target.name === "lastname")
            setLastname(e.target.value)
        else if (e.target.name === "code") {
            setCode(e.target.value);
        }
    }
    return (
        <>
            {status === 3 && <div className={styles.confirmIcon}/>}
            <h3 className={styles.title + " font-acrom-bold"}>{texts[status]}</h3>

            <div className={styles.loginForm + " " + (status === 1 || status === 2 ? styles.loginFormContent : "")}>
                {status === 0 &&
                <p className={styles.loginText + " font-acrom-medium"}>Введите имя пользователя что бы <br/> войти в
                    аккаунт </p>}
                {/*{status !== 3 &&*/}
                {/*<>*/}
                    <label htmlFor="phoneNumber" className="font-acrom-medium">Введите ваш имя пользователя</label>
                    <div className={styles.inputGroup}>
                        {/*<div className={styles.inputGroupAppend + " font-acrom-medium"}>*/}
                        {/*    <div className={styles.uzbekistan}/>*/}
                        {/*    +998*/}
                        {/*    <div className={styles.line}/>*/}
                        {/*</div>*/}
                        <input type="text" id="username" name="username"
                               placeholder="Введите"
                               value={username} onChange={changeValue}
                               className={styles.input + " font-acrom-medium"}/>
                        {/*{phoneNumber.length > 0 && !isLoading && <div className={styles.clearInput} onClick={() => {*/}
                        {/*    setPhoneNumber("");*/}
                        {/*    setStatus(0);*/}
                        {/*    setFocus("phoneNumber")*/}
                        {/*}}/>}*/}
                        {/*{isLoading && <div className={styles.spinner}/>}*/}
                    </div>
                {/*</>*/}
                {/*}*/}
                {/**/}
                {/*{status === 1 ?*/}
                {/*    <>*/}
                        <label htmlFor="password" className="font-acrom-medium">Пароль</label>
                        <div className="position-relative">
                            <input type={showPassword ? "text" : "password"} id="password" name="password"
                                   placeholder="Введите пароль"
                                   value={password} onChange={changeValue}
                                   className={styles.input + " font-acrom-medium"}/>
                            <div className={styles.showPassword + " " + (showPassword ? styles.hidePassword : "")}
                                 onClick={() => {
                                     setShowPassword(!showPassword)
                                 }}/>
                        </div>

                        <a href="#" className={styles.forgotText + " font-acrom-medium"}>Забыли пароль?</a>

                        <button type="button" onClick={() => props.login({username, password}, props.history)}
                                className={styles.btnLogin + " font-acrom-bold btn-submit"}>Войти
                        </button>

                    {/*</> :*/}
                    {/*""*/}
                {/*}*/}
                {status === 2 ?
                    <>
                        <label htmlFor="firstname" className="font-acrom-medium">Укажите имя</label>
                        <div className="position-relative">
                            <input type="text" id="firstname" name="firstname" placeholder="Имя"
                                   value={firstname} onChange={changeValue}
                                   className={styles.input + " font-acrom-medium"}/>
                        </div>

                        <label htmlFor="firstname" className="font-acrom-medium">Укажите фамилию</label>
                        <div className="position-relative">
                            <input type="text" id="lastname" name="lastname" placeholder="Фамилия"
                                   value={lastname} onChange={changeValue}
                                   className={styles.input + " font-acrom-medium"}/>
                        </div>
                        <label htmlFor="password" className="font-acrom-medium">Придумайте пароль</label>
                        <div className="position-relative">
                            <input type={showPassword ? "text" : "password"} id="password" name="password"
                                   placeholder="Пароль"
                                   value={password} onChange={changeValue}
                                   className={styles.input + " font-acrom-medium"}/>
                            <div className={styles.showPassword + " " + (showPassword ? styles.hidePassword : "")}
                                 onClick={() => {
                                     setShowPassword(!showPassword)
                                 }}/>
                        </div>

                        <span className={styles.policyText + " font-acrom-medium"}>
                            Я согласен с <a href="#" className={styles.policyLink}>Пользовательским соглашением</a> Asaka Bank
                        </span>

                        <button type="button" className={styles.btnLogin + " font-acrom-bold"}>Далее</button>
                    </> : ""
                }

                {status === 3 &&
                <>
                    <p className={styles.confirmText + " font-acrom-medium"}>
                        Введите 5-значный код, который мы <br/> отправли на номер:
                    </p>
                    <h4 className={styles.numberText + " font-acrom-bold"}>
                        **** ** *** {phoneNumber.slice(-5)}
                    </h4>
                    <div className="position-relative">
                        <input type="number" id="code" name="code" placeholder="Введите код"
                               value={code} onChange={changeValue}
                               className={styles.input + " font-acrom-medium"}/>
                    </div>

                    <div className={`${styles.retryBlock} d-flex align-items-center`}>
                        <div>
                            <button type="button" disabled className={styles.btnRetry + " font-acrom-bold"}>
                                Отправить снова
                            </button>
                        </div>
                        <div className="w-100">
                            <h5 className={styles.time + " font-acrom-bold"}>02:58</h5>
                        </div>
                    </div>

                    <button type="button" className={styles.btnLogin + " font-acrom-bold btn-submit"} onClick={() => props.history.push("/admin/dashboard")}>Подтвердить</button>

                </>
                }
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, {login})(Index);