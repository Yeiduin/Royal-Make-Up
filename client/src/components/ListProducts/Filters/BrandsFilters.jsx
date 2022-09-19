import React from "react";
import { useEffect } from "react";
import {
  brandsFiltred,
  brandsButton,
} from "../../../assets/css/list-products/filters.module.css";

import { useGlobalServices } from "../../../hooks/useGlobalServices";
import { useListProductsServices } from "../../../hooks/useListProductsServices";

export const BrandsFilters = () => {
  const {
    getBrands,
    global: { brands },
  } = useListProductsServices();

  const { changeFilter } = useGlobalServices();

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <section className={brandsFiltred}>
      <div className={brandsButton}>
        <button onClick={() => changeFilter({ brand: "" })}>
          <img
            src="https://i.postimg.cc/CK3NMcKL/nada.png"
            alt="none"
            style={{ padding: "5px" }}
          />
        </button>
        {brands
          ? brands.map((brand, i) => {
              if (i > 199) return <></>;
              else
                return (
                  <button
                    key={brand.name}
                    onClick={() => changeFilter({ brand: brand.name })}
                  >
                    <img src={brand.logo} alt="logo" />
                  </button>
                );
            })
          : ""}
      </div>
    </section>
  );
};
