import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import { MENU_OPEN } from 'store/actions';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //
const useStyles = makeStyles((theme) => ({
    logo: {
        animation: '$spin 2s linear infinite'
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
    }
}));
const LogoSection = () => {
    // const navigate = useNavigate();
    const classes = useStyles();
    // const [loading, setLoading] = React.useState(false);
    // const [responseMessage, setResponseMessage] = useState('');
    const defaultId = useSelector((state) => state.customization.defaultId);
    const dispatch = useDispatch();
    return (
        <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to="/dashboard/default">
            <Logo className={classes.logo} />
        </ButtonBase>
    );
};

export default LogoSection;
