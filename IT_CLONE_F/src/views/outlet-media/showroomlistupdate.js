import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import { Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import BackButton from 'BackButton';

import { Showroomapi } from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

const SamplePage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState('');
    const [rsm, setRsm] = useState('');
    const [asm, setAsm] = useState('');
    const [manager, setManager] = useState('');
    const [cugNo, setCugNo] = useState('');
    const [landline, setLandline] = useState('');
    const [email, setEmail] = useState('');
    const [region, setRegion] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

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

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };

    const url = Showroomapi;
    useEffect(() => {
        const token = localStorage.getItem('token');

        Axios.get(url + id, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then((res) => {
                setMatData(res.data);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        e.preventDefault();

        Axios.put(`${Showroomapi}${id}/`, matData, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then((response) => {
                console.log('Data updated successfully:', response.data);
                setResponseMessage('SuccesssFully Showroom Updated');

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
                        // setOpenDialog(false);
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

    return (
        <div>
            <DialogBox open={showDialog} onClose={handleDialogClose} statusCode={statusCode} />
            {responseMessage &&
                Swal.fire({
                    title: 'success',
                    text: responseMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })}

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
                                <Typography variant="h3" sx={{ color: '#444444' }}>
                                    Showrooms
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <BackButton />
                </Stack>
            </Card>
            <br></br>
            <Card sx={{ width: '100%', boxShadow: 0, p: 2 }}>
                <br></br>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={4} xl={4}>
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
                    <Grid item xs={12} md={4} xl={4}>
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
                    <Grid item xs={12} md={4} xl={4}>
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
                    <Grid item xs={12} md={4} xl={4}>
                        <TextField
                            label="Manager"
                            id="manager"
                            name="manager"
                            value={matData.manager || ''}
                            onChange={(e) => setMatData({ ...matData, manager: e.target.value })}
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
                    <Grid item xs={12} md={4} xl={4}>
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
                    <Grid item xs={12} md={4} xl={4}>
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
                    <Grid item xs={12} md={4} xl={4}>
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
                    <Grid item xs={12} md={4} xl={4}>
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

                    <Grid item xs={12} md={4} xl={4}>
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
            </Card>
        </div>
    );
};

export default withAuth(SamplePage);
