import React from 'react';
import { Card, CardContent, Typography, Button, Chip, Grid, Link, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import TripOriginIcon from '@mui/icons-material/TripOrigin';

const useStyles = makeStyles((theme) => ({
    solutionCard: {
        flex: '0 50%',
        background: '#fff',
        boxShadow: '0 2px 4px 0 rgba(136, 144, 195, 0.2), 0 5px 15px 0 rgba(37, 44, 97, 0.15)',
        borderRadius: 15,
        //margin: '8px',
        padding: '10px 15px',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        //minHeight: 265,
        transition: '0.7s',
        animation: 'none !important',
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
            },
            '& $chipLabel': {
                color: '#fff',
                borderColor: '#fff'
            }
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            background: 'rgb(85 108 214 / 5%)',
            width: 170,
            height: 400,
            zIndex: -1,
            transform: 'rotate(42deg)',
            right: -56,
            top: -23,
            borderRadius: 35,
            color: 'white'
        }
    },
    chipLabel: {
        color: 'black',
        borderColor: '#ebebeb'
    },
    allcolor: {
        color: 'white'
    },
    hoverColorBubble: {
        position: 'absolute',
        background: 'rgb(54 81 207 / 15%)',
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
            //background: 'linear-gradient(140deg, #42c3ca 0%, #42c3ca 50%, #42c3cac7 75%)',
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

const SolutionCard = ({ title, description, chipLabels, dob, asm }) => {
    const theme = useTheme();
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // const isMobile = /* determine if it's mobile */;

    return (
        <Card className={classes.solutionCard}>
            <div className={classes.hoverColorBubble}></div>
            <CardContent>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography variant="h4" className={classes.chipLabel}>
                            {title}
                        </Typography>
                    </Grid>
                    {/* Your existing Grid containers */}
                    <Grid container spacing={0} direction="row" sx={{ mt: 0, p: 1 }}>
                        <Grid item xs={12} md={12} xl={6}>
                            <Typography variant="subtitle1" sx={{ fontSize: isMobile ? 13 : 14 }} className={classes.chipLabel}>
                                <span>DOB :</span> <span style={{ color: '#bfbfbf' }}>{dob}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} xl={6}>
                            <Typography
                                variant="subtitle1"
                                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', fontSize: isMobile ? 13 : 14 }}
                                className={classes.chipLabel}
                            >
                                <span style={{}}>ASM :</span> <span style={{ color: '#bfbfbf' }}>{asm}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} direction="row" sx={{ mt: 1 }}>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Chip
                                icon={<PlaylistAddCheckCircleIcon fontSize="medium" color="info" />}
                                label={chipLabels[0]}
                                sx={{ backgroundColor: 'transparent', border: '1px solid #ebebeb' }}
                                className={classes.chipLabel}
                            />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Chip
                                icon={<CheckCircleIcon fontSize="small" color="success" />}
                                label={chipLabels[1]}
                                sx={{ backgroundColor: 'transparent', border: '1px solid #ebebeb' }}
                                className={classes.chipLabel}
                            />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Chip
                                icon={<UnpublishedIcon fontSize="small" color="error" />}
                                label={chipLabels[2]}
                                sx={{ backgroundColor: 'transparent', border: '1px solid #ebebeb' }}
                                className={classes.chipLabel}
                            />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Chip
                                icon={<TripOriginIcon fontSize="small" color="primary" />}
                                label={chipLabels[3]}
                                sx={{ backgroundColor: 'transparent', border: '1px solid #ebebeb' }}
                                className={classes.chipLabel}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SolutionCard;
