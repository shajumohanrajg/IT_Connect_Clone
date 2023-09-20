import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomList from '../headers/headercard';
import CustomCard from '../headers/HeaderCustomCard';
import withAuth from '../pages/authentication/authentication3/withAuth';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import Showroomstable from './showroomstable';

import AddIcon from '@mui/icons-material/Add';
import { Fab, useMediaQuery, useTheme } from '@mui/material';

const SamplePage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    return (
        <div>
            <CustomCard>
                <CustomList icon={<StoreOutlinedIcon />} text="Showrooms" iconColor="#ffffff" variant="h3" />
                {isMobile ? (
                    <Fab color="primary" aria-label="add" size="medium" className={classes.fabbutton} href="/showroomadd">
                        <AddIcon sx={{ color: 'white' }} />
                    </Fab>
                ) : (
                    <Button className={classes.Button} variant="contained" startIcon={<AddCircleOutlinedIcon />} href="/showroomadd">
                        Showrooms
                    </Button>
                )}
            </CustomCard>
            <br></br>
            <Showroomstable />
        </div>
    );
};

export default withAuth(SamplePage);
