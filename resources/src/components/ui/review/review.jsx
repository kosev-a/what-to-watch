import React from 'react';
import reviewProp from './review.prop';
import { transformRating, humanizeDate } from '../../../utils/utils';

function Review(props) {
  const {rating, comment, date} = props.review;
  const userName = props.review.user.name;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{userName}</cite>
          <time
            className="review__date"
            dateTime={humanizeDate(date, 'YYYY-MM-DD')}
          >
            {humanizeDate(date, 'MMMM DD, YYYY')}
          </time>
        </footer>
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
