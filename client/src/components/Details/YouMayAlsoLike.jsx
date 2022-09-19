import React, { useEffect } from 'react'
import { GalleryCard } from "../ListProducts/GalleryCard";
import { useGlobalServices } from '../../hooks/useGlobalServices';
import { useDetailService } from '../../hooks/useDetailService';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export const YouMayAlsoLike =({type}) => {

    const {
        getProductType, details: {productType}
  } = useDetailService();
 
  return (
    <div>
       {productType.length && productType.map((p, index) => {
        if(index >= 5) return <></>;
        else 
        return (
          <div>
            <div key={p.id}>
              <GalleryCard {...p}
              />
            </div>
          </div>
        );
      })} 

      
    </div>
  );


    };
