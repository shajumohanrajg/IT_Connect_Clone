import { OutlinedInput } from '@material-ui/core';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Box, Button, Card, IconButton, Modal, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { CheckCircle } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import ApiComponent from '../apicomp/ApiComponent';
import { AddAdvertisementFormapi, Brandapi, OutletMediaFormapi, OutletMediaListapi, Statusapi, Vendorapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { CardContent, Chip, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardStyle = styled(Card)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 10,

    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(0.9)'
    },

    '&::before': {
        content: '""',
        position: 'absolute',
        width: '7px',
        height: '20%',
        backgroundColor: theme.palette.primary.light,
        bottom: '0',
        right: '20px'
    },

    '&:before': {
        content: '""',
        position: 'absolute',
        width: '0',
        height: '20',
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent',
        borderBottom: `7px solid ${theme.palette.primary.dark}`,
        top: '0',
        right: '20px'
    }
}));
function DataTable() {
    const navigate = useNavigate();
    const [nestopen, setnestOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };

    const [value, setValue] = React.useState('1');

    const handletabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handlenestOpen = () => {
        setnestOpen(true);
    };

    const handlenestClose = () => {
        setnestOpen(false);
    };

    const columns1 = [
        {
            field: 'id',

            headerName: 'ID',
            cellClassName: 'super-app-theme--cell',
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'showroom',
            headerName: 'Showroom Location',

            width: 120
        },
        {
            field: 'branding_type',
            headerName: 'Brand Type',

            width: 120
        },
        {
            field: 'branding_location',
            headerName: 'Brand Location',

            width: 120
        },
        {
            field: 'brand',
            headerName: 'Brand',

            width: 120
        },
        {
            field: 'model_product_name',
            headerName: 'Modal Name',

            width: 120
        },
        {
            field: 'ad_image',
            headerName: 'Ad Image',
            width: 100,
            renderCell: (params) => (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <img
                    src={params.value}
                    alt="Row"
                    style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                    onClick={() => handleImageClick(params.value)}
                    onKeyDown={(e) => handleImageKeyDown(e, params.value)}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex="0"
                />
            )
        },

        {
            field: 'Width',
            headerName: 'Width',

            width: 120
        },
        {
            field: 'Height',
            headerName: 'Height',

            width: 120
        },
        {
            field: 'material',
            headerName: 'Material',

            width: 120
        },
        {
            field: 'light_Type',
            headerName: 'Light Type',

            width: 120
        },
        {
            headerName: 'Actions',
            field: 'action',

            width: 160,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <div>
                    <IconButton aria-label="view" size="large" onClick={() => viewShowrooms(params.id)}>
                        {/* <VisibilityIcon fontSize="small" /> */}
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="update" size="large" onClick={() => handleEditClick(params.id)}>
                        <AddCircleOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" size="large" onClick={() => handleDeleteSubmit(params.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </div>
            )
        }
    ];

    const [expandedRows, setExpandedRows] = React.useState([]);

    const handleRowExpand = (params) => {
        const expandedIds = params.map((param) => param.id);
        setExpandedRows(expandedIds);
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

    const deleteBrand = () => {
        const token = localStorage.getItem('token');

        Axios.delete(`${OutletMediaFormapi}${selectedRowIddel}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(() => {
                handleCloseDialogdelete();
                setResponseMessage('SuccesssFully Light Type Deleted');

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
                        setOpenDialogdelete(false);
                        setShowDialog(true);
                    } else {
                        alert('An unexpected error occurred. Please try again later.');
                    }
                } else {
                    alert('An unexpected error occurred. Please try again later.');
                }
                console.log(error);
            });
    };

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

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        e.preventDefault();

        const formData = new FormData();

        formData.append('outlet_media', selectedRowId);
        formData.append('asset_image', image);

        formData.append('ad_status', status);
        formData.append('comment', comments);
        formData.append('model_product_name', modelname);

        formData.append('brand', brandvalue);

        formData.append('vendor', vendorvalue);
        formData.append('expiry_on', expirevalue);
        formData.append('created_by', userID);
        formData.append('modified_by', userID);

        try {
            const response = await Axios.post(AddAdvertisementFormapi, formData, {
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
            if (error.response) {
                const statusCode = error.response.status;

                if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                    setStatusCode(statusCode);
                    // setOpen(false);
                    // setSelectedRowId(false);
                    // setOpenModal(false);
                    setnestOpen(false);
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

    const [selectedRowId, setSelectedRowId] = React.useState(null);
    const handleEditClick = (id) => {
        const token = localStorage.getItem('token');
        setSelectedRowId(id);

        Axios.get(`${OutletMediaFormapi}${id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${token}`
            }
        })
            .then((response) => {
                const data = response.data;

                setnestOpen(true);
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
                console.log('Error fetching data:', error);
            });
    };
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [modalOpen, setModalOpen] = React.useState(false);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };

    const viewShowrooms = (id) => {
        navigate(`/outletupdate/${id}`);
        window.location.reload();
    };

    const handleImageKeyDown = (event, imageUrl) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleImageClick(imageUrl);
        }
    };

    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [hoarding, setHoarding] = React.useState([]);

    useEffect(() => {
        const handleDataFetched = (data) => {
            setBrandname(data);
            setVendor(data);
            setStatus(data);
            setHoarding(data);
        };

        return () => {
            setStatus([]);
            setBrandname([]);
            setVendor([]);
            setHoarding([]);
        };
    }, []);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        Axios.get(OutletMediaListapi, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${token}`
            }
        }).then(
            (response) => {
                setHoarding(response.data);
                console.log('edition', response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    return (
        <>
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{}}>
                        <TabList onChange={handletabChange} aria-label="API tabs">
                            <Tab label="Card" value="1" />
                            <Tab label="Table" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ padding: 0 }}>
                        <br></br>
                        <Grid container spacing={2} maxWidth="xl">
                            <br></br>

                            {hoarding.length > 0 ? (
                                hoarding.map((item) => (
                                    <Grid container spacing={1} direction="row" pl={2} key={item.id}>
                                        <Grid item xs={12} sm={6} md={6} lg={4}>
                                            <Link href="/assetstatus" underline="none" sx={{ textTransform: 'none' }}>
                                                <CardStyle>
                                                    <CardContent>
                                                        <Grid container direction="column" spacing={1}>
                                                            <Grid item>
                                                                <Typography variant="h4">TN-EKTL</Typography>
                                                            </Grid>
                                                            <Grid container spacing={0} direction="row" sx={{ mt: 0, p: 2 }}>
                                                                <Grid item xs={12} md={12} xl={6}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: isMobile ? 13 : 14 }}>
                                                                        <span>DOB :</span>{' '}
                                                                        <span style={{ color: '#bfbfbf' }}>13-05-2015</span>
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12} md={12} xl={6}>
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        sx={{
                                                                            whiteSpace: 'nowrap',
                                                                            overflow: 'hidden',
                                                                            fontSize: isMobile ? 13 : 14
                                                                        }}
                                                                    >
                                                                        <span style={{}}>ASM :</span>{' '}
                                                                        <span style={{ color: '#bfbfbf' }}>Marimuthu</span>
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid container spacing={0} direction="row" sx={{ mt: 1 }}>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<PlaylistAddCheckCircleIcon fontSize="medium" color="info" />}
                                                                        label="16"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<CheckCircle fontSize="small" color="success" />}
                                                                        label="4"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<UnpublishedIcon fontSize="small" color="error" />}
                                                                        label="16"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<TripOriginIcon fontSize="small" color="primary" />}
                                                                        label="16"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </CardStyle>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={4}>
                                            <Link href="/assetstatus" underline="none" sx={{ textTransform: 'none' }}>
                                                <CardStyle>
                                                    <CardContent>
                                                        <Grid container direction="column" spacing={2}>
                                                            <Grid item>
                                                                <Typography variant="h4">TN-EKTL</Typography>
                                                            </Grid>
                                                            <Grid container spacing={0} direction="row" sx={{ mt: 0, p: 2 }}>
                                                                <Grid item xs={12} md={12} xl={6}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: isMobile ? 13 : 14 }}>
                                                                        <span>DOB :</span>{' '}
                                                                        <span style={{ color: '#bfbfbf' }}>13-05-2015</span>
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12} md={12} xl={6}>
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        sx={{
                                                                            whiteSpace: 'nowrap',
                                                                            overflow: 'hidden',
                                                                            fontSize: isMobile ? 13 : 14
                                                                        }}
                                                                    >
                                                                        <span style={{}}>ASM :</span>{' '}
                                                                        <span style={{ color: '#bfbfbf' }}>Marimuthu</span>
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid container spacing={0} direction="row" sx={{ mt: 1 }}>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<PlaylistAddCheckCircleIcon fontSize="medium" color="info" />}
                                                                        label="16"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<CheckCircle fontSize="small" color="success" />}
                                                                        label="4"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<UnpublishedIcon fontSize="small" color="error" />}
                                                                        label="16"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<TripOriginIcon fontSize="small" color="primary" />}
                                                                        label="16"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </CardStyle>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={4}>
                                            <Link href="/assetstatus" underline="none" sx={{ textTransform: 'none' }}>
                                                <CardStyle>
                                                    <CardContent>
                                                        <Grid container direction="column" spacing={2}>
                                                            <Grid item>
                                                                <Typography variant="h4">TN-EKTL</Typography>
                                                            </Grid>
                                                            <Grid container spacing={0} direction="row" sx={{ mt: 0, p: 2 }}>
                                                                <Grid item xs={12} md={12} xl={6}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: isMobile ? 13 : 14 }}>
                                                                        <span>DOB :</span>{' '}
                                                                        <span style={{ color: '#bfbfbf' }}>13-05-2015</span>
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12} md={12} xl={6}>
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        sx={{
                                                                            whiteSpace: 'nowrap',
                                                                            overflow: 'hidden',
                                                                            fontSize: isMobile ? 13 : 14
                                                                        }}
                                                                    >
                                                                        <span style={{}}>ASM :</span>{' '}
                                                                        <span style={{ color: '#bfbfbf' }}>Marimuthu</span>
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid container spacing={0} direction="row" sx={{ mt: 1 }}>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<PlaylistAddCheckCircleIcon fontSize="medium" color="info" />}
                                                                        label="16"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<CheckCircle fontSize="small" color="success" />}
                                                                        label="4"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<UnpublishedIcon fontSize="small" color="error" />}
                                                                        label="16"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<TripOriginIcon fontSize="small" color="primary" />}
                                                                        label="16"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </CardStyle>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={4}>
                                            <Link href="/assetstatus" underline="none" sx={{ textTransform: 'none' }}>
                                                <CardStyle>
                                                    <CardContent>
                                                        <Grid container direction="column" spacing={2}>
                                                            <Grid item>
                                                                <Typography variant="h4">TN-EKTL</Typography>
                                                            </Grid>
                                                            <Grid container spacing={0} direction="row" sx={{ mt: 0, p: 2 }}>
                                                                <Grid item xs={12} md={12} xl={6}>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: isMobile ? 13 : 14 }}>
                                                                        <span>DOB :</span>{' '}
                                                                        <span style={{ color: '#bfbfbf' }}>13-05-2015</span>
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12} md={12} xl={6}>
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        sx={{
                                                                            whiteSpace: 'nowrap',
                                                                            overflow: 'hidden',
                                                                            fontSize: isMobile ? 13 : 14
                                                                        }}
                                                                    >
                                                                        <span style={{}}>ASM :</span>{' '}
                                                                        <span style={{ color: '#bfbfbf' }}>Marimuthu</span>
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid container spacing={0} direction="row" sx={{ mt: 1 }}>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<PlaylistAddCheckCircleIcon fontSize="medium" color="info" />}
                                                                        label="16"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<CheckCircle fontSize="small" color="success" />}
                                                                        label="4"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<UnpublishedIcon fontSize="small" color="error" />}
                                                                        label="16"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                                    <Chip
                                                                        icon={<TripOriginIcon fontSize="small" color="primary" />}
                                                                        label="16"
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            border: '1px solid #ebebeb'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </CardStyle>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12} sm={12} md={12}>
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
                                                    <ListItemText>
                                                        {' '}
                                                        <Typography variant="h3" sx={{ color: '#444444' }}>
                                                            No Data Available.
                                                        </Typography>
                                                    </ListItemText>
                                                </ListItem>
                                            </List>
                                        </Stack>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: 0 }}>
                        <Card sx={{ boxShadow: 0 }}>
                            <Box
                                height="60vh"
                                width="100%"
                                fontWeight={10}
                                sx={{
                                    p: 2,
                                    height: isSmallScreen ? '90vh' : '60vh',
                                    width: '100%',
                                    borderRadius: 5,
                                    '& .MuiDataGrid-root': {
                                        border: 'none',
                                        padding: 1
                                    },
                                    '& .super-app-theme--header': {},
                                    '& .super-app-theme--cell': {},
                                    '& .MuiDataGrid-cell': {
                                        borderBottom: 'none !important',

                                        color: 'black',
                                        fontWeight: '550 !important'
                                    },
                                    '& .name-column--cell': {
                                        variant: 'button',
                                        fontWeight: 'medium',
                                        color: 'ButtonText'
                                    },
                                    '& .MuiDataGrid-columnHeaders': {},

                                    '.MuiDataGrid-columnHeaderTitle': {
                                        color: 'white',
                                        width: 'auto',
                                        paddingTop: '12px',
                                        paddingBottom: '10px',

                                        textAlign: 'left',
                                        fontSize: '0.80rem',
                                        fontWeight: 700,
                                        opacity: 0.7,
                                        background: 'transparent',
                                        color: '#8392ab',
                                        borderRadius: 'none',
                                        borderBottom: '0.0625rem solid #e9ecef'
                                    },
                                    '& .MuiDataGrid-virtualScroller': {
                                        overflowX: 'auto',
                                        '&::-webkit-scrollbar': {
                                            width: '4px',
                                            backgroundColor: '#F5F5F5'
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            borderRadius: '4px'
                                        }
                                    },
                                    '& .MuiDataGrid-footerContainer': {
                                        color: '#8392ab',
                                        border: 'none'
                                    },
                                    '& .MuiDataGrid-columnSeparator': {
                                        visibility: 'hidden'
                                    },
                                    '&.MuiDataGrid-pagination': {
                                        width: '20px !important'
                                    },

                                    '&.MuiDataGrid-virtualScroller': {
                                        opacity: 0,
                                        transition: 'opacity 0.2s'
                                    },
                                    '&.MuiTablePagination-root': {
                                        width: '20px'
                                    },

                                    '&.MuiDataGrid-virtualScroller:hover': {
                                        opacity: 1
                                    },
                                    '& .MuiTablePagination-select': {
                                        width: '10px !important'
                                    },
                                    '& .MuiTablePagination-selectIcon': {
                                        display: 'none'
                                    },

                                    '&.MuiDataGrid-toolbar .MuiDataGrid-menuList': {
                                        padding: 0
                                    },

                                    '& .MuiDataGrid-toolbar .MuiButtonBase-root': {
                                        fontSize: '14px',
                                        color: '#333'
                                    },

                                    '& .MuiDataGrid-toolbar .MuiButtonBase-root:hover': {
                                        backgroundColor: '#f0f0f0'
                                    }
                                }}
                            >
                                <DataGrid
                                    rows={hoarding}
                                    columns={columns1}
                                    pageSize={5}
                                    getRowId={(row) => row.id}
                                    components={{
                                        Toolbar: GridToolbar,
                                        color: 'primary'
                                    }}
                                    componentsProps={{
                                        toolbar: {
                                            showQuickFilter: true,
                                            quickFilterProps: { debounceMs: 500 },
                                            color: 'primary'
                                        }
                                    }}
                                    disableSelectionOnClick={true}
                                    loading={loading}
                                    disableColumnFilter={isSmallScreen ? true : false}
                                    disableDensitySelector={isSmallScreen ? true : false}
                                    virtualization
                                    isRowExpandable={() => true}
                                    renderRowExpanded={(params) => <ExpandableContent data={params.row} />}
                                    onRowExpand={handleRowExpand}
                                    expandedRows={expandedRows}
                                />
                            </Box>
                        </Card>
                    </TabPanel>
                </TabContext>
            </Box>
            <Card sx={{ width: '100%', boxShadow: 0 }}>
                {responseMessage &&
                    Swal.fire({
                        title: 'success',
                        text: responseMessage,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })}
                <ApiComponent apiUrl={OutletMediaListapi} onDataFetched={setHoarding} />
                <ApiComponent apiUrl={Brandapi} onDataFetched={setBrandname} />
                <ApiComponent apiUrl={Statusapi} onDataFetched={setStatus} />
                <ApiComponent apiUrl={Vendorapi} onDataFetched={setVendor} />

                <Modal open={modalOpen} onClose={handleCloseModal}>
                    <div>
                        <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
                    </div>
                </Modal>

                <Modal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <div style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
                        <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        <IconButton
                            onClick={handleCloseModal}
                            style={{ position: 'absolute', top: 10, right: 10, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                </Modal>
                <Modal
                    open={nestopen}
                    onClose={handlenestClose}
                    aria-labelledby="responsive-modal-title"
                    aria-describedby="responsive-modal-description"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            margin: isMobile ? '20px' : '100px',
                            padding: '20px',
                            maxWidth: isMobile ? '90%' : '500px',
                            maxHeight: isMobile ? '85vh' : 'initial',
                            overflowY: isMobile ? 'auto' : 'initial'
                        }}
                    >
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.Button} sx={{ bgcolor: '#1a5f7a', color: 'white' }}>
                                        A
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h3"> Add Advertisement</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                        <Card sx={{ width: '100%', boxShadow: 0, p: 2 }}>
                            <Box>
                                <Grid container spacing={3} justifyContent="center" alignItems="center">
                                    <Grid item xs={12} md={12} xl={12}>
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
                                    <Grid item xs={12} md={12} xl={12}>
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

                                    <Grid item xs={12} md={12} xl={12}>
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
                                    <Grid item xs={12} md={12} xl={12}>
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

                                    <Grid item xs={12} md={12} xl={12}>
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
                                    <Grid item xs={12} md={12} xl={12}>
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
                </Modal>

                <Dialog
                    open={openDialogdelete}
                    onClose={handleCloseDialogdelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure want to Delete this assigned job id #{selectedRowIddel}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialogdelete}>No</Button>
                        <Button onClick={deleteBrand}>Submit</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure want to update this assigned job id #{selectedRowId}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>No</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </>
    );
}

export default withAuth(DataTable);
