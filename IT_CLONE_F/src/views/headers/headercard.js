import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    avatar: {
        background: 'linear-gradient(to right bottom, #fb6340, #fbb140)'
    },
    typography: {
        color: '#444444'
    }
}));

const CustomList = ({ icon, text, iconColor }) => {
    //const navigate = useNavigate();
    const classes = useStyles();
    // const [loading, setLoading] = useState(false);
    // const [responseMessage, setResponseMessage] = useState('');

    return (
        <List>
            <ListItem>
                <ListItemAvatar>
                    <Avatar className={classes.avatar} style={{ color: iconColor }}>
                        {icon}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText>
                    <Typography variant="h3" className={classes.typography}>
                        {text}
                    </Typography>
                </ListItemText>
            </ListItem>
        </List>
    );
};

export default CustomList;
