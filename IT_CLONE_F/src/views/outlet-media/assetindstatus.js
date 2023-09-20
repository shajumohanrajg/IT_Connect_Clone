import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import TripOriginTwoToneIcon from '@mui/icons-material/TripOriginTwoTone';
import { Timeline as MuiTimeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Box, Card, CardContent, CardMedia, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import Fab from '@mui/material/Fab';

import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import CardHeader from '@mui/material/CardHeader';

import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import { styled } from '@mui/material/styles';

import { makeStyles } from '@mui/styles';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Branding from '../../../src/assets/images/branding.png';
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
import DialogBox from './DialogBox';
import OrderTimeline from './timeline1';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    })
}));
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
    fabbutton: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999
    },
    listItem: {
        fontWeight: 'bold',
        transition: 'transform 0.3s', // Adding a smooth transition
        '&:hover': {
            backgroundColor: '#fff2ea',
            fontWeight: 'bold',
            transform: 'scale(1.1)', // Zoom effect on hover,
            boxShadow: 4
        }
    }
}));
function DataTable() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const [nestopen, setnestOpen] = useState(false);

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
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
                if (error.response) {
                    const statusCode = error.response.status;

                    if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                        setStatusCode(statusCode);
                        setOpen(false);
                        setShowDialog(true);
                    } else {
                        alert('An unexpected error occurred. Please try again later.');
                    }
                } else {
                    alert('An unexpected error occurred. Please try again later.');
                }
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
            img: Branding,
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
            img: Branding,
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

    const timelineData = [
        {
            date: '28-02-2023',
            status: 'Expired',
            model: 'Vivo',
            brand: 'V27/Y100',
            vendor: 'Other',
            updated: '16-08-2022'
        },
        {
            date: '11-05-2022',
            status: 'Expired',
            model: 'General',
            brand: 'Poorvika',
            vendor: 'Digital Images',
            updated: '01-02-2021'
        }
    ];
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    return (
        <>
            {' '}
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <Fab color="primary" aria-label="add" size="medium" className={classes.fabbutton} href="/addad">
                <AddIcon sx={{ color: 'white' }} />
            </Fab>
            <Box sx={{ m: isMobile ? -2 : 0 }}>
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
                    </Stack>
                </Card>
                <br></br>
                <Card sx={{ boxShadow: 0, borderTop: '1px solid #ebebeb', p: isMobile ? 0 : 2 }}>
                    <Box>
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
                        <Grid container spacing={2} direction="row">
                            <Grid item sm={12} xs={12} md={6} lg={3}>
                                <Card sx={{ border: '1px solid #ebebeb', height: '100%' }}>
                                    <CardHeader
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title="Wall Branding 2"
                                        subheader="Expired"
                                    />
                                    <CardMedia component="img" image={Branding2} alt="Branding" />
                                    {/* <CardMedia component="img" height="" image={Branding2} alt="Paella dish" /> */}
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            Branding Image With Expired Status
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item sm={12} xs={12} md={6} lg={4} direction="column">
                                <Card sx={{ width: '100%', my: 0, border: '1px solid #ebebeb', height: '100%' }}>
                                    <List>
                                        <ListItem>
                                            <ListItemText>
                                                {' '}
                                                <Typography variant="h5" sx={{ color: '#ff8b3d', fontWeight: 'bold' }}>
                                                    Branding Details
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                    <Card sx={{ boxShadow: 0, p: 0, borderTop: '1px solid #ebebeb' }}>
                                        <Grid container spacing={0} direction="row">
                                            <Grid item sm={12} xs={12} md={6} lg={6}>
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem className={classes.listItem}>
                                                        <ListItemText primary="Asset ID" secondary="11795" />
                                                    </ListItem>
                                                    <ListItem className={classes.listItem}>
                                                        <ListItemText primary="Size(W x H x D)" secondary="160 x 92" />
                                                    </ListItem>
                                                    <ListItem className={classes.listItem}>
                                                        <ListItemText primary="Location" secondary="Entry Left" />
                                                    </ListItem>
                                                    <ListItem className={classes.listItem}>
                                                        <ListItemText primary="Material" secondary="Vinyl With Sunboard" />
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                            <Grid item sm={12} xs={12} md={6} lg={6}>
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem className={classes.listItem}>
                                                        <ListItemText primary="Brand" secondary="Vivo" />
                                                    </ListItem>
                                                    <ListItem className={classes.listItem}>
                                                        <ListItemText primary="Model" secondary="V27/Y100" />
                                                    </ListItem>
                                                    <ListItem className={classes.listItem}>
                                                        <ListItemText primary="Vendor" secondary="Techno Signs Pvt Ltd" />
                                                    </ListItem>
                                                    <ListItem className={classes.listItem}>
                                                        <ListItemText primary="Status" secondary="Expired" />
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Card>
                            </Grid>

                            <Grid item sm={12} xs={12} md={6} lg={4}>
                                <Card sx={{ width: '100%', my: 0, border: '1px solid #ebebeb', height: '100%' }}>
                                    <List>
                                        <ListItem>
                                            <ListItemText>
                                                {' '}
                                                <Typography variant="h5" sx={{ color: '#ff8b3d', fontWeight: 'bold' }}>
                                                    Ticket Details
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                    <Card sx={{ boxShadow: 0, p: 0, borderTop: '1px solid #ebebeb', height: '100%' }}>
                                        <ListItem>
                                            <ListItemText primary="Created By" secondary="Vijay - Manager" />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText primary="Ticket Date" secondary="31-04-2023" />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText primary="Remarks" secondary="Old inshop, need to change to new model" />
                                        </ListItem>
                                    </Card>
                                </Card>
                            </Grid>
                            {/* <Grid item sm={12} xs={12} md={6} lg={4}>
                                <Card sx={{ width: '100%', my: 0, border: '1px solid #ebebeb', height: '100%' }}>
                                    <List>
                                        <ListItem>
                                            <ListItemText>
                                                {' '}
                                                <Typography variant="h5" sx={{ color: '#ff8b3d', fontWeight: 'bold' }}>
                                                    Asset History
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                    <Card sx={{ boxShadow: 0, p: 0, borderTop: '1px solid #ebebeb', height: '100%' }}>
                                        <MuiTimeline
                                            align="left"
                                            sx={{
                                                [`& .${timelineItemClasses.root}:before`]: {
                                                    flex: 0,
                                                    padding: 0
                                                }
                                            }}
                                        >
                                            {timelineData.map((item, index) => (
                                                <TimelineItem key={index}>
                                                    <TimelineSeparator>
                                                        <TimelineDot color="primary" />
                                                        {index !== timelineData.length - 1 && <TimelineConnector />}
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                        <Typography variant="h5" component="span">
                                                            {item.date}
                                                        </Typography>
                                                        <Typography variant="subtitle2">
                                                            <span style={{ fontWeight: 'bold' }}>Status</span> - {item.status}
                                                        </Typography>
                                                        <Typography variant="subtitle2">
                                                            <span style={{ fontWeight: 'bold' }}>Brand</span> - {item.brand}
                                                        </Typography>
                                                        <Typography variant="subtitle2">
                                                            <span style={{ fontWeight: 'bold' }}>Model</span> - {item.model}
                                                        </Typography>
                                                        <Typography variant="subtitle2">
                                                            <span style={{ fontWeight: 'bold' }}>Vendor</span> - {item.vendor}
                                                        </Typography>
                                                        <Typography variant="subtitle2">
                                                            <span style={{ fontWeight: 'bold' }}>Updated</span> - {item.updated}
                                                        </Typography>
                                                    </TimelineContent>
                                                </TimelineItem>
                                            ))}
                                        </MuiTimeline>
                                    </Card>
                                </Card>
                            </Grid> */}
                            <Grid item sm={12} xs={12} md={6} lg={3}>
                                <Card sx={{ width: '100%', my: 0, border: '1px solid #ebebeb', height: '100%' }}>
                                    <List>
                                        <ListItem>
                                            <ListItemText>
                                                {' '}
                                                <Typography variant="h5" sx={{ color: '#ff8b3d', fontWeight: 'bold' }}>
                                                    Asset History
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                    <Card sx={{ boxShadow: 0, p: 0, borderTop: '1px solid #ebebeb', height: '100%' }}>
                                        <OrderTimeline />
                                    </Card>
                                </Card>
                            </Grid>
                            {/* <Grid item sm={12} xs={12} md={6} lg={3}>
                                <OrderTimeline />
                            </Grid> */}
                        </Grid>
                    </Box>
                </Card>
            </Box>
        </>
    );
}

export default withAuth(DataTable);
