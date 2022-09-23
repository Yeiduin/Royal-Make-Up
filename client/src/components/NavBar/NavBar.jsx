import React from "react";
import { Link, } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar/SearchBar";

export const NavBar = () => {


 

  return (
    <nav >
      <div className="inline-block">
      <div>
          <Link to="./">Niveados</Link>
          </div>
          <div className="flex flex-row">
          <Link to="./home">Home</Link>
          <Link to="./catalogue">Catalogue</Link>
          <Link to="./createproduct">Create Product</Link>
          <Link to="./about">About</Link>
  
     </div> </div>
     <SearchBar/>
    {/* BOTONES CON LOS ÍCONOS PARA CARRITO, CORAZONES Y LOGIN */}
      <div >
          <button>
            {/* <img src={} alt="icon" /> */}
          </button>
          <button>
            {/* <img src={} alt="icon" /> */}
          </button>
          <button>
            {/* <img src={} alt="icon" /> */}
          </button>
      </div>
    </nav>
  );  
}