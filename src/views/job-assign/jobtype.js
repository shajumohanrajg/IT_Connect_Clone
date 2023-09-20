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

import ApiComponent from '../apicomp/ApiComponent';
import { JobForapi, JobTypeapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import style from '../styles/Boxstyle';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import Table from './jobtypetable';

import AddIcon from '@mui/icons-material/Add';
import { Fab, useMediaQuery, useTheme } from '@mui/material';

const SamplePage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState([]);
    const [photo, setPhoto] = useState([]);
    const [photo1, setPhoto1] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };

    function getPhoto(event) {
        setPhoto(URL.createObjectURL(event.target.files[0]));
        setPhoto1(event.target.files[0]);
    }
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleImagesChange = (event) => {
        setImages(event.target.files);
    };

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [jobfor, setJobfor] = useState([]);
    const [jobforvalue, setJobforvalue] = useState('');

    useEffect(() => {
        const handleDataFetched = (data) => {
            setJobfor(data);
        };

        return () => {
            setJobfor([]);
        };
    }, []);

    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        e.preventDefault();
        Axios.post(
            JobTypeapi,
            {
                name: name,
                status: status,
                jobfor: jobforvalue,
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
                setResponseMessage('SuccesssFully Job Type Created');

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
                        setOpen(false);
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
            <ApiComponent apiUrl={JobForapi} onDataFetched={setJobfor} />
            {responseMessage &&
                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}

            <Card sx={{ width: '100%', boxShadow: 0 }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
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
                                    Job Type Management
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    {isMobile ? (
                        <Fab color="primary" aria-label="add" size="medium" className={classes.fabbutton} onClick={handleOpen}>
                            <AddIcon sx={{ color: 'white' }} />
                        </Fab>
                    ) : (
                        <Button className={classes.Button} variant="contained" onClick={handleOpen} startIcon={<AddCircleOutlinedIcon />}>
                            Job Type
                        </Button>
                    )}
                </Stack>
            </Card>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.Button} sx={{ bgcolor: '#1a5f7a', color: 'white' }}>
                                        J
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h3">Create Job Type</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                        <Grid item xs={12} md={12} xl={12}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="jobfor-select-label">
                                    Job For
                                </InputLabel>
                                <Select
                                    labelid="jobfor-select-label"
                                    id="jobfor-select"
                                    value={jobforvalue}
                                    onChange={(e) => setJobforvalue(e.target.value)}
                                    label="Job For"
                                >
                                    <MenuItem value="">
                                        <em>Select Job For</em>
                                    </MenuItem>
                                    {jobfor && jobfor !== undefined
                                        ? jobfor.map((option, index) => (
                                              <MenuItem key={index} value={option.id}>
                                                  {option.name}
                                              </MenuItem>
                                          ))
                                        : 'No Data'}
                                </Select>
                            </FormControl>
                        </Grid>
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
                                    <MenuItem value="">
                                        <em>Select a Status</em>
                                    </MenuItem>
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                                {' '}
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
