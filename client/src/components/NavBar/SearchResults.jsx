import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByName } from "../../redux/actions";
import { Gallery } from "../Gallery/Gallery";

export const SearchResults = ({}) => {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const { searchResults, searchTerm, error } = useSelector((state) => state);

  useEffect(() => {
    if (!searchTerm?.length) setShowSearch(false);
    else setShowSearch(true);
  }, [searchTerm]);

  const handleClear = (e) => {
    setShowSearch(false);
    dispatch(getProductByName(""));
  };

  if (showSearch)
    return (
      <div className="absolute z-50 mt-2 max-h-96 max-w-96">
        {error && (
          <div className="w-screen bg-white">
            <p className="text-center uppercase font-bold ">
              <button onClick={handleClear}>
                <p className="text-lg">X</p>
              </button>
              <br />
              <br />
              We couldn't find <i>{searchTerm}</i>
            </p>
            <div className="mt-10  object-fit bg-white shadow-md mx-32" >
              <div className="max-h-96 relative place-self-center">
                <div>
                  <Gallery productsShown={[]} />
                </div>
              </div>
            </div>
          </div>
        )}

        {!error && (
          <div className="mx-auto w-auto justify-center bg-white">
            <p className="text-center uppercase font-bold mx-auto w-screen">
              <button onClick={handleClear}>
                <p className="text-lg">X</p>
              </button>
              <br />
              <br />
              Search results for: <i>{searchTerm}</i>
            </p>
            <div className="mt-10  object-fit bg-white shadow-md overflow-y-auto mx-32  ">
              <div className="max-h-96 relative place-self-center scroll-smooth">
              <Gallery productsShown={searchResults} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
};
