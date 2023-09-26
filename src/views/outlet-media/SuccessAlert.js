import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SuccessAlert = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <CheckCircleIcon sx={{ color: 'green', fontSize: 48 }} />
                Success!
            </DialogTitle>
            <DialogContent>Your operation was successful.</DialogContent>
        </Dialog>
    );
};

export default SuccessAlert;
