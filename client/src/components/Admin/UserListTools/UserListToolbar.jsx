import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
import { Iconify } from '../SharedTools/Iconify';
import { deleteUser, getUsers } from '../../../redux/actions';
import { DeleteWarning } from './DeleteWarning';


// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------
export const UserListToolbar = ({ numSelected, filterName, onFilterName, usersSelected }) => { 
  const dispatch = useDispatch()

// ---- Warning message
const [openDeleteWarning, setOpenDeleteWarning] = useState(false);

  const handleOpenWarning = () => {
    setOpenDeleteWarning(true);
  }
  const handleCloseWarning = (users) => {
    setOpenDeleteWarning(true)
    if (users) {
      handleDelete(users)
      setTimeout(() => {
        dispatch(getUsers()) 
      }, 500);  
    }
    setOpenDeleteWarning(false);
    
  };

  // ---- DELETE
  const handleDelete = (usersSelected) => {
    if(Array.isArray(usersSelected)){
      usersSelected.forEach(user => dispatch(deleteUser(user)))
      dispatch(getUsers())
    }
    dispatch(deleteUser(usersSelected))
    dispatch(getUsers())
  }

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'black',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1" sx={{
            fontWeight: 'bold',
          }}>
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={() => handleOpenWarning()}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      )}
      <DeleteWarning
          id="delete-warning"
          keepMounted
          open={openDeleteWarning}
          onClose={handleCloseWarning}
          usersSelected={usersSelected}
        />
    </RootStyle>
    
  );
}