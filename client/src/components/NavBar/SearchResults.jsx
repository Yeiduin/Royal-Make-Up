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
      <div className="absolute bg-white z-50 mt-10 w-full max-h-96 mb-0 ">
        {error && (
          <div>
            <p className="text-center uppercase font-bold ">
              <button onClick={handleClear}>
                <p className="text-lg">X</p>
              </button>
              <br />
              <br />
              We couldn't find <i>{searchTerm}</i>
            </p>
            <div className="mt-10  object-fit bg-white shadow-lg">
              <div className="max-h-96 relative place-self-center overflow-scroll overflow-x-hidden">
                <div>
                  <Gallery productsShown={[]} />
                </div>
              </div>
            </div>
          </div>
        )}

        {!error && (
          <div>
            <p className="text-center uppercase font-bold ">
              <button onClick={handleClear}>
                <p className="text-lg">X</p>
              </button>
              <br />
              <br />
              Search results for: <i>{searchTerm}</i>
            </p>
            <div className="mt-10  object-fit bg-white shadow-lg">
              <div className="max-h-96 relative place-self-center overflow-scroll overflow-x-hidden">
                <div>
                  <Gallery productsShown={searchResults} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};
