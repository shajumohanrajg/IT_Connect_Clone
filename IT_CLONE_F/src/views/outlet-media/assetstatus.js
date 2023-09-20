import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import TripOriginTwoToneIcon from '@mui/icons-material/TripOriginTwoTone';
import { Box, Card, Link, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { Fab, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { makeStyles } from '@mui/styles';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Branding1 from '../../../src/assets/images/branding1.png';
import Branding2 from '../../../src/assets/images/branding2.png';
import ApiComponent from '../apicomp/ApiComponent';
import {
    AddAdvertisementFormapi,
    Brandapi,
    OutletMediaFormapi,
    OutletMediaListapi,
    Showroomapi,
    Statusapi,
    Vendorapi
} from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(1)
        }
    },
    searchField: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1)
        }
    },
    pagination: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center'
    },
    cardst: {
        borderRadius: 10,
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(0.9)'
        }
    },
    fabbutton: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999
    }
}));
function DataTable() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navigate = useNavigate();
    const [nestopen, setnestOpen] = useState(false);

    const handlenestOpen = () => {
        setnestOpen(true);
    };

    const handlenestClose = () => {
        setnestOpen(false);
    };

    const columns1 = [
        {
            field: 'name',
            headerName: 'Showroom',

            width: isMobile ? 100 : 120
        },
        {
            field: 'branding_type',
            headerName: 'Total',

            width: isMobile ? 80 : 120
        },
        {
            field: 'branding_location',
            headerName: 'Active',

            width: isMobile ? 80 : 120
        },
        {
            field: 'brand',
            headerName: 'Expired',

            width: isMobile ? 80 : 120
        },
        {
            field: 'brandi',
            headerName: 'Empty',

            width: isMobile ? 80 : 120
        }
    ];

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
            .catch((err) => {
                console.log(err);
            });
    };

    const rowClassName = (params) => {
        return {
            backgroundColor: params.rowIndex % 2 === 0 ? '#f5f5f5' : 'inherit'
        };
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
            setShowroomnames(data);
            setVendor(data);
            setStatus(data);
            setHoarding(data);
        };

        return () => {
            setStatus([]);
            setShowroomnames([]);
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

    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showGrid, setShowGrid] = useState(true);

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const filteredShowrooms = showroomnames.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const totalItems = filteredShowrooms.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const showroomsToDisplay = filteredShowrooms.slice(startIndex, endIndex);

    const handleToggleDisplay = () => {
        setShowGrid((prevShowGrid) => !prevShowGrid);
    };

    const Assetstatus = [
        {
            id: 1,
            title: 'Wall Branding 2',
            assetid: '11795',
            status: 'Expired',
            location: 'Entry Left',
            material: 'Vinyl With Sunboard',
            brand: 'Vivo',
            model: 'V27/Y100',
            img: Branding2,
            icon: <TripOriginTwoToneIcon sx={{ color: 'red' }} fontSize="medium" />
        },
        {
            id: 2,
            title: 'Name Board',
            assetid: '11786',
            status: 'Active',
            location: 'Outide Entrance',
            material: 'LED -Mono',
            brand: 'Vivo',
            model: 'Poorvika',
            img: Branding1,
            icon: <TripOriginTwoToneIcon sx={{ color: 'green' }} fontSize="medium" />
        },
        {
            id: 3,
            title: 'Wall Branding 2',
            assetid: '11795',
            status: 'Expired',
            location: 'Entry Left',
            material: 'Vinyl With Sunboard',
            brand: 'Vivo',
            model: 'V27/Y100',
            img: Branding2,
            icon: <TripOriginTwoToneIcon sx={{ color: 'red' }} fontSize="medium" />
        },
        {
            id: 4,
            title: 'Name Board',
            assetid: '11786',
            status: 'Active',
            location: 'Outide Entrance',
            material: 'LED -Mono',
            brand: 'Vivo',
            model: 'Poorvika',
            img: Branding1,
            icon: <TripOriginTwoToneIcon sx={{ color: 'green' }} fontSize="medium" />
        }
    ];
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    return (
        <>
            <Box sx={{ m: isMobile ? -2 : 0 }}>
                {responseMessage &&
                    Swal.fire({
                        title: 'success',
                        text: responseMessage,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })}
                <ApiComponent apiUrl={OutletMediaListapi} onDataFetched={setHoarding} />
                <ApiComponent apiUrl={Brandapi} onDataFetched={setBrandname} />
                <ApiComponent apiUrl={Showroomapi} onDataFetched={setShowroomnames} />
                <ApiComponent apiUrl={Statusapi} onDataFetched={setStatus} />
                <ApiComponent apiUrl={Vendorapi} onDataFetched={setVendor} />{' '}
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
                                    <Typography variant="h3" sx={{ color: '#444444', fontSize: isMobile ? 20 : 22 }}>
                                        Marketing Asset Status
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                        {isMobile ? (
                            <Fab color="primary" aria-label="add" size="medium" className={classes.fabbutton} href="/addad">
                                <AddIcon sx={{ color: 'white' }} />
                            </Fab>
                        ) : (
                            ''
                        )}
                    </Stack>
                </Card>
                <br></br>
                <Grid container spacing={2} sx={{ p: 0 }}>
                    {Assetstatus.map((item) => (
                        <Grid item sm={6} xs={12} md={6} lg={4} sx={{ p: 0 }} key={item.id}>
                            <Link href="/assetindstatus" underline="none" sx={{ textTransform: 'none' }}>
                                <Card sx={{ width: '100%', my: 0, border: '1px solid #ebebeb' }} className={classes.cardst}>
                                    <List>
                                        <ListItem>
                                            <ListItemText>
                                                {' '}
                                                <Typography variant="h5" sx={{ color: '#ff8b3d', fontWeight: 'bold' }}>
                                                    {item.title} <span style={{ color: 'gray' }}>({item.assetid})</span>
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                    <Card sx={{ boxShadow: 0, p: 0, borderTop: '1px solid #ebebeb' }}>
                                        <Grid container spacing={1} sx={{ p: 1 }}>
                                            <Grid item sm={5} xs={6} md={5} sx={{ p: 0 }} justifyContent="center" alignItems="center">
                                                <Grid container direction="column" alignItems="center" spacing={1}>
                                                    <Grid item xs={12}>
                                                        <img
                                                            src={item.img}
                                                            alt="Yosfge"
                                                            style={{
                                                                width: '100%',
                                                                height: '110px',
                                                                border: '1px dashed #ebebeb'
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="subtitle2" align="center" style={{ color: 'gray' }}>
                                                            160" x 92"
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Divider>
                                                            <Box sx={{ border: '1px solid #ebebeb', p: 1, borderRadius: 3 }}>
                                                                <ListItem disablePadding align="center" color="primary">
                                                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                                                    <ListItemText
                                                                        primary={
                                                                            <Typography variant="subtitle2" fontWeight="bold">
                                                                                {item.status}
                                                                            </Typography>
                                                                        }
                                                                        sx={{ fontWeight: 'bold' }}
                                                                    />
                                                                </ListItem>
                                                            </Box>
                                                        </Divider>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item sm={7} xs={6} md={6}>
                                                <Grid container spacing={0}>
                                                    <Grid item sm={12} xs={12} md={12}>
                                                        <ListItemText
                                                            primary="Location"
                                                            secondary={item.location}
                                                            primaryTypographyProps={{ variant: 'h5' }}
                                                            secondaryTypographyProps={{ variant: 'h6' }}
                                                        />
                                                    </Grid>
                                                    <Grid item sm={12} xs={12} md={12} justifyContent="">
                                                        <ListItemText
                                                            primary="Material"
                                                            secondary={item.material}
                                                            primaryTypographyProps={{ variant: 'h5' }}
                                                            secondaryTypographyProps={{ variant: 'h6' }}
                                                        />
                                                    </Grid>
                                                    <Grid item sm={12} xs={12} md={12}>
                                                        <ListItemText
                                                            primary="Brand"
                                                            secondary={item.brand}
                                                            primaryTypographyProps={{ variant: 'h5' }}
                                                            secondaryTypographyProps={{ variant: 'h6' }}
                                                        />
                                                    </Grid>
                                                    <Grid item sm={12} xs={12} md={12}>
                                                        <ListItemText
                                                            primary="Model"
                                                            secondary={item.model}
                                                            primaryTypographyProps={{ variant: 'h5' }}
                                                            secondaryTypographyProps={{ variant: 'h6' }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default withAuth(DataTable);
