import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { AuthProvider, useAuth } from "../pages/firebase/context";
import { AdminRoutes } from "../utils/AdminRoutes";

// ---- Components ----
import { Home } from "../pages/Home/Home";
import { Navigate } from "react-router-dom";
import { CreateForm } from "../components/CreateForm/CreateForm"
import { Footer } from "../components/Footer/Footer";
import { NavBar } from "../components/NavBar/NavBar";
import { About } from "../pages/About/About";
import { Detail } from "../pages/Detail/Detail";
import { Catalogue } from "../pages/Catalogue/Catalogue";
import { Payment } from "../pages/Payment/Payment";
import { Dashboard } from "../components/Admin/Dashboard";
import { LogIn } from "../pages/LogIn/LogIn";
import { Register } from "../pages/Register/Register";
import { ShoppingCart } from "../components/ShoppingCart/ShoppingCart";
import ProductsToEdit from "../components/EditProduct/ProductsToEdit";
import FormEdit from "../components/EditProduct/FormEdit";
import { Favorites } from "../pages/Favorites/Favorites";
import { Orders } from "../pages/Orders/Orders";
import { Users } from "../components/Admin/Users";
import { AdminRoutes } from "../utils/AdminRoutes";
import { ResetPassword } from "../pages/ResetPassword/ResetPassword";
import { Products } from "../components/Admin/Products";
import { Error404 } from "../components/Error404/Error404";

export const AppRouter = () => {
  const { favorites } = useSelector((state) => state);
  
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  
  useEffect(() => {
    favorites
      ? localStorage.setItem("favorites", JSON.stringify(favorites))
      : localStorage.setItem("favorites", []);
  }, [favorites]);
  
  return (
    <>
      <NavBar userLogged={userLogged}/>{/*asi mando el usuario a un compoenente*/}
      <AuthProvider>
        <Routes>
          {/* ERROR */}
          <Route path='*' element={<Error404/>}/>

          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/about" element={<About />} />

          {/* ADMIN */}
          <Route element={<AdminRoutes/>}>
            <Route path="/admin/" element={<Navigate to="/admin/dashboard"/>}/>
            <Route path="/admin/dashboard" element={<Dashboard/>}/>
            <Route path="/admin/products" element={<Navigate to="/admin/products/list"/>}/>
            <Route path="/admin/products/list" element={<Products />}/>
            <Route path="/admin/users" element={<Users />}/>
            <Route path="/admin/orders" element={<Orders />}/>
            <Route path="/admin/products/create" element={<CreateForm />}/>
            <Route path="/admin/products/edit/:id" element={<FormEdit/>}/>
          </Route>
      
          <Route path="/cart" element={<ShoppingCart/>}/>
          <Route path="/Login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
      <Footer />
    </>
  );
};
