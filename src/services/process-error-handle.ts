// import {store} from '../store';
// import {clearErrorAction} from '../store/api-actions';
// import {setError} from '../store/app-process/app-process';

export const processErrorHandle = (message: string): void => {
  // eslint-disable-next-line no-console
  console.log(message);

  // store.dispatch(setError(message));
  // store.dispatch(clearErrorAction());
};
