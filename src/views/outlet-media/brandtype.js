import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import { Button, Card, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { BrandTypeapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import Table from './brandtypetable';

import AddIcon from '@mui/icons-material/Add';
import { Fab, useMediaQuery, useTheme } from '@mui/material';
import CustomModal from './CustomModal';
import HeaderCard from './HeaderCard';

const SamplePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);
    const [requiredAlert, setRequiredAlert] = useState('');

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };
    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        if (!name || !status) {
            setRequiredAlert('Please fill all mandatory fields.');

            return;
        }
        e.preventDefault();
        Axios.post(
            BrandTypeapi,
            {
                name: name,
                status: status,
                created_by: userID,
                modified_by: userID
            },
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
        ).then(
            (response) => {
                setResponseMessage('SuccesssFully Brand Type Created');

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                console.log(response);
            },
            (error) => {
                if (error.response) {
                    const statusCode = error.response.status;

                    if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                        setStatusCode(statusCode);
                        setOpen(false);
                        setShowDialog(true);
                    } else {
                        alert('An unexpected error occurred. Please try again later.');
                    }
                } else {
                    alert('An unexpected error occurred. Please try again later.');
                }
                console.log(error);
            }
        );
    };
    return (
        <div>
            {responseMessage &&
                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}
            <HeaderCard title="Branding Type" buttonname="Brand Type" handleOpen={handleOpen} />

            <CustomModal
                open={open}
                onClose={handleClose}
                name={name}
                setName={setName}
                status={status}
                setStatus={setStatus}
                handleSubmit={handleSubmit}
                requiredAlert={requiredAlert}
                avatar="B"
                title="Create Brand Type"
            />

            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <br></br>
            <Table />
        </div>
    );
};

export default withAuth(SamplePage);
