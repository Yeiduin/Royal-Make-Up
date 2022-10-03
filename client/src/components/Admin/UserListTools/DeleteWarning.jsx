import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';


export const DeleteWarning = ({open, onClose, userId, username, usersSelected}) => {
  
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!open) {
      if(usersSelected?.length && Array.isArray(usersSelected)){
        setValue(usersSelected)
      } else if(usersSelected?.length && typeof usersSelected === "string"){
        setValue(usersSelected)
      } else {setValue(userId);}
      
    }
  }, [userId, usersSelected, open]);

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
      {usersSelected?.length 
      ? <DialogTitle>Are your sure you want to delete {usersSelected.length} {usersSelected?.length === 1 ? "user" : "users"}?</DialogTitle> 
      : <DialogTitle>Are your sure you want to delete the user <span className="font-bold">{username}</span>?</DialogTitle>}
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