import {useAppSelector} from '../../hooks';
import {AuthorizationStatus } from '../../const';
import {getAuthState} from '../../store/user-process/selectors';
import AnonymousHeaderUserProfile from '../anonymous-header-user-profile/anonymous-header-user-profile';
import AuthorizedHeaderUserProfile from '../authorized-header-user-profile/authorized-header-user-profile';

function HeaderUserProfile() {
  const {authorizationStatus, userData} = useAppSelector(getAuthState);

  return (
    <nav className="header__nav">
      {authorizationStatus === AuthorizationStatus.Auth && userData &&
        <AuthorizedHeaderUserProfile userAvatarUrl={userData.avatarUrl} userEmail={userData.email} />}
      {authorizationStatus === AuthorizationStatus.NoAuth && <AnonymousHeaderUserProfile />}
    </nav>
  );
}

export default HeaderUserProfile;
