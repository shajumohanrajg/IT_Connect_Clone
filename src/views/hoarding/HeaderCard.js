import React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import { useTheme, useMediaQuery, useStyles, StoreOutlinedIcon } from './muiComponents';

const HeaderCard = ({ handleOpen, title, buttonname }) => {
    const theme = useTheme();
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
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
                                {title}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </List>

                {isMobile ? (
                    <Fab color="primary" aria-label="add" size="medium" className={classes.fabbutton1} onClick={handleOpen}>
                        <AddIcon sx={{ color: 'white' }} />
                    </Fab>
                ) : (
                    <Button className={classes.Button} variant="contained" onClick={handleOpen} startIcon={<AddCircleOutlinedIcon />}>
                        {buttonname}
                    </Button>
                )}
            </Stack>
        </Card>
    );
};

export default HeaderCard;
