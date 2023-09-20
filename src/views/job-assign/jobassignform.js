import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import BackButton from 'BackButton';

import ApiComponent from '../apicomp/ApiComponent';
import { DesignTypeapi, JobForapi, JobTypeapi, Jobapi, Showroomapi, Userapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

const SamplePage = () => {
    const navigate = useNavigate();
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
    const [jobtype, setJobtype] = useState([]);
    const [jobtypevalue, setJobtypevalue] = useState('');
    const [designtype, setDesigntype] = useState([]);
    const [designtypevalue, setDesigntypevalue] = useState('');
    const [showroomnames, setShowroomnames] = useState([]);
    const [showroomvalue, setShowroomvalue] = useState('');
    const [comment, setComment] = useState('');
    const [priority, setPriority] = useState('');
    const [priorityvalue, setPriorityvalue] = useState('');
    const [assignto, setAssignto] = useState([]);
    const [assigntovalue, setAssigntovalue] = useState('');

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        const handleDataFetched = (data) => {
            setJobfor(data);
            setJobtype(data);
            setDesigntype(data);
            setShowroomnames(data);
            setAssignto(data);
        };

        return () => {
            setJobfor([]);
            setJobtype([]);
            setDesigntype([]);
            setShowroomnames([]);
            setAssignto([]);
        };
    }, []);

    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        e.preventDefault();
        Axios.post(
            Jobapi,
            {
                jobfor: jobforvalue,
                jobtype: jobtypevalue,
                designtype: designtypevalue,
                showroom: showroomvalue,
                priority: priority,
                status: status,
                comment: comment,
                assigned_to: assigntovalue,
                dead_Line: selectedDate,
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
                setResponseMessage('SuccesssFully Job Assigned');
                console.log(response);

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            },
            (error) => {
                console.log(error);
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
            }
        );
    };
    return (
        <div>
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <ApiComponent apiUrl={Userapi} onDataFetched={setAssignto} />
            <ApiComponent apiUrl={JobForapi} onDataFetched={setJobfor} />
            <ApiComponent apiUrl={JobTypeapi} onDataFetched={setJobtype} />
            <ApiComponent apiUrl={DesignTypeapi} onDataFetched={setDesigntype} />
            <ApiComponent apiUrl={Showroomapi} onDataFetched={setShowroomnames} />
            {responseMessage &&
                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}
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
                                    Job Management
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <BackButton />
                </Stack>
            </Card>
            <br></br>
            <Card sx={{ width: '100%', boxShadow: 0, p: 5 }}>
                <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={6} xl={6}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="jobfor-select-label">
                                    Job For
                                </InputLabel>
                                <Select
                                    labelid="jobfor-select-label"
                                    id="jobfor"
                                    name="jobfor"
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
                        <Grid item xs={12} md={6} xl={6}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="jobtype-select-label">
                                    Job Type
                                </InputLabel>
                                <Select
                                    labelid="jobtype-select-label"
                                    id="jobtype"
                                    name="jobtype"
                                    value={jobtypevalue}
                                    onChange={(e) => setJobtypevalue(e.target.value)}
                                    label="Job Type"
                                >
                                    <MenuItem value="">
                                        <em>Select Job For</em>
                                    </MenuItem>
                                    {jobtype && jobtype !== undefined
                                        ? jobtype.map((option, index) => (
                                              <MenuItem key={index} value={option.id}>
                                                  {option.name}
                                              </MenuItem>
                                          ))
                                        : 'No Data'}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="designtype-select-label">
                                    Design Type
                                </InputLabel>
                                <Select
                                    labelid="designtype-select-label"
                                    id="jobtype"
                                    name="jobtype"
                                    value={designtypevalue}
                                    onChange={(e) => setDesigntypevalue(e.target.value)}
                                    label="Design Type"
                                >
                                    <MenuItem value="">
                                        <em>Select Design Type</em>
                                    </MenuItem>
                                    {designtype && designtype !== undefined
                                        ? designtype.map((option, index) => (
                                              <MenuItem key={index} value={option.id}>
                                                  {option.name}
                                              </MenuItem>
                                          ))
                                        : 'No Data'}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="location-select-label">
                                    Showroom Location
                                </InputLabel>
                                <Select
                                    labelid="location-select-label"
                                    id="showroom"
                                    name="showroom"
                                    value={showroomvalue}
                                    onChange={(e) => setShowroomvalue(e.target.value)}
                                    label="Showroom Location"
                                >
                                    <MenuItem value="">
                                        <em>Select a location</em>
                                    </MenuItem>
                                    {showroomnames && showroomnames !== undefined
                                        ? showroomnames.map((option, index) => (
                                              <MenuItem key={index} value={option.id}>
                                                  {option.name}
                                              </MenuItem>
                                          ))
                                        : 'No Data'}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="priority-select-label">
                                    Priority
                                </InputLabel>
                                <Select
                                    labelid="priority-select-label"
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    label="Priority"
                                >
                                    <MenuItem value="">
                                        <em>Select a Priority</em>
                                    </MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="TOP">Top</MenuItem>
                                    <MenuItem value="Urgent">Urgent</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} xl={6}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="assignto-select-label">
                                    Assign To
                                </InputLabel>
                                <Select
                                    labelid="assignto-select-label"
                                    id="assigned_to"
                                    name="assigned_to"
                                    value={assigntovalue}
                                    onChange={(e) => setAssigntovalue(e.target.value)}
                                    label="Assign To"
                                >
                                    <MenuItem value="">
                                        <em>Select a User</em>
                                    </MenuItem>
                                    {assignto && assignto !== undefined
                                        ? assignto.map((option, index) => (
                                              <MenuItem key={index} value={option.id}>
                                                  {option.username}
                                              </MenuItem>
                                          ))
                                        : 'No Data'}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
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
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Follow Up">Follow Up</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} className={classes.select}>
                                <DateTimePicker
                                    className={classes.label}
                                    renderInput={(props) => <TextField {...props} fullWidth />}
                                    label="Date and Time"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    fullWidth
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
                            <TextField
                                label="Comments"
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
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
                        <Grid item xs={12} md={6} xl={6} sx={{ mt: 3 }}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                                {' '}
                                <Button className={classes.Button} variant="contained" onClick={handleSubmit}>
                                    Create
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default withAuth(SamplePage);
