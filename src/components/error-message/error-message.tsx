import {useAppSelector} from '../../hooks';
import {getError} from '../../store/app-process/selectors';
import './error-message.css';

function ErrorMessage() {
  const error = useAppSelector(getError);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;
