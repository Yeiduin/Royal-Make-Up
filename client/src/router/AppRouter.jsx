import { Route, Routes } from "react-router-dom";
import Form from "../components/Create/CreateProduct";
import { NavBar } from "../components/Global/NavBar/NavBar";
import { About } from "../pages/About";
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
        <Route path="/listproducts" element={<ListProducts />} />
        <Route path="/listproducts/:id" element={<ListProducts />} />
        <Route path="/createproduct" element={<Form />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};
