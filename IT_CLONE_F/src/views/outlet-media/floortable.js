import { OutlinedInput } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import {
    Box,
    Button,
    Card,
    CardHeader,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
    Typography,
    useMediaQuery,
    TextField
} from '@mui/material';
import Avatar from '@mui/material/Avatar';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import ApiComponent from '../apicomp/ApiComponent';
import { Floorapi, Floorlistapi, Showroomapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import style from '../styles/Boxstyle';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

function DataTable() {
    const navigate = useNavigate();
    const columns1 = [
        {
            field: 'name',

            headerName: 'Name',
            cellClassName: 'super-app-theme--cell',
            headerClassName: 'super-app-theme--header',

            width: 200
        },
        {
            field: 'floor_image',
            headerName: 'Floor Image',
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
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="update" size="large" onClick={() => handleEditClick(params.id)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" size="large" onClick={() => handleDeleteSubmit(params.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </>
            )
        }
    ];

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

        Axios.delete(`${Floorapi}${selectedRowIddel}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(() => {
                handleCloseDialogdelete();
                setResponseMessage('SuccesssFully Floor Diagram Deleted');

                setTimeout(() => {
                    window.location.reload();
                }, 1000);

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((error) => {
                if (error.response) {
                    const statusCode = error.response.status;

                    if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                        setStatusCode(statusCode);

                        setSelectedRowId(false);
                        setOpenModal(false);
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

    const userID = localStorage.getItem('id');
    const [matData, setMatData] = React.useState([
        {
            name: '',
            floor_image: null,
            created_by: userID,
            modified_by: userID
        }
    ]);

    const [floorImage, setFloorImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFloorImage(file);
    };

    const handleEditClick = (id) => {
        const token = localStorage.getItem('token');
        setSelectedRowId(id);

        Axios.get(`${Floorapi}${id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then((response) => {
                const data = response.data;

                setMatData(data);
                setOpenModal(true);
            })
            .catch((error) => {
                if (error.response) {
                    const statusCode = error.response.status;

                    if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                        setStatusCode(statusCode);

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
    const viewShowrooms = (id) => {
        navigate(`/floorupdate/${id}`);
        window.location.reload();
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

    const handleImageKeyDown = (event, imageUrl) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleImageClick(imageUrl);
        }
    };

    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [showroomnames, setShowroomnames] = React.useState([]);

    const [floordiadata, setFloordiadata] = React.useState([]);

    useEffect(() => {
        const handleDataFetched = (data) => {
            setFloordiadata(data);
            setShowroomnames(data);
        };

        return () => {
            setFloordiadata([]);
            setShowroomnames([]);
        };
    }, []);

    const [openModel, setOpenModal] = React.useState(false);
    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', matData.name);

        formData.append('created_by', userID);
        formData.append('modified_by', userID);

        if (floorImage) {
            formData.append('floor_image', floorImage);
            Axios.put(`${Floorapi}${selectedRowId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${token}`
                }
            })
                .then((response) => {
                    setResponseMessage('SuccesssFully Floor Diagram Updated');

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    console.log(response.data);
                })
                .catch((error) => {
                    if (error.response) {
                        const statusCode = error.response.status;

                        if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                            setStatusCode(statusCode);

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
                    console.error(error);
                });
        } else {
            Axios.put(`${Floorapi}${selectedRowId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${token}`
                }
            })
                .then((response) => {
                    setResponseMessage('SuccesssFully Floor Diagram Updated');

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    console.log(response.data);
                })
                .catch((error) => {
                    if (error.response) {
                        const statusCode = error.response.status;

                        if (statusCode === 403 || statusCode === 400 || statusCode === 404) {
                            setStatusCode(statusCode);

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
                    console.error(error);
                });
        }
    };

    const [selectedRowId, setSelectedRowId] = React.useState(null);

    const [name, setName] = useState('');
    const [status, setStatus] = useState(matData.status);
    const handleClose = () => {
        setSelectedRowId(null);
        setOpenModal(false);
    };

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
                            {/* {Array.from(Array(6)).map((_, index) => ( */}
                            {floordiadata.length > 0 ? (
                                floordiadata.map((item) => (
                                    <Grid item xs={12} sm={12} md={4} key={item.id}>
                                        <Card sx={{ backgroundColor: 'white' }}>
                                            <CardHeader
                                                action={
                                                    <IconButton aria-label="settings">
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                }
                                                title={item.name}
                                            />
                                            <CardMedia component="img" image={item.floor_image} alt="showroom" height="194" />
                                            {/* <CardMedia component="img" height="194" image={item.floor_image} alt="showroom" /> */}
                                        </Card>
                                        {/* <Link href="/" underline="none" sx={{ textTransform: 'none' }}> */}

                                        {/* </Link> */}
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

                            {/* ))} */}
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
                                    rows={floordiadata}
                                    columns={columns1}
                                    pageSize={5}
                                    getRowId={(row) => row.id}
                                    components={{ Toolbar: GridToolbar, color: 'primary' }}
                                    componentsProps={{
                                        toolbar: {
                                            showQuickFilter: true,
                                            quickFilterProps: { debounceMs: 500 },
                                            color: 'primary'
                                        }
                                    }}
                                    loading={loading}
                                    disableColumnFilter={isSmallScreen ? true : false}
                                    disableDensitySelector={isSmallScreen ? true : false}
                                    virtualization
                                />
                            </Box>
                        </Card>
                    </TabPanel>
                </TabContext>
            </Box>
            <Card sx={{ width: '100%', boxShadow: 0 }}>
                <ApiComponent apiUrl={Floorlistapi} onDataFetched={setFloordiadata} />
                <ApiComponent apiUrl={Showroomapi} onDataFetched={setShowroomnames} />
                {responseMessage &&
                    Swal.fire({
                        title: 'success',
                        text: responseMessage,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })}

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
                <Modal open={!!selectedRowId} onClose={handleClose}>
                    <Box sx={style}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <List sx={{ width: '100%', maxWidth: 360 }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.Button} sx={{ bgcolor: '#1a5f7a', color: 'white' }}>
                                            F
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Typography variant="h3">Update Floor Diagram #{selectedRowId}</Typography>
                                    </ListItemText>
                                </ListItem>
                            </List>
                            <Grid item xs={12} md={12} xl={12}>
                                <FormControl fullWidth className={classes.select}>
                                    <InputLabel className={classes.label} id="location-select-label">
                                        Showroom Location
                                    </InputLabel>
                                    <Select
                                        labelid="location-select-label"
                                        id="name"
                                        value={matData.name || ''}
                                        onChange={(e) => setMatData({ ...matData, name: e.target.value })}
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
                            <Grid item xs={12} md={12} xl={12} sx={{ mt: 2 }}>
                                <Card sx={{ maxWidth: 345, boxShadow: 2 }}>
                                    <CardMedia component="img" image={matData.floor_image} alt="diagram" height="140" />

                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            Floor Diagram
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={12} xl={12} sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    id="floor_image"
                                    label="Floor Diagram"
                                    type="file"
                                    name="floor_image"
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
                                    <InputLabel className={classes.label} id="floor_image">
                                        Change Floor Diagram
                                    </InputLabel>
                                    <OutlinedInput
                                        labelid="floor_image"
                                        id="floor_image"
                                        type="file"
                                        name="floor_image"
                                        inputProps={{ accept: 'image/*' }}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PhotoCameraIcon />
                                            </InputAdornment>
                                        }
                                        onChange={handleImageChange}
                                        fullWidth
                                        variant="outlined"
                                        label="Change Floor Diagram"
                                        InputLabelProps={{
                                            classes: {}
                                        }}
                                    />
                                </FormControl> */}
                            </Grid>

                            <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }}>
                                <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                                    {' '}
                                    <Button className={classes.Button} variant="contained" onClick={handleConfirmSubmit}>
                                        Update
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>

                <Dialog
                    open={openDialogdelete}
                    onClose={handleCloseDialogdelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure want to Delete this Floor Diagram id #{selectedRowIddel}?
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
                        <DialogContentText id="alert-dialog-description">Are you sure want to update this Floor Diagram?</DialogContentText>
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
