import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Card,
    Divider,
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
    useMediaQuery,
    useTheme
} from '@mui/material';
//import { Typography } from 'tabler-icons-react';
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

import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import UnpublishedOutlinedIcon from '@mui/icons-material/UnpublishedOutlined';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import ApiComponent from '../apicomp/ApiComponent';
import { JobForapi, JobTypeListapi, JobTypeapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import style from '../styles/Boxstyle';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

function DataTable() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const columns1 = [
        {
            field: 'jobfor',
            headerName: 'Job For',

            width: 120
        },
        {
            field: 'name',

            headerName: 'Name',
            cellClassName: 'super-app-theme--cell',
            headerClassName: 'super-app-theme--header',

            width: 200
        },
        {
            field: 'status',
            headerName: 'Status',

            width: 120
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

        Axios.delete(`${JobTypeapi}${selectedRowIddel}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(() => {
                handleCloseDialogdelete();
                setResponseMessage('SuccesssFully Job Type Deleted');
                //navigate('/brand');
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
                //setLoading(true);
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
    const [openModel, setOpenModal] = React.useState(false);
    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        e.preventDefault();

        Axios.put(`${JobTypeapi}${selectedRowId}/`, matData, {
            headers: {
                Authorization: `Token ${token}` // Include the token in the request headers
            }
        })
            .then((response) => {
                console.log('Data updated successfully:', response.data);
                setResponseMessage('SuccesssFully Job Type Created');
                //navigate('/brand');
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
                        setOpenDialog(false);
                        setShowDialog(true);
                    } else {
                        alert('An unexpected error occurred. Please try again later.');
                    }
                } else {
                    alert('An unexpected error occurred. Please try again later.');
                }
                console.log('Error updating data:', error);
                // Handle any errors that occur during the update process
            });
    };

    const [selectedRowId, setSelectedRowId] = React.useState(null);

    const handleEditClick = (id) => {
        const token = localStorage.getItem('token');
        setSelectedRowId(id);

        Axios.get(`${JobTypeapi}${id}`, {
            headers: {
                Authorization: `Token ${token}` // Include the token in the request headers
            }
        })
            .then((response) => {
                const data = response.data;

                setMatData(data);
                setOpenModal(true);
                //console.log(data);
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
    const [jobfor, setJobfor] = useState([]);
    const [jobforvalue, setJobforvalue] = useState('');

    useEffect(() => {
        const handleDataFetched = (data) => {
            setJobtype(data);
            setJobfor(data);
        };

        // Clean up the effect when the component unmounts
        return () => {
            // Reset the floordiadata when the component unmounts
            setJobtype([]);
            setJobfor([]);
        };
    }, []);

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const handleClose = () => {
        setSelectedRowId(null);
        setOpenModal(false);
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
    //const [loading, setLoading] = React.useState(false);
    const [jobtype, setJobtype] = React.useState([]);

    const userID = localStorage.getItem('id');
    const [matData, setMatData] = React.useState([
        {
            name: '',
            status: null,
            jobfor: null,
            created_by: userID,
            modified_by: userID
        }
    ]);

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
                            {jobtype.length > 0 ? (
                                jobtype.map((item) => (
                                    <Grid item xs={12} sm={12} md={4} lg={3} key={item.id}>
                                        <Card sx={{ width: '100%', my: 0, border: '1px solid #ebebeb', backgroundColor: 'white' }}>
                                            <List>
                                                <ListItem>
                                                    <ListItemText>
                                                        {' '}
                                                        <Typography variant="h5" sx={{ color: '#ff8b3d', fontWeight: 'bold' }}>
                                                            Job For {item.jobfor}
                                                        </Typography>
                                                    </ListItemText>
                                                </ListItem>
                                            </List>
                                            <Divider />
                                            <Box sx={{ p: 0 }}>
                                                <List sx={{ py: 1.5, backgroundColor: 'white', borderRadius: 3 }}>
                                                    <ListItem alignItems="center" disableGutters sx={{ py: 0, px: 3 }}>
                                                        <ListItemAvatar>
                                                            {item.status === 'Active' ? (
                                                                <Avatar
                                                                    variant="rounded"
                                                                    sx={{
                                                                        ...theme.typography.commonAvatar,
                                                                        ...theme.typography.largeAvatar,
                                                                        background: 'linear-gradient(to right bottom, #2dce89, #2dcecc)',
                                                                        color: 'whitesmoke'
                                                                    }}
                                                                >
                                                                    <TaskAltOutlinedIcon sx={{ fontSize: isMobile ? 35 : 30 }} />
                                                                </Avatar>
                                                            ) : (
                                                                <Avatar
                                                                    variant="rounded"
                                                                    sx={{
                                                                        ...theme.typography.commonAvatar,
                                                                        ...(isMobile
                                                                            ? theme.typography.largeAvatar
                                                                            : theme.typography.largeAvatar),
                                                                        background: 'linear-gradient(to right bottom,#f5365c, #f56036)',
                                                                        color: 'whitesmoke'
                                                                    }}
                                                                >
                                                                    <UnpublishedOutlinedIcon sx={{ fontSize: isMobile ? 35 : 30 }} />
                                                                </Avatar>
                                                            )}
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            sx={{
                                                                py: 0,
                                                                mt: 0.45,
                                                                mb: 0.45
                                                            }}
                                                            primary={
                                                                <Typography
                                                                    variant={isMobile ? 'h5' : 'h4'}
                                                                    sx={{
                                                                        mt: 0.5
                                                                    }}
                                                                    noWrap
                                                                >
                                                                    {item.name}
                                                                </Typography>
                                                            }
                                                            secondary={
                                                                <Typography
                                                                    variant={isMobile ? 'h6' : 'h5'}
                                                                    sx={{
                                                                        color: theme.palette.grey[500],
                                                                        mt: 0.5
                                                                    }}
                                                                    noWrap
                                                                >
                                                                    {item.status}
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItem>
                                                </List>
                                            </Box>
                                        </Card>
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
                                //id="invoice-container"
                                height="60vh"
                                width="100%"
                                fontWeight={10}
                                //className={classes.customButton}
                                sx={{
                                    //width: '100%',
                                    //border: '2px solid #fff2ea',
                                    p: 2,
                                    height: isSmallScreen ? '90vh' : '60vh',
                                    width: '100%',
                                    borderRadius: 5,
                                    '& .MuiDataGrid-root': {
                                        border: 'none',
                                        padding: 1
                                        //border: '2px dashed grey'
                                    },
                                    '& .super-app-theme--header': {
                                        //backgroundColor: 'rgba(255, 7, 0, 0.55)',
                                        //color: 'orange !important',
                                        //fontWeight: 'bold !important'
                                        //fontWeight: '700 !important',
                                        //color: 'white !important'
                                    },
                                    '& .super-app-theme--cell': {
                                        //backgroundColor: 'primary',
                                        //color: '#1a3e72 !important',
                                        //fontWeight: '600 !important',
                                        //border: 1
                                    },
                                    '& .MuiDataGrid-cell': {
                                        borderBottom: 'none !important',
                                        //backgroundColor: '#f2f2f2',
                                        color: 'black',
                                        fontWeight: '550 !important'
                                    },
                                    '& .name-column--cell': {
                                        variant: 'button',
                                        fontWeight: 'medium',
                                        color: 'ButtonText'
                                    },
                                    '& .MuiDataGrid-columnHeaders': {
                                        //borderLeft: '2px dashed grey',
                                        //borderRight: '2px dashed grey',
                                        //borderBottom: '2px solid grey',
                                        //fontWeight: 'bold !important',
                                        //fontWeight: '700 !important',
                                        //fontSize: 15,
                                        //fontColor: 'red'
                                        //backgroundColor: '#ff874b',
                                        //borderRadius: 2
                                        //color: 'white !important'
                                    },

                                    '.MuiDataGrid-columnHeaderTitle': {
                                        //fontWeight: 'bold !important',
                                        //fontWeight: '1000 !important',
                                        //overflow: 'visible !important',
                                        color: 'white',
                                        width: 'auto',
                                        paddingTop: '12px',
                                        paddingBottom: '10px',
                                        //paddingLeft: "8px",
                                        //paddingRight: "24px",
                                        textAlign: 'left',
                                        fontSize: '0.80rem',
                                        fontWeight: 700,
                                        opacity: 0.7,
                                        background: 'transparent',
                                        color: '#8392ab',
                                        borderRadius: 'none',
                                        borderBottom: '0.0625rem solid #e9ecef'
                                        //fontSize: 15
                                    },
                                    '& .MuiDataGrid-virtualScroller': {
                                        //opacity: 1,
                                        //transition: 'opacity 0.2s',
                                        //overflowY: 'auto',
                                        overflowX: 'auto',
                                        '&::-webkit-scrollbar': {
                                            width: '4px',
                                            backgroundColor: '#F5F5F5'
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            //backgroundColor: '#11cdef',
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
                                        //backgroundColor: "red",
                                        //padding: "10px",
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
                                        //paddingRight: 2,
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
                                    rows={jobtype}
                                    //columns={columns1}
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
                <ApiComponent apiUrl={JobTypeListapi} onDataFetched={setJobtype} />
                <ApiComponent apiUrl={JobForapi} onDataFetched={setJobfor} />
                {responseMessage &&
                    Swal.fire({
                        title: 'success',
                        text: responseMessage,
                        icon: 'success',
                        confirmButtonText: 'OK'
                        //onClose: handleClose
                    })}

                <Modal open={modalOpen} onClose={handleCloseModal}>
                    <div>
                        <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
                    </div>
                </Modal>

                <Modal open={!!selectedRowId} onClose={handleClose}>
                    <Box sx={style}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <List sx={{ width: '100%', maxWidth: 360 }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.Button} sx={{ bgcolor: '#1a5f7a', color: 'white' }}>
                                            J
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Typography variant="h3">Update Job Type #{selectedRowId}</Typography>
                                    </ListItemText>
                                </ListItem>
                            </List>
                            <Grid item xs={12} md={12} xl={12}>
                                <FormControl fullWidth className={classes.select}>
                                    <InputLabel className={classes.label} id="jobfor-select-label">
                                        Job For
                                    </InputLabel>
                                    <Select
                                        labelid="jobfor-select-label"
                                        id="jobfor-select"
                                        onChange={(e) => setMatData({ ...matData, jobfor: e.target.value })}
                                        value={matData && matData.jobfor ? matData.jobfor : ''}
                                        label="Job For"
                                    >
                                        <MenuItem value="">
                                            <em>Select Job For</em>
                                        </MenuItem>
                                        {jobfor && jobfor !== undefined
                                            ? jobfor.map((option, index) => (
                                                  <MenuItem key={index} value={option.id}>
                                                      {option.name}
                                                  </MenuItem>
                                              ))
                                            : 'No Data'}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12} xl={12}>
                                <TextField
                                    //size="small"
                                    label="Name"
                                    id="name"
                                    value={matData && matData.name ? matData.name : ''}
                                    onChange={(e) => setMatData({ ...matData, name: e.target.value })}
                                    fullWidth
                                    //type="number"
                                    variant="outlined"
                                    className={classes.input}
                                    InputLabelProps={{
                                        shrink: true,
                                        classes: {
                                            //root: classes.label,
                                            focused: classes.label
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} xl={12}>
                                <FormControl fullWidth className={classes.select}>
                                    <InputLabel className={classes.label} id="status-select-label">
                                        Status
                                    </InputLabel>
                                    <Select
                                        value={matData && matData.status ? matData.status : ''}
                                        onChange={(e) => setMatData({ ...matData, status: e.target.value })}
                                        label="Status"
                                    >
                                        <MenuItem value="Active">Active</MenuItem>
                                        <MenuItem value="Inactive">Inactive</MenuItem>
                                    </Select>
                                </FormControl>
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
                            Are you sure want to Delete this job type id #{selectedRowIddel}?
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
                        <DialogContentText id="alert-dialog-description">Are you sure want to update this Job type?</DialogContentText>
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
