import { Comment } from '../../types/comment';
import RatingStarsWidthResolver from '../../utils/ratingStarsWidthResolver';

type ReviewProps = {
    comment: Comment;
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(date);

function Review({comment}: ReviewProps) {
  const date = new Date(comment.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: RatingStarsWidthResolver.resolve(comment.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime={date.toISOString().slice(0, 10)}>
          {formatDate(date)}
        </time>
      </div>
    </li>
  );
}

export default Review;
