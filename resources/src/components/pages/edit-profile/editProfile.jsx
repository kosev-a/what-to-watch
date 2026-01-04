import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default EditProfile;

function EditProfile(props) {
    const apiUrl = import.meta.env.VITE_APP_URL;

    const { userData, userId } = props;

    const navigate = useHistory();

    const [message, setMessage] = useState("");

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({}); // Для ошибок по полям

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        setData({
            ...data,
            name: userData ? userData.name : "",
            email: userData ? userData.email : "",
        });
    }, [userData]);

    const [file, setFile] = useState(null);

    //обработчик добавления изображения
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Обработчик изменения полей формы
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Обработчик отправки формы
    const queryClient = useQueryClient(); // Для инвалидации кэша

    const mutation = useMutation({
        mutationFn: async () => {
            // e.preventDefault();

            const formData = new FormData();
            //добавление данных в formData
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            formData.append("image", file);
            // стандартный механизм подмены метода (Method Spoofing) - важнейший шаг для Laravel:
            formData.append("_method", "PATCH");

            // Отправляем POST, но добавляем в FormData специальное поле _method со значением 'PATCH'
            const response = await axios.post(`${apiUrl}/api/user`, formData);
            console.log("Данные успешно отправлены:", response.data);

            const result = response.data.data;

            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] }); // Инвалидация кэша после успеха
            setError(null);
            setMessage("Данные успешно отправлены");
            setTimeout(() => {
                navigate.push(`/profile/${userId}`);
            }, 2000);
        },
        onError: (err) => {
            if (err.response) {
                // Сервер ответил, но статус ошибки (например 422)
                const { message, errors: validationErrors } = err.response.data;
                // setError(message || "Произошла ошибка при отправке формы.");
                if (validationErrors) {
                    setErrors(validationErrors); // Устанавливаем ошибки по полям
                    setMessage("");
                }
            } else if (err.request) {
                // Запрос был сделан, но ответ не получен (сеть, 500 ошибка)
                setError("Ошибка сети или сервера. Попробуйте позже.");
                setMessage("");
            } else {
                // Что-то пошло не так при настройке запроса
                setError("Неизвестная ошибка.");
                setMessage("");
            }
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ name: data.name, email: data.email });
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
                    <h1 className="page-title user-page__title">
                        Edit Profile
                    </h1>
                </header>
                <div className="sign-in user-page__content">
                    <form onSubmit={handleSubmit} className="sign-in__form">
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
                                OK
                            </button>
                        </div>
                    </form>
                    <p>{message}</p>
                    <p>{error}</p>
                    {/* отображение ошибок валидации */}
                    {Object.keys(errors).map((fieldName) => (
                        <div key={fieldName}>
                            {Object.values(errors[fieldName]).map(
                                (message, i) => (
                                    <p key={`${fieldName}-${i}`}>{message}</p>
                                )
                            )}
                        </div>
                    ))}
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
