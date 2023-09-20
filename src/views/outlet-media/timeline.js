import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import { Button } from '@mui/material';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
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
import { Fab, useMediaQuery, useTheme, Box, Grid, Stack, Card } from '@mui/material';
import CustomModal from './CustomModal';
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
// import Box from '@mui/material/Box';
// import { TimePicker } from '@mui/lab';
// import { AdapterDateFns } from '@mui/x-date-pickers'; // Correct import path
// import { LocalizationProvider } from '@mui/x-date-pickers';
import LocationComponent from './LocationComponent';
import HistoryIcon from '@mui/icons-material/History';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import OrderTimeline from './timeline2';
import MapComponent from './MapComponent';

const SamplePage = () => {
    const theme = useTheme();
    // const token1 = useSelector((state) => state.auth.token);
    // eslint-disable-next-line prettier/prettier
    const token = useSelector((state) => state.customization.token);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        }, 1000); // Update every second

        return () => {
            clearInterval(intervalId);
        };
    }, []);

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
    const [currentTab, setCurrentTab] = useState('checkIn');
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const checkedin = '11:45 AM';

    const handleTabClick = (tab) => {
        setCurrentTab(tab);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleCheckInTimeChange = (time) => {
        setCheckInTime(time);
    };

    const handleCheckOutTimeChange = (time) => {
        setCheckOutTime(time);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const handleSave = () => {
        // You can perform save logic here, e.g., sending the data to a backend API.
        console.log('Check-in Time:', checkInTime);
        console.log('Check-out Time:', checkOutTime);
        console.log('Location:', location);
        console.log('Notes:', notes);
    };
    const latitude = 51.505;
    const longitude = -0.09;
    return (
        <div>
            <CustomCard>
                <CustomList icon={<StoreOutlinedIcon />} text="Time Management" iconColor="#ffffff" variant="h3" />
                {/* {isMobile ? (
                    <Fab color="primary" aria-label="add" size="medium" className={classes.fabbutton} onClick={handleOpen}>
                        <AddIcon sx={{ color: 'white' }} />
                    </Fab>
                ) : (
                    <Button className={classes.Button} variant="contained" onClick={handleOpen} startIcon={<HistoryIcon />}>
                        Timeline
                    </Button>
                )} */}
            </CustomCard>

            {responseMessage &&
                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}

            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <br></br>
            <Card sx={{ gap: 2, p: 2 }}>
                <Grid container spacing={2} direction="row">
                    {isMobile ? (
                        <Fab color="primary" aria-label="add" size="medium" className={classes.fabbutton} href="/timelinemob">
                            <HistoryIcon sx={{ color: 'white' }} />
                        </Fab>
                    ) : (
                        <Grid item sm={12} xs={12} md={6} lg={4}>
                            <Card sx={{ width: '100%', my: 0, border: '1px solid #ebebeb', height: '100%' }}>
                                <List>
                                    <ListItem>
                                        <ListItemText>
                                            {' '}
                                            <Typography variant="h5" sx={{ color: '#ff8b3d', fontWeight: 'bold' }}>
                                                Your Timeline
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                </List>
                                <Card sx={{ boxShadow: 0, p: 2, borderTop: '1px solid #ebebeb', height: '100%' }}>
                                    <OrderTimeline />
                                </Card>
                            </Card>
                        </Grid>
                    )}

                    <Grid item sm={12} xs={12} md={6} lg={4}>
                        <Card sx={{ width: '100%', my: 0, border: '1px solid #ebebeb', height: '100%' }}>
                            <List>
                                <ListItem>
                                    <ListItemText>
                                        {' '}
                                        <Typography variant="h5" sx={{ color: '#ff8b3d', fontWeight: 'bold' }}>
                                            Check In - Check Out
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            </List>
                            <Card sx={{ boxShadow: 0, p: 2, borderTop: '1px solid #ebebeb', height: '100%' }}>
                                <Typography variant="h6">Select a Status</Typography>
                                <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                                    <Chip
                                        label="Check In"
                                        onClick={() => handleTabClick('checkIn')}
                                        color={currentTab === 'checkIn' ? 'primary' : 'default'}
                                    />
                                    <Chip
                                        label="Check Out"
                                        onClick={() => handleTabClick('checkOut')}
                                        color={currentTab === 'checkOut' ? 'primary' : 'default'}
                                    />
                                    <Chip
                                        label="Travel"
                                        onClick={() => handleTabClick('travel')}
                                        color={currentTab === 'travel' ? 'primary' : 'default'}
                                    />
                                </Box>

                                {currentTab === 'checkIn' && (
                                    <Box sx={{ marginTop: 2 }}>
                                        <Typography variant="h6">Check In Form</Typography>
                                        <br></br>
                                        <Grid container spacing={2} justifyContent="center" direction="row" alignItems="center">
                                            <Grid item xs={12} md={12} xl={12}>
                                                <TextField
                                                    //variant="contained"
                                                    label="Current Time"
                                                    type="time"
                                                    value={currentTime}
                                                    inputProps={{
                                                        step: 60 // This restricts the minutes to be displayed in steps of 1 minute
                                                    }}
                                                    fullWidth
                                                    disabled
                                                />
                                            </Grid>

                                            {/* <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                variant="standard"
                                label="Current Time"
                                type="time"
                                value={currentTime}
                                inputProps={{
                                    step: 60 // This restricts the minutes to be displayed in steps of 1 minute
                                }}
                                fullWidth
                                disabled
                            />
                        </Grid> */}
                                            <Grid item xs={12} md={12} xl={12}>
                                                <LocationComponent />
                                            </Grid>
                                            <Grid item xs={12} md={12} xl={12}>
                                                <TextField
                                                    fullWidth
                                                    id="floor_image"
                                                    label="Location Image"
                                                    type="file"
                                                    name="floor_image"
                                                    inputProps={{ accept: 'image/*' }}
                                                    onChange={handleImageChange}
                                                    InputLabelProps={{
                                                        shrink: true
                                                        // className: classes.label
                                                    }}
                                                    variant="outlined"
                                                    helperText="Incase of Location Not Fetching"
                                                    // className={classes.select}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12} xl={12}>
                                                <TextField
                                                    label="Notes"
                                                    value={notes}
                                                    onChange={handleNotesChange}
                                                    multiline
                                                    fullWidth
                                                    rows={4}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }}>
                                                <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                                                    {/* <Button className={classes.Button} variant="contained" onClick={handleSubmit}>
                                    Create
                                </Button> */}
                                                    <Button variant="contained" color="primary" onClick={handleSave}>
                                                        Check-In
                                                    </Button>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}

                                {currentTab === 'checkOut' && (
                                    <Box sx={{ marginTop: 2 }}>
                                        <Typography variant="h6">Check Out Form</Typography>
                                        <br></br>
                                        <Grid container spacing={2} justifyContent="center" direction="row" alignItems="center">
                                            <Grid item xs={12} md={12} xl={12}>
                                                <TextField
                                                    //variant="contained"
                                                    label="Current Time"
                                                    type="time"
                                                    value={currentTime}
                                                    inputProps={{
                                                        step: 60 // This restricts the minutes to be displayed in steps of 1 minute
                                                    }}
                                                    fullWidth
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={12} xl={12}>
                                                <TextField
                                                    // variant="standard"
                                                    label="Checked in"
                                                    type="time"
                                                    value={checkedin}
                                                    inputProps={{
                                                        step: 60 // This restricts the minutes to be displayed in steps of 1 minute
                                                    }}
                                                    fullWidth
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12} xl={12}>
                                                <LocationComponent />
                                            </Grid>
                                            <Grid item xs={12} md={12} xl={12}>
                                                <TextField
                                                    fullWidth
                                                    id="floor_image"
                                                    label="Location Image"
                                                    type="file"
                                                    name="floor_image"
                                                    inputProps={{ accept: 'image/*' }}
                                                    onChange={handleImageChange}
                                                    InputLabelProps={{
                                                        shrink: true
                                                        // className: classes.label
                                                    }}
                                                    variant="outlined"
                                                    helperText="Incase of Location Not Fetching"
                                                    // className={classes.select}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12} xl={12}>
                                                <TextField
                                                    label="Notes"
                                                    value={notes}
                                                    onChange={handleNotesChange}
                                                    multiline
                                                    fullWidth
                                                    rows={4}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }}>
                                                <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                                                    {/* <Button className={classes.Button} variant="contained" onClick={handleSubmit}>
                                    Create
                                </Button> */}
                                                    <Button variant="contained" color="primary" onClick={handleSave}>
                                                        Check-Out
                                                    </Button>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}

                                {currentTab === 'travel' && (
                                    <Box sx={{ marginTop: 2 }}>
                                        <Typography variant="h6">Travel Form</Typography>
                                        {/* Similar to Check In form structure */}
                                    </Box>
                                )}
                            </Card>
                        </Card>
                    </Grid>
                </Grid>
                {/* <MapComponent latitude={latitude} longitude={longitude} /> */}
            </Card>
        </div>
    );
};

export default SamplePage;
