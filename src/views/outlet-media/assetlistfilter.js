import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Card, Chip, Link, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import Fab from '@mui/material/Fab';

import { Grid, Pagination, TextField } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import PaginationItem from '@mui/material/PaginationItem';

import { styled } from '@mui/material/styles';

import { makeStyles } from '@mui/styles';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useStyles from '../styles/styles';

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

const styles = {
    card: {
        width: 200,
        height: 200,
        background: 'lightblue',
        borderRadius: 10,
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    }
};

const CardStyle = styled(Card)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 10,
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
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

// const useStyles = makeStyles((theme) => ({
//     tableContainer: {
//         marginTop: theme.spacing(2),
//         [theme.breakpoints.down('sm')]: {
//             marginTop: theme.spacing(1)
//         }
//     },
//     searchField: {
//         marginBottom: theme.spacing(2),
//         [theme.breakpoints.down('sm')]: {
//             marginBottom: theme.spacing(1)
//         }
//     },
//     pagination: {
//         marginTop: theme.spacing(2),
//         display: 'flex',
//         justifyContent: 'center'
//     },
//     fabbutton: {
//         position: 'fixed',
//         bottom: '20px',
//         right: '20px',
//         zIndex: 999
//     }
// }));
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

            width: isMobile ? 100 : 150,
            renderCell: (params) => {
                const name = params.value;
                return (
                    <Link href="/assetstatus" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                        {name}
                    </Link>
                );
            }
        },
        {
            field: 'total',
            headerName: 'Total',

            width: isMobile ? 80 : 120
        },
        {
            field: 'active',
            headerName: 'Active',

            width: isMobile ? 80 : 120
        },
        {
            field: 'expired',
            headerName: 'Expired',

            width: isMobile ? 80 : 120
        },
        {
            field: 'empty',
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

    const dummydata = [
        {
            id: 1,
            name: 'TN-EKTL',
            total: '16',
            active: '6',
            expired: '7',
            empty: '1'
        },
        {
            id: 2,
            name: 'TN-PORUR',
            total: '8',
            active: '5',
            expired: '2',
            empty: '1'
        },
        {
            id: 3,
            name: 'TN-POONAMALLEE',
            total: '9',
            active: '3',
            expired: '5',
            empty: '0'
        },
        {
            id: 4,
            name: 'TN-KANCHIPURAM',
            total: '20',
            active: '6',
            expired: '9',
            empty: '2'
        },
        {
            id: 5,
            name: 'TN-VADAPALANI',
            total: '4',
            active: '4',
            expired: '0',
            empty: '0'
        },
        {
            id: 6,
            name: 'TN-EKTL',
            total: '16',
            active: '6',
            expired: '7',
            empty: '1'
        },
        {
            id: 7,
            name: 'TN-PORUR',
            total: '8',
            active: '5',
            expired: '2',
            empty: '1'
        },
        {
            id: 8,
            name: 'TN-POONAMALLEE',
            total: '9',
            active: '3',
            expired: '5',
            empty: '0'
        },
        {
            id: 9,
            name: 'TN-KANCHIPURAM',
            total: '20',
            active: '6',
            expired: '9',
            empty: '2'
        },
        {
            id: 10,
            name: 'TN-VADAPALANI',
            total: '4',
            active: '4',
            expired: '0',
            empty: '0'
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
            model: 'V27/Y100'
        },
        {
            id: 2,
            title: 'Name Board',
            assetid: '11786',
            status: 'Active',
            location: 'Outide Entrance',
            material: 'LED -Mono',
            brand: 'Vivo',
            model: 'Poorvika'
        },
        {
            id: 3,
            title: 'Wall Branding 2',
            assetid: '11795',
            status: 'Expired',
            location: 'Entry Left',
            material: 'Vinyl With Sunboard',
            brand: 'Vivo',
            model: 'V27/Y100'
        },
        {
            id: 4,
            title: 'Name Board',
            assetid: '11786',
            status: 'Active',
            location: 'Outide Entrance',
            material: 'LED -Mono',
            brand: 'Vivo',
            model: 'Poorvika'
        }
    ];
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

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const statusOptions = ['Active', 'Expired', 'Empty Space', 'On Brand Escalation'];
    const brandOptions = ['Apple', 'Samsung', 'LG', 'Sony', 'Haier'];
    const asmOptions = ['Lalitha', 'Ramkumar', 'Rajeshwari', 'Alex', 'Clara', 'Sebastin.A'];
    const storeStatusOptions = ['Active stores', 'Closed stores'];

    const [selectedStatus, setSelectedStatus] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedASMs, setSelectedASMs] = useState([]);
    const [selectedStoreStatus, setSelectedStoreStatus] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleResetFilters = () => {
        setSelectedStatus([]);
        setSelectedBrands([]);
        setSelectedASMs([]);
        setSelectedStoreStatus([]);
        setSearchText('');
    };

    const handleStatusChipClick = (option) => {
        if (selectedStatus.includes(option)) {
            setSelectedStatus(selectedStatus.filter((filter) => filter !== option));
        } else {
            setSelectedStatus([...selectedStatus, option]);
        }
    };

    const handleBrandChipClick = (option) => {
        if (selectedBrands.includes(option)) {
            setSelectedBrands(selectedBrands.filter((filter) => filter !== option));
        } else {
            setSelectedBrands([...selectedBrands, option]);
        }
    };

    const handleASMChipClick = (option) => {
        if (selectedASMs.includes(option)) {
            setSelectedASMs(selectedASMs.filter((filter) => filter !== option));
        } else {
            setSelectedASMs([...selectedASMs, option]);
        }
    };

    const handleStoreStatusChipClick = (option) => {
        if (selectedStoreStatus.includes(option)) {
            setSelectedStoreStatus(selectedStoreStatus.filter((filter) => filter !== option));
        } else {
            setSelectedStoreStatus([...selectedStoreStatus, option]);
        }
    };

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSortByChipClick = (option) => {
        setSortBy(option);
    };

    const handleSortOrderToggle = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const data = [
        {
            id: 1,
            name: 'TN-EKTL',
            asm: 'Lalitha',
            status: 'Active',
            brand: 'Apple',
            storeStatus: 'Active stores',
            dob: '22-07-2017'
        },
        {
            id: 2,
            name: 'TN-Porur',
            asm: 'Ramkumar',
            status: 'Expired',
            brand: 'Samsung',
            storeStatus: 'Closed stores',
            dob: '22-07-2017'
        },
        {
            id: 3,
            name: 'TN-Poonamallee',
            asm: 'Rajeshwari',
            status: 'Empty Space',
            brand: 'LG',
            storeStatus: 'Active stores',
            dob: '22-07-2017'
        }
    ];

    const filteredData = data
        .filter((item) => {
            const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(item.status);
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(item.brand);
            const matchesASM = selectedASMs.length === 0 || selectedASMs.includes(item.asm);
            const matchesStoreStatus = selectedStoreStatus.length === 0 || selectedStoreStatus.includes(item.storeStatus);
            const matchesSearchText =
                searchText === '' ||
                item.brand.toLowerCase().includes(searchText.toLowerCase()) ||
                item.asm.toLowerCase().includes(searchText.toLowerCase()) ||
                item.status.toLowerCase().includes(searchText.toLowerCase());

            return matchesStatus && matchesBrand && matchesASM && matchesStoreStatus && matchesSearchText;
        })
        .sort((a, b) => {
            if (sortBy === 'id') {
                if (sortOrder === 'asc') {
                    return a.id - b.id;
                } else {
                    return b.id - a.id;
                }
            } else {
                const compareResult = a[sortBy].localeCompare(b[sortBy]);
                return sortOrder === 'asc' ? compareResult : -compareResult;
            }
        });
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
                <ApiComponent apiUrl={Vendorapi} onDataFetched={setVendor} />

                <Card sx={{ width: '100%', boxShadow: 0 }}>
                    <Stack
                        display="flex"
                        alignItems="center"
                        direction={{ sm: 'column', md: 'row' }}
                        justifyContent="space-between"
                        sx={{
                            padding: 1
                        }}
                    >
                        <List>
                            <ListItem>
                                <ListItemText>
                                    {' '}
                                    <Typography variant="h3" sx={{ color: '#444444', fontSize: isMobile ? 18 : 22 }}>
                                        sample data with filter
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                        <Chip
                            label={sortOrder === 'asc' ? 'A to Z' : 'Z to A'}
                            onClick={handleSortOrderToggle}
                            color="primary"
                            variant="outlined"
                            icon={sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                        />
                        <TextField value={searchText} onChange={handleSearchTextChange} label="Search" variant="outlined" margin="dense" />
                    </Stack>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography>Search by Filter</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    {' '}
                                    <h3>Status:</h3>
                                    {statusOptions.map((option) => (
                                        <Chip
                                            key={option}
                                            label={option}
                                            onClick={() => handleStatusChipClick(option)}
                                            color={selectedStatus.includes(option) ? 'primary' : 'default'}
                                            variant={selectedStatus.includes(option) ? 'filled' : 'outlined'}
                                        />
                                    ))}
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <h3>Brand:</h3>
                                    {brandOptions.map((option) => (
                                        <Chip
                                            key={option}
                                            label={option}
                                            onClick={() => handleBrandChipClick(option)}
                                            color={selectedBrands.includes(option) ? 'primary' : 'default'}
                                            variant={selectedBrands.includes(option) ? 'filled' : 'outlined'}
                                        />
                                    ))}
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <h3>ASM:</h3>
                                    {asmOptions.map((option) => (
                                        <Chip
                                            key={option}
                                            label={option}
                                            onClick={() => handleASMChipClick(option)}
                                            color={selectedASMs.includes(option) ? 'primary' : 'default'}
                                            variant={selectedASMs.includes(option) ? 'filled' : 'outlined'}
                                        />
                                    ))}
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <h3>Store Status:</h3>
                                    {storeStatusOptions.map((option) => (
                                        <Chip
                                            key={option}
                                            label={option}
                                            onClick={() => handleStoreStatusChipClick(option)}
                                            color={selectedStoreStatus.includes(option) ? 'primary' : 'default'}
                                            variant={selectedStoreStatus.includes(option) ? 'filled' : 'outlined'}
                                        />
                                    ))}
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <h3>Sort By:</h3>
                                    <div>
                                        {['name', 'asm', 'status', 'brand', 'storeStatus', 'id'].map((option) => (
                                            <Chip
                                                key={option}
                                                label={option}
                                                onClick={() => handleSortByChipClick(option)}
                                                color={sortBy === option ? 'primary' : 'default'}
                                                variant={sortBy === option ? 'filled' : 'outlined'}
                                            />
                                        ))}
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <br></br>
                                    <Button variant="outlined" onClick={handleResetFilters} size="small">
                                        Reset
                                    </Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Card>

                <br></br>
                <Grid container spacing={1}>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <Grid item xs={12} sm={6} md={6} xl={4} lg={6} key={item.id}>
                                <Link href="/assetstatus" underline="none" sx={{ textTransform: 'none' }}>
                                    <Card sx={{ width: '100%', my: 0, border: '1px solid #ebebeb' }}>
                                        <List>
                                            <ListItem>
                                                <ListItemText>
                                                    {' '}
                                                    <Typography variant="h5" sx={{ color: '#ff8b3d', fontWeight: 'bold' }}>
                                                        {item.name}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                        </List>
                                        <Card sx={{ boxShadow: 0, p: 2, borderTop: '1px solid #ebebeb' }}>
                                            <Grid container spacing={0} direction="row" sx={{ mt: 0 }}>
                                                <Grid item xs={12} sm={12} md={12} lg={6}>
                                                    <Typography variant="subtitle1" sx={{ fontSize: isMobile ? 13 : 14 }}>
                                                        <span>DOB :</span> <span style={{ color: '#bfbfbf' }}>{item.dob}</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={6}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            fontSize: isMobile ? 13 : 14
                                                        }}
                                                    >
                                                        <span style={{}}>ASM :</span> <span style={{ color: '#bfbfbf' }}>{item.asm}</span>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={0} direction="row" sx={{ mt: 0 }}>
                                                <Grid item xs={12} sm={12} md={12} lg={6}>
                                                    <Typography variant="subtitle1" sx={{ fontSize: isMobile ? 13 : 14 }}>
                                                        <span>Status :</span> <span style={{ color: '#bfbfbf' }}>{item.status}</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={6}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            fontSize: isMobile ? 13 : 14
                                                        }}
                                                    >
                                                        <span style={{}}>Brand :</span>{' '}
                                                        <span style={{ color: '#bfbfbf' }}>{item.brand}</span>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Card>
                                </Link>
                            </Grid>
                        ))
                    ) : (
                        <Card sx={{ width: '100%', boxShadow: 0, p: 3 }}>
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                                sx={{ padding: 1 }}
                            >
                                <div>
                                    <List>
                                        <ListItem>
                                            <ListItemText>
                                                {' '}
                                                <Typography variant="h3" sx={{ color: '#444444', fontSize: isMobile ? 20 : 22 }}>
                                                    No Results Found.
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                </div>
                            </Stack>
                        </Card>
                    )}
                    <br></br>
                    {totalItems > itemsPerPage && (
                        <Grid item sm={12} xs={12} md={12} lg={12} xl={12} mt={2}>
                            <Card sx={{ width: '100%', boxShadow: 0, p: 3 }}>
                                <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        shape="rounded"
                                        color="secondary"
                                        renderItem={(item) => (
                                            <PaginationItem
                                                slots={{ previous: ArrowLeftOutlinedIcon, next: ArrowRightOutlinedIcon }}
                                                {...item}
                                            />
                                        )}
                                    />
                                </Stack>
                            </Card>
                        </Grid>
                    )}
                </Grid>
                <Fab color="primary" aria-label="add" size="medium" className={classes.fabbutton1} href="/addad">
                    <AddIcon sx={{ color: 'white' }} />
                </Fab>
            </Box>
        </>
    );
}

export default withAuth(DataTable);
