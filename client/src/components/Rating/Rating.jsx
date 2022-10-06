import React from "react";
import { useState } from "react";
import "./Rating.css";
import { addRating,getProductById } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

export const Rating = (productId) => {
  const [rating, setRating] = useState(0);

  const handleStars = (e) => {
    setRating(e.target.value);
  };

  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  const navigate = useNavigate();

const dispatch = useDispatch()
//working
  
const handleReview = () => {
  //try setting stars to 0 
 /*  setRating(0) */
  dispatch(addRating(productId.productId, userLogged.id, parseInt(rating)))
  setTimeout(()=> {dispatch(getProductById(productId.productId))
     navigate(`/detail/${productId.productId}`)}, 1000)
  
  }
  console.log(rating)
  const userOrder = useSelector((state)=> state.userOrder)
console.log(userOrder)
  const ProductOrdered = userOrder.map((e)=> e.cart[0].Products[0].id)
        console.log(ProductOrdered)
        const FoundOrder = ProductOrdered.indexOf(productId.productId)
        console.log(FoundOrder != -1)

        
return (
  <div>
  {userLogged && FoundOrder != -1 && userLogged.type != "Banned" && userLogged.type != "Blocked" && (
      <div onChange={(e) => handleStars(e)}>
  <fieldset class="rating">
      <input type="radio" id="star5" name="rating" value="5" />
      <label class="full" for="star5" title="Awesome - 5 stars"></label>
      <input type="radio" id="star4half" name="rating" value="4.5" />
      <label
        class="half"
        for="star4half"
        title="Pretty good - 4.5 stars"
      ></label>
      <input type="radio" id="star4" name="rating" value="4" />
      <label class="full" for="star4" title="Pretty good - 4 stars"></label>
      <input type="radio" id="star3half" name="rating" value="3.5" />
      <label class="half" for="star3half" title="Meh - 3.5 stars"></label>
      <input type="radio" id="star3" name="rating" value="3" />
      <label class="full" for="star3" title="Meh - 3 stars"></label>
      <input type="radio" id="star2half" name="rating" value="2.5" />
      <label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
      <input type="radio" id="star2" name="rating" value="2" />
      <label class="full" for="star2" title="Kinda bad - 2 stars"></label>
      <input type="radio" id="star1half" name="rating" value="1.5" />
      <label class="half" for="star1half" title="Meh - 1.5 stars"></label>
      <input type="radio" id="star1" name="rating" value="1" />
      <label class="full" for="star1" title="Sucks big time - 1 star"></label>
      <input type="radio" id="starhalf" name="rating" value="0.5" />
      <label
        class="half"
        for="starhalf"
        title="Sucks big time - 0.5 stars"
      ></label>
      </fieldset>
    <Button 
    variant="contained" 
    onClick={handleReview}
    size="small"
    sx={{
      bgcolor: "orange",
      ml: "2px",
      align: "middle",
      ":hover": {
        bgcolor: "orange",
        color: "white",
      }}}
    >
    Add Rating
    </Button>
    </div>
      ) }
    </div>
    )
  };
