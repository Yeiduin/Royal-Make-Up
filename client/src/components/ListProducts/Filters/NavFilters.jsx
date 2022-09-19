import React, { useEffect, useRef } from "react";
import { useForm } from "../../../hooks/useForm";
import { useManagerText } from "../../../hooks/useManagerText";
import { useGlobalServices } from "../../../hooks/useGlobalServices";
import {
  sectionCategories,
  categoriesButton,
  filterOrder,
} from "../../../assets/css/list-products/filters.module.css";

import coin from "../../../assets/images/coin.png";

export const NavFilters = () => {
  const [values, handleInputChange] = useForm();
  const { firsUpperCase } = useManagerText();
  const {
    changeFilter,
    getCategories,
    global: {
      categories,
      filters: { orderBy },
    },
  } = useGlobalServices();

  const orderByRef = useRef(null);

  useEffect(() => {
    values.orderBy && changeFilter(values);
  }, [values]);

  useEffect(() => {
    !categories.length && getCategories();
    orderByRef.current.value = orderBy;
  }, []);

  const changeCategories = (category) => {
    changeFilter({ category });
  };

  return (
    <section className={sectionCategories}>
      <div className={categoriesButton}>
        <button
          onClick={() => {
            changeCategories("");
          }}
        >
          All
        </button>
        {categories ? (
          categories.map((category, i) => {
            if (i > 9) return <></>;
            else
              return (
                <button
                  key={category}
                  onClick={() => {
                    changeCategories(category);
                  }}
                >
                  {firsUpperCase(category)}
                </button>
              );
          })
        ) : (
          <></>
        )}
      </div>

      <div className={filterOrder}>
        <select
          name="orderBy"
          aria-label="Default select example"
          onChange={handleInputChange}
          ref={orderByRef}
        >
          <option value="priceAsc">Sort by: Low to Higth</option>
          <option value="priceDesc">Sort by: Higth to Low</option>
          <option value="nameAsc">Sort by: Name Asc</option>
          <option value="nameDesc">Sort by: Name Desc</option>
        </select>
        <button>
          <img src={coin} alt="order by price" />
        </button>
      </div>
    </section>
  );
};
