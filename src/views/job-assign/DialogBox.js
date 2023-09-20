// DialogBox.js
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({ open, onClose, statusCode }) => {
    let title = 'Error';
    let message = 'An unexpected error occurred. Please try again later.';

    // Customize the dialog title and message based on the status code
    if (statusCode === 403) {
        title = 'Access Denied';
        message = "You don't have access for this module.";
    } else if (statusCode === 400) {
        title = 'Bad Request';
        message = 'Bad request. Please check your data and try again.';
    } else if (statusCode === 404) {
        title = 'Resource Not Found';
        message = 'Resource not found. Please check the URL or try again later.';
    }

    return (
        <Dialog open={open} onClose={onClose} TransitionComponent={Transition} keepMounted>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {message} - <strong>check it out!</strong>
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogBox;
