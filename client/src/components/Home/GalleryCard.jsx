import React from "react";

export const GalleryCard = ({ name, price, image_link, rating, discounted }) => {
  return (
    <div className="group">
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden xl:aspect-w-7 xl:aspect-h-8 ">
      <img
        src={image_link}
        alt="product"    
        onError={(e) => {
          e.target.src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-index-makeup-essentials-1645556621.jpg?crop=0.444xw:0.888xh;0.260xw,0.0673xh&resize=640:*"
        }}
        className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-xl bg-tertiary"
      />
     </div>
        <h2 className="mt-4 text-sm text-primary uppercase">{name}</h2>
      
      {discounted 
      ? (<h5 className="text-sm text-secondary"><span className="line-through">${price}</span><span className="font-bold text-base"> ${discounted}</span></h5>) 
      : (<h5 className="text-secondary text-sm">${price}</h5>)
      }
      
        {/* <h5 >{rating}</h5> */}
      </div>
   
  );
};
