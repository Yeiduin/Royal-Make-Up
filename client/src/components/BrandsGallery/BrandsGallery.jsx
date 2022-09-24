import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDefaultFilter } from "../../redux/actions";


export const BrandsGallery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const mainBrands = {
    // glossier:
    //   "https://i.pinimg.com/originals/56/91/75/5691750f7d6a859381be4c7104f7c2d5.jpg",
    // clinique: "https://cdn.worldvectorlogo.com/logos/clinique.svg",
    fenty: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDb9ifTWoIE5ENvbZ4ArIuoYziiUcqXSvVQ3iLTHsBREpSSX6oyL_BXNS8qIROpaE-4SQ&usqp=CAU",
    dior: "https://optica-optima.com/blog/wp-content/uploads/2019/05/dior-historia-logo.jpg",
    nyx: "https://cdn.lovesavingsgroup.com/logos/nyx-professional-makeup.jpeg",
  };

  const handleClick = (brand) => {
    dispatch(setDefaultFilter(brand))
    navigate("/catalogue");
  };
  return (
    <div className="space-x-5 flex justify-start pb-20">
      {Object.entries(mainBrands).map((b, index) => {
        return (
          <div
            key={index}
            className="bg-terceary shadow-md bg-contain bg-no-repeat bg-center w-36 h-44 rounded-2xl"
          >
            <img
              src={b[1]}
              alt="brand"
              onClick={() => handleClick(b[0])}
              className="h-full w-full rounded-2xl object-contain object-center cursor-pointer"
            />
          </div>
        );
      })}
    </div>
  );
};
