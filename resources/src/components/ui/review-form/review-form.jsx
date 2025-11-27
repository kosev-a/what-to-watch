import React, { useState } from "react";
import { MAX_RATING } from "../../../const";
import { useHistory } from "react-router-dom";
import axios from "axios";

function ReviewForm({ film }) {
    const apiUrl = import.meta.env.VITE_APP_URL;

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(null);
    const [commentId, setCommentId] = useState(null);
    const filmId = film.id;

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

    const formData = {filmId, commentId, comment, rating};

    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Отправляем POST-запрос с данными формы
            const response = await axios.post(
                `${apiUrl}/api/films/${filmId}/comments`,
                formData
            );
            console.log("Данные успешно отправлены:", response.data);

            setMessage("Форма успешно отправлена!");
            setError(null);
            // Опционально: очистить форму
            // setFormData({ email: "", password: "" });
            navigate.goBack();
        } catch (err) {
            console.error("Ошибка при отправке формы:", err);
            setError("Произошла ошибка при отправке формы.");
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
        </div>
    );
}

export default ReviewForm;
