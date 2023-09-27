import { CheckCircle } from '@mui/icons-material';

import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import ViewWeekTwoToneIcon from '@mui/icons-material/ViewWeekTwoTone';
import { Box, Card, CardContent, Chip, Link, Typography, useMediaQuery, useTheme } from '@mui/material';

import { Grid, InputAdornment, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { styled } from '@mui/material/styles';

import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import ApiComponent from '../apicomp/ApiComponent';
import SolutionCard from './assetlistcard';
import { outletlist, dummydata, assetdata } from './datalists';
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

// const styles = {
//     card: {
//         width: 200,
//         height: 200,
//         background: 'lightblue',
//         borderRadius: 10,
//         boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
//         transition: 'transform 0.3s ease',
//         animation: 'none !important',
//         '&:hover': {
//             transform: 'scale(1.1)'
//         }
//     }
// };

const CardStyle = styled(Card)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 10,
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease-in-out',
    animation: 'none !important',
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

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
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
            .catch((error) => {
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
                        setOpen(false);
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

    //const classes = useStyles();
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

    const filteredData = assetdata
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
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
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
                    <Box
                        display="flex"
                        alignItems="center"
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
                                        Store Wise Assets List
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>

                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <ToggleButtonGroup
                                exclusive
                                value={showGrid ? 'watch_list_columns' : 'watch_list_rows'}
                                onChange={handleToggleDisplay}
                                aria-label="Display"
                            >
                                <ToggleButton disableRipple value="watch_list_columns">
                                    <ViewWeekTwoToneIcon />
                                </ToggleButton>
                                <ToggleButton disableRipple value="watch_list_rows">
                                    <TableRowsTwoToneIcon />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    </Box>
                </Card>

                <Card sx={{ width: '100%', boxShadow: 0, backgroundColor: 'transparent' }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent={{ sm: 'center', xs: 'center', md: 'flex-end', lg: 'flex-end' }}
                        sx={{
                            padding: 1
                        }}
                    >
                        {' '}
                        <TextField
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder="Search Store name.."
                            id="outlined-search"
                            label="Search"
                            type="search"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Card>

                <br></br>
                {showGrid ? (
                    <Grid container spacing={2} direction="row">
                        {outletlist.map((item) => (
                            <Grid item xs={12} sm={12} md={6} xl={4} lg={6} key={item.id}>
                                <Link href="/assetstatus" underline="none" sx={{ textTransform: 'none' }}>
                                    <CardStyle>
                                        <CardContent>
                                            <Grid container direction="column" spacing={1}>
                                                <Grid item>
                                                    <Typography variant="h4">{item.name}</Typography>
                                                </Grid>
                                                <Grid container spacing={0} direction="row" sx={{ mt: 0, p: 2 }}>
                                                    <Grid item xs={12} md={12} xl={6}>
                                                        <Typography variant="subtitle1" sx={{ fontSize: isMobile ? 13 : 14 }}>
                                                            <span>DOB :</span> <span style={{ color: '#bfbfbf' }}>{item.dob}</span>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={12} xl={6}>
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', fontSize: isMobile ? 13 : 14 }}
                                                        >
                                                            <span style={{}}>ASM :</span>{' '}
                                                            <span style={{ color: '#bfbfbf' }}>{item.asm}</span>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={0} direction="row" sx={{ mt: 1 }}>
                                                    <Grid item xs={3} sm={3} md={3} lg={3}>
                                                        <Chip
                                                            icon={<PlaylistAddCheckCircleIcon fontSize="medium" color="info" />}
                                                            label="16"
                                                            sx={{ backgroundColor: 'transparent', border: '1px solid #ebebeb' }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3} sm={3} md={3} lg={3}>
                                                        <Chip
                                                            icon={<CheckCircle fontSize="small" color="success" />}
                                                            label="4"
                                                            sx={{ backgroundColor: 'transparent', border: '1px solid #ebebeb' }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3} sm={3} md={3} lg={3}>
                                                        <Chip
                                                            icon={<UnpublishedIcon fontSize="small" color="error" />}
                                                            label="16"
                                                            sx={{ backgroundColor: 'transparent', border: '1px solid #ebebeb' }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3} sm={3} md={3} lg={3}>
                                                        <Chip
                                                            icon={<TripOriginIcon fontSize="small" color="primary" />}
                                                            label="16"
                                                            sx={{ backgroundColor: 'transparent', border: '1px solid #ebebeb' }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </CardStyle>
                                </Link>
                            </Grid>
                        ))}
                        {outletlist.map((item) => (
                            <Grid item xs={12} sm={6} md={6} lg={4} key={item.id}>
                                <SolutionCard
                                    title={item.name}
                                    description="Your description goes here."
                                    chipLabels={['16', '4', '16', '16']}
                                    dob={item.dob}
                                    asm={item.asm}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box>
                        <Card sx={{ boxShadow: 0 }}>
                            <Box
                                height="60vh"
                                width="100%"
                                fontWeight={10}
                                sx={{
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
                                    rows={dummydata}
                                    columns={columns1}
                                    pagination={false}
                                    pageSize={itemsPerPage}
                                    getRowClassName={rowClassName}
                                    disableSelectionOnClick
                                />
                            </Box>
                        </Card>
                    </Box>
                )}
                <div></div>
            </Box>
        </>
    );
}

export default withAuth(DataTable);
