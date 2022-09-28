import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../redux/actions";
import { addPrice, filterIcon } from "../../assets/svgs/index";

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
    priceMin: "",
    priceMax: "",
    // priceRange: ""
  });

  const dispatch = useDispatch();
  const [resetFilter, setResetFilter] = useState(false);

  const [priceRange, setPriceRange] = useState({ priceMin: "", priceMax: "" });

  const handlePriceRange = () => {
    // Se invierte el orden si hace falta
    if (parseInt(priceRange.priceMin) > parseInt(priceRange.priceMax)) {
      setPriceRange({
        priceMin: priceRange.priceMax,
        priceMax: priceRange.priceMin,
      });
      let price = priceRange.priceMax + "-" + priceRange.priceMin;
      handleFilter("price", price);
    } else {
      let price = priceRange.priceMin + "-" + priceRange.priceMax;
      handleFilter("price", price);
    }
  };

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
      case "priceMin":
        if (!target.length) {
          setFilterProduct({ ...filterProduct, priceMin: "" });
        } else {
          setFilterProduct({ ...filterProduct, priceMin: target });
        }
        pagination(1);
        break;
      case "priceMax":
        if (!target.length) {
          setFilterProduct({ ...filterProduct, priceMax: "" });
        } else {
          setFilterProduct({ ...filterProduct, priceMax: target });
        }
        pagination(1);
        break;
      case "price":
        let priceRange = target.split("-");
        if (!target.length) {
          setFilterProduct({ ...filterProduct, priceMin: "", priceMax: "" });
        } else {
          setFilterProduct({
            ...filterProduct,
            priceMin: priceRange[0],
            priceMax: priceRange[1],
          });
        }
        pagination(1);
        break;

      default:
        break;
    }
  };

  const [filterMenu, setFilterMenu] = useState(true);
  const [filterMenuText, setFilterMenuText] = useState("Hide filters");

  const handleFilterMenu = () => {
    if (filterMenu) {
      setFilterMenuText("Show filters");
      setFilterMenu(false);
    } else {
      setFilterMenuText("Hide filters");
      setFilterMenu(true);
    }
  };

  useEffect(() => {
    dispatch(filterProducts(filterProduct));
    if (resetFilter) {
      setFilterProduct({
        brands: "all",
        categories: "all",
        priceMin: "",
        priceMax: "",
      });
      setPriceRange({ priceMin: "", priceMax: "" });
      setResetFilter(false);
    }
    console.log(filterProduct);
  }, [filterProduct]);

  return (
    <div className="uppercase mt-4">
      <details open className="">
        <summary
          onClick={() => handleFilterMenu()}
          className="inline-table list-none cursor-pointer data"
        >
          <div className="inline-flex align-middle"> <span className="">{filterIcon}  </span><span className="align-middle text-sm pl-2">{filterMenuText}</span></div>
        </summary>
        <div className="text-xs">
          <div className="">
            <div className="mt-4">
              {Object.keys(filters).map((e, index) => {
                return (
                  <div key={index} className="mt-4">
                    <p className="">{e}</p>
                    <select
                      name={e}
                      style={{ width: "200px" }}
                      id={e}
                      key={e + index}
                      className="uppercase text-xs"
                      value={filterProduct[e]}
                      onChange={(event) => handleFilter(e, event.target.value)}
                      // defaultValue={"all"}
                    >
                      <option value={"all"}>All</option>
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
          </div>

          {/* Price filters */}
          <div className="mt-4">
            <p className="">Price range</p>
            <input
              type="number"
              name="priceMin"
              value={priceRange.priceMin}
              placeholder="Min"
              className="uppercase text-xs"
              min="0"
              max={
                priceRange.priceMax.length
                  ? parseInt(priceRange.priceMax) - 1
                  : "100000"
              }
              onChange={(e) =>
                setPriceRange({ ...priceRange, priceMin: e.target.value })
              }
              style={{ width: "80px" }}
            />
            <span>-</span>
            <input
              type="number"
              className="uppercase text-xs"
              name="priceMax"
              style={{ width: "80px", marginRight: "5px" }}
              value={priceRange.priceMax}
              placeholder="Max"
              min={toString(parseInt(priceRange.priceMin) + 1)}
              max="100000"
              onChange={(e) =>
                setPriceRange({ ...priceRange, priceMax: e.target.value })
              }
            />
            <button onClick={handlePriceRange} className="align-middle">
              {addPrice}
            </button>
          </div>
          <button
            className="mt-4 uppercase font-bold"
            onClick={() => handleFilter("reset", "all")}
          >
            Clear all filters
          </button>
        </div>
      </details>
    </div>
  );
};
