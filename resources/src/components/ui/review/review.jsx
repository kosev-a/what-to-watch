import React from "react";
import reviewProp from "./review.prop";
import { transformRating, humanizeDate } from "../../../utils/utils";
import { Link } from "react-router-dom";
import { AppRoute } from "../../../const";

function Review(props) {
    const { id, filmId, rating, comment, updated_at, created_at } = props.review;
    const userName = props.review.user.name;
    const date = updated_at || created_at;
    return (
        <div className="review">
            <blockquote className="review__quote">
                <p className="review__text">{comment}</p>

                <footer className="review__details">
                    <cite className="review__author">{userName}</cite>
                    <time
                        className="review__date"
                        dateTime={humanizeDate(date, "YYYY-MM-DD")}
                    >
                        {humanizeDate(date, "MMMM DD, YYYY")}
                    </time>
                </footer>
                <div className="review_buttons">
                    <Link
                        className="btn film-card__button"
                        to={`${AppRoute.FILM}/${filmId}/review/${id}`}
                    >
                        Edit review
                    </Link>
                    <button>Delete review</button>
                </div>
            </blockquote>
            {/* <div className="review__rating">{transformRating(rating)}</div> */}
            <div className="review__rating">{rating}/10</div>
        </div>
    );
}

// Review.propTypes = {
//   review: reviewProp,
// };

export default Review;
