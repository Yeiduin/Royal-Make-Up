import React, { useState, useRef } from "react";
import { editProduct, deleteUser, getUsers } from "../../../redux/actions";
import { useDispatch } from "react-redux";
// import { DeleteWarning } from "./DeleteWarning";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Iconify } from "../Iconify";
import { useNavigate } from "react-router-dom";

export const ProductMoreMenu = ({ id, product }) => {
  const dispatch = useDispatch();
  
  // ------ DOTS MENU -------
  // Determina dónde se abre el menú:
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // -----  DELETE USER ------
//   const [openDeleteWarning, setOpenDeleteWarning] = useState(false);

//   const handleOpenWarning = () => {
//     setIsOpen(false);
//     setOpenDeleteWarning(true);
//   };
//   const handleCloseWarning = (userId) => {
//     setOpenDeleteWarning(true);
//     if (userId) {
//       handleDelete(userId);
//       setTimeout(() => {
//         dispatch(getUsers());
//       }, 500);
//     }
//     setOpenDeleteWarning(false);
//   };

//   const handleDelete = (userId) => {
//     dispatch(deleteUser(userId));
//     dispatch(getUsers());
//   };

  // -----  EDIT ------
  const navigate = useNavigate()
  const handleEdit = (id) => {
    navigate(`/editproduct/${id}`)
  }

  // ---- HIDE PRODUCT ----
  const handleHide = (id) => {
    console.log(product)
      product.disable = !product.disable;
      const data={id:id, newProduct: product}
      dispatch(editProduct(data))
      setIsOpen(false);
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={() => handleOpenWarning()}
        >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={() => handleEdit(id)}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={() => handleHide(id)}
        >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={product.disable ? "Show product" : "Hide Product"}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

      </Menu>
      {/* 
      <DeleteWarning
        id="menu"
        keepMounted
        open={openDeleteWarning}
        onClose={handleCloseWarning}
        userId={userId}
        username={username}
      /> */}
    </>
  );
}
