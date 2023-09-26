import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import BackButton from '../../BackButton';
import ApiComponent from '../apicomp/ApiComponent';
import { Brandapi, OutletMediaFormapi, Statusapi } from '../apicomp/Apiurls';

import { BrandLocationapi, BrandTypeapi, Classapi, Lightapi, Materialapi, Showroomapi, Vendorapi } from '../apicomp/Apiurls';
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
    const [statusvalue, setStatusvalue] = useState('');
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

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    useEffect(() => {
        const handleDataFetched = (data) => {
            setShowroomnames(data);
            setClassname(data);
            setBrandname(data);
            setBrandtype(data);
            setStatus(data);
            setBrandlocation(data);
            setLighttype(data);
            setVendor(data);
            setMaterial(data);
        };

        return () => {
            setShowroomnames([]);
            setClassname([]);
            setBrandname([]);
            setBrandtype([]);
            setStatus([]);
            setBrandlocation([]);
            setLighttype([]);
            setVendor([]);
            setMaterial([]);
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
        formData.append('status', statusvalue);
        formData.append('other_Comments', comments);
        formData.append('class_name', classvalue);
        formData.append('showroom', showroomlocation);
        formData.append('model_product_name', modelname);
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
            setResponseMessage('SuccesssFully Outlet Ad Created');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;

                if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                    setStatusCode(statusCode);
                    // setOpen(false);
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
            {/* <ApiComponent apiUrl={HoardingListapi} onDataFetched={setHoarding} /> */}
            <ApiComponent apiUrl={Showroomapi} onDataFetched={setShowroomnames} />
            <ApiComponent apiUrl={Brandapi} onDataFetched={setBrandname} />
            <ApiComponent apiUrl={Classapi} onDataFetched={setClassname} />
            <ApiComponent apiUrl={BrandTypeapi} onDataFetched={setBrandtype} />
            <ApiComponent apiUrl={BrandLocationapi} onDataFetched={setBrandlocation} />
            <ApiComponent apiUrl={Lightapi} onDataFetched={setLighttype} />
            <ApiComponent apiUrl={Vendorapi} onDataFetched={setVendor} />
            <ApiComponent apiUrl={Statusapi} onDataFetched={setStatus} />
            <ApiComponent apiUrl={Materialapi} onDataFetched={setMaterial} />
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
                                    Outlet Media
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <BackButton />
                </Stack>
            </Card>
            <br></br>
            <Card sx={{ width: '100%', boxShadow: 0, p: { sm: 2, md: 4, xs: 1 } }}>
                <Box>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={6} xl={4}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="class-select-label">
                                    class
                                </InputLabel>
                                <Select
                                    labelid="class-select-label"
                                    id="class_name"
                                    value={classvalue}
                                    onChange={(e) => setClassvalue(e.target.value)}
                                    label="Class"
                                    name="class_name"
                                >
                                    <MenuItem value="">
                                        <em>Select a class</em>
                                    </MenuItem>
                                    {classname && classname !== undefined
                                        ? classname.map((option, index) => (
                                              <MenuItem key={index} value={option.id}>
                                                  {option.name}
                                              </MenuItem>
                                          ))
                                        : 'No Data'}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} xl={4}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="location-select-label">
                                    Showroom Location
                                </InputLabel>
                                <Select
                                    labelid="location-select-label"
                                    id="showroom"
                                    name="showroom"
                                    value={showroomlocation}
                                    onChange={(e) => setShowroomlocation(e.target.value)}
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

                        <Grid item xs={12} md={6} xl={4}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="brandtype-select-label">
                                    Branding Type
                                </InputLabel>
                                <Select
                                    labelid="brandtype-select-label"
                                    id="branding_type"
                                    name="branding_type"
                                    value={brandtypevalue}
                                    onChange={(e) => setBrandtypevalue(e.target.value)}
                                    label="Branding Type"
                                >
                                    <MenuItem value="">
                                        <em>Select a brand Type</em>
                                    </MenuItem>
                                    {brandtype && brandtype !== undefined
                                        ? brandtype.map((option, index) => (
                                              <MenuItem key={index} value={option.id}>
                                                  {option.name}
                                              </MenuItem>
                                          ))
                                        : 'No Data'}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} xl={4}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="brandloc-select-label">
                                    Branding Location
                                </InputLabel>
                                <Select
                                    labelid="brandloc-select-label"
                                    id="branding_location"
                                    name="branding_location"
                                    value={brandlocationvalue}
                                    onChange={(e) => setBrandlocationvalue(e.target.value)}
                                    label="Branding Location"
                                >
                                    <MenuItem value="">
                                        <em>Select a brand location</em>
                                    </MenuItem>
                                    {brandlocation && brandlocation !== undefined
                                        ? brandlocation.map((option, index) => (
                                              <MenuItem key={index} value={option.id}>
                                                  {option.name}
                                              </MenuItem>
                                          ))
                                        : 'No Data'}
                                </Select>
                            </FormControl>
                        </Grid>
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
                                        <em>Select a brand</em>
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
                                        root: classes.label,
                                        focused: classes.focusedLabel
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="Width"
                                id="Width"
                                name="Width"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
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
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                fullWidth
                                type="number"
                                variant="outlined"
                                className={classes.input}
                                InputProps={{
                                    className: classes.label,
                                    classes: {
                                        root: classes.inputprops
                                    }
                                }}
                                InputLabelProps={{
                                    classes: {
                                        focused: classes.label
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} xl={4}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="material-select-label">
                                    Material
                                </InputLabel>
                                <Select
                                    labelid="material-select-label"
                                    id="material"
                                    name="material"
                                    value={materialvalue}
                                    onChange={(e) => setMaterialvalue(e.target.value)}
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
                        <Grid item xs={12} md={6} xl={4}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="lighttype-select-label">
                                    Light Type
                                </InputLabel>
                                <Select
                                    labelid="lighttype-select-label"
                                    id="light_Type"
                                    name="light_Type"
                                    value={lighttypevalue}
                                    onChange={(e) => setLighttypevalue(e.target.value)}
                                    label="Light Type"
                                >
                                    <MenuItem value="">
                                        <em>Select a location</em>
                                    </MenuItem>
                                    {lighttype && lighttype !== undefined
                                        ? lighttype.map((option, index) => (
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
                                fullWidth
                                id="ad_image"
                                label="Asset Image"
                                type="file"
                                name="ad_image"
                                inputProps={{ accept: 'image/*' }}
                                onChange={handleImageChange}
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.label
                                }}
                                variant="outlined"
                                className={classes.select}
                            />
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
                                    value={statusvalue}
                                    onChange={(e) => setStatusvalue(e.target.value)}
                                    label="Status"
                                >
                                    <MenuItem value="">
                                        <em>Select a status</em>
                                    </MenuItem>

                                    {status && Array.isArray(status) && status.length > 0 ? (
                                        status.map((option, index) => (
                                            <MenuItem key={index} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No Data</MenuItem>
                                    )}
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
