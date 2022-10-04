import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Input from '@mui/material/Input  ';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';  
import TextField from '@mui/material/TextField';  

export const BulkEditDiscount = ({open, onClose, productsSelected}) => {
    const [newDiscount, setnewDiscount] = useState('');
    
    const handleChange = (event) => {
        setnewDiscount(event.target.value);
      };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(parseInt(newDiscount));
  };
    
    
    return (
        <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      
      <DialogTitle>Add discount</DialogTitle> 
      <DialogContent>
      <FormControl sx={{ m: 1, outline: 'none' }} variant="outlined">
      <Input
            id="discount-input"
            value={newDiscount}
            onChange={handleChange}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            type="number"
            inputProps={{ pattern: '[0-9]*' }}
          />
          </FormControl>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Apply discount</Button>
      </DialogActions>
    </Dialog>
    )
}