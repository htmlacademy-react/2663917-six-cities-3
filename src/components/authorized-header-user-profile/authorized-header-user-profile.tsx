import {Link} from 'react-router-dom';
import {fetchFavoritesAction, logoutAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import './authorized-header-user-profile.css';
import {Offer} from '../../types/offer';
import {getFavorites} from '../../store/offers-data/selectors';
import {useEffect} from 'react';

type AuthorizedHeaderUserProfileProps = {
  userAvatarUrl: string;
  userEmail: string;
}

function AuthorizedHeaderUserProfile({userAvatarUrl, userEmail}: AuthorizedHeaderUserProfileProps): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers: Offer[] = useAppSelector(getFavorites);
  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);
  const handleLogoutClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to="#">
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img src={userAvatarUrl} alt="User avatar" />
          </div>
          <span className="header__user-name user__name">{userEmail}</span>
          <span className="header__favorite-count">{favoriteOffers.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <button className="header__nav-link" onClick={handleLogoutClick}>
          <span className="header__signout">Sign out</span>
        </button>
      </li>
    </ul>
  );
}

export default AuthorizedHeaderUserProfile;
