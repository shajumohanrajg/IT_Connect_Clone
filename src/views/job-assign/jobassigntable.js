import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Card,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Stack,
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
import { JobListapi, Jobapi } from '../apicomp/Apiurls';
import CustomDataGrid from '../customdatagrid/CustomDataGrid';
import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

function DataTable() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const columns1 = [
        {
            field: 'jobfor',

            headerName: 'Job For',
            cellClassName: 'super-app-theme--cell',
            headerClassName: 'super-app-theme--header',

            width: 150
        },
        {
            field: 'jobtype',
            headerName: 'Job Type',

            width: 120
        },
        {
            field: 'designtype',
            headerName: 'Design Type',

            width: 120
        },
        {
            field: 'showroom',
            headerName: 'Showroom',

            width: 120
        },
        {
            field: 'assigned_to',
            headerName: 'Assign To',

            width: 120
        },
        {
            field: 'priority',
            headerName: 'Priority',

            width: 120
        },
        {
            field: 'status',
            headerName: 'Status',

            width: 120
        },
        {
            field: 'dead_Line',
            headerName: 'Dead Line',

            width: 120
        },
        {
            headerName: 'Actions',
            field: 'action',

            width: 150,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <div>
                    <IconButton aria-label="Update" size="large" onClick={() => viewShowrooms(params.id)}>
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

        Axios.delete(`${Jobapi}${selectedRowIddel}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(() => {
                handleCloseDialogdelete();
                setResponseMessage('SuccesssFully Job Deleted');

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
                        setSelectedRowId(false);
                        // setOpenModal(false);
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

    const viewShowrooms = (id) => {
        navigate(`/jobassignupdate/${id}`);
        window.location.reload();
    };

    const userID = localStorage.getItem('id');
    const [matData, setMatData] = React.useState([
        {
            name: '',
            status: null,
            created_by: userID,
            modified_by: userID
        }
    ]);

    const handleEditClick = (id) => {
        const token = localStorage.getItem('token');
        setSelectedRowId(id);

        Axios.get(`${Jobapi}${id}`, {
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
    const [name, setName] = useState('');
    const [status, setStatus] = useState(matData.status);
    const [selectedRowId, setSelectedRowId] = React.useState(null);
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
                                        <Card sx={{ width: '100%', my: 0, border: '1px solid #ebebeb' }}>
                                            <List>
                                                <ListItem>
                                                    <ListItemText>
                                                        {' '}
                                                        <Typography variant="h5" sx={{ color: '#ff8b3d', fontWeight: 'bold' }}>
                                                            {item.showroom}
                                                        </Typography>
                                                    </ListItemText>
                                                </ListItem>
                                            </List>
                                            <Card sx={{ boxShadow: 0, p: 2, borderTop: '1px solid #ebebeb' }}>
                                                <Grid container spacing={0} direction="row" sx={{ mt: 0 }}>
                                                    <Grid item xs={12} sm={12} md={12} lg={6}>
                                                        <Typography variant="subtitle1" sx={{ fontSize: isMobile ? 13 : 14 }}>
                                                            <span>Job For :</span> <span style={{ color: '#bfbfbf' }}>{item.jobfor}</span>
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
                                                            <span style={{}}>Job Type :</span>{' '}
                                                            <span style={{ color: '#bfbfbf' }}>{item.jobtype}</span>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={0} direction="row" sx={{ mt: 0 }}>
                                                    <Grid item xs={12} sm={12} md={12} lg={6}>
                                                        <Typography variant="subtitle1" sx={{ fontSize: isMobile ? 13 : 14 }}>
                                                            <span>Assigned :</span>{' '}
                                                            <span style={{ color: '#bfbfbf' }}>{item.assigned_to}</span>
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
                                                            <span style={{}}>Status :</span>{' '}
                                                            <span style={{ color: '#bfbfbf' }}>{item.status}</span>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Card>
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
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: 0 }}>
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
                    </TabPanel>
                </TabContext>
            </Box>
            <Card sx={{ width: '100%', boxShadow: 0 }}>
                {responseMessage &&
                    Swal.fire({
                        title: 'success',
                        text: responseMessage,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })}

                <ApiComponent apiUrl={JobListapi} onDataFetched={setFloordiadata} />

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
            </Card>
        </>
    );
}

export default withAuth(DataTable);
