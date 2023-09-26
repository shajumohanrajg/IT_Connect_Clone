// project imports
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
// material-ui

import { Button, Card, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//import React from 'react';

import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import Hoardingtable1 from './hoardingtable';

import AddIcon from '@mui/icons-material/Add';
import { Fab, useMediaQuery, useTheme } from '@mui/material';

const SamplePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                                    Hoarding Table
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    {isMobile ? (
                        <Fab color="primary" aria-label="add" size="medium" className={classes.fabbutton1} href="/hoardingform">
                            <AddIcon sx={{ color: 'white' }} />
                        </Fab>
                    ) : (
                        <Button className={classes.Button} variant="contained" href="/hoardingform" startIcon={<AddCircleOutlinedIcon />}>
                            Hoarding
                        </Button>
                    )}
                </Stack>
            </Card>
            <br></br>
            <Hoardingtable1 />
        </div>
        // </MainCard>
    );
};

export default withAuth(SamplePage);
