import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { Statusapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import style from '../styles/Boxstyle';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import Table from './statustable';

import AddIcon from '@mui/icons-material/Add';
import { Fab, useMediaQuery, useTheme } from '@mui/material';
import HeaderCard from './HeaderCard';

const SamplePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
        } else {
            console.error('Token not found');
        }
    }, []);

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };

    const navigate = useNavigate();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [visibility, setVisibility] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const userID = localStorage.getItem('id');

            const formData = {
                name,
                status,
                visibility,
                created_by: userID,
                modified_by: userID
            };

            const response = await Axios.post(Statusapi, formData, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            console.log('Form submission successful:', response.data);
            setResponseMessage('SuccesssFully Status Created');
            // setOpen(false);
            // setShowAlert(true);

            setTimeout(() => {
                window.location.reload();
            }, 1000);
            console.log(response);
        } catch (error) {
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
            console.error('Form submission failed:', error);
        }
    };

    // useEffect(() => {
    //     if (showAlert) {
    //         Swal.fire({
    //             title: 'Success',
    //             text: responseMessage,
    //             icon: 'success',
    //             confirmButtonText: 'OK'
    //         }).then(() => {
    //             // Sweet alert has been closed, reset the responseMessage and showAlert state
    //             setResponseMessage('');
    //             setShowAlert(false);
    //         });
    //     }
    // }, [showAlert, responseMessage]);

    return (
        <div>
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            {responseMessage &&
                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}

            <HeaderCard title="Status" buttonname="Status" handleOpen={handleOpen} />

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.Button} sx={{ bgcolor: '#1a5f7a', color: 'white' }}>
                                        S
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h3">Create Status</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                label="Name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                variant="outlined"
                                className={classes.input}
                                InputLabelProps={{
                                    classes: {
                                        focused: classes.label
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12} xl={12}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="status-select-label">
                                    Status
                                </InputLabel>
                                <Select
                                    labelid="status-select-label"
                                    id="status-select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    label="Status"
                                >
                                    <MenuItem value="" disabled>
                                        Select a Status
                                    </MenuItem>
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="visibility-select-label">
                                    Visibility
                                </InputLabel>
                                <Select
                                    labelid="visibility-select-label"
                                    id="visibility"
                                    value={visibility}
                                    onChange={(e) => setVisibility(e.target.value)}
                                    label="Visibility"
                                >
                                    <MenuItem value="" disabled>
                                        Select For Visibility
                                    </MenuItem>
                                    <MenuItem value="Vendor">Vendor</MenuItem>
                                    <MenuItem value="Assets">Assets</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                                {/* Wrap the Button component in an array */}
                                <Button className={classes.Button} variant="contained" onClick={handleSubmit}>
                                    Create
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <br></br>
            <Table />
        </div>
    );
};

export default withAuth(SamplePage);
