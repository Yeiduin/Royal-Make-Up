import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
import { Iconify } from '../SharedTools/Iconify';
import { deleteProduct, editProduct, getProducts } from '../../../redux/actions';
import { DeleteWarning } from './DeleteWarning';
import { BulkEditDiscount } from './BulkEditDiscount';


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
export const ProductListToolbar = ({ numSelected, filterName, onFilterName, productsSelected }) => { 
  const dispatch = useDispatch()

  // ---- DELETE
  // const handleDelete = (productsSelected) => {
  //   if(Array.isArray(productsSelected)){
  //     productsSelected.forEach(p => dispatch(deleteProduct(p)))
  //     dispatch(getProducts())
  //   }
  //   dispatch(deleteProduct(productsSelected))
  //   dispatch(getProducts())
  // }

  // ---- Warning message
// const [openDeleteWarning, setOpenDeleteWarning] = useState(false);

// const handleOpenWarning = () => {
//   setOpenDeleteWarning(true);
// }
// const handleCloseWarning = (products) => {
//   setOpenDeleteWarning(true)
//   if (products) {
//     handleDelete(products)
//     setTimeout(() => {
//       dispatch(getProducts()) 
//     }, 500);  
//   }
//   setOpenDeleteWarning(false);
  
// };

  // ---- DISCOUNT
  const [openEditDiscount, setOpenEditDiscount] = useState(false);

  const openBulkEditDiscount = () => {
    setOpenEditDiscount(true);
  }

  const closeBulkEditDiscount = (newDiscount) => {
    setOpenEditDiscount(true)
    if (newDiscount) {
      handleDiscountEdit(newDiscount)
      setTimeout(() => {
        dispatch(getProducts()) 
      }, 500);  
    }
    setOpenEditDiscount(false);
    
  };

  const handleDiscountEdit = (newDiscount) => {
      productsSelected.forEach(id => {
        console.log("newdiscount- -->" + newDiscount)
        const data = {id: id, newProduct: {discount: newDiscount}}
        dispatch(editProduct(data))
      })
  }

  // --- DISABLE

  const handleDisable = () => {
    productsSelected.forEach(id => {
      const data = {id: id, newProduct: {disable: true}}
      dispatch(editProduct(data))
    })
    setTimeout(() => {
      dispatch(getProducts()) 
    }, 500); 
  }

  // ---- ENABLE

  const handleEnable = () => {
    productsSelected.forEach(id => {
      const data = {id: id, newProduct: {disable: false}}
      dispatch(editProduct(data))
    })
    setTimeout(() => {
      dispatch(getProducts()) 
    }, 500);  
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
          placeholder="Search product..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 && (
        <div>
        
        <Tooltip title="Add Discount">
          <IconButton onClick={() => openBulkEditDiscount()}>
            <Iconify icon="nimbus:discount-circle" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Disable">
          <IconButton onClick={() => handleDisable()}>
            <Iconify icon="fluent:presence-blocked-10-regular" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Enable">
          <IconButton onClick={() => handleEnable()}>
            <Iconify icon="fluent:presence-available-10-regular" />
          </IconButton>
        </Tooltip>

        {/* <Tooltip title="Delete">
          <IconButton onClick={() => handleOpenWarning()}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip> */}


        
        </div>
      )}
      {/* <DeleteWarning
          id="delete-warning"
          keepMounted
          open={openDeleteWarning}
          onClose={handleCloseWarning}
          productsSelected={productsSelected}
        /> */}
      <BulkEditDiscount
          id="edit-discount"
          keepMounted
          open={openEditDiscount}
          onClose={closeBulkEditDiscount}
          productsSelected={productsSelected}
        />
    </RootStyle>
    
  );
}