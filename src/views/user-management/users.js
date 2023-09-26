import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
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
import { Rolesapi, Userapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import style from '../styles/Boxstyle';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import Table from './userstable';
import HeaderCard from './HeaderCard';
import AddIcon from '@mui/icons-material/Add';
import { Fab, useMediaQuery, useTheme } from '@mui/material';

const SamplePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
    const [showroomnames, setShowroomnames] = React.useState([]);

    const [role, setRole] = useState([]);
    useEffect(() => {
        const handleDataFetched = (data) => {
            setShowroomnames(data);
            setRole(data);
        };

        return () => {
            setShowroomnames([]);
            setRole([]);
        };
    }, []);

    const [selectedChildren, setSelectedChildren] = useState([]);

    const handleChildChange = (event, newValue) => {
        setSelectedChildren(newValue);
    };

    const [idofroles, setIdofRoles] = React.useState([]);
    React.useEffect(() => {
        const selectedStores = role.filter((d) => selectedChildren.includes(d.name));
        if (selectedStores.length > 0) {
            const ids = selectedStores.map((store) => store.id);
            setIdofRoles(ids);
        } else {
            setIdofRoles([]);
        }
    }, [role, selectedChildren]);

    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rolevalue, setRolevalue] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [avatarImage, setAvatarImage] = useState([]);

    const [url, setURL] = useState('');
    const [grade, setGrade] = useState('');
    const [urlError, setUrlError] = useState(false);

    const handleImageChange = (event) => {
        setAvatarImage(event.target.files[0]);
    };

    const handleRoleChange = (event) => {
        const selectedValue = event.target.value;

        const selectedArray = [selectedValue];

        setRolevalue(selectedArray);
    };

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        confirmpassword: ''
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialCharacter = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.@#]/.test(password);

        if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialCharacter) {
            return false;
        }

        return true;
    };

    const validateForm = () => {
        const newErrors = {};

        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email address';
        }
        if (password !== confirmpassword) {
            newErrors.password = 'Passwords do not match';
        }
        if (!validatePassword(password)) {
            newErrors.password = 'Must use uppercase,lowercase,number & special character';
        }
        if (password !== confirmpassword) {
            newErrors.confirmpassword = 'Passwords do not match';
        }

        setFormErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');

        e.preventDefault();

        const formData = new FormData();

        formData.append('username', name);
        formData.append('first_name', firstname);
        formData.append('last_name', lastname);
        formData.append('email', email);
        formData.append('password', confirmpassword);
        formData.append('groups', rolevalue);

        formData.append('avatar', avatarImage);

        formData.append('created_by', userID);
        formData.append('modified_by', userID);

        try {
            const response = await Axios.post(Userapi, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${token}`
                }
            });
            console.log(response.data);
            console.log(response.formData);
            setResponseMessage('SuccesssFully User Created');

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

            <ApiComponent apiUrl={Rolesapi} onDataFetched={setRole} />
            {responseMessage &&
                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}

            <HeaderCard title="User Management" buttonname="Users" handleOpen={handleOpen} />

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.Button} sx={{ bgcolor: '#1a5f7a', color: 'white' }}>
                                        {/* <AddAPhotoOutlinedIcon /> */}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h3">Add Users</Typography>
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
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                label="First Name"
                                id="firstname"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                fullWidth
                                variant="outlined"
                                className={classes.input}
                                InputLabelProps={{
                                    classes: {
                                        focused: classes.label
                                    }
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                label="Last Name"
                                id="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                fullWidth
                                variant="outlined"
                                className={classes.input}
                                InputLabelProps={{
                                    classes: {
                                        focused: classes.label
                                    }
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                name="email"
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                required
                                error={!!formErrors.email}
                                helperText={formErrors.email}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                name="password"
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                required
                                error={!!formErrors.password}
                                helperText={formErrors.password}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                name="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                value={confirmpassword}
                                onChange={(e) => setConfirmpassword(e.target.value)}
                                fullWidth
                                required
                                error={!!formErrors.confirmpassword}
                                helperText={formErrors.confirmpassword}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                fullWidth
                                id="standard-number"
                                label="Asset Image"
                                type="file"
                                inputProps={{ accept: 'image/*' }}
                                onChange={handleImageChange}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="location-select-label">
                                    Role
                                </InputLabel>
                                <Select
                                    labelid="location-select-label"
                                    id="roles"
                                    value={rolevalue}
                                    onChange={handleRoleChange}
                                    label="Role"
                                    focused="true"
                                >
                                    <MenuItem value="">
                                        <em>Select a Role</em>
                                    </MenuItem>
                                    {role && role !== undefined
                                        ? role.map((option, index) => (
                                              <MenuItem key={index} value={option.id}>
                                                  {option.name}
                                              </MenuItem>
                                          ))
                                        : 'No Data'}
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
                                    Add Users
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
