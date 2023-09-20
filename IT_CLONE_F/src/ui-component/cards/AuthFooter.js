// material-ui
import { Link, Stack, Typography } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="" underline="hover">
            Poorvika
        </Typography>
        <Typography variant="subtitle2" component={Link} href="" underline="hover">
            Developers Team
        </Typography>
    </Stack>
);

export default AuthFooter;
