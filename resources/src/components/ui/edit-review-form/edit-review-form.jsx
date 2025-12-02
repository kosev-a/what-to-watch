import React, { useState, useEffect } from "react";
import { MAX_RATING } from "../../../const";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function EditReviewForm() {
    const apiUrl = import.meta.env.VITE_APP_URL;

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(null);
    const { id } = useParams();

    const textChangeHandler = (evt) => {
        setComment(evt.target.value);
    };
    const ratingChangeHandler = (evt) => {
        setRating(evt.target.value);
    };

    const ratingValues = [];
    for (let i = 1; i <= MAX_RATING; i++) {
        ratingValues.push(i);
    }

    const navigate = useHistory();

    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false; // Флаг для отслеживания, следует ли игнорировать результат

        (async () => {
            try {
                const response = await axios.get(
                    `${apiUrl}/api/comments/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!ignore) {
                    // Устанавливаем состояние только если компонент не был размонтирован
                    setComment(response.data.comment);
                    setRating(response.data.rating);
                }
                // console.log(response.data.rating);
                setError(null);
            } catch (err) {
                if (!ignore) {
                    console.error("Ошибка при отправке формы:", err);
                    setError("Произошла ошибка при отправке формы.");
                    setMessage("");
                }
            }
        })();
        // Функция очистки
        return () => {
            ignore = true; // Устанавливаем флаг в true при размонтировании компонента или перед следующим запуском эффекта
        };
    }, []);

    const formData = { comment, rating };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(
                `${apiUrl}/api/comments/${id}`,
                formData
            );
            console.log("Данные успешно отправлены:", response.data);

            setMessage("Комментарий успешно добавлен!");
            setError(null);
            navigate.goBack();
        } catch (err) {
            console.error("Ошибка при отправке комментария:", err);
            setError("Произошла ошибка при добавлении комментария.");
            setMessage("");
        }
    };

    ratingValues.reverse();
    return (
        <div className="add-review">
            <form onSubmit={handleSubmit} className="add-review__form">
                <div className="rating">
                    <div className="rating__stars">
                        {ratingValues.map((value) => (
                            <React.Fragment key={value}>
                                <input
                                    className="rating__input"
                                    id={`star-${value}`}
                                    type="radio"
                                    name="rating"
                                    value={`${value}`}
                                    checked={value === +rating}
                                    onChange={ratingChangeHandler}
                                />
                                <label
                                    className="rating__label"
                                    htmlFor={`star-${value}`}
                                >{`Rating ${value}`}</label>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="add-review__text">
                    <textarea
                        className="add-review__textarea"
                        name="review-text"
                        id="review-text"
                        placeholder="Review text"
                        value={comment}
                        onChange={textChangeHandler}
                    ></textarea>
                    <div className="add-review__submit">
                        <button className="add-review__btn" type="submit">
                            Post
                        </button>
                    </div>
                </div>
            </form>
            <p>
                {message}
                {error}
            </p>
        </div>
    );
}

export default EditReviewForm;
