import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, getProducts } from "../../redux/actions";
import { addPrice, filterIcon } from "../../assets/svgs/index";
import { Checkbox } from "@mui/material";

export const Filters = ({ pagination }) => {
  const dispatch = useDispatch();
  const { brands, categories, filterSelect } = useSelector((state) => state);

  const [filters, setFilters] = useState({
    brands: [...brands],
    categories: [...categories],
  });

  const [filterProduct, setFilterProduct] = useState(filterSelect);

  const [resetFilter, setResetFilter] = useState(false);

  /* PRICE RANGE */
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
      case "offers":
        if (target === false) {
          setFilterProduct({ ...filterProduct, offers: false });
        } else {
          setFilterProduct({ ...filterProduct, offers: true });
        }

        pagination(1);
        break;
      default:
        break;
    }
  };

  /* FOR HIDDING FILTER */
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

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      handleFilter("offers", true);
    } else {
      handleFilter("offers", false);
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
        offers: false,
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
          <div className="inline-flex align-middle">
            {" "}
            <span className="">{filterIcon} </span>
            <span className="align-middle text-sm pl-2">{filterMenuText}</span>
          </div>
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
                setPriceRange({ ...priceRange, priceMin: e.target.value.replace(/^0+/, '') })
              }
              style={{ width: "80px" }}
              onKeyDown={ (e) => (e.key === 'e' || e.key === '-' || e.key === '+') && e.preventDefault() }
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
                setPriceRange({ ...priceRange, priceMax: e.target.value.replace(/^0+/, '') })
              }
              onKeyDown={ (e) => (e.key === 'e' || e.key === '-' || e.key === '+' ) && e.preventDefault() }
            />
            <button onClick={handlePriceRange} className="align-middle">
              {addPrice}
            </button>
          </div>
          <div className="mt-4">
            <Checkbox
              checked={filterSelect.offers || false}
              id="offers"
              onChange={handleCheckbox}
              sx={{
                "&.Mui-checked": {
                  color: "orange",
                },
              }}
            />
            <label className="align-middle">On sale</label>
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
