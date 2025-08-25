import { Review as ReviewType } from '../../types/review';
import RatingStarsWidthResolver from '../../utils/ratingStarsWidthResolver';

type ReviewProps = {
    review: ReviewType;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(date);
}

function Review({review}: ReviewProps): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.imageSource} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.reviewerName}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: RatingStarsWidthResolver.resolve(review.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.review}
        </p>
        <time className="reviews__time" dateTime={review.date.toISOString().slice(0, 10)}>
          {formatDate(review.date)}
        </time>
      </div>
    </li>
  );
}

export default Review;
