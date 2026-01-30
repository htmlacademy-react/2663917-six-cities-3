import { Comment } from '../../types/comment';
import Review from '../review/review';
import { useMemo } from 'react';

const MAX_REVIEWS = 10;

type ReviewsListProps = {
    comments: Comment[];
}

function ReviewsList({comments}: ReviewsListProps) {
  const sortedAndLimitedComments = useMemo(() => {
    const sorted = [...comments].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // От новых к старым
    });
    return sorted.slice(0, MAX_REVIEWS);
  }, [comments]);

  return (
    <ul className="reviews__list">
      {sortedAndLimitedComments.map((comment) => (<Review comment={comment} key={comment.id}/>))}
    </ul>
  );
}

export default ReviewsList;
