import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
    Avatar,
    Box,
    Button,
    Card,
    Grid,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { GridToolbar } from '@mui/x-data-grid';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import ApiComponent from '../apicomp/ApiComponent';
import { Showroomapi } from '../apicomp/Apiurls';
import CustomDataGrid from '../customdatagrid/CustomDataGrid';
import withAuth from '../pages/authentication/authentication3/withAuth';
import style from '../styles/Boxstyle';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

function DataTable() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const columns1 = [
        {
            field: 'name',

            headerName: 'Showroom Name',
            cellClassName: 'super-app-theme--cell',
            headerClassName: 'super-app-theme--header',

            width: 200
        },
        {
            field: 'rsm',
            headerName: 'Rsm',

            width: 120
        },
        {
            field: 'asm',
            headerName: 'Asm',

            width: 120
        },
        {
            field: 'manager',
            headerName: 'Manager',

            width: 120
        },
        {
            field: 'cug_no',
            headerName: 'Cug No',

            width: 120
        },
        {
            field: 'landline',
            headerName: 'Landline',

            width: 120
        },
        {
            field: 'e_mail',
            headerName: 'Email',

            width: 120
        },
        {
            field: 'region',
            headerName: 'Region',

            width: 120
        },
        {
            field: 'state',
            headerName: 'State',

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
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" size="large" onClick={() => handleDeleteSubmit(params.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </div>
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

        Axios.delete(`${Showroomapi}${selectedRowIddel}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(() => {
                handleCloseDialogdelete();
                setResponseMessage('SuccesssFully Showroom Deleted');

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
                        // setOpen(false);
                        // setSelectedRowId(false);
                        // setOpenModal(false);
                        handleCloseDialogdelete(false);
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

    const viewShowrooms = (id) => {
        navigate(`/showroomslistupdate/${id}`);
        window.location.reload();
    };
    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        e.preventDefault();

        Axios.put(`${Showroomapi}${selectedRowId}/`, matData, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then((response) => {
                console.log('Data updated successfully:', response.data);
                setResponseMessage('SuccesssFully Showrooms Created');

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
                        // handleCloseDialogdelete(false);
                        setShowDialog(true);
                    } else {
                        alert('An unexpected error occurred. Please try again later.');
                    }
                } else {
                    alert('An unexpected error occurred. Please try again later.');
                }
                console.log('Error updating data:', error);
            });
    };
    const [selectedRowId, setSelectedRowId] = React.useState(null);
    const userID = localStorage.getItem('id');
    const [matData, setMatData] = React.useState([
        {
            name: '',
            created_by: userID,
            modified_by: userID,
            rsm: '',
            asm: '',
            manager: '',
            cug_no: '',
            landline: '',
            e_mail: '',
            region: '',
            state: '',
            address: ''
        }
    ]);

    const handleEditClick = (id) => {
        const token = localStorage.getItem('token');
        setSelectedRowId(id);

        Axios.get(`${Showroomapi}${id}`, {
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
                        // setOpen(false);
                        // setSelectedRowId(false);
                        // setOpenModal(false);
                        // handleCloseDialogdelete(false);
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
    const handleClose = () => {
        setSelectedRowId(null);
        setOpenModal(false);
    };
    const [name, setName] = useState('');
    const [status, setStatus] = useState(matData.status);

    const navigate = useNavigate();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [floordiadata, setFloordiadata] = React.useState([]);

    useEffect(() => {
        const handleDataFetched = (data) => {
            setFloordiadata(data);
        };

        return () => {
            setFloordiadata([]);
        };
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
                            {floordiadata.length > 0 ? (
                                floordiadata.map((item) => (
                                    <Grid item xs={12} sm={6} md={6} lg={4} key={item.id}>
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
                                                                <span>RSM :</span> <span style={{ color: '#bfbfbf' }}>{item.rsm}</span>
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
                                                                <span style={{}}>ASM :</span>{' '}
                                                                <span style={{ color: '#bfbfbf' }}>{item.asm}</span>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={0} direction="row" sx={{ mt: 0 }}>
                                                        <Grid item xs={12} sm={12} md={12} lg={6}>
                                                            <Typography variant="subtitle1" sx={{ fontSize: isMobile ? 13 : 14 }}>
                                                                <span>Manager :</span>{' '}
                                                                <span style={{ color: '#bfbfbf' }}>{item.manager}</span>
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
                                                                <span style={{}}>Region :</span>{' '}
                                                                <span style={{ color: '#bfbfbf' }}>{item.region}</span>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            </Card>
                                        </Link>
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
                        <Card sx={{ width: '100%', boxShadow: 0 }}>
                            <CustomDataGrid
                                isSmallScreen={true}
                                rows={floordiadata}
                                columns={columns1}
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
                        </Card>
                    </TabPanel>
                </TabContext>
            </Box>
            <ApiComponent apiUrl={Showroomapi} onDataFetched={setFloordiadata} />
            {responseMessage &&
                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}

            <Modal open={!!selectedRowId} onClose={handleClose}>
                <Box sx={style}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.Button} sx={{ bgcolor: '#1a5f7a', color: 'white' }}>
                                        <AddAPhotoOutlinedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h3">Update Showrooms #{selectedRowId}</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>

                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                label="Showroom Name"
                                id="name"
                                name="name"
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
                                label="Rsm"
                                id="rsm"
                                name="rsm"
                                value={matData.rsm || ''}
                                onChange={(e) => setMatData({ ...matData, rsm: e.target.value })}
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
                                label="Asm"
                                id="asm"
                                name="asm"
                                value={matData.asm || ''}
                                onChange={(e) => setMatData({ ...matData, asm: e.target.value })}
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
                                label="CUG No"
                                id="cug_no"
                                name="cug_no"
                                value={matData.cug_no || ''}
                                onChange={(e) => setMatData({ ...matData, cug_no: e.target.value })}
                                fullWidth
                                type="number"
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
                                label="Landline"
                                id="landline"
                                name="landline"
                                value={matData.landline || ''}
                                onChange={(e) => setMatData({ ...matData, landline: e.target.value })}
                                fullWidth
                                type="tel"
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
                                label="Email"
                                id="e_mail"
                                name="e_mail"
                                value={matData.e_mail || ''}
                                onChange={(e) => setMatData({ ...matData, e_mail: e.target.value })}
                                fullWidth
                                type="email"
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
                                label="Region"
                                id="region"
                                name="region"
                                value={matData.region || ''}
                                onChange={(e) => setMatData({ ...matData, region: e.target.value })}
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
                                label="State"
                                id="state"
                                name="state"
                                value={matData.state || ''}
                                onChange={(e) => setMatData({ ...matData, state: e.target.value })}
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
                                label="Address"
                                id="address"
                                name="address"
                                value={matData.address || ''}
                                onChange={(e) => setMatData({ ...matData, address: e.target.value })}
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

                        <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                                {' '}
                                <Button className={classes.Button} variant="contained" onClick={handleSubmit}>
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
                        Are you sure want to Delete this brand id #{selectedRowIddel}?
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
                        Are you sure want to update this brand id #{selectedRowId}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>No</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default withAuth(DataTable);
