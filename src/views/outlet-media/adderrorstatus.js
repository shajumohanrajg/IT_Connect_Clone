import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

const [showDialog, setShowDialog] = useState(false);
const [statusCode, setStatusCode] = useState(null);

const handleDialogClose = () => {
    setShowDialog(false);
    setStatusCode(null);
};

if (error.response) {
    const statusCode = error.response.status;

    if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
        setStatusCode(statusCode);
        // setOpen(false);
        setSelectedRowId(false);
        setOpenModal(false);
        setOpenDialog(false);
        setShowDialog(true);
    } else {
        alert('An unexpected error occurred. Please try again later.');
    }
} else {
    alert('An unexpected error occurred. Please try again later.');
}

<DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
