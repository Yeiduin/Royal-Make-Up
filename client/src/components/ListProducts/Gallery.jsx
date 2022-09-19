import React from "react";
import { useListProductsServices } from "../../hooks/useListProductsServices";
import { GalleryCard } from "./GalleryCard";

import { sectionGallery } from "../../assets/css/list-products/listProducts.module.css";

export const Gallery = () => {
  const {
    listProducts: { listPage },
  } = useListProductsServices();

  return (
    <main className={`container m-auto ${sectionGallery} `}>
      {
        listPage && listPage.length ? (
          listPage.map((item) => <GalleryCard key={item.id} {...item} />)
        ) : (
          <div style={{display:"flex", justifyContent: "center", height:"200px", marginTop: "100px"}}>
            <img src="https://achacosossenderismo.org/wp-content/uploads/2021/09/websitebox-loader.gif" alt=""/>
          </div>
        )
   }
    </main>
  );
};
