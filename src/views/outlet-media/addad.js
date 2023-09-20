import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import {
    Box,
    Button,
    Card,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
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
import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import BackButton from '../../BackButton';
import ApiComponent from '../apicomp/ApiComponent';
import { Brandapi, OutletMediaFormapi } from '../apicomp/Apiurls';

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
    const theme = useTheme();
    const navigate = useNavigate();
    const classes = useStyles();

    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showroomnames, setShowroomnames] = React.useState([]);
    const [showroomlocation, setShowroomlocation] = React.useState('');
    const [classname, setClassname] = useState('');
    const [classvalue, setClassvalue] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [depth, setDepth] = useState('');
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
            setShowroomnames(data);
            setClassname(data);
            setBrandname(data);
            setBrandtype(data);
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
        formData.append('status', status);
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
            console.error(error);
        }
    };

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, value]);
        } else {
            setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((option) => option !== value));
        }
    };

    const brandtype1 = [
        {
            id: 1,
            name: 'Name Board',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Side Board',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Top Board',
            status: 'Active'
        },
        {
            id: 4,
            name: 'Backlit Pillar 1',
            status: 'Active'
        },
        {
            id: 5,
            name: 'Inshop',
            status: 'Active'
        },
        {
            id: 6,
            name: 'Wall Branding 1',
            status: 'Active'
        },
        {
            id: 7,
            name: 'Live 1',
            status: 'Active'
        },
        {
            id: 8,
            name: 'Service Door',
            status: 'Active'
        }
    ];

    const brandlocation1 = [
        {
            id: 1,
            name: 'Outside Entrance Top',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Entry opposite',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Entry Right',
            status: 'Active'
        },
        {
            id: 4,
            name: 'Entry Left',
            status: 'Active'
        },
        {
            id: 5,
            name: 'Building Top Right',
            status: 'Active'
        },
        {
            id: 6,
            name: 'Building Top Left',
            status: 'Active'
        },
        {
            id: 7,
            name: 'Outside Entrance Right',
            status: 'Active'
        }
    ];

    const brand1 = [
        {
            id: 1,
            name: 'Poorvika',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Samsung',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Nokia',
            status: 'Active'
        },
        {
            id: 4,
            name: 'Apple',
            status: 'Active'
        },
        {
            id: 5,
            name: 'Lava',
            status: 'Active'
        },
        {
            id: 6,
            name: 'Building Top Left',
            status: 'Active'
        },
        {
            id: 7,
            name: 'Outside Entrance Right',
            status: 'Active'
        }
    ];
    return (
        <Box sx={{ m: isMobile ? -2 : 0 }}>
            {/* <ApiComponent apiUrl={HoardingListapi} onDataFetched={setHoarding} /> */}
            <ApiComponent apiUrl={Showroomapi} onDataFetched={setShowroomnames} />
            <ApiComponent apiUrl={Brandapi} onDataFetched={setBrandname} />
            <ApiComponent apiUrl={Classapi} onDataFetched={setClassname} />
            <ApiComponent apiUrl={BrandTypeapi} onDataFetched={setBrandtype} />
            <ApiComponent apiUrl={BrandLocationapi} onDataFetched={setBrandlocation} />
            <ApiComponent apiUrl={Lightapi} onDataFetched={setLighttype} />
            <ApiComponent apiUrl={Vendorapi} onDataFetched={setVendor} />
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
                                    Add Advertisement
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <BackButton />
                </Stack>
            </Card>
            <br></br>
            <Card sx={{ width: '100%', boxShadow: 0, p: isMobile ? 2 : 4 }}>
                <Box>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        {/* <Grid item xs={12} md={12} xl={12}></Grid> */}
                        <Grid item xs={12} md={6} xl={3}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="brandloc-select-label">
                                    Scale
                                </InputLabel>
                                <Select
                                    labelid="brandloc-select-label"
                                    id="Scale"
                                    name="Scale"
                                    value={brandlocationvalue}
                                    onChange={(e) => setBrandlocationvalue(e.target.value)}
                                    label="Scale"
                                >
                                    <MenuItem value="">
                                        <em>Select a Scale</em>
                                    </MenuItem>
                                    <MenuItem value="cm">cm</MenuItem> <MenuItem value="inch">inch</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} xl={3}>
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
                        <Grid item xs={12} md={6} xl={3}>
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
                        <Grid item xs={12} md={6} xl={3}>
                            <TextField
                                label="Depth"
                                id="Depth"
                                name="Depth"
                                value={depth}
                                onChange={(e) => setDepth(e.target.value)}
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

                        <Grid item xs={12} md={6} xl={3}>
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
                                    {brandtype1 && brandtype1 !== undefined
                                        ? brandtype1.map((option, index) => (
                                              <MenuItem key={index} value={option.id}>
                                                  {option.name}
                                              </MenuItem>
                                          ))
                                        : 'No Data'}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} xl={3}>
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
                                    {brandlocation1 && brandlocation1 !== undefined
                                        ? brandlocation1.map((option, index) => (
                                              <MenuItem key={index} value={option.id}>
                                                  {option.name}
                                              </MenuItem>
                                          ))
                                        : 'No Data'}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} xl={3}>
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
                                    label="Branding Location"
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
                        <Grid item xs={12} md={6} xl={3}>
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

                        <Grid item xs={12} md={6} xl={3}>
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
                        <Grid item xs={12} md={6} xl={3}>
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
                        <Grid item xs={12} md={6} xl={3}>
                            <TextField
                                fullWidth
                                id="ad_image"
                                label="Ad Image"
                                type="file"
                                onChange={handleImageChange}
                                inputProps={{ accept: 'image/*' }}
                                className={classes.input}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} md={6} xl={3}>
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

                        <Grid item xs={12} md={6} xl={4}>
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
                        <Grid item xs={12} sm={6} md={6} xl={4}>
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
                        <Grid item xs={12} md={12} xl={4}>
                            <TextField
                                label="Notes"
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
                        <Grid item xs={12} md={12} xl={12}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                                    <FormControlLabel value="Need Scafolding" control={<Radio />} label="Need Scafolding" />
                                    <FormControlLabel value="Need Electrician" control={<Radio />} label="Need Electrician" />
                                    <FormControlLabel value="Approvals/Permissions" control={<Radio />} label="Approvals/Permissions" />
                                </RadioGroup>
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
        </Box>
    );
};

export default withAuth(SamplePage);
