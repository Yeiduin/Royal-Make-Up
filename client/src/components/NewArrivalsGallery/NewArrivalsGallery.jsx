import React from "react";
import { Link } from "react-router-dom";
import { NewArrivalsCard } from "../NewArrivalsCard/NewArrivalsCard";

export const NewArrivalsGallery = ({ newArrivals }) => {
  return (
    <div className="flex flex-wrap my-2">
      <div className="flex flex-wrap gap-5 justify-center md:grid md:grid-cols-2 md:gap-10 lg:flex lg:flex-wrap lg:justify-between">
        {/* <div className="grid grid-cols-1 gap-y-10 gap-x-24 sm:grid-cols-2 lg:grid-cols-3"> */}
          {newArrivals?.map((p, index) => {
            return (
              <div className="cursor-pointer" key={index}>
               
                  <NewArrivalsCard {...p} />
     
              </div>
            );
          })}
        {/* </div> */}
      </div>
    </div>
  );
};
