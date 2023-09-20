import { Card, Stack } from '@mui/material';

const CustomCard = ({ children }) => {
    return (
        <Card sx={{ width: '100%', boxShadow: 0, backgroundColor: 'white' }}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{ padding: 1 }}
            >
                {children}
            </Stack>
        </Card>
    );
};

export default CustomCard;
