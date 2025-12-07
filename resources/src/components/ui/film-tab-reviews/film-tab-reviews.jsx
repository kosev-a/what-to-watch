import React from "react";
import Review from "../review/review";

function FilmTabReviews(props) {
    const { reviews } = props;

    return (
        <div className="film-card__reviews">
            <div className="film-card__reviews-col">
                {reviews.slice(0, reviews.length).map((review) => (
                    <Review key={review.id} review={review} onDelete={props.onDelete} />
                ))}
            </div>
        </div>
    );
}

export default FilmTabReviews;
