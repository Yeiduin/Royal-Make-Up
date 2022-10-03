import React, { useState, useRef } from "react";
import { changeUserType, deleteUser, getUsers } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { ChangeUserType } from "./ChangeUserType";
import { DeleteWarning } from "./DeleteWarning";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Iconify } from "./Iconify";

export const UserMoreMenu = ({ userId, type, username }) => {
  const dispatch = useDispatch();
  
  // ------ DOTS MENU -------
  // Determina dónde se abre el menú:
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // -----  DELETE USER ------
  const [openDeleteWarning, setOpenDeleteWarning] = useState(false);

  const handleOpenWarning = () => {
    setIsOpen(false);
    setOpenDeleteWarning(true);
  };
  const handleCloseWarning = (userId) => {
    setOpenDeleteWarning(true);
    if (userId) {
      handleDelete(userId);
      setTimeout(() => {
        dispatch(getUsers());
      }, 500);
    }
    setOpenDeleteWarning(false);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
    dispatch(getUsers());
  };

  // -----  CHANGE USER TYPE ------
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState(type);

  const handleClickListItem = () => {
    setOpenDialog(true);
    setIsOpen(false);
  };
  const handleClose = (newValue) => {
    if (newValue) {
      setValue(newValue);
      dispatch(changeUserType({ userId: userId, type: newValue }));
      setTimeout(() => {
        dispatch(getUsers());
      }, 500);
    }
    setOpenDialog(false);
  };

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
            primary="Delete user"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={() => handleClickListItem(userId)}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Change user status"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
      <ChangeUserType
        id="ringtone-menu"
        keepMounted
        open={openDialog}
        onClose={handleClose}
        value={value}
      />
      <DeleteWarning
        id="ringtone-menu"
        keepMounted
        open={openDeleteWarning}
        onClose={handleCloseWarning}
        userId={userId}
        username={username}
      />
    </>
  );
}
