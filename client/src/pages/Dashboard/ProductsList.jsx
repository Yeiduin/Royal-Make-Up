import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, searchProductDashboard } from "../../redux/actions";
import { Link } from "react-router-dom";
import { ProductCardDashboard } from "./ProductCardDashboard";


export const ProductsList = () => {
const dispatch = useDispatch()
    const {dashboardProducts, error} = useSelector(state=>state)
    
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
        dispatch(searchProductDashboard(e.target.value))
    }

useEffect(()=>{
    dispatch(getProducts())
}, [dispatch])

return(
    
    <div className="ml-80 mt-20">
       <div >
        <input type='text' placeholder='Search' value={searchTerm} onChange={handleChange}/>
        <button value={""} onClick={handleChange}>X</button>
        </div>

<div className="overflow-x-auto relative">
{error ? (
          <p >
            No matches found, please try another combination
          </p>
          
        ) : (<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="py-3">Product</th>
      <th scope="col" className="py-3">Price</th>
      <th scope="col" className="py-3">Discount</th>
      <th scope="col" className="py-3">Final price</th>
      <th scope="col" className="py-3">Stock</th>
      <th scope="col" className="py-3">Edit</th>
    </tr>
  </thead>
  
  <tbody>
  {dashboardProducts?.map((p, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <ProductCardDashboard {... p} />
                </tr>
            ))}
  </tbody>
  
</table>)}




      {/* <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-5xl lg:px-6">
        {products[0] === "notfound" ? (
          <p className="text-center">
            Sorry! No matches found, please try another combination       
          </p>
          
        ) : (
          <div className="">
            {products?.map((p, index) => (
              <Link
                to={`/detail/${p.id}`}
                key={index}
                onClick={() => handleClick()}
              >
                <ProductCardDashboard {...p} />
              </Link>
            ))}
          </div>
        )}
      </div>
     */}
     </div>
     
    </div>

)

}
