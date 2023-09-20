import CloseIcon from '@mui/icons-material/Close';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, Grid, IconButton, Modal, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
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
import { Showroomapi, Userapi, Userlistapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import style from '../styles/Boxstyle';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

function DataTable() {
    const columns1 = [
        {
            field: 'username',

            headerName: 'Name',
            cellClassName: 'super-app-theme--cell',
            headerClassName: 'super-app-theme--header',

            width: 200
        },
        {
            field: 'groups',
            headerName: 'Role',

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

        Axios.delete(`${Userapi}${selectedRowIddel}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(() => {
                handleCloseDialogdelete();
                setResponseMessage('SuccesssFully User Deleted');

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

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        confirmpassword: ''
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email address';
        }
        if (password !== confirmpassword) {
            newErrors.password = 'Passwords do not match';
        }
        if (!validatePassword(password)) {
            newErrors.password = 'Must use uppercase,lowercase,number & special character';
        }
        if (password !== confirmpassword) {
            newErrors.confirmpassword = 'Passwords do not match';
        }

        setFormErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        e.preventDefault();
        if (validateForm()) {
            Axios.put(`${Userapi}${selectedRowId}/`, matData, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
                .then((response) => {
                    setResponseMessage('SuccesssFully User Updated');

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    console.log(response);
                })
                .catch((error) => {
                    console.log('Error updating data:', error);
                });
        }
    };

    const [selectedRowId, setSelectedRowId] = React.useState(null);
    const userID = localStorage.getItem('id');
    const [matData, setMatData] = React.useState([
        {
            name: '',
            email: '',
            password: '',
            confirmpassword: '',
            role: '',
            created_by: userID,
            modified_by: userID
        }
    ]);

    const handleEditClick = (id) => {
        const token = localStorage.getItem('token');
        setSelectedRowId(id);

        Axios.get(`${Userapi}${id}`, {
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
    const [status, setStatus] = useState('');
    const handleClose = () => {
        setSelectedRowId(null);
        setOpenModal(false);
    };

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    return (
        <Card sx={{ width: '100%', boxShadow: 0 }}>
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            <ApiComponent apiUrl={Userlistapi} onDataFetched={setFloordiadata} />
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
                                        U
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h3">Update User #{selectedRowId}</Typography>
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
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                name="email"
                                type="email"
                                label="Email"
                                value={matData.email || ''}
                                onChange={(e) => setMatData({ ...matData, email: e.target.value })}
                                fullWidth
                                required
                                error={!!formErrors.email}
                                helperText={formErrors.email}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                name="password"
                                type="password"
                                label="Password"
                                value={matData.password || ''}
                                onChange={(e) => setMatData({ ...matData, password: e.target.value })}
                                fullWidth
                                required
                                error={!!formErrors.password}
                                helperText={formErrors.password}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                name="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                value={matData.confirmpassword || ''}
                                onChange={(e) => setMatData({ ...matData, confirmpassword: e.target.value })}
                                fullWidth
                                required
                                error={!!formErrors.confirmpassword}
                                helperText={formErrors.confirmpassword}
                            />
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
                        Are you sure want to Delete this User id #{selectedRowIddel}?
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
                    <DialogContentText id="alert-dialog-description">Are you sure want to update this User?</DialogContentText>
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
