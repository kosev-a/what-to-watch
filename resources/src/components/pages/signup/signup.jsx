import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default SignUp;

function SignUp() {
    const apiUrl = import.meta.env.VITE_APP_URL;

    const navigate = useHistory();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [file, setFile] = useState(null);

    //обработчик добавления изображения
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    // Обработчик изменения полей формы
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const formData = new FormData();
        //добавление данных в formData
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append("image", file);

        try {
            // Отправляем POST-запрос с данными формы
            const response = await axios.post(
                `${apiUrl}/api/register`,
                formData
            );
            console.log("Данные успешно отправлены:", response.data);

            const data = response.data.data;
            const token = data.token;
            console.log(token);
            localStorage.setItem("token", token);

            const user = data.name;
            localStorage.setItem("user", user);
            // console.log(user);

            const avatar = data.avatar;
            localStorage.setItem("avatar", avatar);
            console.log(avatar);

            setMessage("Форма успешно отправлена!");
            setError(null);

            navigate.goBack();

        } catch (err) {
            console.error("Ошибка при отправке формы:", err);
            setError("Произошла ошибка при отправке формы.");
            setMessage("");
        } finally {
            console.log(formData);
        }
    };

    return (
        <React.Fragment>
            <div className="visually-hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <symbol id="add" viewBox="0 0 19 20">
                        <title>+</title>
                        <desc>Created with Sketch.</desc>
                        <g
                            id="Page-1"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                        >
                            <polygon
                                id="+"
                                fill="#EEE5B5"
                                points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"
                            />
                        </g>
                    </symbol>
                    <symbol id="full-screen" viewBox="0 0 27 27">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z"
                            fill="#FFF9D9"
                            fillOpacity="0.7"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z"
                            fill="#FFF9D9"
                            fillOpacity="0.7"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z"
                            fill="#FFF9D9"
                            fillOpacity="0.7"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z"
                            fill="#FFF9D9"
                            fillOpacity="0.7"
                        />
                    </symbol>
                    <symbol id="in-list" viewBox="0 0 18 14">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z"
                            fill="#EEE5B5"
                        />
                    </symbol>
                    <symbol id="pause" viewBox="0 0 14 21">
                        <title>Artboard</title>
                        <desc>Created with Sketch.</desc>
                        <g
                            id="Artboard"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                        >
                            <polygon
                                id="Line"
                                fill="#EEE5B5"
                                fillRule="nonzero"
                                points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"
                            />
                            <polygon
                                id="Line"
                                fill="#EEE5B5"
                                fillRule="nonzero"
                                points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"
                            />
                        </g>
                    </symbol>
                </svg>
            </div>
            <div className="user-page">
                <header className="page-header user-page__head">
                    <div className="logo">
                        <a href="/" className="logo__link">
                            <span className="logo__letter logo__letter--1">
                                {" "}
                                W{" "}
                            </span>
                            <span className="logo__letter logo__letter--2">
                                T
                            </span>
                            <span className="logo__letter logo__letter--3">
                                {" "}
                                W{" "}
                            </span>
                        </a>
                    </div>
                    <h1 className="page-title user-page__title">Sign Up</h1>
                </header>
                <div className="sign-in user-page__content">
                    <form
                        onSubmit={handleSubmit}
                        className="sign-in__form"
                    >
                        <div className="sign-in__fields">
                            <div className="sign-in__field">
                                <input
                                    className="sign-in__input"
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    id="name"
                                    onChange={handleChange}
                                    value={data.name}
                                />
                                <label
                                    className="sign-in__label visually-hidden"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                            </div>
                            <div className="sign-in__field">
                                <input
                                    className="sign-in__input"
                                    type="email"
                                    placeholder="Email address"
                                    name="email"
                                    id="email"
                                    onChange={handleChange}
                                    value={data.email}
                                />
                                <label
                                    className="sign-in__label visually-hidden"
                                    htmlFor="email"
                                >
                                    Email address
                                </label>
                            </div>
                            <div className="sign-in__field">
                                <input
                                    className="sign-in__input"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                    value={data.password}
                                />
                                <label
                                    className="sign-in__label visually-hidden"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="sign-in__field">
                                <input
                                    className="sign-in__input"
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="password_confirmation"
                                    id="password_confirm"
                                    onChange={handleChange}
                                    value={data.password_confirmation}
                                />
                                <label
                                    className="sign-in__label visually-hidden"
                                    htmlFor="password_confirm"
                                >
                                    Confirm Password
                                </label>
                            </div>
                            <div className="sign-in__field">
                                <input
                                    className="sign-in__input"
                                    type="file"
                                    name="image"
                                    id="fileInputId"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={handleFileChange}
                                />
                                <label
                                    className="sign-in__label visually-hidden"
                                    htmlFor="fileInputId"
                                >
                                    Upload Image
                                </label>
                            </div>
                        </div>
                        <div className="sign-in__submit">
                            <button className="sign-in__btn" type="submit">
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
                <footer className="page-footer">
                    <div className="logo">
                        <a href="/" className="logo__link logo__link--light">
                            <span className="logo__letter logo__letter--1">
                                W
                            </span>
                            <span className="logo__letter logo__letter--2">
                                T
                            </span>
                            <span className="logo__letter logo__letter--3">
                                W
                            </span>
                        </a>
                    </div>
                    <div className="copyright">
                        <p>© 2019 What to watch Ltd.</p>
                    </div>
                </footer>
            </div>
        </React.Fragment>
    );
}
