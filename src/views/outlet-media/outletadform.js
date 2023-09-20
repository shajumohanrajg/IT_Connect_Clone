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

    const [itemList, setItemList] = useState({
        items: [
            {
                asset_image: null,
                model_product_name: '',
                expiry_on: '',
                Width: '0',
                Height: '0',
                other_Comments: '',
                outlet_media: 1,
                brand: '',
                vendor: '',
                ad_status: ''
            }
        ]
    });

    const handleNestedItemChange = (index, field, value) => {
        const updatedItems = [...itemList.items];
        updatedItems[index][field] = value;

        setItemList({
            ...itemList,
            items: updatedItems
        });
    };

    const handleImageChange = (index, file) => {
        const updatedItems = [...itemList.items];
        updatedItems[index].image = file;

        setItemList({
            ...itemList,
            items: updatedItems
        });
    };

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };

    // const handleImageChange = (event) => {
    //     setImage(event.target.files[0]);
    // };

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

    const handleSubmit1 = async (e) => {
        // const token = localStorage.getItem('token');
        // const userID = localStorage.getItem('id');
        e.preventDefault();

        const formData = new FormData();

        formData.append('status', 2);
        formData.append('class_name', classvalue);
        formData.append('showroom', showroomlocation);
        formData.append('branding_type', brandtypevalue);
        formData.append('branding_location', brandlocationvalue);
        formData.append('material', materialvalue);
        formData.append('light_Type', lighttypevalue);
        // formData.append('Height', height);
        // formData.append('Width', width);
        // formData.append('ad_image', image);
        // formData.append('other_Comments', comments);
        // formData.append('model_product_name', modelname);
        // formData.append('brand', brandvalue);
        // formData.append('vendor', vendorvalue);
        // formData.append('expiry_on', expirevalue);

        // Append add_item111 nested data
        formData.append('add_item111', itemList.items);

        // itemList.items.forEach((item, index) => {
        //     formData.append(`add_item111[${index}][model_product_name]`, item.model_product_name);
        //     formData.append(`add_item111[${index}][expiry_on]`, item.expiry_on);
        //     formData.append(`add_item111[${index}][Width]`, item.Width);
        //     formData.append(`add_item111[${index}][Height]`, item.Height);
        //     formData.append(`add_item111[${index}][other_Comments]`, item.other_Comments);
        //     formData.append(`add_item111[${index}][brand]`, item.brand);
        //     formData.append(`add_item111[${index}][vendor]`, item.vendor);
        //     formData.append(`add_item111[${index}][ad_status]`, item.ad_status);
        //     // formData.append(`add_item111[${index}][outlet_media]`, item.outlet_media);
        //     // if (item.asset_image) {
        //     formData.append(`add_item111[${index}][asset_image]`, item.asset_image);
        //     formData.append(`add_item111[${index}][created_by]`, 3);
        //     formData.append(`add_item111[${index}][modified_by]`, 3);
        //     // }
        // });
        formData.append('created_by', 3);
        formData.append('modified_by', 3);

        try {
            const response = await Axios.post('http://10.8.1.168:4321/api/v1/OMM2/List_1_view/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token 97f23484e85c62bd547fad0c912c875e8cc28708`
                    // Authorization: `Token ${token}`
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
                console.log(statusCode);
                if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                    setStatusCode(statusCode);
                    // setOpen(false);
                    // setSelectedRowId(false);
                    // setOpenModal(false);
                    // setOpenDialog(false);
                    setShowDialog(true);
                } else {
                    alert('An unexpected error occurred. Please try again laterr.');
                }
            } else {
                alert('An unexpected error occurred. Please try again later.');
            }
            console.error(error);
        }
    };
    const handleItemChange = (e, index) => {
        const list = [...itemList.items];
        list[index][e.target.name] = e.target.value;
        setItemList({ ...itemList, items: list });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token 97f23484e85c62bd547fad0c912c875e8cc28708`
            // Authorization: `Token ${token}`
        };
        // const objects = idofshowroom.map((value) => ({ showroom: value }));
        Axios.post(
            'http://10.8.1.168:4321/api/v1/OMM2/List_1_view/',
            {
                // formData.append('class_name', classvalue);
                // formData.append('showroom', showroomlocation);
                // formData.append('branding_type', brandtypevalue);
                // formData.append('branding_location', brandlocationvalue);
                // formData.append('material', materialvalue);
                // formData.append('light_Type', lighttypevalue);
                status: 2,
                class_name: classvalue,
                //org_name: orgname,
                showroom: showroomlocation,
                branding_type: brandtypevalue,
                branding_location: brandlocationvalue,
                material: materialvalue,
                light_Type: lighttypevalue,
                //status: 2,
                add_item111: lighttypevalue,
                // add_item111: itemList.items,
                // add_item111: itemList.items.map((item) => ({
                //     brand: item.brand,
                //     Width: item.Width,
                //     Height: item.Height,
                //     model_product_name: item.model_product_name,
                //     ad_image: item.ad_image,
                //     ad_status: item.ad_status,
                //     vendor: item.vendor,
                //     expiry_on: item.expiry_on,
                //     other_Comments: item.other_Comments
                // })),
                created_by: 3,
                modified_by: 3
            },
            { headers }
        ).then(
            (response) => {
                console.log(response.data);

                // history.push('/dashboard/po');
                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);
            },
            (error) => {
                console.log(error);
            }
        );
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
                        <Grid item xs={12} md={6} xl={6}>
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
                        <Grid item xs={12} md={6} xl={6}>
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
                        <br></br>

                        {itemList.items.map((item, index) => (
                            <Grid container spacing={3} justifyContent="center" alignItems="center" key={index} sx={{ p: 3 }}>
                                <Grid item xs={12} md={6} xl={4}>
                                    <FormControl fullWidth className={classes.select}>
                                        <InputLabel className={classes.label} id="brand-select-label">
                                            Brand
                                        </InputLabel>
                                        <Select
                                            labelid="brand-select-label"
                                            id="brand"
                                            name="brand"
                                            // value={brandvalue}
                                            // onChange={(e) => setBrandvalue(e.target.value)}
                                            value={item.brand}
                                            //onChange={(e) => handleNestedItemChange(index, 'brand', e.target.value)}
                                            // onClick={()=>setSearch_index(index)}
                                            // value={items.unit_price===0?"":items.unit_price}
                                            onChange={(e) => handleItemChange(e, index)}
                                            label="Brand"
                                        >
                                            <MenuItem value="">
                                                <em>Select a brand location</em>
                                            </MenuItem>

                                            {brandname && Array.isArray(brandname) && brandname.length > 0 ? (
                                                brandname.map((option, index) => (
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
                                        label="Width"
                                        id="Width"
                                        name="Width"
                                        // value={width}
                                        // onChange={(e) => setWidth(e.target.value)}
                                        value={item.Width}
                                        // onChange={(e) => handleNestedItemChange(index, 'Width', e.target.value)}
                                        onChange={(e) => handleItemChange(e, index)}
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
                                        // value={height}
                                        // onChange={(e) => setHeight(e.target.value)}
                                        value={item.Height}
                                        // onChange={(e) => handleNestedItemChange(index, 'Height', e.target.value)}
                                        onChange={(e) => handleItemChange(e, index)}
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
                                    <TextField
                                        label="Model product Name"
                                        id="model_product_name"
                                        name="model_product_name"
                                        // value={modelname}
                                        // onChange={(e) => setModelname(e.target.value)}
                                        value={item.model_product_name}
                                        // onChange={(e) => handleNestedItemChange(index, 'model_product_name', e.target.value)}
                                        onChange={(e) => handleItemChange(e, index)}
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
                                    {/* <FormControl fullWidth variant="outlined" size="small" className={classes.select1}> */}
                                    {/* <InputLabel className={classes.label} id="adimage">
                                            Asset Image
                                        </InputLabel> */}
                                    <TextField
                                        labelid="adimage"
                                        id="asset_image"
                                        type="file"
                                        name="asset_image"
                                        inputProps={{ accept: 'image/*' }}
                                        // startAdornment={
                                        //     <InputAdornment position="start">
                                        //         <PhotoCameraIcon />
                                        //     </InputAdornment>
                                        // }
                                        // onChange={handleImageChange}
                                        onChange={(e) => handleImageChange(index, e.target.files[0])}
                                        fullWidth
                                        variant="outlined"
                                        label="Asset Image"
                                        InputLabelProps={{
                                            shrink: 'true',
                                            classes: {}
                                        }}
                                    />
                                    {/* </FormControl> */}
                                </Grid>
                                <Grid item xs={12} md={6} xl={4}>
                                    <FormControl fullWidth className={classes.select}>
                                        <InputLabel className={classes.label} id="status-select-label">
                                            Status
                                        </InputLabel>
                                        <Select
                                            labelid="status-select-label"
                                            id="ad_status"
                                            name="ad_status"
                                            // value={status}
                                            // onChange={(e) => setStatus(e.target.value)}
                                            value={item.ad_status}
                                            // onChange={(e) => handleNestedItemChange(index, 'ad_status', e.target.value)}
                                            onChange={(e) => handleItemChange(e, index)}
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

                                <Grid item xs={12} md={6} xl={4}>
                                    <FormControl fullWidth className={classes.select}>
                                        <InputLabel className={classes.label} id="vendor-select-label">
                                            Vendor
                                        </InputLabel>
                                        <Select
                                            labelid="vendor-select-label"
                                            id="vendor"
                                            name="vendor"
                                            // value={vendorvalue}
                                            // onChange={(e) => setVendorvalue(e.target.value)}
                                            value={item.vendor}
                                            // onChange={(e) => handleNestedItemChange(index, 'vendor', e.target.value)}
                                            onChange={(e) => handleItemChange(e, index)}
                                            label="Vendor"
                                        >
                                            <MenuItem value="">
                                                <em>Select a vendor</em>
                                            </MenuItem>

                                            {vendor && Array.isArray(vendor) && vendor.length > 0 ? (
                                                vendor.map((option, index) => (
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
                                <Grid item xs={12} md={6} xl={4}>
                                    <TextField
                                        fullWidth
                                        id="expiry_on"
                                        name="expiry_on"
                                        type="date"
                                        // value={expirevalue}
                                        // onChange={(e) => setExpirevalue(e.target.value)}
                                        value={item.expiry_on}
                                        // onChange={(e) => handleNestedItemChange(index, 'expiry_on', e.target.value)}
                                        onChange={(e) => handleItemChange(e, index)}
                                        inputProps={{
                                            shrink: 'true'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} xl={4}>
                                    <TextField
                                        label="Other Comments"
                                        id="other_Comments"
                                        name="other_Comments"
                                        // value={comments}
                                        // onChange={(e) => setComments(e.target.value)}
                                        value={item.other_Comments}
                                        // onChange={(e) => handleNestedItemChange(index, 'other_Comments', e.target.value)}
                                        onChange={(e) => handleItemChange(e, index)}
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
                            </Grid>
                        ))}

                        <Grid item xs={12} md={6} xl={4} sx={{ mt: 3 }}>
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
                        {/* <Grid item xs={12} md={6} xl={4}>
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
                        </Grid> */}
                        {/* 
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
                        </Grid> */}

                        {/* <Grid item xs={12} md={6} xl={4}>
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
                        </Grid> */}

                        {/* <Grid itemxs={12} md={6} xl={4}>
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
                        <Grid itemxs={12} md={6} xl={4}>
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
                        <Grid item xs={12} md={6} xl={4}>
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
                        </Grid> */}
                    </Grid>
                </Box>
            </Card>
        </div>
    );
};

export default withAuth(SamplePage);
