// import zIndex from '@mui/material/styles/zIndex';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    tableContainer: {
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(1)
        }
    },
    searchField: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1)
        }
    },
    pagination: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center'
    },
    stepper: {
        backgroundColor: 'transparent', // set your desired background color
        // padding: "16px", // adjust the padding as needed
        // borderRadius: "8px", // adjust the border radius as needed
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1)
        }
    },
    fabbutton1: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999
    },
    clippedImage: {
        // width: '200px',
        // height: '200px',
        clipPath: 'circle(100px at center)'
    },
    Button: {
        borderRadius: 8,
        //backgroundColor: '#1a5f7a',
        background: 'linear-gradient(to right bottom, #1a5f7a, #0b3442)',
        color: 'white',
        '&:hover': {
            backgroundColor: '#1a5f7a',
            color: 'white'
            //boxShadow: 24
        }
    },
    input: {
        borderRadius: 50,
        //padding: "0.75rem",
        //height: "1.4375em",

        animationDuration: '10ms',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                //borderColor: "#ccc",
                borderRadius: 8
                //borderColor: "black",
                //border: "2px dashed grey",
                //height: "1.4375em",
                //padding: "1rem",
                //color: 'white',
                //backgroundColor: '#fff'
            },
            '&:hover fieldset': {
                borderColor: '#999'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1a5f7a'
            }
        }
    },
    fw: {
        fontWeight: 'bold'
    },
    label: {
        color: '#1a5f7a',
        '&.Mui-focused': {
            color: '#1a5f7a'
        }
    },
    focusedLabel: {
        color: '#1a5f7a'
    },
    select: {
        size: 'small',
        borderRadius: 10,
        color: '#1a5f7a',
        //backgroundColor: '#fff',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                //borderColor: "#ccc",
                borderRadius: 8
                //borderColor: "black",
                //border: "2px solid grey",
                //backgroundColor: '#fff'
            },
            '&:hover fieldset': {
                borderColor: '#999'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1a5f7a'
            },
            '&.Mui-focused': {
                color: '#1a5f7a'
            }
        },
        '& .MuiSelect-icon': {
            color: '#333'
        }
    },
    select1: {
        size: 'small',
        borderRadius: 10,
        backgroundColor: '#fff',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                //borderColor: "#ccc",
                borderRadius: 8
                //borderColor: "black",
                //border: "2px solid grey",
                //backgroundColor: '#fff'
            },
            '&:hover fieldset': {
                borderColor: '#999'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1a5f7a'
            },
            '&.Mui-focused': {
                color: '#1a5f7a'
            }
        },
        '& .MuiSelect-icon': {
            color: '#333'
        }
    },
    accordion: {
        marginTop: theme.spacing(2)
    },
    formControl: {
        minWidth: 200,
        marginTop: theme.spacing(2)
    }
}));

export default useStyles;
