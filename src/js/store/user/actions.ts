import { ThunkResult } from '~js/store';
import {
  projectsRefreshed,
  projectsRefreshing,
} from '~js/store/projects/actions';
import { User } from '~js/store/user/reducer';
import apiFetch from '~js/utils/api';
import { LIST_CHANNEL_ID, OBJECT_TYPES } from '~js/utils/constants';

interface LoginAction {
  type: 'USER_LOGGED_IN';
  payload: User;
}
export interface LogoutAction {
  type: 'USER_LOGGED_OUT';
}
export interface RefetchDataAction {
  type:
    | 'REFETCH_DATA_STARTED'
    | 'REFETCH_DATA_SUCCEEDED'
    | 'REFETCH_DATA_FAILED';
}
interface DisconnectSucceeded {
  type: 'USER_DISCONNECT_SUCCEEDED';
  payload: User;
}
interface DisconnectAction {
  type: 'USER_DISCONNECT_REQUESTED' | 'USER_DISCONNECT_FAILED';
}
interface RefreshDevHubSucceeded {
  type: 'DEV_HUB_STATUS_SUCCEEDED';
  payload: User;
}
interface RefreshDevHubAction {
  type: 'DEV_HUB_STATUS_REQUESTED' | 'DEV_HUB_STATUS_FAILED';
}
interface AgreeToTermsAction {
  type: 'AGREE_TO_TERMS_REQUESTED' | 'AGREE_TO_TERMS_FAILED';
}
interface AgreeToTermsSucceeded {
  type: 'AGREE_TO_TERMS_SUCCEEDED';
  payload: User;
}
export type UserAction =
  | LoginAction
  | LogoutAction
  | RefetchDataAction
  | DisconnectAction
  | DisconnectSucceeded
  | RefreshDevHubAction
  | RefreshDevHubSucceeded
  | AgreeToTermsAction
  | AgreeToTermsSucceeded;

export const login = (payload: User): LoginAction => {
  if (window.Sentry) {
    window.Sentry.setUser(payload);
  }
  /* istanbul ignore else */
  if (payload && window.socket) {
    window.socket.subscribe({
      model: OBJECT_TYPES.USER,
      id: payload.id,
    });
    window.socket.subscribe({
      model: OBJECT_TYPES.ORG,
      id: LIST_CHANNEL_ID,
    });
  }
  return {
    type: 'USER_LOGGED_IN',
    payload,
  };
};

export const logout = (): ThunkResult<Promise<LogoutAction>> => (dispatch) =>
  apiFetch({
    url: window.api_urls.account_logout(),
    dispatch,
    opts: {
      method: 'POST',
    },
  }).then(() => {
    /* istanbul ignore else */
    if (window.socket) {
      window.socket.reconnect();
    }
    if (window.Sentry) {
      window.Sentry.configureScope((scope) => scope.clear());
    }
    return dispatch({ type: 'USER_LOGGED_OUT' as const });
  });

export const refetchAllData = (): ThunkResult<
  Promise<RefetchDataAction | LogoutAction>
> => async (dispatch) => {
  dispatch({ type: 'REFETCH_DATA_STARTED' });
  try {
    const payload = await apiFetch({
      url: window.api_urls.user(),
      dispatch,
      suppressErrorsOn: [401, 403, 404],
    });
    if (!payload) {
      return dispatch({ type: 'USER_LOGGED_OUT' as const });
    }
    dispatch(login(payload));
    dispatch(projectsRefreshing());
    dispatch(projectsRefreshed());
    return dispatch({
      type: 'REFETCH_DATA_SUCCEEDED' as const,
    });
  } catch (err) {
    dispatch({ type: 'REFETCH_DATA_FAILED' });
    throw err;
  }
};

export const disconnect = (): ThunkResult<
  Promise<DisconnectSucceeded>
> => async (dispatch) => {
  dispatch({ type: 'USER_DISCONNECT_REQUESTED' });
  try {
    const payload = await apiFetch({
      url: window.api_urls.user_disconnect_sf(),
      dispatch,
      opts: {
        method: 'POST',
      },
    });
    return dispatch({
      type: 'USER_DISCONNECT_SUCCEEDED' as const,
      payload,
    });
  } catch (err) {
    dispatch({ type: 'USER_DISCONNECT_FAILED' });
    throw err;
  }
};

export const refreshDevHubStatus = (): ThunkResult<
  Promise<RefreshDevHubSucceeded>
> => async (dispatch) => {
  dispatch({ type: 'DEV_HUB_STATUS_REQUESTED' });
  try {
    const payload = await apiFetch({ url: window.api_urls.user(), dispatch });
    return dispatch({
      type: 'DEV_HUB_STATUS_SUCCEEDED' as const,
      payload,
    });
  } catch (err) {
    dispatch({ type: 'DEV_HUB_STATUS_FAILED' });
    throw err;
  }
};

export const agreeToTerms = (): ThunkResult<
  Promise<AgreeToTermsSucceeded>
> => async (dispatch) => {
  dispatch({ type: 'AGREE_TO_TERMS_REQUESTED' });
  try {
    const payload = await apiFetch({
      url: window.api_urls.agree_to_tos(),
      dispatch,
      opts: {
        method: 'PUT',
      },
    });
    return dispatch({
      type: 'AGREE_TO_TERMS_SUCCEEDED' as const,
      payload,
    });
  } catch (err) {
    dispatch({ type: 'AGREE_TO_TERMS_FAILED' });
    throw err;
  }
};
