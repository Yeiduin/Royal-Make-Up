import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
// import { CreateForm } from "../components/CreateForm/CreateForm"
import { Footer } from "../components/Footer/Footer";
import { NavBar } from "../components/NavBar/NavBar";
import { About } from "../pages/About/About";
import { Detail } from "../pages/Detail/Detail";
import { Catalogue } from "../pages/Catalogue/Catalogue";
// import { ListProducts } from "../pages/ListProducts";

export const AppRouter = () => {
  return (
    <>
      <NavBar />
      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/catalogue" element={<Catalogue />} />
       
        {/* <Route path="/createproduct" element={<CreateForm />} /> */}
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer/>
    </>
  );
};
