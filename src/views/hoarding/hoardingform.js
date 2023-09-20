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

import BackButton from 'BackButton';

import ApiComponent from '../apicomp/ApiComponent';
import { HoardingFormapi, Materialapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

const SamplePage = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [siteType, setSiteType] = useState('');
    const [siteLocation, setSiteLocation] = useState('');
    const [brandingType, setBrandingType] = useState('');
    const [brandingLocation, setBrandingLocation] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [startDate, setStartDate] = useState('');
    const [rent, setRent] = useState('');
    const [assetImage, setAssetImage] = useState([]);
    const [document, setDocument] = useState([]);
    const [status, setStatus] = useState('');
    const [otherComments, setOtherComments] = useState('');
    const [material, setMaterial] = useState([]);
    const [materialvalue, setMaterialvalue] = useState('');

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };

    const handleImageChange = (event) => {
        setAssetImage(event.target.files[0]);
    };
    const handleImageChange1 = (event) => {
        setDocument(event.target.files[0]);
    };

    useEffect(() => {
        const handleDataFetched = (data) => {
            setMaterial(data);
        };

        return () => {
            setMaterial([]);
        };
    }, []);

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');

        e.preventDefault();

        const formData = new FormData();

        formData.append('site_type', siteType);
        formData.append('site_location', siteLocation);
        formData.append('branding_type', brandingType);
        formData.append('branding_location', brandingLocation);
        formData.append('Width', width);
        formData.append('height', height);
        formData.append('start_Date', startDate);
        formData.append('Rent', rent);
        formData.append('asset_image', assetImage);
        formData.append('document', document);
        formData.append('status', status);
        formData.append('other_comments', otherComments);
        formData.append('material', materialvalue);
        formData.append('created_by', userID);
        formData.append('modified_by', userID);

        try {
            const response = await Axios.post(HoardingFormapi, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${token}`
                }
            });
            console.log(response.data);
            setResponseMessage('SuccesssFully Hoarding Created');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
            navigate('/hoardinglist');
        } catch (error) {
            console.error(error);
            if (error.response) {
                const statusCode = error.response.status;

                if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                    setStatusCode(statusCode);
                    // setOpen(false);
                    //setSelectedRowId(false);
                    //setOpenModal(false);
                    //setOpenDialog(false);
                    setShowDialog(true);
                } else {
                    alert('An unexpected error occurred. Please try again later.');
                }
            } else {
                alert('An unexpected error occurred. Please try again later.');
            }
        }
    };
    return (
        <div>
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <ApiComponent apiUrl={Materialapi} onDataFetched={setMaterial} />
            <Card sx={{ width: '100%', boxShadow: 0 }}>
                {responseMessage &&
                    Swal.fire({
                        title: 'success',
                        text: responseMessage,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })}
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
                                    Hoarding Table
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>

                    <BackButton />
                </Stack>
            </Card>
            <br></br>
            <Card sx={{ width: '100%', boxShadow: 0, p: 5 }}>
                <Box>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={6} xl={4}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="sitetype-select-label">
                                    Site Type
                                </InputLabel>
                                <Select
                                    labelid="sitetype-select-label"
                                    id="site_type"
                                    value={siteType}
                                    onChange={(e) => setSiteType(e.target.value)}
                                    label="Site Type"
                                    name="site_type"
                                >
                                    <MenuItem value="">
                                        <em>Select a class</em>
                                    </MenuItem>
                                    <MenuItem value="Rent">Rent</MenuItem>
                                    <MenuItem value="Own">Own</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="Site Location"
                                id="site_location"
                                name="site_location"
                                value={siteLocation}
                                onChange={(e) => setSiteLocation(e.target.value)}
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
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="brandtype-select-label">
                                    Branding Type
                                </InputLabel>
                                <Select
                                    labelid="brandtype-select-label"
                                    id="branding_type"
                                    name="branding_type"
                                    value={brandingType}
                                    onChange={(e) => setBrandingType(e.target.value)}
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
                                label="Branding Location"
                                id="branding_location"
                                name="branding_location"
                                value={brandingLocation}
                                onChange={(e) => setBrandingLocation(e.target.value)}
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
                            <TextField
                                label="Start Date"
                                id="start_Date"
                                name="start_Date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                fullWidth
                                type="date"
                                variant="outlined"
                                className={classes.input}
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {}
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="Rent"
                                id="Rent"
                                name="Rent"
                                value={rent}
                                onChange={(e) => setRent(e.target.value)}
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
                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                fullWidth
                                id="standard-number"
                                label="Document"
                                type="file"
                                onChange={handleImageChange1}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
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
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
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
                                value={otherComments}
                                onChange={(e) => setOtherComments(e.target.value)}
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
