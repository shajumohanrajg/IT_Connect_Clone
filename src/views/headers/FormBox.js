import { Box, Grid } from '@mui/material';

const FormBox = ({ children, sx }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 5,
        boxShadow: 30,
        p: 4,
        ...sx // Merge custom style with the default style
    };

    return (
        <Box sx={style}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                {children}
            </Grid>
        </Box>
    );
};

export default FormBox;
