import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import LoadingScreen from '../../loading-screen';
import {ReactNode} from 'react';

type PrivateRouteProps = {
  children: ReactNode;
}

function PrivateRoute({children}: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
