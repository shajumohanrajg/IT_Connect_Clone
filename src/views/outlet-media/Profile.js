import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import backgroundImage from 'assets/images/bg-profile.jpeg';
import burceMars from 'assets/images/bruce-mars.jpg';
import { useEffect } from 'react';
import ApiComponent from '../apicomp/ApiComponent';
import { Profileapi, Userlistapi } from '../apicomp/Apiurls';
import { useSelector } from 'react-redux';
import LocationComponent from './LocationComponent';
import SolutionCard from './SolutionCard';

function App() {
    const authToken = useSelector((state) => state.authToken);
    const [tabValue, setTabValue] = useState(0);

    const [floordiadata, setFloordiadata] = React.useState([]);
    const [userlistdata, setUserlistdata] = React.useState([]);
    useEffect(() => {
        const handleDataFetched = (data) => {
            setFloordiadata(data);
            setUserlistdata(data);
        };

        return () => {
            setFloordiadata([]);
            setUserlistdata([]);
        };
    }, []);

    const title = 'Conversations';

    const info = {
        fullName: floordiadata.username,
        mobile: '+91 9876543210',
        email: floordiadata.email,
        location: 'Chennai'
    };

    const profilesListData = [
        {
            image: 'profile-image-1.jpg',
            description: 'ASM',
            name: 'Maarimuthu',
            action: { type: 'internal', route: '/profile/1', label: 'View Profile' }
        },
        {
            image: 'profile-image-2.jpg',
            name: 'ManiKandan',
            description: 'RSM',
            action: { type: 'internal', route: '/profile/2', label: 'View Profile' }
        },
        {
            image: 'profile-image-2.jpg',
            name: 'Mohankumar',
            description: 'RSM',
            action: { type: 'internal', route: '/profile/2', label: 'View Profile' }
        }
    ];

    const handleSetTabValue = (event, newValue) => setTabValue(newValue);

    const labels = [];
    const values = [];

    Object.keys(info).forEach((el) => {
        if (el.match(/[A-Z\s]+/)) {
            const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
            const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

            labels.push(newElement);
        } else {
            labels.push(el);
        }
    });
    Object.values(info).forEach((el) => values.push(el));

    const renderItems = labels.map((label, key) => (
        <Box key={label} display="flex" py={1} pr={2}>
            <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                {label}: &nbsp;
            </Typography>
            <Typography variant="button" fontWeight="regular" color="text">
                &nbsp;{values[key]}
            </Typography>
        </Box>
    ));

    return (
        <>
            <ApiComponent apiUrl={Profileapi} onDataFetched={setFloordiadata} />
            <ApiComponent apiUrl={Userlistapi} onDataFetched={setUserlistdata} />
            <Box mt={5} mb={3}>
                <Grid container spacing={1} justifyContent="center" alignItems="stretch">
                    <Grid item xs={12} md={6} xl={6}>
                        <Card sx={{ height: '100%', boxShadow: 'none' }}>
                            <Box
                                display="flex"
                                alignItems="center"
                                position="relative"
                                minHeight="18.75rem"
                                borderRadius="xl"
                                sx={{
                                    backgroundImage: `linear-gradient(rgba(132, 141, 145, 0.6), rgba(3, 53, 77, 0.6)), url(${backgroundImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: '50%',
                                    overflow: 'hidden'
                                }}
                            />
                            <Box sx={{ position: 'relative', mt: -8, mx: 3, py: 2, px: 2, backgroundColor: 'white' }}>
                                <Grid container spacing={3} alignItems="center">
                                    <Grid item>
                                        <Avatar src={burceMars} alt="profile-image" />
                                    </Grid>
                                    <Grid item>
                                        <Box height="100%" mt={0.5} lineHeight={1} sx={{}}>
                                            <Typography variant="h5" fontWeight="medium">
                                                {floordiadata.username}
                                            </Typography>
                                            <Typography variant="button" color="text" fontWeight="regular">
                                                Manager
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box p={2}>
                                    <Box opacity={0.3}>
                                        <Divider />
                                    </Box>
                                    <Box>{renderItems}</Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <Card sx={{ height: '100%', boxShadow: 'none', backgroundColor: 'white' }}>
                            <Box pt={2} px={2}>
                                <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
                                    Team Members
                                </Typography>
                            </Box>
                            <Divider />
                            <Box p={2}>
                                <Box component="ul" display="flex" flexDirection="column" p={0} m={0}>
                                    {userlistdata.map((item) => (
                                        <Box key={item.id} component="li" display="flex" alignItems="center" py={1} mb={1}>
                                            <Box mr={2}>
                                                <Avatar src="" alt="M" sx={{ backgroundColor: 'white' }} />
                                            </Box>
                                            <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
                                                <Typography variant="button" fontWeight="medium">
                                                    {item.username}
                                                </Typography>
                                                <Typography variant="caption" color="text">
                                                    {item.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    {/* <Grid item xs={12} md={6} xl={3.5}>
                        <SolutionCard
                            title="Demo 1"
                            description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                        />
                    </Grid>
                    <Grid item xs={12} md={6} xl={3.5}>
                        <SolutionCard
                            title="Demo 1"
                            description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                        />
                    </Grid> */}
                    {/* <Grid item xs={12} md={6} xl={12}>
                        <LocationComponent />
                    </Grid> */}
                </Grid>
            </Box>
        </>
    );
}

export default App;
