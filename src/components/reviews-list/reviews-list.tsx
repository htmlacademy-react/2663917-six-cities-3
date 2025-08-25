import { Review as ReviewType } from '../../types/review';
import Review from '../review/review';

type ReviewsListProps = {
    reviews: ReviewType[];
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (<Review review={review} key={review.id}/>))}
    </ul>
  );
}

export default ReviewsList;
