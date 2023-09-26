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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import BackButton from '../../BackButton';
import ApiComponent from '../apicomp/ApiComponent';
import {
    BrandLocationapi,
    BrandTypeapi,
    Brandapi,
    Classapi,
    Lightapi,
    Materialapi,
    OutletMediaFormapi,
    Showroomapi,
    Vendorapi,
    Statusapi
} from '../apicomp/Apiurls';
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
    const fileInputRef = useRef(null);
    let { id } = useParams();
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(-1);
    };

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };
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

    const [status, setStatus] = useState('');
    const [status1, setStatus1] = useState([]);
    const [comments, setComments] = useState('');
    const [image, setImage] = useState([]);

    const userID = localStorage.getItem('id');
    const [matData, setMatData] = React.useState([
        {
            Height: '',
            created_by: userID,
            modified_by: userID,
            Width: '',
            ad_image: '',
            brand: '',
            branding_location: '',
            branding_type: '',
            class_name: '',
            expiry_on: '',
            light_Type: '',
            material: '',
            model_product_name: '',
            other_Comments: '',
            showroom: '',
            status: ''
        }
    ]);

    const [adImage, setAdImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAdImage(file);
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleConfirmSubmit = () => {
        handleOpenDialog();
    };

    const [openDialogdelete, setOpenDialogdelete] = useState(false);
    const [selectedRowIddel, setSelectedRowIddel] = React.useState(null);
    const handleDeleteSubmit = (id) => {
        handleOpenDialogdelete(id);
    };

    const handleOpenDialogdelete = (id) => {
        setSelectedRowIddel(id);
        setOpenDialogdelete(true);
    };

    const handleCloseDialogdelete = () => {
        setOpenDialogdelete(false);
    };
    const handleConfirmDelete = () => {
        setOpenDialogdelete(true);
    };

    const url = OutletMediaFormapi;
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

    useEffect(() => {
        const handleDataFetched = (data) => {
            setShowroomnames(data);
            setClassname(data);
            setBrandname(data);
            setBrandtype(data);
            setBrandlocation(data);
            setLighttype(data);
            setStatus1(data);
            setVendor(data);
            setMaterial(data);
        };

        return () => {
            setShowroomnames([]);
            setClassname([]);
            setBrandname([]);
            setBrandtype([]);
            setStatus1([]);
            setBrandlocation([]);
            setLighttype([]);
            setVendor([]);
            setMaterial([]);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        const formData = new FormData();

        formData.append('Width', matData.Width);
        formData.append('Height', matData.Height);
        formData.append('status', matData.status);
        formData.append('other_Comments', matData.other_Comments);
        formData.append('class_name', matData.class_name);
        formData.append('showroom', matData.showroom);
        formData.append('model_product_name', matData.model_product_name);
        formData.append('branding_type', matData.branding_type);
        formData.append('brand', matData.brand);
        formData.append('branding_location', matData.branding_location);
        formData.append('material', matData.material);
        formData.append('light_Type', matData.light_Type);
        formData.append('vendor', matData.vendor);
        formData.append('expiry_on', matData.expiry_on);

        formData.append('created_by', userID);
        formData.append('modified_by', userID);

        if (adImage) {
            formData.append('ad_image', adImage);
            Axios.put(`${OutletMediaFormapi}${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${token}`
                }
            })
                .then((response) => {
                    console.log(response.data);
                    setResponseMessage('SuccesssFully Outlet Adform Updated');

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                })
                .catch((error) => {
                    if (error.response) {
                        const statusCode = error.response.status;

                        if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                            setStatusCode(statusCode);
                            // setOpen(false);
                            // setSelectedRowId(false);
                            //setOpenModal(false);
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
        } else {
            Axios.put(`${OutletMediaFormapi}${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${token}`
                }
            })
                .then((response) => {
                    console.log(response.data);
                    setResponseMessage('SuccesssFully Outlet Adform Updated');

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                })
                .catch((error) => {
                    if (error.response) {
                        const statusCode = error.response.status;

                        if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                            setStatusCode(statusCode);
                            // setOpen(false);
                            // setSelectedRowId(false);
                            // setOpenModal(false);
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
        }
    };

    return (
        <>
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <ApiComponent apiUrl={Showroomapi} onDataFetched={setShowroomnames} />
            <ApiComponent apiUrl={Brandapi} onDataFetched={setBrandname} />
            <ApiComponent apiUrl={Classapi} onDataFetched={setClassname} />
            <ApiComponent apiUrl={Statusapi} onDataFetched={setStatus1} />
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
                })}{' '}
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
            <Card sx={{ width: '100%', boxShadow: 0, p: 2 }}>
                <div>
                    <br></br>
                    <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
                        <Grid item xs={12} md={6} xl={4}>
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="class-select-label">
                                    class
                                </InputLabel>
                                <Select
                                    labelid="class-select-label"
                                    id="class_name"
                                    value={matData && matData.class_name ? matData.class_name : ''}
                                    onChange={(e) => setMatData({ ...matData, class_name: e.target.value })}
                                    label="Class"
                                    name="class_name"
                                >
                                    <MenuItem value="">
                                        <em>Select a class</em>
                                    </MenuItem>

                                    {classname && Array.isArray(classname) && classname.length > 0 ? (
                                        classname.map((option, index) => (
                                            <MenuItem key={index} value={option?.id}>
                                                {option?.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No Data</MenuItem>
                                    )}
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
                                    value={matData && matData.showroom ? matData.showroom : ''}
                                    onChange={(e) => setMatData({ ...matData, showroom: e.target.value })}
                                    label="Showroom Location"
                                >
                                    <MenuItem value="">
                                        <em>Select a location</em>
                                    </MenuItem>

                                    {showroomnames && Array.isArray(showroomnames) && showroomnames.length > 0 ? (
                                        showroomnames.map((option, index) => (
                                            <MenuItem key={index} value={option?.id}>
                                                {option?.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No Data</MenuItem>
                                    )}
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
                                    value={matData && matData.branding_type ? matData.branding_type : ''}
                                    onChange={(e) => setMatData({ ...matData, branding_type: e.target.value })}
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
                                    value={matData && matData.branding_location ? matData.branding_location : ''}
                                    onChange={(e) => setMatData({ ...matData, branding_location: e.target.value })}
                                    label="Branding Location"
                                >
                                    <MenuItem value="">
                                        <em>Select a brand location</em>
                                    </MenuItem>

                                    {brandlocation && Array.isArray(brandlocation) && brandlocation.length > 0 ? (
                                        brandlocation.map((option, index) => (
                                            <MenuItem key={index} value={option?.id}>
                                                {option?.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No Data</MenuItem>
                                    )}
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
                                    value={matData && matData.brand ? matData.brand : ''}
                                    onChange={(e) => setMatData({ ...matData, brand: e.target.value })}
                                    label="Brand"
                                >
                                    <MenuItem value="">
                                        <em>Select a brand</em>
                                    </MenuItem>

                                    {brandname && Array.isArray(brandname) && brandname.length > 0 ? (
                                        brandname.map((option, index) => (
                                            <MenuItem key={index} value={option ? option.id : ''}>
                                                {option ? option.name : ''}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No Data</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="Model product Name"
                                id="model_product_name"
                                name="model_product_name"
                                value={matData && matData.model_product_name ? matData.model_product_name : ''}
                                onChange={(e) => setMatData({ ...matData, model_product_name: e.target.value })}
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
                                value={matData && matData.Width ? matData.Width : ''}
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
                                value={matData && matData.Height ? matData.Height : ''}
                                onChange={(e) => setMatData({ ...matData, Height: e.target.value })}
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
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="material-select-label">
                                    Material
                                </InputLabel>
                                <Select
                                    labelid="material-select-label"
                                    id="material"
                                    name="material"
                                    value={matData && matData.material ? matData.material : ''}
                                    onChange={(e) => setMatData({ ...matData, material: e.target.value })}
                                    label="Material"
                                >
                                    <MenuItem value="">
                                        <em>Select a location</em>
                                    </MenuItem>

                                    {material && Array.isArray(material) && material.length > 0 ? (
                                        material.map((option, index) => (
                                            <MenuItem key={index} value={option ? option.id : ''}>
                                                {option ? option.name : ''}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No Data</MenuItem>
                                    )}
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
                                    value={matData && matData.light_Type ? matData.light_Type : ''}
                                    onChange={(e) => setMatData({ ...matData, light_Type: e.target.value })}
                                    label="Light Type"
                                >
                                    <MenuItem value="">
                                        <em>Select a location</em>
                                    </MenuItem>

                                    {lighttype && Array.isArray(lighttype) && lighttype.length > 0 ? (
                                        lighttype.map((option, index) => (
                                            <MenuItem key={index} value={option ? option.id : ''}>
                                                {option ? option.name : ''}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No Data</MenuItem>
                                    )}
                                </Select>
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
                                    value={matData && matData.status ? matData.status : ''}
                                    onChange={(e) => setMatData({ ...matData, status: e.target.value })}
                                    label="Status"
                                >
                                    <MenuItem value="">
                                        <em>Select a status</em>
                                    </MenuItem>
                                    {status1 && Array.isArray(status1) && status1.length > 0 ? (
                                        status1.map((option, index) => (
                                            <MenuItem key={index} value={option?.id}>
                                                {option?.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No Data</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                label="Other Comments"
                                id="other_Comments"
                                name="other_Comments"
                                value={matData && matData.other_Comments ? matData.other_Comments : ''}
                                onChange={(e) => setMatData({ ...matData, other_Comments: e.target.value })}
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
                            {/* <FormControl fullWidth variant="outlined" size="small" className={classes.select1}>
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
                                    // InputLabelProps={{
                                    //     classes: {}
                                    // }}
                                />
                            </FormControl> */}
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
                                    value={matData && matData.vendor ? matData.vendor : ''}
                                    onChange={(e) => setMatData({ ...matData, vendor: e.target.value })}
                                    label="Vendor"
                                >
                                    <MenuItem value="">
                                        <em>Select a vendor</em>
                                    </MenuItem>

                                    {vendor && Array.isArray(vendor) && vendor.length > 0 ? (
                                        vendor.map((option, index) => (
                                            <MenuItem key={index} value={option ? option.id : ''}>
                                                {option ? option.name : ''}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No Data</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} xl={4}>
                            <TextField
                                id="expiry_on"
                                name="expiry_on"
                                type="date"
                                value={matData && matData.expiry_on ? matData.expiry_on : ''}
                                onChange={(e) => setMatData({ ...matData, expiry_on: e.target.value })}
                                label="Expiry On"
                            />
                        </Grid>
                        <Grid item xs={12} md={4} xl={4}>
                            <br></br>
                            <br></br>
                            <Card sx={{ boxShadow: 2 }}>
                                {matData.ad_image ? (
                                    <CardMedia component="img" image={matData.ad_image} alt="adimage" sx={{ height: 140 }} />
                                ) : (
                                    'No Image'
                                )}
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Ad Image
                                    </Typography>
                                </CardContent>
                            </Card>
                            <br></br>
                        </Grid>

                        <Dialog
                            open={openDialog}
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure want to update this Outlet Ad?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog}>No</Button>
                                <Button onClick={handleSubmit}>Submit</Button>
                            </DialogActions>
                        </Dialog>

                        <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                                {' '}
                                <Button
                                    className={classes.Button}
                                    variant="contained"
                                    onClick={handleConfirmSubmit}
                                    startIcon={<FileUploadOutlinedIcon />}
                                >
                                    Update
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </div>
            </Card>
        </>
    );
};

export default withAuth(SamplePage);
