import { Route, Routes } from "react-router-dom";
import Form from "../components/Create/form";
import { NavBar } from "../components/Global/NavBar/NavBar";
import { Details } from "../pages/Details";
import { Home } from "../pages/Home";
import { ListProducts } from "../pages/ListProducts";

export const AppRouter = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/listproducts/:id" element={<ListProducts />} />
        <Route path="/createproduct" element={<Form />} />
      </Routes>
    </>
  );
};
