import { OutlinedInput } from '@material-ui/core';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import {
    Button,
    Card,
    CardContent,
    CardMedia,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import BackButton from 'BackButton';

import { HoardingFormapi, Materialapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import ApiComponent from '../apicomp/ApiComponent';

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
    const navigate = useNavigate();
    let { id } = useParams();

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

    const [material, setMaterial] = useState('');

    const [assetImage, setAssetImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAssetImage(file);
    };

    const [document, setDocument] = useState(null);

    const handleImageChange1 = (e) => {
        const file = e.target.files[0];
        setDocument(file);
    };

    const convertUrlToFile = async (url) => {
        const response = await Axios.get(url, { responseType: 'blob' });
        const blob = response.data;
        const fileName = getFileNameFromUrl(url);
        return new File([blob], fileName);
    };

    const getFileNameFromUrl = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    const userID = localStorage.getItem('id');
    const [matData, setMatData] = React.useState([
        {
            created_by: userID,
            modified_by: userID,
            Width: '',
            height: '',
            site_type: '',
            asset_image: '',
            site_location: '',
            branding_type: '',
            branding_location: '',
            material: '',
            start_Date: '',
            rent: '',
            other_comments: '',
            status: '',
            document: ''
        }
    ]);

    useEffect(() => {
        const handleDataFetched = (data) => {
            setMaterial(data);
        };

        return () => {
            setMaterial([]);
        };
    }, []);

    const url = HoardingFormapi;
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');

        const formData = new FormData();

        formData.append('Width', matData.Width);
        formData.append('height', matData.height);
        formData.append('status', matData.status);
        formData.append('other_Comments', matData.other_Comments);
        formData.append('site_type', matData.site_type);
        formData.append('site_location', matData.site_location);
        formData.append('branding_type', matData.branding_type);
        formData.append('brand', matData.brand);
        formData.append('branding_location', matData.branding_location);
        formData.append('material', matData.material);
        formData.append('start_Date', matData.start_Date);
        formData.append('rent', matData.rent);

        formData.append('created_by', userID);
        formData.append('modified_by', userID);

        if (assetImage && document) {
            formData.append('asset_image', assetImage);
            formData.append('document', document);
        } else if (assetImage) {
            formData.append('asset_image', assetImage);
        } else if (document) {
            formData.append('document', document);
        }
        Axios.put(`${HoardingFormapi}${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${token}`
            }
        })
            .then((response) => {
                setResponseMessage('SuccesssFully Hoarding Updated');

                setTimeout(() => {
                    window.location.reload();
                }, 1000);

                console.log(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    const statusCode = error.response.status;

                    if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                        setStatusCode(statusCode);
                        // setOpen(false);
                        // setSelectedRowId(false);
                        // setOpenModal(false);
                        // setOpenDialog(false);
                        setShowDialog(true);
                        //navigate()
                    } else {
                        alert('An unexpected error occurred. Please try again later.');
                    }
                } else {
                    alert('An unexpected error occurred. Please try again later.');
                }
                console.error(error);
            });
    };

    const sendFormData = (formData) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        Axios.put(`${HoardingFormapi}${id}/`, formData, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data);
                setResponseMessage('SuccesssFully Brand Type Created');

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                console.log(response);
            })
            .catch((error) => {
                if (error.response) {
                    const statusCode = error.response.status;

                    if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                        setStatusCode(statusCode);
                        // setOpen(false);
                        setSelectedRowId(false);
                        setOpenModal(false);
                        setOpenDialog(false);
                        setShowDialog(true);
                    } else {
                        alert('An unexpected error occurred. Please try again later.');
                    }
                } else {
                    alert('An unexpected error occurred. Please try again later.');
                }
                console.error(error);
            });
    };

    return (
        <>
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <ApiComponent apiUrl={Materialapi} onDataFetched={setMaterial} />
            {responseMessage &&
                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}{' '}
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
                                    Hoarding
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <BackButton />
                </Stack>
            </Card>
            <br></br>
            <Card sx={{ width: '100%', boxShadow: 0, p: 5 }}>
                <br></br>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6} xl={4}>
                        <FormControl fullWidth className={classes.select}>
                            <InputLabel className={classes.label} id="sitetype-select-label">
                                Site Type
                            </InputLabel>
                            <Select
                                labelid="sitetype-select-label"
                                id="site_type"
                                value={matData.site_type || ''}
                                onChange={(e) => setMatData({ ...matData, site_type: e.target.value })}
                                label="Class"
                                name="site_type"
                            >
                                <MenuItem value="">
                                    <em>Select a class</em>
                                </MenuItem>
                                <MenuItem value="Rent">Rent</MenuItem>
                                <MenuItem value="Own">Own</MenuItem>
                                {/* <MenuItem value="Chicago">Chicago</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} xl={4}>
                        <TextField
                            label="Site Loaction"
                            id="site_location"
                            name="site_location"
                            value={matData.site_location || ''}
                            onChange={(e) => setMatData({ ...matData, site_location: e.target.value })}
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

                    <Grid item xs={12} md={6} xl={4}>
                        <FormControl fullWidth className={classes.select}>
                            <InputLabel className={classes.label} id="brandtype-select-label">
                                Branding Type
                            </InputLabel>
                            <Select
                                labelid="brandtype-select-label"
                                id="branding_type"
                                name="branding_type"
                                value={matData.branding_type || ''}
                                onChange={(e) => setMatData({ ...matData, branding_type: e.target.value })}
                                label="Branding Type"
                            >
                                <MenuItem value="">
                                    <em>Select a brand Type</em>
                                </MenuItem>
                                <MenuItem value="Outdoor">Outdoor</MenuItem>
                                <MenuItem value="Mall">Mall</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <TextField
                            label="Branidng Loaction"
                            id="branding_location"
                            name="branding_location"
                            value={matData.branding_location || ''}
                            onChange={(e) => setMatData({ ...matData, branding_location: e.target.value })}
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
                    <Grid item xs={12} md={6} xl={4}>
                        <TextField
                            label="Width"
                            id="Width"
                            name="Width"
                            value={matData.Width || ''}
                            onChange={(e) => setMatData({ ...matData, Width: e.target.value })}
                            fullWidth
                            type="number"
                            variant="outlined"
                            InputProps={{
                                classes: {
                                    root: classes.inputprops
                                }
                            }}
                            className={classes.input}
                            InputLabelProps={{
                                shrink: true,
                                classes: {
                                    focused: classes.label
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <TextField
                            label="Height"
                            id="Height"
                            name="Height"
                            value={matData.height || ''}
                            onChange={(e) => setMatData({ ...matData, height: e.target.value })}
                            fullWidth
                            type="number"
                            variant="outlined"
                            className={classes.input}
                            InputProps={{
                                classes: {
                                    root: classes.inputprops
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                                classes: {
                                    focused: classes.label
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <TextField
                            label="Start Date"
                            id="start_Date"
                            name="start_Date"
                            value={matData.start_Date || ''}
                            onChange={(e) => setMatData({ ...matData, start_Date: e.target.value })}
                            fullWidth
                            type="date"
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
                    <Grid item xs={12} md={6} xl={4}>
                        <TextField
                            label="Rent"
                            id="Rent"
                            name="Rent"
                            value={matData.Rent || ''}
                            onChange={(e) => setMatData({ ...matData, Rent: e.target.value })}
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
                    <Grid item xs={12} md={6} xl={4}>
                        <FormControl fullWidth variant="outlined" size="small" className={classes.select1}>
                            <InputLabel className={classes.label} id="asset_image">
                                Asset Image
                            </InputLabel>
                            <OutlinedInput
                                id="asset_image"
                                type="file"
                                name="asset_image"
                                inputProps={{ accept: 'image/*' }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PhotoCameraIcon />
                                    </InputAdornment>
                                }
                                onChange={handleImageChange}
                                fullWidth
                                variant="outlined"
                                label="Asset Image"
                                InputLabelProps={{
                                    classes: {}
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <FormControl fullWidth variant="outlined" size="small" className={classes.select1}>
                            <InputLabel className={classes.label} id="document">
                                Document
                            </InputLabel>
                            <OutlinedInput
                                id="document"
                                type="file"
                                name="document"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PhotoCameraIcon />
                                    </InputAdornment>
                                }
                                onChange={handleImageChange1}
                                fullWidth
                                variant="outlined"
                                label="Document"
                                InputLabelProps={{
                                    classes: {}
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <FormControl fullWidth className={classes.select}>
                            <InputLabel className={classes.label} id="status-select-label">
                                Status
                            </InputLabel>
                            <Select
                                labelid="status-select-label"
                                id="status"
                                name="status"
                                value={matData.status || ''}
                                onChange={(e) => setMatData({ ...matData, status: e.target.value })}
                                label="Status"
                            >
                                <MenuItem value="">
                                    <em>Select a status</em>
                                </MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <TextField
                            label="Other Comments"
                            id="other_comments"
                            name="other_comments"
                            value={matData.other_comments || ''}
                            onChange={(e) => setMatData({ ...matData, other_comments: e.target.value })}
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
                    <Grid item xs={12} md={12} xl={12}>
                        <FormControl fullWidth className={classes.select}>
                            <InputLabel className={classes.label} id="material-select-label">
                                Material
                            </InputLabel>
                            <Select
                                labelid="material-select-label"
                                id="material"
                                name="material"
                                value={matData.material || ''}
                                onChange={(e) => setMatData({ ...matData, material: e.target.value })}
                                label="Material"
                            >
                                <MenuItem value="">
                                    <em>Select a location</em>
                                </MenuItem>
                                {material && material !== undefined
                                    ? material.map((option, index) => (
                                          <MenuItem key={index} value={option.id}>
                                              {option.name}
                                          </MenuItem>
                                      ))
                                    : 'No Data'}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} xl={12}>
                        <Card sx={{ boxShadow: 2, maxWidth: '600px' }}>
                            <CardMedia component="img" image={matData.asset_image} alt="assetimage" sx={{ height: 140 }} />

                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    Asset Image
                                </Typography>
                            </CardContent>
                        </Card>
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
                                Update
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default withAuth(SamplePage);
