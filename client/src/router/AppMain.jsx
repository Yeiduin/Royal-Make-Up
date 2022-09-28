import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRouter } from "../router/AppRouter";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "../pages/firebase/context";
export const AppMain = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path="/*" element={<AppRouter />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};