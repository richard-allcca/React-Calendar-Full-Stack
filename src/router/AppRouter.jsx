import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from './../auth';
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {
  // const authStatus = 'authenticated';
  // const authStatus = 'checking';
  // const authStatus = 'not-authenticated';
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(status === 'checking') {
    return (
      <h3>Cargando...</h3>
    );
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <Route path="/" element={<LoginPage />}>
          <Route index path="/auth" element={<LoginPage />} />
          <Route path="/*" element={<LoginPage />} />
        </Route>
      ) : (
        <>
          <Route index path="/auth/login" element={<Navigate to='/' />} />
          <Route path="/" element={<CalendarPage />}>
            <Route index path="/*" element={<CalendarPage />} />
          </Route>
        </>
      )}
    </Routes>
  );
};
