import {NameSpace} from '../../Const';
import {State} from '../../types/state';

export const getCityName = (state: State): string => state[NameSpace.App].cityName;
export const getError = (state: State): string | null => state[NameSpace.App].error;
