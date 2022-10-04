import React, { useState } from "react";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Input,
  InputAdornment,
  FormControl,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";

export const BulkEditDiscount = ({ open, onClose, productsSelected }) => {
  const [newDiscount, setnewDiscount] = useState(0);
  const [disableOk, setDisableOk] = useState(true);
  const [error, setError] = useState(false);
  
  const handleChange = (event) => {
  
    setnewDiscount(event.target.value.replace(/^0+/, ''));
    if (event.target.value >= 0 && event.target.value <= 100 && event.target.value.length <= 3) {
      setDisableOk(false);
      setError(false)
    } else {
      setDisableOk(true);
      setError(true)
    }
  };

  const handleCancel = () => {
    onClose();
    setnewDiscount(0);
  };

  const handleOk = () => {
    onClose(parseInt(newDiscount));
    setnewDiscount(0);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Add discount</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, outline: "none", }}>
          <Input
            id="discount-input"
            value={newDiscount}
            onChange={handleChange}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            type="number"
            inputProps={{ max: 100, min: 0 }}
            placeholder="10"
            error={error}
            onKeyDown={ (e) => (e.key === 'e' || e.key === '-' || e.key === '+' || e.key === '.' ) && e.preventDefault() }
          />
          
          
        </FormControl>
        {error && <FormHelperText error id="discount-input-error">Write a number between 0 - 100</FormHelperText>}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={disableOk} onClick={handleOk}>
          Apply discount
        </Button>
      </DialogActions>
    </Dialog>
  );
};
