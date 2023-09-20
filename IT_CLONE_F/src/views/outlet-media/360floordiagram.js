import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import {
    Box,
    Button,
    Card,
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
import { isWebUri } from 'valid-url';

import ApiComponent from '../apicomp/ApiComponent';
import { DegreeImageapi, Showroomapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import style from '../styles/Boxstyle';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import Table from './360floordiatable';

import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';

const SamplePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [location, setLocation] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };

    const [showroomnames, setShowroomnames] = React.useState([]);

    useEffect(() => {
        const handleDataFetched = (data) => {
            setShowroomnames(data);
        };

        return () => {
            setShowroomnames([]);
        };
    }, []);

    const [url, setURL] = useState('');
    const [grade, setGrade] = useState('');
    const [urlError, setUrlError] = useState(false);

    const handleChange = (event) => {
        setURL(event.target.value);

        if (event.target.value && !isWebUri(event.target.value)) {
            setUrlError(true);
        } else {
            setUrlError(false);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');

        Axios.post(
            DegreeImageapi,
            {
                name: location,
                url: url,
                grade: grade,
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
                setResponseMessage('SuccesssFully 360 Floordiagarm Created');

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
                    alert('An unexpected error occurred. Please try again later.');
                }
                console.log(error);
            }
        );
    };

    return (
        <div>
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
                                    360 Floor Diagram
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
                            360 Floor Diagram
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
                                        F
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h3">Add 360 Floor Diagram</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                        <Grid item xs={12} md={12} xl={12}>
                            <FormControl fullWidth className={classes.select} required>
                                <InputLabel className={classes.label} id="location-select-label">
                                    Showroom Location
                                </InputLabel>
                                <Select
                                    labelid="location-select-label"
                                    id="name"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    label="Showroom Location"
                                    focused="true"
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
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                required
                                label="URL"
                                id="url"
                                value={url}
                                fullWidth
                                type="url"
                                variant="outlined"
                                onChange={handleChange}
                                error={urlError}
                                helperText={urlError ? 'Invalid URL' : ''}
                                className={classes.input}
                                InputLabelProps={{
                                    classes: {
                                        focused: classes.label
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <FormControl fullWidth className={classes.select} required>
                                <InputLabel className={classes.label} id="grade-select-label">
                                    Grade
                                </InputLabel>
                                <Select
                                    labelid="grade-select-label"
                                    id="grade"
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                    label="Grade"
                                >
                                    <MenuItem value="">
                                        <em>Select a Grade</em>
                                    </MenuItem>
                                    <MenuItem value="A">A</MenuItem>
                                    <MenuItem value="A+">A+</MenuItem>
                                    <MenuItem value="B">B</MenuItem>
                                    <MenuItem value="C">C</MenuItem>
                                    <MenuItem value="D">D</MenuItem>
                                    <MenuItem value="E">E</MenuItem>
                                    <MenuItem value="F">F</MenuItem>
                                    <MenuItem value="G">G</MenuItem>
                                    <MenuItem value="H">H</MenuItem>
                                    <MenuItem value="I">I</MenuItem>
                                    <MenuItem value="K">K</MenuItem>
                                </Select>
                            </FormControl>
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
            </Modal>
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <br></br>
            <Table />
        </div>
    );
};

export default withAuth(SamplePage);
