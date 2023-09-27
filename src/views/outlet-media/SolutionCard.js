import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    solutionCard: {
        flex: '0 50%',
        background: '#fff',
        boxShadow: '0 2px 4px 0 rgba(136, 144, 195, 0.2), 0 5px 15px 0 rgba(37, 44, 97, 0.15)',
        borderRadius: 15,
        margin: '8px',
        padding: '10px 15px',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        minHeight: 265,
        transition: '0.7s',
        '&:hover': {
            background: '#309df0',
            color: '#fff',
            transform: 'scale(1.1)',
            zIndex: 9,
            '&::before': {
                background: 'rgb(85 108 214 / 10%)'
            },
            '& $soluTitle, & $soluDescription p': {
                color: '#fff'
            },
            '& $soluDescription button': {
                background: '#fff',
                color: '#309df0'
            },
            '& $hoverColorBubble': {
                top: 0
            }
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            //background: 'rgb(85 108 214 / 5%)',
            width: 170,
            height: 400,
            zIndex: -1,
            transform: 'rotate(42deg)',
            right: -56,
            top: -23,
            borderRadius: 35
        }
    },
    hoverColorBubble: {
        position: 'absolute',
        //background: 'rgb(54 81 207 / 15%)',
        width: '100rem',
        height: '100rem',
        left: 0,
        right: 0,
        zIndex: -1,
        top: '16rem',
        borderRadius: '50%',
        transform: 'rotate(-36deg)',
        left: '-18rem',
        transition: '0.7s'
    },
    soluTitle: {
        color: '#212121',
        fontSize: '1.3rem',
        marginTop: '13px',
        marginBottom: '13px'
    },
    soluDescription: {
        fontSize: '15px',
        marginBottom: '15px',
        button: {
            border: 0,
            borderRadius: 15,
            background: 'linear-gradient(140deg, #42c3ca 0%, #42c3ca 50%, #42c3cac7 75%)',
            color: '#fff',
            fontWeight: 500,
            fontSize: '1rem',
            padding: '5px 16px'
        }
    },
    soluTopIcon: {
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: '#fff',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        img: {
            width: 40,
            height: 50,
            objectFit: 'contain'
        }
    }
}));

const SolutionCard = ({ title, description }) => {
    const classes = useStyles();

    return (
        <Card className={classes.solutionCard}>
            <div className={classes.hoverColorBubble}></div>
            <CardContent>{/* Your top icon */}</CardContent>
            <CardContent>
                <Typography className={classes.soluTitle} variant="h6">
                    {title}
                </Typography>
                <Typography className={classes.soluDescription} variant="body2">
                    {description}
                </Typography>
                <Button variant="contained" color="primary" className={classes.soluDescription.button}>
                    Read More
                </Button>
            </CardContent>
        </Card>
    );
};

export default SolutionCard;
