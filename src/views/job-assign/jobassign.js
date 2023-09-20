import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { Button, Card, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import withAuth from '../pages/authentication/authentication3/withAuth';

import { DesignTypeapi } from '../apicomp/Apiurls';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';

import Table from './jobassigntable';

import AddIcon from '@mui/icons-material/Add';
import { Fab, useMediaQuery, useTheme } from '@mui/material';

const SamplePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState([]);
    const [photo, setPhoto] = useState([]);
    const [photo1, setPhoto1] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [showDialog, setShowDialog] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const handleDialogClose = () => {
        setShowDialog(false);
        setStatusCode(null);
    };

    function getPhoto(event) {
        setPhoto(URL.createObjectURL(event.target.files[0]));
        setPhoto1(event.target.files[0]);
    }
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleImagesChange = (event) => {
        setImages(event.target.files);
    };

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [jobfor, setJobfor] = useState([]);
    const [jobforvalue, setJobforvalue] = useState('');
    const [jobtype, setJobtype] = useState([]);
    const [jobtypevalue, setJobtypevalue] = useState('');

    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('id');
        e.preventDefault();
        Axios.post(
            DesignTypeapi,
            {
                name: name,
                status: status,
                jobfor: jobforvalue,
                jobtype: jobtypevalue,
                created_by: userID,
                modified_by: userID
            },
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
        ).then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
    };
    return (
        <div>
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
                                    Job Management
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    {isMobile ? (
                        <Fab color="primary" aria-label="add" size="medium" className={classes.fabbutton} href="/jobassignform">
                            <AddIcon sx={{ color: 'white' }} />
                        </Fab>
                    ) : (
                        <Button className={classes.Button} variant="contained" href="/jobassignform" startIcon={<AddCircleOutlinedIcon />}>
                            Job Assign
                        </Button>
                    )}
                </Stack>
            </Card>
            <br></br>
            <Table />
        </div>
    );
};

export default withAuth(SamplePage);
