import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRouter } from "../router/AppRouter";
import { Navigate } from "react-router-dom";
export const AppMain = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/*" element={<AppRouter />} />
      </Routes>
    </BrowserRouter>
  );
};