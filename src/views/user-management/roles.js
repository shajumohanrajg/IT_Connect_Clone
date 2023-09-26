import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import { Autocomplete, Box, Button, Card, Checkbox, Grid, Stack, TextField, Typography } from '@mui/material';
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
import { Permissionsapi, Rolesapi, Showroomapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import style from '../styles/Boxstyle';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import Table from './rolestable';

import AddIcon from '@mui/icons-material/Add';
import HeaderCard from './HeaderCard';
import { Fab, useMediaQuery, useTheme } from '@mui/material';

const SamplePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // const navigate = useNavigate();
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

    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        const handleDataFetched = (data) => {
            setShowroomnames(data);
            setPermissions(data);
        };

        return () => {
            setShowroomnames([]);
            setPermissions([]);
        };
    }, []);

    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [description, setDescription] = useState('');
    const [permissionvalue, setPermissionvalue] = useState([]);
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

    const [selectedChildren, setSelectedChildren] = useState([]);

    const handleChildChange = (event, newValue) => {
        setSelectedChildren(newValue);
    };
    const handleSelectAll = () => {
        if (selectedChildren.length === permissions.length) {
            setSelectedChildren([]);
        } else {
            setSelectedChildren(permissions.map((option) => option.name));
        }
    };
    const [idofroles, setIdofRoles] = React.useState([]);
    React.useEffect(() => {
        const selectedStores = permissions.filter((d) => selectedChildren.includes(d.name));
        if (selectedStores.length > 0) {
            const ids = selectedStores.map((store) => store.id);
            setIdofRoles(ids);
        } else {
            setIdofRoles([]);
        }
    }, [permissions, selectedChildren]);

    console.log(idofroles);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');

        Axios.post(
            Rolesapi,
            {
                name: name,
                level: level,
                description: description,
                permissions: idofroles,
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
                setResponseMessage('SuccesssFully Role Created');

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

            <ApiComponent apiUrl={Showroomapi} onDataFetched={setShowroomnames} />
            <ApiComponent apiUrl={Permissionsapi} onDataFetched={setPermissions} />
            {responseMessage &&
                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}

            <HeaderCard title="Roles Creation" buttonname="Roles" handleOpen={handleOpen} />

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.Button} sx={{ bgcolor: '#1a5f7a', color: 'white' }}>
                                        {/* <AddAPhotoOutlinedIcon /> */}R
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h3">Add Roles</Typography>
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
                            <TextField
                                label="Level"
                                id="level"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
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
                            <TextField
                                label="Description"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
                        <Grid item xs={12} md={12} xl={12}>
                            <Autocomplete
                                fullWidth
                                id="permissions"
                                multiple
                                freeSolo
                                limitTags={1}
                                value={selectedChildren}
                                onChange={handleChildChange}
                                disableCloseOnSelect
                                options={permissions.map((option) => option.name)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password'
                                        }}
                                        label="Permissions"
                                        placeholder="Permissions"
                                        style={{ overflow: 'auto', maxHeight: '100%' }}
                                    />
                                )}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props} key={option}>
                                        {' '}
                                        {/* Add key prop here */}
                                        <Checkbox checked={selectedChildren.includes(option)} />
                                        {option}
                                    </li>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <Button
                                onClick={handleSelectAll}
                                variant="outlined"
                                sx={{ color: '#1a5f7a', borderColor: '#1a5f7a' }}
                                fullWidth
                                size="large"
                            >
                                Select/Unselect
                            </Button>
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
                                    Add Roles
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
