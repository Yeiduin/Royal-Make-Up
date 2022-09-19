import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import CreateProduct from "../components/Create/CreateProduct";
=======
import Form from "../components/Create/CreateProduct";
>>>>>>> 82f43c35b76b98a7ea8240a4a7714f55f2b7007a
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
<<<<<<< HEAD
        <Route path="/createproduct" element={<CreateProduct />} />
=======
        <Route path="/createproduct" element={<Form />} />
        <Route path="/about" element={<About />} />
>>>>>>> 82f43c35b76b98a7ea8240a4a7714f55f2b7007a
      </Routes>
    </>
  );
};
