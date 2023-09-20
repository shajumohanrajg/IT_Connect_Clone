import { OutlinedInput } from '@material-ui/core';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import {
    Box,
    Button,
    Card,
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
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { Brandapi, OutletMediaFormapi, Statusapi, Vendorapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

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
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showroomnames, setShowroomnames] = React.useState([]);
    const [showroomlocation, setShowroomlocation] = React.useState('');
    const [classname, setClassname] = useState('');
    const [classvalue, setClassvalue] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [modelname, setModelname] = useState('');
    const [brandname, setBrandname] = useState('');
    const [brandvalue, setBrandvalue] = useState('');
    const [brandtype, setBrandtype] = useState('');
    const [brandtypevalue, setBrandtypevalue] = useState('');
    const [vendor, setVendor] = useState('');
    const [vendorvalue, setVendorvalue] = useState('');
    const [brandlocation, setBrandlocation] = useState('');
    const [brandlocationvalue, setBrandlocationvalue] = useState('');
    const [lighttype, setLighttype] = useState('');
    const [lighttypevalue, setLighttypevalue] = useState('');
    const [material, setMaterial] = useState('');
    const [materialvalue, setMaterialvalue] = useState('');
    const [expirevalue, setExpirevalue] = useState('');
    const [image, setImage] = useState([]);
    const [status, setStatus] = useState('');
    const [comments, setComments] = useState('');

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    useEffect(() => {
        const handleDataFetched = (data) => {
            setBrandname(data);
            setVendor(data);
            setStatus(data);
        };

        return () => {
            setStatus([]);
            setBrandname([]);
            setVendor([]);
        };
    }, []);

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        e.preventDefault();

        const formData = new FormData();

        formData.append('ad_image', image);
        formData.append('Width', width);
        formData.append('Height', height);
        formData.append('status', status);
        formData.append('other_Comments', comments);
        formData.append('class_name', classvalue);
        formData.append('showroom', showroomlocation);
        formData.append('branding_type', brandtypevalue);
        formData.append('brand', brandvalue);
        formData.append('branding_location', brandlocationvalue);
        formData.append('material', materialvalue);
        formData.append('light_Type', lighttypevalue);
        formData.append('vendor', vendorvalue);
        formData.append('expiry_on', expirevalue);
        formData.append('created_by', userID);
        formData.append('modified_by', userID);

        try {
            const response = await Axios.post(OutletMediaFormapi, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${token}`
                }
            });
            console.log(response.data);
            setResponseMessage('SuccesssFully Brand Type Created');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <ApiComponent apiUrl={Brandapi} onDataFetched={setBrandname} />
            <ApiComponent apiUrl={Statusapi} onDataFetched={setStatus} />
            <ApiComponent apiUrl={Vendorapi} onDataFetched={setVendor} />
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
                                    Outlet Advertise
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Stack>
            </Card>
            <br></br>
            <Card sx={{ width: '100%', boxShadow: 0, p: 5 }}>
                <Box>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={6} xl={4}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="brand-select-label">
                                    Brand
                                </InputLabel>
                                <Select
                                    labelid="brand-select-label"
                                    id="brand"
                                    name="brand"
                                    value={brandvalue}
                                    onChange={(e) => setBrandvalue(e.target.value)}
                                    label="Brand"
                                >
                                    <MenuItem value="">
                                        <em>Select a brand location</em>
                                    </MenuItem>
                                    {brandname && brandname !== undefined
                                        ? brandname.map((option, index) => (
                                              <MenuItem key={index} value={option.id}>
                                                  {option.name}
                                              </MenuItem>
                                          ))
                                        : 'No Data'}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="Model product Name"
                                id="model_product_name"
                                name="model_product_name"
                                value={modelname}
                                onChange={(e) => setModelname(e.target.value)}
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

                        <Grid item xs={12} md={6} xl={4}>
                            <FormControl fullWidth variant="outlined" size="small" className={classes.select1}>
                                <InputLabel className={classes.label} id="adimage">
                                    Ad Image
                                </InputLabel>
                                <OutlinedInput
                                    labelid="adimage"
                                    id="ad_image"
                                    type="file"
                                    name="ad_image"
                                    inputProps={{ accept: 'image/*' }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PhotoCameraIcon />
                                        </InputAdornment>
                                    }
                                    onChange={handleImageChange}
                                    fullWidth
                                    variant="outlined"
                                    label="Ad Image"
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
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    label="Status"
                                >
                                    <MenuItem value="">
                                        <em>Select a status</em>
                                    </MenuItem>
                                    <MenuItem value="Enable">Enable</MenuItem>
                                    <MenuItem value="Disabled">Disable</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} xl={6}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="vendor-select-label">
                                    Vendor
                                </InputLabel>
                                <Select
                                    labelid="vendor-select-label"
                                    id="vendor"
                                    name="vendor"
                                    value={vendorvalue}
                                    onChange={(e) => setVendorvalue(e.target.value)}
                                    label="Vendor"
                                >
                                    <MenuItem value="">
                                        <em>Select a vendor</em>
                                    </MenuItem>
                                    {vendor && vendor !== undefined
                                        ? vendor.map((option, index) => (
                                              <MenuItem key={index} value={option.id}>
                                                  {option.name}
                                              </MenuItem>
                                          ))
                                        : 'No Data'}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} xl={6}>
                            <TextField
                                fullWidth
                                id="expiry_on"
                                name="expiry_on"
                                type="date"
                                value={expirevalue}
                                onChange={(e) => setExpirevalue(e.target.value)}
                                inputProps={{
                                    shrink: 'true'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                label="Other Comments"
                                id="other_Comments"
                                name="other_Comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
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
            </Card>
        </div>
    );
};

export default withAuth(SamplePage);
