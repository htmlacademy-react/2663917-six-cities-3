import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { saveCommentAction, fetchCommentsAction } from '../../store/api-actions';
import { getIsCommentSaving } from '../../store/offers-data/selectors';

type ReviewFormProps = {
    offerId: string;
}

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const minReviewLength = 50;
  const maxReviewLength = 300;
  const [reviewFormData, setReviewFormData] = useState({
    rating: 0,
    review: ''
  });
  const dispatch = useAppDispatch();
  const isCommentSaving = useAppSelector(getIsCommentSaving);

  const reviewFormFieldChangeHandle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    if (name === 'review' && value.length > maxReviewLength) {
      return;
    }
    setReviewFormData({...reviewFormData, [name]: value});
  };

  const saveComment = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await dispatch(saveCommentAction({
      offerId: offerId,
      comment: reviewFormData.review,
      rating: Number(reviewFormData.rating)
    })).unwrap();
    dispatch(fetchCommentsAction(offerId));
    setReviewFormData({
      rating: 0,
      review: ''
    });
  };

  const isFormValid = reviewFormData.review.length >= minReviewLength
    && reviewFormData.review.length <= maxReviewLength
    && reviewFormData.rating > 0;
  const isFormDisabled = isCommentSaving;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={saveComment}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={reviewFormFieldChangeHandle} disabled={isFormDisabled} checked={reviewFormData.rating === 5} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={reviewFormFieldChangeHandle} disabled={isFormDisabled} checked={reviewFormData.rating === 4} />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={reviewFormFieldChangeHandle} disabled={isFormDisabled} checked={reviewFormData.rating === 3} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={reviewFormFieldChangeHandle} disabled={isFormDisabled} checked={reviewFormData.rating === 2} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={reviewFormFieldChangeHandle} disabled={isFormDisabled} checked={reviewFormData.rating === 1} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" value={reviewFormData.review} placeholder="Tell how was your stay, what you like and what can be improved" onChange={reviewFormFieldChangeHandle} disabled={isFormDisabled} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{minReviewLength} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormValid || isFormDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
