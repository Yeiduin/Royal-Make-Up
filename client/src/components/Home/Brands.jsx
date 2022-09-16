import React from "react";
import { useGlobalServices } from "../../hooks/useGlobalServices";
import { useNavigate } from "react-router-dom";

export const Brands = () => {
  const mainBrands = {
    glossier:
      "https://i.pinimg.com/originals/56/91/75/5691750f7d6a859381be4c7104f7c2d5.jpg",
    clinique: "https://cdn.worldvectorlogo.com/logos/clinique.svg",
    dior: "https://optica-optima.com/blog/wp-content/uploads/2019/05/dior-historia-logo.jpg",
    nyx: "https://cdn.lovesavingsgroup.com/logos/nyx-professional-makeup.jpeg",
  };

  const {
    searchBrand
  } = useGlobalServices();

  const navigate = useNavigate()
  const handleClick = (brand) => {
    searchBrand(brand);
    navigate("/listproducts/1")    
  };

  return (
    <div>
      {Object.entries(mainBrands).map((b) => {
        // ! usar b[0] para linkear a la lista de productos de esa marca => &_brand="b[0]"
        return (
          <img
            src={b[1]}
            alt="brand"
            style={{      
              width: "100px",
              heigth: "auto",
            }}
            onClick={()=>handleClick(b[0])}
          />
        );
      })}
    </div>
  );
};
