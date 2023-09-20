import { useEffect, useState } from 'react';
//import myCursorIcon from './favicon.ico';

// material-ui
import { Grid } from '@mui/material';

// project imports

import ActiveTask from './ActiveTask';
import EmptySpace from './EmptySpace';
import ExpireTask from './ExpireTasks';
import Showrooms from './Showrooms';
import TotalTask from './TotalTask';

import { gridSpacing } from 'store/constant';

import ErrorBoundary from './Error';

// ==============================|| DEFAULT DASHBOARD ||============================== //
// const useStyles = makeStyles((theme) => ({
//     myCustomCursor: {
//         height: '240px',
//         width: '100vw',
//         position: 'absolute',
//         top: 0,
//         //left: 0,
//         opacity: 1,
//         background: ' #11cdef',
//         color: '#344767',
//         borderRadius: 'none'
//     }
// }));
const Dashboard = () => {
    // const navigate = useNavigate();
    //const classes = useStyles();
    // const [loading, setLoading] = React.useState(false);
    // const [responseMessage, setResponseMessage] = useState('');

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <ErrorBoundary>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sx={{ backgroundColor: '' }}>
                    <Grid container spacing={gridSpacing}>
                        {/* <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid> */}
                        {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={8}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid> */}
                        <Grid item sm={6} xs={12} md={6} lg={3}>
                            <TotalTask isLoading={isLoading} />
                        </Grid>
                        <Grid item sm={6} xs={12} md={6} lg={3}>
                            <ActiveTask isLoading={isLoading} />
                        </Grid>
                        <Grid item sm={6} xs={12} md={6} lg={3}>
                            <ExpireTask isLoading={isLoading} />
                        </Grid>
                        <Grid item sm={6} xs={12} md={6} lg={3}>
                            <EmptySpace isLoading={isLoading} />
                        </Grid>
                    </Grid>
                </Grid>

                {/* <Stepper /> */}
                {/* <MyForm /> */}
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        {/* <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid> */}
                        {/* <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid> */}
                    </Grid>
                </Grid>
            </Grid>
            <Showrooms />
        </ErrorBoundary>
    );
};

export default Dashboard;
