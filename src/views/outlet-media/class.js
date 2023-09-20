import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import { Button } from '@mui/material';
import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { Classapi } from '../apicomp/Apiurls';
import CustomList from '../headers/headercard';
import CustomCard from '../headers/HeaderCustomCard';
// import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authSelectors';
import DialogBox from './DialogBox';
import Table from './classtable';

import AddIcon from '@mui/icons-material/Add';
import { Fab, useMediaQuery, useTheme } from '@mui/material';
import CustomModal from './CustomModal';

const SamplePage = () => {
    const theme = useTheme();
    // const token1 = useSelector((state) => state.auth.token);
    // eslint-disable-next-line prettier/prettier
    const token = useSelector((state) => state.customization.token);

    console.log(token);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [requiredAlert, setRequiredAlert] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const authToken = useSelector(selectAuthToken);
    //console.log('token', authToken);

    const handleSubmit = (e) => {
        // const token = localStorage.getItem('token');
        // const userID = localStorage.getItem('id');

        if (!name || !status) {
            setRequiredAlert('Please fill all mandatory fields.');

            return;
        }
        e.preventDefault();
        Axios.post(
            Classapi,
            {
                name: name,
                status: status,
                created_by: 1,
                modified_by: 1
            },
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
        ).then(
            (response) => {
                setResponseMessage('SuccesssFully Class Created');

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
                    alert('An unexpected error occurred. Please try again laterr.');
                }

                console.log(error);
            }
        );
    };
    return (
        <div>
            <CustomCard>
                <CustomList icon={<StoreOutlinedIcon />} text="Class Management" iconColor="#ffffff" variant="h3" />
                {isMobile ? (
                    <Fab color="primary" aria-label="add" size="medium" className={classes.fabbutton} onClick={handleOpen}>
                        <AddIcon sx={{ color: 'white' }} />
                    </Fab>
                ) : (
                    <Button className={classes.Button} variant="contained" onClick={handleOpen} startIcon={<AddCircleOutlinedIcon />}>
                        Class
                    </Button>
                )}
            </CustomCard>

            {responseMessage &&
                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}
            <CustomModal
                open={open}
                onClose={handleClose}
                name={name}
                setName={setName}
                status={status}
                setStatus={setStatus}
                handleSubmit={handleSubmit}
                requiredAlert={requiredAlert}
                avatar="c"
                title="Create Class"
            />

            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <br></br>
            <Table />
        </div>
    );
};

export default SamplePage;
