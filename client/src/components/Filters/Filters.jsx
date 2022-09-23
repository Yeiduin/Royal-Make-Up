import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, setDefaultFilter } from "../../redux/actions";

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
  });

  const dispatch = useDispatch();


  const handleFilter = (type, target) => {
    switch (type) {
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

      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(filterProducts(filterProduct));
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
              onChange={(event) => handleFilter(e, event.target.value)}
            >
              <option defaultValue value={"all"}>
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
    </div>
  );
};

