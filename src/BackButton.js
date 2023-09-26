import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Fab from '@mui/material/Fab';
// BackButton.js
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(-1); // Navigates back to the previous page
    };

    return (
        <Fab color="primary" aria-label="back" size="small" onClick={navigateBack}>
            <ArrowBackIcon sx={{ color: '#fff' }} />
        </Fab>
    );
};

export default BackButton;
