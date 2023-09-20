import React from 'react';

import {
    Modal,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Button,
    Box,
    Alert,
    Autocomplete
} from '@mui/material';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import style from '../styles/Boxstyle';

import { makeStyles } from '@mui/styles';

const CustomModal = ({ open, onClose, name, setName, status, setStatus, handleSubmit, avatar, title, requiredAlert }) => {
    const classes = useStyles();

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <div>
                <Box sx={style}>
                    {/* {responseMessage && <SwalAlert title="Success" text={responseMessage} icon="success" />} */}
                    {/* 
                    <Snackbar open1={!!errorMessage} autoHideDuration={1000}>
                        <Alert1 severity="info" onClose={handleCloseerror}>
                            {errorMessage}
                        </Alert1>
                    </Snackbar> */}

                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.Button} sx={{ bgcolor: '#1a5f7a', color: 'white' }}>
                                        {avatar}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h3">{title}</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                        <Grid item xs={12} md={12} xl={12}>
                            <TextField
                                label="Name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                variant="outlined"
                                className={classes.input}
                                required
                                InputLabelProps={{
                                    classes: {
                                        focused: classes.label
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            <FormControl fullWidth className={classes.select} required>
                                <InputLabel className={classes.label} id="status-select-label">
                                    Status
                                </InputLabel>
                                <Select
                                    labelid="status-select-label"
                                    id="status-select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    label="Status"
                                >
                                    <MenuItem value="">
                                        <em>Select a Status</em>
                                    </MenuItem>
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={12} md={12} xl={12}>
                            <Autocomplete
                                options={['', 'Active', 'Inactive']}
                                value={status}
                                onChange={(event, newValue) => setStatus(newValue)}
                                renderInput={(params) => <TextField {...params} label="Status" variant="outlined" required />}
                            />
                        </Grid> */}
                        {/* Render the requiredalert section */}
                        <Grid item xs={12} md={12} xl={12}>
                            {requiredAlert && <Alert severity="error">{requiredAlert}</Alert>}
                        </Grid>
                        <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                                <Button className={classes.Button} variant="contained" onClick={handleSubmit}>
                                    Create
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Modal>
    );
};

export default CustomModal;
