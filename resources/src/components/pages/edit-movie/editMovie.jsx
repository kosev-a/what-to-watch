import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

export default EditMovie;

function EditMovie() {
    const apiUrl = import.meta.env.VITE_APP_URL;

    const params = useParams();

    const navigate = useHistory();

    const [dataMovie, setDataMovie] = useState({
        id: "",
        imdbId: "",
        title: "",
        description: "",
        posterImage: "",
        previewImage: "",
        backgroundImage: "",
        backgroundColor: "#fff",
        director: "",
        runTime: "",
        released: "",
        videoLink: "",
        previewVideoLink: "",
        isPromo: false,
        actors: "",
        genres: "",
        status: "",
    });

    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState({}); // Для ошибок по полям

    // Получение данных о фильме
    const { data, isLoading, error } = useQuery({
        queryKey: ["editMovie", params.imdbId], // Уникальный ключ
        queryFn: async () => {
            const response = await axios.get(
                `${apiUrl}/api/edit-film/${params.imdbId}`,
            );
            const result = response.data.data;
            return result;
        },
        // staleTime: 5 * 60 * 1000, // Данные считаются "свежими" 5 минут
    });

    //функция для приведения actors и genres к строке
    const getStrFromArray = (array) => {
        const arr = array.reduce((newArray, item) => {
            return [...newArray, item.name];
        }, []);

        return arr.join(", ");
    };

    //функция для приведения actors и genres к массиву
    const getArrayFromStr = (str) => {
        const arr = str.split(", ");
        return arr;
    };

    useEffect(() => {
        data &&
            setDataMovie({
                id: data.id ? data.id : "",
                imdbId: data.imdb_id ? data.imdb_id : "",
                title: data.title ? data.title : "",
                description: data.description ? data.description : "",
                posterImage: data.poster_image ? data.poster_image : "",
                previewImage: data.preview_image ? data.preview_image : "",
                backgroundImage: data.background_image
                    ? data.background_image
                    : "",
                backgroundColor: data.background_color
                    ? data.background_color
                    : "#fff",
                director: data.director ? data.director : "",
                runTime: data.run_time ? data.run_time : "",
                released: data.released ? data.released : "",
                videoLink: data.video_link ? data.video_link : "",
                previewVideoLink: data.preview_video_link
                    ? data.preview_video_link
                    : "",
                isPromo: data.is_promo ? data.is_promo : false,
                actors: data.actors ? getStrFromArray(data.actors) : "",
                genres: data.genres ? getStrFromArray(data.genres) : "",
                status: data.status ? data.status : "",
            });
    }, [data]);

    //обработчик добавления изображения
    const handleFileChange = (e) => {
        setDataMovie({ ...dataMovie, backgroundImage: e.target.files[0] });
    };

    // Обработчик изменения статуса "promo"
    const handlePromoChange = () => {
        setDataMovie({ ...dataMovie, isPromo: !dataMovie.isPromo });
    };

    // Обработчик изменения полей формы
    const handleChange = (e) => {
        setDataMovie({ ...dataMovie, [e.target.name]: e.target.value });
    };

    // ввод в форме только цифр
    const handleNumChange = (e) => {
        setDataMovie({
            ...dataMovie,
            [e.target.name]: e.target.value.replace(/\D/g, ""),
        });
    };

    // Обработчик отправки формы
    const queryClient = useQueryClient(); // Для инвалидации кэша

    const mutation = useMutation({
        mutationFn: async () => {
            //преобразование в массив actors и genres
            const fetchData = {
                ...dataMovie,
                actors: getArrayFromStr(dataMovie.actors),
                genres: getArrayFromStr(dataMovie.genres),
            };
            // console.log(fetchData);

            const formData = new FormData();
            //добавление данных в formData
            formData.append("payload", JSON.stringify(fetchData));
            formData.append("backgroundImage", dataMovie.backgroundImage);

            // стандартный механизм подмены метода (Method Spoofing) - важнейший шаг для Laravel:
            formData.append("_method", "PATCH");

            // Отправляем POST, но добавляем в FormData специальное поле _method со значением 'PATCH'
            const response = await axios.post(
                `${apiUrl}/api/film/${dataMovie.id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                },
            );
            console.log("Данные успешно отправлены:", response.data);

            const result = response.data.data;

            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["film", dataMovie.id], }); // Инвалидация кэша после успеха
            setErrorMessage("");
            setMessage("Данные успешно отправлены");
            setTimeout(() => {
                navigate.goBack();
            }, 2000);
        },
        onError: (err) => {
            if (err.response) {
                // Сервер ответил, но статус ошибки (например 422)
                const { message, errors: validationErrors } = err.response.data;
                if (!!validationErrors) {
                    setErrors(validationErrors); // Устанавливаем ошибки по полям
                    setMessage("");
                    setErrorMessage("");
                } else {
                    setErrorMessage(
                        message || "Произошла ошибка при отправке формы.",
                    );
                }
            } else if (err.request) {
                // Запрос был сделан, но ответ не получен (сеть, 500 ошибка)
                setErrorMessage("Ошибка сети или сервера. Попробуйте позже.");
                setMessage("");
            } else {
                // Что-то пошло не так при настройке запроса
                setErrorMessage("Неизвестная ошибка.");
                setMessage("");
            }
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dataMovie);
        mutation.mutate({
            imdbId: dataMovie.imdbId,
            title: dataMovie.title,
            description: dataMovie.description,
            posterImage: dataMovie.posterImage,
            previewImage: dataMovie.previewImage,
            backgroundImage: dataMovie.backgroundImage,
            backgroundColor: dataMovie.backgroundColor,
            director: dataMovie.director,
            runTime: dataMovie.runTime,
            released: dataMovie.released,
            videoLink: dataMovie.videoLink,
            previewVideoLink: dataMovie.previewVideoLink,
            isPromo: dataMovie.isPromo,
            actors: dataMovie.actors,
            genres: dataMovie.genres,
            status: dataMovie.status,
        });
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
                    <h1 className="page-title user-page__title">Edit Movie</h1>
                </header>
                <div className="user-page__content movie-edit__content">
                    {isLoading && <p>Loading...</p>}
                    {data && (
                        <form onSubmit={handleSubmit} className="sign-in__form">
                            <div className="movie-edit__fields">
                                <div className="movie-edit__content-left">
                                    <div className="movie-edit__field">
                                        <label
                                            className="sign-in__label"
                                            htmlFor="imdbId"
                                        >
                                            IMDB id
                                        </label>
                                        <input
                                            className="sign-in__input"
                                            type="text"
                                            name="imdbId"
                                            id="imdbId"
                                            onChange={handleChange}
                                            value={dataMovie.imdbId}
                                        />
                                    </div>
                                    <div className="movie-edit__field">
                                        <label
                                            className="sign-in__label"
                                            htmlFor="title"
                                        >
                                            Title
                                        </label>
                                        <input
                                            className="sign-in__input"
                                            type="text"
                                            name="title"
                                            id="title"
                                            onChange={handleChange}
                                            value={dataMovie.title}
                                        />
                                    </div>
                                    <div className="movie-edit__field">
                                        <label
                                            className="sign-in__label"
                                            htmlFor="director"
                                        >
                                            Director
                                        </label>
                                        <input
                                            className="sign-in__input"
                                            type="text"
                                            name="director"
                                            id="director"
                                            onChange={handleChange}
                                            value={dataMovie.director}
                                        />
                                    </div>
                                    <div className="movie-edit__field">
                                        <label
                                            className="sign-in__label"
                                            htmlFor="previewVideoLink"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            className="sign-in__input movie-edit__field-textarea"
                                            spellCheck="false"
                                            name="description"
                                            id="description"
                                            onChange={handleChange}
                                            value={dataMovie.description}
                                        />
                                    </div>
                                    <div className="movie-edit__fields-double">
                                        <div className="movie-edit__field movie-edit__field-double">
                                            <label
                                                className="sign-in__label"
                                                htmlFor="released"
                                            >
                                                Released
                                            </label>
                                            <input
                                                className="sign-in__input movie-edit__field-double__input"
                                                type="text"
                                                name="released"
                                                id="released"
                                                onChange={handleNumChange}
                                                value={dataMovie.released}
                                            />
                                        </div>
                                        <div className="movie-edit__field movie-edit__field-double">
                                            <label
                                                className="sign-in__label"
                                                htmlFor="runTime"
                                            >
                                                Run time
                                            </label>
                                            <input
                                                className="sign-in__input movie-edit__field-double__input"
                                                type="text"
                                                name="runTime"
                                                id="runTime"
                                                onChange={handleNumChange}
                                                value={
                                                    dataMovie.runTime
                                                        ? dataMovie.runTime
                                                        : ""
                                                }
                                            />
                                            <p className="movie-edit__field-runtime__measure">
                                                min.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="movie-edit__field">
                                        <label
                                            className="sign-in__label"
                                            htmlFor="actors"
                                        >
                                            Actors
                                        </label>
                                        <input
                                            className="sign-in__input"
                                            type="text"
                                            name="actors"
                                            id="actors"
                                            onChange={handleChange}
                                            value={
                                                dataMovie.actors
                                                    ? dataMovie.actors
                                                    : ""
                                            }
                                        />
                                    </div>
                                    <div className="movie-edit__field">
                                        <label
                                            className="sign-in__label"
                                            htmlFor="genres"
                                        >
                                            Genres
                                        </label>
                                        <input
                                            className="sign-in__input"
                                            type="text"
                                            name="genres"
                                            id="genres"
                                            onChange={handleChange}
                                            value={
                                                dataMovie.genres
                                                    ? dataMovie.genres
                                                    : ""
                                            }
                                        />
                                    </div>
                                    <div className="movie-edit__field">
                                        <label
                                            className="sign-in__label"
                                            htmlFor="posterImage"
                                        >
                                            Poster image
                                        </label>
                                        <input
                                            className="sign-in__input"
                                            type="text"
                                            name="posterImage"
                                            id="posterImage"
                                            onChange={handleChange}
                                            value={dataMovie.posterImage}
                                        />
                                    </div>
                                    <div className="movie-edit__field">
                                        <label
                                            className="sign-in__label"
                                            htmlFor="previewImage"
                                        >
                                            Preview image
                                        </label>
                                        <input
                                            className="sign-in__input"
                                            type="text"
                                            name="previewImage"
                                            id="previewImage"
                                            onChange={handleChange}
                                            value={dataMovie.previewImage}
                                        />
                                    </div>
                                    <div className="movie-edit__field">
                                        <label
                                            className="sign-in__label"
                                            htmlFor="videoLink"
                                        >
                                            Video link
                                        </label>
                                        <input
                                            className="sign-in__input"
                                            type="text"
                                            name="videoLink"
                                            id="videoLink"
                                            onChange={handleChange}
                                            value={dataMovie.videoLink}
                                        />
                                    </div>
                                    <div className="movie-edit__field">
                                        <label
                                            className="sign-in__label"
                                            htmlFor="previewVideoLink"
                                        >
                                            Preview video link
                                        </label>
                                        <input
                                            className="sign-in__input"
                                            type="text"
                                            name="previewVideoLink"
                                            id="previewVideoLink"
                                            onChange={handleChange}
                                            value={dataMovie.previewVideoLink}
                                        />
                                    </div>
                                </div>

                                <div className="movie-edit__content-right">
                                    <div className="movie-edit__field-right">
                                        <label htmlFor="backgroundImage">
                                            Set background image
                                        </label>
                                        {dataMovie.backgroundImage ? (
                                            <p>
                                                {dataMovie.backgroundImage.name}
                                            </p>
                                        ) : (
                                            <p>Файл не выбран</p>
                                        )}
                                        <input
                                            className="visually-hidden"
                                            type="file"
                                            name="backgroundImage"
                                            id="backgroundImage"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div className="movie-edit__field-right">
                                        <label htmlFor="backgroundColor">
                                            Set background color
                                        </label>
                                        <div className="movie-edit__color-info">
                                            <p>Current color:</p>
                                            <div
                                                className="movie-edit__color-sample"
                                                style={{
                                                    backgroundColor:
                                                        dataMovie.backgroundColor,
                                                }}
                                            ></div>
                                        </div>
                                        <input
                                            className="visually-hidden"
                                            type="color"
                                            name="backgroundColor"
                                            id="backgroundColor"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="movie-edit__field-right">
                                        <label htmlFor="isPromo">
                                            {dataMovie.isPromo
                                                ? "Unset promo"
                                                : "Set promo"}
                                        </label>
                                        <input
                                            className="visually-hidden"
                                            type="checkbox"
                                            name="isPromo"
                                            id="isPromo"
                                            value={dataMovie.isPromo}
                                            onChange={handlePromoChange}
                                        />
                                    </div>
                                    <div className="movie-edit__field-select">
                                        <label htmlFor="status">Status</label>
                                        <select
                                            name="status"
                                            id="status"
                                            value={dataMovie.status}
                                            onChange={handleChange}
                                        >
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="moderate">
                                                Moderate
                                            </option>
                                            <option value="ready">Ready</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="sign-in__submit movie-edit__post-btn">
                                <button className="sign-in__btn" type="submit">
                                    POST
                                </button>
                            </div>
                        </form>
                    )}
                    <p>{message}</p>
                    <p>{errorMessage}</p>
                    {/* отображение ошибок валидации */}
                    {Object.keys(errors).map((fieldName) => (
                        <div key={fieldName}>
                            {Object.values(errors[fieldName]).map(
                                (message, i) => (
                                    <p key={`${fieldName}-${i}`}>{message}</p>
                                ),
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
