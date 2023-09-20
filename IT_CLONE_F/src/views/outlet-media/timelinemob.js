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
import { Fab, useMediaQuery, useTheme, Box, Grid, Stack, Card, Avatar } from '@mui/material';
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
import BackButton from '../../BackButton';
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
            {/* <CustomCard>
                <CustomList icon={<StoreOutlinedIcon />} text="Your Timeline" iconColor="#ffffff" variant="h3" />
                <BackButton />
            
            </CustomCard> */}
            <Card sx={{ width: '100%', boxShadow: 0 }}>
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
                                    Your Timeline
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <BackButton />
                </Stack>
            </Card>

            {responseMessage &&
                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}

            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <br></br>
            <Card sx={{ p: 2 }}>
                <Grid container spacing={2} direction="row">
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
                            <Card sx={{ boxShadow: 0, p: 0, borderTop: '1px solid #ebebeb', height: '100%' }}>
                                <OrderTimeline />
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
