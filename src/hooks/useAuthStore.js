import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";
import { calendarApi } from "../api";
// import calendarApi from './../api/calendarApi';


export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post('/auth',{ email,password });
      localStorage.setItem('token', data?.token );
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch( onLogout('incorrect credentials'));
      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post('/auth/register', { name, email, password } );
      localStorage.setItem('token', data?.token );
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch( onLogout(error.response?.data?.msg || 'fallo el registro'));
      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    dispatch(onChecking());
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get('/auth/renew');
      localStorage.setItem('token', data.token);
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      // eslint-disable-next-line no-console
      localStorage.clear();
      dispatch( onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogoutCalendar());
  };

  return {
    // Properties
    status,
    user,
    errorMessage,

    // Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};