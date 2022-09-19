import React, { useEffect } from 'react'
import { GalleryCard } from "../ListProducts/GalleryCard";
import { useGlobalServices } from '../../hooks/useGlobalServices';
import { useDetailService } from '../../hooks/useDetailService';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export const YouMayAlsoLike =({type}) => {

    //const {details: {productType}} = useSelector((state) => state);
    const {
        getProductType, details: {productType}
  } = useDetailService();
  
   //useEffect(() => {
    //searchType(type)
    //getProductType(type)
    //productType
    //console.log(productType)
    //infinite, won't get into detail of every suggestion because it keeps on refreshing
    // maybe write all this component straight inside cardDetails?
  //},[productType]) 

    /* useEffect(() => {
       !productType && getProductType

    },[]) */

  return (
    <div>
       {productType.length && productType.map((p, index) => {
        if(index >= 5) return <></>;
        else 
        return (
          <div>
            <Link to={`/details/${p.id}`} key={p.id}>
              <GalleryCard
                name={p.name}
                price={p.price}
                image_link={p.image_link}
                rating={p.rating}
              />
            </Link>
          </div>
        );
      })} 

      
    </div>
  );


    };