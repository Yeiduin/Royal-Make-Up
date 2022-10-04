import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';


export const DeleteWarning = ({open, onClose, productId, productName, productsSelected}) => {
  
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!open) {
      if(productsSelected?.length && Array.isArray(productsSelected)){
        setValue(productsSelected)
      } else if(productsSelected?.length && typeof productsSelected === "string"){
        setValue(productsSelected)
      } else {setValue(productId);}
      
    }
  }, [productId, productsSelected, open]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      {productsSelected?.length 
      ? <DialogTitle>Are your sure you want to delete {productsSelected.length} {productsSelected?.length === 1 ? "product" : "products"}?</DialogTitle> 
      : <DialogTitle>Are your sure you want to delete the product <span className="font-bold">{productName}</span>?</DialogTitle>}
      <DialogContent>
      This action is irreversible!
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}