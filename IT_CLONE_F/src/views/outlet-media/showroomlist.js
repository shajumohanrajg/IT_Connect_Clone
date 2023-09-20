import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import { Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import BackButton from 'BackButton';

import { Showroomapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

const SamplePage = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState('');
    const [rsm, setRsm] = useState('');
    const [asm, setAsm] = useState('');
    const [manager, setManager] = useState('');
    const [cugNo, setCugNo] = useState('');
    const [landline, setLandline] = useState('');
    const [email, setEmail] = useState('');
    const [region, setRegion] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        e.preventDefault();
        Axios.post(
            Showroomapi,
            {
                name: name,
                rsm: rsm,
                asm: asm,
                manager: manager,
                cug_no: cugNo,
                landline: landline,
                e_mail: email,
                region: region,
                state: state,
                address: address,
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
                setResponseMessage('SuccesssFully Showrooms Created');

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                console.log(response);

                console.log(response);
            },
            (error) => {
                if (error.response) {
                    const statusCode = error.response.status;

                    if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                        setStatusCode(statusCode);
                        // setOpen(false);
                        // setSelectedRowId(false);
                        // setOpenModal(false);
                        // setOpenDialog(false);
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
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />

            <Card sx={{ width: '100%', boxShadow: 0 }}>
                {responseMessage &&
                    Swal.fire({
                        title: 'success',
                        text: responseMessage,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })}
                <Stack
                    direction={{ xs: 'row', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ padding: 1 }}
                >
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ background: 'linear-gradient(to right bottom, #fb6340, #fbb140)' }}>
                                    <StoreOutlinedIcon sx={{ color: 'white' }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                {' '}
                                <Typography variant="h3" sx={{ color: '#444444' }}>
                                    Showrooms
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <BackButton />
                </Stack>
            </Card>
            <br></br>
            <Card sx={{ width: '100%', boxShadow: 0, p: 5 }}>
                <Box>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="Showroom Name"
                                id="name"
                                name="name"
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
                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="Rsm"
                                id="rsm"
                                name="rsm"
                                value={rsm}
                                onChange={(e) => setRsm(e.target.value)}
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
                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="Asm"
                                id="asm"
                                name="asm"
                                value={asm}
                                onChange={(e) => setAsm(e.target.value)}
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
                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="Manager"
                                id="manager"
                                name="manager"
                                value={manager}
                                onChange={(e) => setManager(e.target.value)}
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
                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="CUG No"
                                id="cug_no"
                                name="cug_no"
                                value={cugNo}
                                onChange={(e) => setCugNo(e.target.value)}
                                fullWidth
                                type="number"
                                variant="outlined"
                                className={classes.input}
                                InputLabelProps={{
                                    classes: {
                                        focused: classes.label
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="Landline"
                                id="landline"
                                name="landline"
                                value={landline}
                                onChange={(e) => setLandline(e.target.value)}
                                fullWidth
                                type="tel"
                                variant="outlined"
                                className={classes.input}
                                InputLabelProps={{
                                    classes: {
                                        focused: classes.label
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="Email"
                                id="e_mail"
                                name="e_mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                type="email"
                                variant="outlined"
                                className={classes.input}
                                InputLabelProps={{
                                    classes: {
                                        focused: classes.label
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="Region"
                                id="region"
                                name="region"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
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

                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="State"
                                id="state"
                                name="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
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
                        <Grid item xs={12} md={6} xl={12}>
                            <TextField
                                label="Address"
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                fullWidth
                                multiline={true}
                                rows={4}
                                variant="outlined"
                                className={classes.input}
                                InputLabelProps={{
                                    classes: {
                                        focused: classes.label
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                                {' '}
                                <Button
                                    className={classes.Button}
                                    variant="contained"
                                    onClick={handleSubmit}
                                    startIcon={<FileUploadOutlinedIcon />}
                                >
                                    Add
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </div>
    );
};

export default withAuth(SamplePage);
