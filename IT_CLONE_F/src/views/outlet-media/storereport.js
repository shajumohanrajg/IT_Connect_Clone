import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

import InfoIcon from '@mui/icons-material/Info';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import TripOriginTwoToneIcon from '@mui/icons-material/TripOriginTwoTone';
import { Box, Button, Card, IconButton, Modal, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { FormControl, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import Divider from '@mui/material/Divider';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { makeStyles } from '@mui/styles';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Branding from '../../../src/assets/images/branding.png';
import Branding1 from '../../../src/assets/images/branding1.png';
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
    }
}));
function DataTable() {
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const [nestopen, setnestOpen] = useState(false);
    const [nestopen1, setnestOpen1] = useState(false);

    const handlenestOpen = () => {
        setnestOpen(true);
    };

    const handlenestClose = () => {
        setnestOpen(false);
    };

    const handlenestOpen1 = () => {
        setnestOpen1(true);
    };

    const handlenestClose1 = () => {
        setnestOpen1(false);
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
    const Storereports = [
        {
            id: 1,
            title: 'Store Exterior',
            caption: 'Store Exterior,elevation & Signages',
            updateddate: '02/03/2022',
            link: '/assetstaus',
            onclick: handlenestOpen
        },
        {
            id: 2,
            title: 'Store Interior',
            caption: 'Floors,Lighting,Ambience,Maintanence,Look & Feel',
            updateddate: '02/03/2022',
            link: '/assetstaus',
            onclick: handlenestOpen1
        },
        {
            id: 3,
            title: 'Displays',
            caption: 'Shelves,Visual Marchandisings,Product display & more',
            updateddate: '02/03/2022',
            link: '/assetstaus'
        },
        {
            id: 4,
            title: 'Live Counters',
            caption: 'Live Products,counters,maintanence,demo modes & more',
            updateddate: '02/03/2022',
            link: '/assetstaus'
        },
        {
            id: 5,
            title: 'Promotional Materials & Brandings',
            caption: 'Standees,Inshops,Table tops,Pamphlets etc...',
            updateddate: '02/03/2022',
            link: '/assetstaus'
        },
        {
            id: 6,
            title: 'Brand Culture & SOPs',
            caption: 'Customer greetings,Staff groooming ,Attentiveness etc...',
            updateddate: '02/03/2022',
            link: '/assetstaus'
        }
    ];

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
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    return (
        <>
            {' '}
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
                        justifyContent="flex-start"
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
                                        Store Report
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Stack>
                </Card>
                <br></br>
                <Grid container spacing={1} sx={{ p: 0 }}>
                    {Storereports.map((item) => (
                        <Grid item sm={12} xs={12} md={12} lg={6} sx={{ p: 0 }} key={item.id}>
                            <Card sx={{ width: '100%', my: 0, border: '1px solid #ebebeb', borderRadius: 0 }} onClick={item.onclick}>
                                <List sx={{ borderLeft: '3px solid gray' }}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete">
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText primary={item.title} secondary={item.caption} />
                                    </ListItem>
                                    <Box sx={{ pl: 2 }} alignItems="left" justifyContent="left">
                                        <ListItemText variant="caption">Last Updated : {item.updateddate}</ListItemText>
                                    </Box>
                                </List>
                            </Card>
                            {/* </Link> */}
                        </Grid>
                    ))}
                </Grid>
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
                                        <AddAPhotoOutlinedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h3">Store Exterior</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                        <Card sx={{ width: '100%', boxShadow: 0, p: 2 }}>
                            <Box>
                                <Grid container spacing={3} justifyContent="center" alignItems="center">
                                    <Grid item xs={12} md={12} xl={12} sx={{ p: 0 }}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">1.Store Signage current condition</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="Very Bad" control={<Radio />} label="Very Bad" />
                                                <FormControlLabel value="Bad" control={<Radio />} label="Bad" />
                                                <FormControlLabel value="Average" control={<Radio />} label="Average" />
                                                <FormControlLabel value="Good" control={<Radio />} label="Good" />
                                                <FormControlLabel value="Looks New" control={<Radio />} label="Looks New" />
                                            </RadioGroup>
                                        </FormControl>
                                        <Divider />
                                        <br></br>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">2.Is the signage clean & working</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                        <Divider />
                                        <br></br>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">
                                                3.Glass facade is clean without finger prints & pasted communication(Vinyl /A4 Prints etc){' '}
                                            </FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                        <Divider />
                                        <br></br>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">
                                                4.Is the passed and entrance to the store is clear without any hindrances or obstacles?
                                            </FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12} xl={12} sx={{ p: 0 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Button variant="contained">Skip</Button>
                                            <Button variant="contained">Continue</Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </div>
                </Modal>
                <Modal
                    open={nestopen1}
                    onClose={handlenestClose1}
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
                        {/* <Typography variant="h5" id="responsive-modal-title" gutterBottom>
                        Add Advertisement
                    </Typography> */}

                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.Button} sx={{ bgcolor: '#1a5f7a', color: 'white' }}>
                                        <AddAPhotoOutlinedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h3">Store Interior</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                        <Card sx={{ width: '100%', boxShadow: 0, p: 2 }}>
                            <Box>
                                <Grid container spacing={3} justifyContent="center" alignItems="center">
                                    <Grid item xs={12} md={12} xl={12} sx={{ p: 0 }}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">1.Store Signage current condition</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                        <Divider />
                                        <br></br>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">2.Does the store smell nice</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                        <Divider />
                                        <br></br>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">
                                                3.Aiseles are clearly defined and free of clutter
                                            </FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                        <Divider />
                                        <br></br>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">
                                                4.All the products in the shop floor are easily accessible
                                            </FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                        <Divider />
                                        <br></br>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">
                                                5.is all the counters ,tables Shelves and products are clean and dust free?
                                            </FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12} xl={12} sx={{ p: 0 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Button variant="contained">Skip</Button>
                                            <Button variant="contained">Continue</Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </div>
                </Modal>
            </Box>
        </>
    );
}

export default withAuth(DataTable);
