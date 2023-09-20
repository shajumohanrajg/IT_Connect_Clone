import CloseIcon from '@mui/icons-material/Close';

import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Card,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
    TextField,
    Typography,
    useMediaQuery
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
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import ApiComponent from '../apicomp/ApiComponent';
import { Rolesapi, Showroomapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import style from '../styles/Boxstyle';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

function DataTable() {
    const columns1 = [
        {
            field: 'name',

            headerName: 'Name',
            cellClassName: 'super-app-theme--cell',
            headerClassName: 'super-app-theme--header',

            width: 200
        },
        {
            field: 'level',
            headerName: 'Level',

            width: 120
        },
        {
            field: 'description',
            headerName: 'Description',

            width: 120
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    {/* <IconButton aria-label="update" size="large" onClick={() => handleEditClick(params.id)}>
                        <EditIcon fontSize="small" />
                    </IconButton> */}
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

        Axios.delete(`${Rolesapi}${selectedRowIddel}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(() => {
                handleCloseDialogdelete();
                setResponseMessage('SuccesssFully Roles Deleted');

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

    const navigate = useNavigate();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [floordiadata, setFloordiadata] = React.useState([]);

    const [showroomnames, setShowroomnames] = React.useState([]);

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

        Axios.put(`${Rolesapi}${selectedRowId}/`, matData, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then((response) => {
                setResponseMessage('SuccesssFully Roles Updated');

                setTimeout(() => {
                    window.location.reload();
                }, 1000);

                console.log('Data updated successfully:', response.data);
            })
            .catch((error) => {
                console.log('Error updating data:', error);
            });
    };

    const [selectedRowId, setSelectedRowId] = React.useState(null);
    const userID = localStorage.getItem('id');
    const [matData, setMatData] = React.useState([
        {
            name: '',
            level: '',
            description: '',
            created_by: userID,
            modified_by: userID
        }
    ]);

    const handleEditClick = (id) => {
        const token = localStorage.getItem('token');
        setSelectedRowId(id);

        Axios.get(`${Rolesapi}${id}`, {
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
                console.log('Error fetching data:', error);
            });
    };
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const handleClose = () => {
        setSelectedRowId(null);
        setOpenModal(false);
    };

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    return (
        <Card sx={{ width: '100%', boxShadow: 0 }}>
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />

            <ApiComponent apiUrl={Rolesapi} onDataFetched={setFloordiadata} />
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
            <Modal open={modalOpen} onClose={handleCloseModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                                        R
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h3">Update Roles #{selectedRowId}</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                label="Name"
                                id="name"
                                value={matData.name || ''}
                                onChange={(e) => setMatData({ ...matData, name: e.target.value })}
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
                            <TextField
                                label="Level"
                                id="level"
                                value={matData.level || ''}
                                onChange={(e) => setMatData({ ...matData, level: e.target.value })}
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
                            <TextField
                                label="Description"
                                id="description"
                                value={matData.description || ''}
                                onChange={(e) => setMatData({ ...matData, description: e.target.value })}
                                fullWidth
                                multiline={true}
                                rows={4}
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
                            <FormControl fullWidth className={classes.select}>
                                <InputLabel className={classes.label} id="location-select-label">
                                    Showroom Location
                                </InputLabel>
                                <Select
                                    labelid="location-select-label"
                                    id="name"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    label="Showroom Location"
                                    focused
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
                        {/* <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                
                                label="Name"
                                id="name"
                                value={matData.name}
                                onChange={(e) => setMatData({ ...matData, name: e.target.value })}
                                fullWidth
                                
                                variant="outlined"
                                className={classes.input}
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                        
                                        focused: classes.label
                                    }
                                }}
                            />
                        </Grid> */}

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
                        Are you sure want to Delete this Role id #{selectedRowIddel}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogdelete}>No </Button>
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
                    <DialogContentText id="alert-dialog-description">Are you sure want to update Role?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>No</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default withAuth(DataTable);
