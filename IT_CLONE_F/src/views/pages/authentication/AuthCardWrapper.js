import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }) => (
    <MainCard
        sx={{
            // boxShadow: '0px 2px 2px rgba(0, 0, 1, 1)',
            //boxShadow: '#ff5500 1px 2px 22px',
            // backgroundImage: 'linear-gradient(to right, #4caf50, #f0f0f0)',
            // opacity: 0.7,
            //backgroundColor: 'white',
            //     backgroundImage: `
            //     linear-gradient(180deg, #fff 25%, transparent 25%),

            //     linear-gradient(15deg, transparent 75%, #fff2ea 75%),
            //     linear-gradient(-15deg, transparent 75%, #fff2ea 75%)
            //   `,
            //     backgroundImage: `
            //     linear-gradient(45deg, #fff2ea 25%, transparent 25%),
            //     linear-gradient(-45deg, #fff2ea 25%, transparent 25%),
            //     linear-gradient(45deg, transparent 75%, #fff2ea 75%),
            //     linear-gradient(-45deg, transparent 75%, #fff2ea 75%)
            //   `,
            //     backgroundSize: '20px 20px',
            maxWidth: { xs: 400, lg: 475 },
            margin: { xs: 2.5, md: 3 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        content={false}
        {...other}
    >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5, boxShadow: 5 } }}>{children}</Box>
    </MainCard>
);

AuthCardWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthCardWrapper;
