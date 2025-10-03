import {Link} from 'react-router-dom';
import {AppRoute} from '../../Const';

function AnonymousHeaderUserProfile(): JSX.Element {
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item">
        <Link className="header__nav-link" to={AppRoute.Login}>
          <span className="header__signout">Sign in</span>
        </Link>
      </li>
    </ul>);
}

export default AnonymousHeaderUserProfile;
