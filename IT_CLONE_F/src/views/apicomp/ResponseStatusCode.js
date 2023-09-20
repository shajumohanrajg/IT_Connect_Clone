import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    success: {
        color: theme.palette.success.main
    },
    error: {
        color: theme.palette.error.main
    },
    info: {
        color: theme.palette.info.main
    }
}));

const ResponseStatusCode = ({ code }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleStatusCodeClick = (code) => {
        if (code === 404) {
            navigate('/404');
        }
    };

    let colorClass = classes.info;
    if (code >= 200 && code < 300) {
        colorClass = classes.success;
    } else if (code >= 400) {
        colorClass = classes.error;
    }

    return (
        <Typography className={colorClass} variant="body1" onClick={() => handleStatusCodeClick(code)} style={{ cursor: 'pointer' }}>
            Response Status Code: {code}
        </Typography>
    );
};

export default ResponseStatusCode;
