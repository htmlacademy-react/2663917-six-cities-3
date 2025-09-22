import { Comment } from '../../types/comment';
import Review from '../review/review';

type ReviewsListProps = {
    comments: Comment[];
}

function ReviewsList({comments}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {comments.map((comment) => (<Review comment={comment} key={comment.id}/>))}
    </ul>
  );
}

export default ReviewsList;
