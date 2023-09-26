import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Button,
    Card,
    Fab,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
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
import { DesignTypeapi, JobForapi, JobTypeapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import style from '../styles/Boxstyle';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import Table from './designtypetable';
import HeaderCard from './HeaderCard';

const SamplePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [jobfor, setJobfor] = useState([]);
    const [jobforvalue, setJobforvalue] = useState('');
    const [jobtype, setJobtype] = useState([]);
    const [jobtypevalue, setJobtypevalue] = useState('');

    useEffect(() => {
        const handleDataFetched = (data) => {
            setJobfor(data);
            setJobtype(data);
        };

        return () => {
            setJobfor([]);
            setJobtype([]);
        };
    }, []);

    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        e.preventDefault();
        Axios.post(
            DesignTypeapi,
            {
                name: name,
                status: status,
                jobfor: jobforvalue,
                jobtype: jobtypevalue,
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
                setResponseMessage('SuccesssFully Design Type Created');

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
            <ApiComponent apiUrl={JobTypeapi} onDataFetched={setJobtype} />
            {responseMessage &&
                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}

            <HeaderCard title="Design Type Management" buttonname="Design Type" handleOpen={handleOpen} />

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.Button} sx={{ bgcolor: '#1a5f7a', color: 'white' }}>
                                        D
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h3">Create Design Type</Typography>
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
                        <Grid item xs={12} md={12} xl={12}>
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
                                    label="Job For"
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
