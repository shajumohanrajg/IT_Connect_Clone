import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import { Button, Card, Stack, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Axios from 'axios';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import Table from './brandtable';

import AddIcon from '@mui/icons-material/Add';
import { Fab, useMediaQuery, useTheme } from '@mui/material';

import { Brandapi } from '../apicomp/Apiurls';
import CustomModal from './CustomModal';
import SuccessAlert from './SuccessAlert';
import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import HeaderCard from './HeaderCard';

const SamplePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setErrorMessage('');
    };

    const handleCloseerror = () => {
        setOpen1(false);
        setErrorMessage('');
    };

    const [loading, setLoading] = useState(false);
    const [swalopen, setSwalOpen] = useState(false);

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [requiredAlert, setRequiredAlert] = useState('');

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

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
        setLoading(true);
        e.preventDefault();
        Axios.post(
            Brandapi,
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
                setLoading(false);

                setResponseMessage('SuccesssFully Brand Created');

                setTimeout(() => {
                    window.location.reload();
                }, 1000);

                console.log(response);
            },
            (error) => {
                setLoading(false);
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

    const handleswalClose = () => {
        setSwalOpen(false);
    };
    return (
        <div>
            <HeaderCard title="Brand" buttonname="Brand" handleOpen={handleOpen} />

            {responseMessage &&
                // <SuccessAlert open={loading} />

                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}
            {/* <CustomModal
                open={modalOpen}
                onClose={handleCloseModal}
                name={name}
                setName={setName}
                status={status}
                setStatus={setStatus}
                handleSubmit={handleModalSubmit}
                avatar="A" // Your avatar value
                title="Modal Title"
                requiredAlert={requiredAlert}
            /> */}
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
                title="Create Brand"
            />

            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <br></br>

            <Table />
        </div>
    );
};

export default withAuth(SamplePage);
