import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import CustomModal from './CustomModal';


const [showDialog, setShowDialog] = useState(false);
const [statusCode, setStatusCode] = useState(null);
const [requiredAlert, setRequiredAlert] = useState('');


const handleDialogClose = () => {
    setShowDialog(false);
    setStatusCode(null); // Reset the status code when the dialog is closed
};


if (!name || !status) {
    // Display an error message or perform any other validation logic
    setRequiredAlert('Please fill all mandatory fields.');

    return;
}

if (error.response) {
    const statusCode = error.response.status;
    // const errorMessage = error.response.data.message;

    // setErrorMessage(`Error (${statusCode}): ${errorMessage}`);

    // Check for specific error status codes and show the dialog box accordingly
    if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
        setStatusCode(statusCode); // Set the status code to display the appropriate dialog
        setOpen(false);
        setShowDialog(true);
    } else {
        // Handle other error codes with appropriate alerts
        alert('An unexpected error occurred. Please try again later.');
    }
} else {
    // Handle other unexpected errors with a generic alert
    alert('An unexpected error occurred. Please try again later.');
}
           
<CustomModal
open={open}
onClose={handleClose}
name={name}
setName={setName}
status={status}
setStatus={setStatus}
handleSubmit={handleSubmit}
requiredAlert={requiredAlert}
avatar="c" // Custom avatar text
title="Create Class" // Custom title for ListItemText
/>

            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />