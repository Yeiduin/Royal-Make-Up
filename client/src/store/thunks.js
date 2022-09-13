import { isLoading, login, logout } from './authSlice';

export const chekingAuth = (email, pass) => {
    return async (dispatch) => {
        dispatch(isLoading());
    };
}
