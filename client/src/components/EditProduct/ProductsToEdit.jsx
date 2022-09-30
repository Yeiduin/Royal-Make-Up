import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
import EditCard from "./editCard";

const ProductsToEdit = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { products } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const products2 =
    search === ""
      ? products
      : products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );

  function handleChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  return (
    <div className="container">
      <input type="search" className="mx-0" onChange={handleChange}></input>
      <div className="container bg-yellow-200 p-6 mx-auto grid grid-cols-7 col-span-1 gap- rounded-xl">
        <h6 className="bg-yellow-200">Product</h6>
        <h6>Name</h6>
        <h6>Price</h6>
        <h6>Discount</h6>
        <h6>Stock</h6>
        <h6>Edit</h6>
        <h6>State</h6>
      </div>

      {products2.map((p, i) => (
        <EditCard
          key={i}
          name={p.name}
          image={p.image}
          price={p.price}
          id={p.id}
          stock={p.stock}
          discount={p.discount}
        ></EditCard>
      ))}
    </div>
  );
};

export default ProductsToEdit;
