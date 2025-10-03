import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { saveCommentAction } from '../../store/api-actions';

type ReviewFormProps = {
    offerId: string;
}

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const minReviewLength = 50;
  const [reviewFormData, setReviewFormData] = useState({
    rating: 0,
    review: ''
  });
  const reviewFormFieldChangeHandle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('reviewFormFieldChangeHandle')
    const {name, value} = event.target;
    console.log('name, value', name, value);
    setReviewFormData({...reviewFormData, [name]: value});
  };
  const dispatch = useAppDispatch();
  const saveComment = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(saveCommentAction({
      offerId: offerId,
      comment: reviewFormData.review,
      rating: Number(reviewFormData.rating)
    }));
  };
  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={saveComment}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={reviewFormFieldChangeHandle} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={reviewFormFieldChangeHandle} />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={reviewFormFieldChangeHandle} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={reviewFormFieldChangeHandle} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={reviewFormFieldChangeHandle} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" value={reviewFormData.review} placeholder="Tell how was your stay, what you like and what can be improved" onChange={reviewFormFieldChangeHandle} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{minReviewLength} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={reviewFormData.review.length < minReviewLength}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
