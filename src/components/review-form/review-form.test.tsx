import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './review-form';
import { withBrowserRouter, withStore } from '../../utils/mock-component';
import { APIRoute, AuthorizationStatus, NameSpace } from '../../const';
import { extractActionsTypes, makeFakeComment } from '../../utils/mocks';
import { saveCommentAction } from '../../store/api-actions';

const defaultOffersDataState = {
  offers: [],
  offerDetailed: undefined,
  offersNearby: [],
  comments: [],
  favorites: [],
  isOfferNotFound: false,
  isDataLoading: false,
  isCommentSaving: false,
};

describe('Component: ReviewForm', () => {
  const mockOfferId = 'test-offer-id';

  it('should render form with rating inputs, textarea and submit button', () => {
    const { withStoreComponent } = withStore(
      <ReviewForm offerId={mockOfferId} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        },
        [NameSpace.OffersData]: defaultOffersDataState,
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(container.querySelector('[id="5-stars"]')).toBeInTheDocument();
    expect(container.querySelector('[id="4-stars"]')).toBeInTheDocument();
    expect(container.querySelector('[id="3-stars"]')).toBeInTheDocument();
    expect(container.querySelector('[id="2-stars"]')).toBeInTheDocument();
    expect(container.querySelector('[id="1-stars"]')).toBeInTheDocument();
  });

  it('should render correctly when user types review text', async () => {
    const reviewText = 'This is a great place to stay!';

    const { withStoreComponent } = withStore(
      <ReviewForm offerId={mockOfferId} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        },
        [NameSpace.OffersData]: defaultOffersDataState,
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    render(preparedComponent);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    await userEvent.type(textarea, reviewText);

    expect(screen.getByDisplayValue(reviewText)).toBeInTheDocument();
  });

  it('should update rating when user selects a rating', () => {
    const { withStoreComponent } = withStore(
      <ReviewForm offerId={mockOfferId} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        },
        [NameSpace.OffersData]: defaultOffersDataState,
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);
    const ratingInput = container.querySelector('[id="5-stars"]') as HTMLInputElement;

    fireEvent.change(ratingInput, { target: { name: 'rating', value: '5', checked: true } });

    expect(ratingInput.checked).toBe(true);
  });

  it('should disable submit button when review is less than 50 characters', () => {
    const { withStoreComponent } = withStore(
      <ReviewForm offerId={mockOfferId} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        },
        [NameSpace.OffersData]: defaultOffersDataState,
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    render(preparedComponent);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when review is at least 50 characters', async () => {
    const longReview = 'a'.repeat(50);

    const { withStoreComponent } = withStore(
      <ReviewForm offerId={mockOfferId} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        },
        [NameSpace.OffersData]: defaultOffersDataState,
      }
    );

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const ratingLabel = container.querySelector('label[for="5-stars"]');
    await userEvent.click(ratingLabel!);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    await userEvent.type(textarea, longReview);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).not.toBeDisabled();
  });

  it('should dispatch saveCommentAction when form is submitted', async () => {
    const mockComment = makeFakeComment();
    const reviewText = 'This is a great place to stay! I really enjoyed my time here and would definitely come back again.';

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <ReviewForm offerId={mockOfferId} />,
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        },
        [NameSpace.OffersData]: defaultOffersDataState,
      }
    );

    mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockOfferId}`).reply(200, mockComment);
    mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockOfferId}`).reply(200, [mockComment]);

    const preparedComponent = withBrowserRouter(withStoreComponent);
    const { container } = render(preparedComponent);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    await userEvent.type(textarea, reviewText);

    const ratingInput = container.querySelector('[id="4-stars"]');
    await userEvent.click(ratingInput!);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      saveCommentAction.pending.type,
      saveCommentAction.fulfilled.type,
    ]);
  });
});
