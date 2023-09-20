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

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import BackButton from 'BackButton';

import ApiComponent from '../apicomp/ApiComponent';
import { DesignTypeapi, Jobapi, JobForapi, JobTypeapi, Showroomapi, Usersapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

dayjs.extend(utcPlugin);

const selectStyles = {
    backgroundColor: 'white',
    color: 'black'
};
const customStyles = {
    borderRadius: 50,
    animationDuration: '10ms',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: 8,
            color: 'white'
        },
        '&:hover fieldset': {
            borderColor: '#999'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#1a5f7a'
        }
    }
};

const SamplePage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const userID = localStorage.getItem('id');
    const [matData, setMatData] = React.useState([
        {
            assigned_to: '',
            comment: '',
            dead_Line: null,
            designtype: '',
            jobfor: '',
            jobtype: '',
            priority: '',
            showroom: '',
            status: '',

            created_by: userID,
            modified_by: userID
        }
    ]);

    const [jobfor1, setJobfor] = useState([]);
    const [jobforvalue, setJobforvalue] = useState('');
    const [jobtype1, setJobtype] = useState([]);
    const [jobtypevalue, setJobtypevalue] = useState('');
    const [designtype1, setDesigntype] = useState([]);
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
    const viewShowrooms = (id) => {
        navigate(`/jobassignupdate/${id}`);
        window.location.reload();
    };
    const url = Jobapi;
    useEffect(() => {
        const token = localStorage.getItem('token');

        Axios.get(url + id, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then((res) => {
                setMatData(res.data);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const deadline = matData.dead_Line;

    const formattedDeadline = new Date(deadline).toLocaleString([], { dateStyle: 'short', timeStyle: 'short', hour12: true });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');

        const updatedFormData = {
            assigned_to: matData.assigned_to,
            comment: matData.comment,
            designtype: matData.designtype,
            jobfor: matData.jobfor,
            jobtype: matData.jobtype,
            priority: matData.priority,
            showroom: matData.showroom,
            status: matData.status,
            created_by: userID,
            modified_by: userID,
            dead_Line: selectedDate ? selectedDate.toISOString() : matData.dead_Line
        };

        try {
            const response = await Axios.put(`${Jobapi}${id}/`, updatedFormData, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log(response.data);
            setResponseMessage('SuccesssFully Job Updated');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
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
            console.error(error);
        }
    };

    return (
        <div>
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <ApiComponent apiUrl={Usersapi} onDataFetched={setAssignto} />
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
                                    Job Assign
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <BackButton />
                </Stack>
            </Card>
            <br></br>
            <Card sx={{ width: '100%', boxShadow: 0, p: 3 }}>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6} xl={6}>
                        <FormControl fullWidth className={classes.select}>
                            <InputLabel className={classes.label} id="jobfor-select-label">
                                Job For
                            </InputLabel>
                            <Select
                                labelid="jobfor-select-label"
                                id="jobfor"
                                name="jobfor"
                                value={matData.jobfor || ''}
                                onChange={(e) => setMatData({ ...matData, jobfor: e.target.value })}
                                label="Job For"
                            >
                                <MenuItem value="">
                                    <em>Select Job For</em>
                                </MenuItem>
                                {jobfor1 && jobfor1 !== undefined
                                    ? jobfor1.map((option, index) => (
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
                                value={matData.jobtype || ''}
                                onChange={(e) => setMatData({ ...matData, jobtype: e.target.value })}
                                label="Job Type"
                            >
                                <MenuItem value="">
                                    <em>Select Job For</em>
                                </MenuItem>
                                {jobtype1 && jobtype1 !== undefined
                                    ? jobtype1.map((option, index) => (
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
                                id="designtype"
                                name="designtype"
                                value={matData.designtype || ''}
                                onChange={(e) => setMatData({ ...matData, designtype: e.target.value })}
                                label="Design Type"
                            >
                                <MenuItem value="">
                                    <em>Select Design Type</em>
                                </MenuItem>
                                {designtype1 && designtype1 !== undefined
                                    ? designtype1.map((option, index) => (
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
                                value={matData.showroom || ''}
                                onChange={(e) => setMatData({ ...matData, showroom: e.target.value })}
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
                                value={matData.priority || ''}
                                onChange={(e) => setMatData({ ...matData, priority: e.target.value })}
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
                                value={matData.assigned_to || ''}
                                onChange={(e) => setMatData({ ...matData, assigned_to: e.target.value })}
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
                                value={matData.status || ''}
                                onChange={(e) => setMatData({ ...matData, status: e.target.value })}
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
                        <TextField
                            label="Comments"
                            id="comment"
                            value={matData.comment || ''}
                            onChange={(e) => setMatData({ ...matData, comment: e.target.value })}
                            fullWidth
                            variant="outlined"
                            className={classes.input}
                            InputLabelProps={{
                                shrink: true,
                                classes: {
                                    focused: classes.label
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} xl={6}>
                        <Typography variant="h5">Dead Line is : {formattedDeadline}</Typography>
                        <br></br>
                        <LocalizationProvider dateAdapter={AdapterDateFns} className={classes.select}>
                            <DateTimePicker
                                className={classes.label}
                                renderInput={(props) => <TextField {...props} fullWidth />}
                                label="Dead Line"
                                value={selectedDate ? selectedDate : null}
                                onChange={handleDateChange}
                                fullWidth
                                focused
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={6} xl={6} sx={{ mt: 3 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                            {' '}
                            <Button className={classes.Button} variant="contained" onClick={handleSubmit}>
                                Update
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Card>{' '}
        </div>
    );
};

export default withAuth(SamplePage);
