import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../redux/actions";

export const Filters = ({ pagination }) => {
  const [filters, setFilters] = useState({
    brands: [
      "l'oreal",
      "nyx",
      "penny lane organics",
      "nudus",
      "lotus cosmetics usa",
      "maybelline",
      "green people",
      "coastal classic creation",
      "c'est moi",
      "dior",
      "fenty",
    ],
    categories: [
      "lipstick",
      "blush",
      "eyeshadow",
      "mascara",
      "lipliner",
      "eyeliner",
      "eyebrow",
      "foundation",
      "bronzer",
      "blush",
    ],
  });

  const [filterProduct, setFilterProduct] = useState({
    brands: "all",
    categories: "all",
    // priceMin: "all",
    // priceMax: "all",
  });

  const dispatch = useDispatch();
  const [resetFilter, setResetFilter] = useState(false);

  const handleFilter = (type, target) => {
     switch (type) {     
      case "reset":
        setResetFilter(true);  
      case "brands":
        if (target === "all") {
          setFilterProduct({ ...filterProduct, brands: "all" });
        } else {
          setFilterProduct({ ...filterProduct, brands: target });          
        }
        
        pagination(1);
        break;
      case "categories":
        if (target === "all") {
          setFilterProduct({ ...filterProduct, categories: "all" });
        } else {
          setFilterProduct({ ...filterProduct, categories: target });
          
        }
        
        pagination(1);
        break;
    //   case "priceMin":
    //       if (target === "all") {
    //         setFilterProduct({ ...filterProduct, priceMin: "all" });
    //       } else {
    //         setFilterProduct({ ...filterProduct, priceMin: target });
    //       }
    //       pagination(1);
    //       break;
    //  case "priceMax":
    //         if (target === "all") {
    //           setFilterProduct({ ...filterProduct, priceMax: "all" });
    //         } else {
    //           setFilterProduct({ ...filterProduct, priceMax: target });

    //         }
    //         pagination(1);
    //         break;

      default:
        break;
    }
    
  };

  useEffect(() => {
    dispatch(filterProducts(filterProduct));
    if(resetFilter){
      setFilterProduct({ brands: "all", categories: "all"})
      setResetFilter(false)
    }
    console.log(filterProduct);
  }, [filterProduct]);

  return (
    <div className="flex flex-row flex-wrap justify-center mt-14 mb-11">
      {Object.keys(filters).map((e, index) => {
        return (
          <div key={index} className="relative">
            <p className="uppercase">{e}</p>
            <select
              name={e}
              id={e}
              key={e + index}
              className="uppercase"
              value={filterProduct[e]}
              onChange={(event) => handleFilter(e, event.target.value)}
              // defaultValue={"all"}
            >
              <option value={"all"}>
                All
              </option>
              {filters[e]?.map((f, index) => {
                return (
                  <option key={f + index + e} value={f}>
                    {f}
                  </option>
                );
              })}
            </select>
           
          </div> 
          
        );
      })}
      {/* // ! REEMPLAZAR POR ICON */}
      <button onClick={()=> handleFilter("reset", "all")}>X</button>
    </div>
  );
};

