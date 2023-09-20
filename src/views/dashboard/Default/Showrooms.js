//import { Typography } from 'tabler-icons-react';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { Box, Card, Grid, Link, Paper, Typography, Divider } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import Avatar from '@mui/material/Avatar';
//import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { experimentalStyled as styled } from '@mui/material/styles';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Axios from 'axios';
import React from 'react';

import { gridSpacing } from 'store/constant';

import Assetimage from '../../../../src/assets/images/assetlist1.png';
import Visitimage from '../../../../src/assets/images/visit.png';
import Tickets from '../../../../src/assets/images/tickets.png';
import Installations from '../../../../src/assets/images/installations.png';
import { makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import { Showroomapi } from '../../apicomp/Apiurls';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: 0,
        backgroundColor: '#ccc',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex'
    },
    iconButton: {
        listStyle: 'none',
        margin: '0 40px',
        position: 'relative',
        width: 170,
        height: 170,
        backgroundColor: '#fff',
        textAlign: 'center',
        //transform: 'perspective(100px) rotate(-30deg) skew(25deg) translate(0,0)',
        transition: '0.5s',
        boxShadow: '-20px 20px 10px rgba(0, 0, 0, 0.5)',
        '&:hover': {
            //transform: 'perspective(1000px) rotate(-30deg) skew(25deg) translate(20px, -20px)',
            boxShadow: '-50px 50px 50px rgba(0, 0, 0, 0.5)'
        }
    },
    clippedImage: {
        // width: '200px',
        // height: '200px',
        backgroundColor: 'red',
        clipPath: 'circle(100px at center)'
    },
    icon: {
        fontSize: 80, // Adjust the font size based on the new icon size
        color: '#262626',
        lineHeight: '120px', // Adjust the line height based on the new icon size
        transition: '0.5s'
    },
    facebook: {
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            transition: '0.5s'
        },
        '&:before': {
            top: 15,
            left: -32,
            height: '100%',
            width: 35
            //background: 'white',
            //transform: 'rotate(0deg) skewY(-45deg)'
        },
        '&:after': {
            top: 110,
            left: -12,
            height: 35,
            width: '100%'
            //background: 'white',
            //transform: 'rotate(0deg) skewX(-45deg)'
        }
    },
    twitter: {
        // Add styles for Twitter here
    }
    // Add styles for other social media icons here
}));

const columns1 = [
    {
        field: 'name',
        // valueFormatter: ({ value }) => "PO" + value,
        headerName: 'Showroom Name',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        //flex: 0.2
        width: 200
        // cellClassName: "name-column--cell",
    },
    {
        field: 'rsm',
        headerName: 'Rsm',
        // valueFormatter: ({ value }) => "PO" + value,
        // cellClassName: "name-column--cell",
        //flex: 0.2
        width: 120
    },
    {
        field: 'asm',
        headerName: 'Asm',
        // valueFormatter: ({ value }) => "PO" + value,
        // cellClassName: "name-column--cell",
        //flex: 0.2
        width: 120
    },
    {
        field: 'manager',
        headerName: 'Manager',
        // valueFormatter: ({ value }) => "PO" + value,
        // cellClassName: "name-column--cell",
        //flex: 0.2
        width: 120
    },
    {
        field: 'cug_no',
        headerName: 'Cug No',
        // valueFormatter: ({ value }) => "PO" + value,
        // cellClassName: "name-column--cell",
        //flex: 0.2
        width: 120
    },
    {
        field: 'landline',
        headerName: 'Landline',
        // valueFormatter: ({ value }) => "PO" + value,
        // cellClassName: "name-column--cell",
        //flex: 0.2
        width: 120
    },
    {
        field: 'e_mail',
        headerName: 'Email',
        // valueFormatter: ({ value }) => "PO" + value,
        // cellClassName: "name-column--cell",
        //flex: 0.2
        width: 120
    },
    {
        field: 'region',
        headerName: 'Region',
        // valueFormatter: ({ value }) => "PO" + value,
        // cellClassName: "name-column--cell",
        //flex: 0.2
        width: 120
    },
    {
        field: 'state',
        headerName: 'State',
        // valueFormatter: ({ value }) => "PO" + value,
        // cellClassName: "name-column--cell",
        //flex: 0.2
        width: 120
    }
];

const columns2 = [
    {
        field: 'branch',
        // valueFormatter: ({ value }) => "PO" + value,
        headerName: 'Showroom',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'region',
        // valueFormatter: ({ value }) => "PO" + value,
        headerName: 'Region',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'state',
        // valueFormatter: ({ value }) => "PO" + value,
        headerName: 'State',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'opendate',
        // valueFormatter: ({ value }) => "PO" + value,
        headerName: 'Dob',
        cellClassName: 'super-app-theme--cell',

        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'asm',
        // valueFormatter: ({ value }) => "PO" + value,
        headerName: 'ASM',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    }
];

function DataTable() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [product, setProduct] = React.useState('');

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        Axios.get(Showroomapi, {
            headers: {
                Authorization: `Token ${token}` // Include the token in the request headers
            }
        }).then(
            (response) => {
                // console.log("edition",response.data);
                //const districts = response.data;
                setProduct(response.data);
                console.log('edition', response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    return (
        <>
            <Grid container spacing={1} direction="row" sx={{ p: 0 }}>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={2.5}>
                    <Item sx={{ boxShadow: 'none', backgroundColor: 'transparent', textAlign: 'center', alignItems: 'center' }}>
                        <Link href="/asset" underline="none" sx={{ textTransform: 'none' }}>
                            <Card sx={{ backgroundColor: '#fff', border: '1px solid #ebebeb' }}>
                                {/* <CardMedia
                                sx={{ height: 140 }}
                                image="data:image/jpeg;base64,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"
                                title="green iguana"
                            /> */}
                                {/* <img
                                src="data:image/jpeg;base64,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"
                                height="150"
                                alt="Asset"
                            /> */}

                                <img src={Assetimage} height="150" alt="Asset" />
                                <Box sx={{ backgroundColor: '#ebebeb' }}>
                                    <Typography
                                        variant="button"
                                        sx={{
                                            textTransform: 'none',
                                            textAlign: 'center',
                                            color: 'black',
                                            fontSmooth: 4,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Asset List
                                    </Typography>
                                </Box>
                            </Card>
                        </Link>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={2.5}>
                    <Item sx={{ boxShadow: 'none', backgroundColor: 'transparent', textAlign: 'center', alignItems: 'center' }}>
                        <Link href="" underline="none" sx={{ textTransform: 'none' }}>
                            <Card sx={{ backgroundColor: '#fff', border: '1px solid #ebebeb' }}>
                                <img src={Visitimage} height="150" alt="Asset" className={classes.clippedImage} />
                                {/* <Box sx={{ backgroundColor: '#3b3b3b' }}> */}
                                <Box sx={{ backgroundColor: '#ebebeb' }}>
                                    <Typography
                                        variant="button"
                                        sx={{
                                            textTransform: 'none',
                                            textAlign: 'center',
                                            color: 'black',
                                            fontSmooth: 4,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Visit
                                    </Typography>
                                </Box>
                            </Card>
                        </Link>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={2.5}>
                    <Item sx={{ boxShadow: 'none', backgroundColor: 'transparent', textAlign: 'center', alignItems: 'center' }}>
                        <Link href="" underline="none" sx={{ textTransform: 'none' }}>
                            <Card sx={{ backgroundColor: '#fff', border: '1px solid #ebebeb' }}>
                                <img src={Tickets} height="150" alt="Asset" />
                                {/* <Box sx={{ backgroundColor: '#3b3b3b' }}> */}
                                {/* <Divider /> */}
                                <Box sx={{ backgroundColor: '#ebebeb' }}>
                                    <Typography
                                        variant="button"
                                        sx={{
                                            textTransform: 'none',
                                            textAlign: 'center',
                                            color: 'black',
                                            fontSmooth: 4,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Tickets
                                    </Typography>
                                </Box>
                            </Card>
                        </Link>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={2.5}>
                    <Item sx={{ boxShadow: 'none', backgroundColor: 'transparent', textAlign: 'center', alignItems: 'center' }}>
                        <Link href="" underline="none" sx={{ textTransform: 'none' }}>
                            <Card sx={{ backgroundColor: '#fff', border: '1px solid #ebebeb' }}>
                                <img src={Installations} height="150" alt="Asset" />
                                {/* <Box sx={{ backgroundColor: '#3b3b3b' }}> */}
                                <Box sx={{ backgroundColor: '#ebebeb' }}>
                                    <Typography
                                        variant="button"
                                        sx={{
                                            textTransform: 'none',
                                            textAlign: 'center',
                                            color: 'black',
                                            fontSmooth: 4,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Installations
                                    </Typography>
                                </Box>
                            </Card>
                        </Link>
                    </Item>
                </Grid>
            </Grid>
            {/* <Card sx={{ my: 1, boxShadow: 2 }}>
                <Box
                    //id="invoice-container"
                    height="60vh"
                    fontWeight={10}
                    //className={classes.customButton}
                    sx={{
                        //width: '100%',
                        //border: '2px solid #fff2ea',
                        p: 2,
                        height: isSmallScreen ? '90vh' : '60vh',
                        width: '100%',
                        borderRadius: 5,
                        '& .MuiDataGrid-root': {
                            border: 'none',
                            padding: 1
                            //border: '2px dashed grey'
                        },
                        '& .super-app-theme--header': {
                            //backgroundColor: 'rgba(255, 7, 0, 0.55)',
                            //color: 'orange !important',
                            //fontWeight: 'bold !important'
                            //fontWeight: '700 !important',
                            //color: 'white !important'
                        },
                        '& .super-app-theme--cell': {
                            //backgroundColor: 'primary',
                            //color: '#1a3e72 !important',
                            //fontWeight: '600 !important',
                            //border: 1
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: 'none !important',
                            //backgroundColor: '#f2f2f2',
                            color: 'black',
                            fontWeight: '550 !important'
                        },
                        '& .name-column--cell': {
                            variant: 'button',
                            fontWeight: 'medium',
                            color: 'ButtonText'
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            //borderLeft: '2px dashed grey',
                            //borderRight: '2px dashed grey',
                            //borderBottom: '2px solid grey',
                            //fontWeight: 'bold !important',
                            //fontWeight: '700 !important',
                            //fontSize: 15,
                            //fontColor: 'red'
                            //backgroundColor: '#ff874b',
                            //borderRadius: 2
                            //color: 'white !important'
                        },

                        '.MuiDataGrid-columnHeaderTitle': {
                            //fontWeight: 'bold !important',
                            //fontWeight: '1000 !important',
                            //overflow: 'visible !important',
                            color: 'white',
                            width: 'auto',
                            paddingTop: '12px',
                            paddingBottom: '10px',
                            //paddingLeft: "8px",
                            //paddingRight: "24px",
                            textAlign: 'left',
                            fontSize: '0.80rem',
                            fontWeight: 700,
                            opacity: 0.7,
                            background: 'transparent',
                            color: '#8392ab',
                            borderRadius: 'none',
                            borderBottom: '0.0625rem solid #e9ecef'
                            //fontSize: 15
                        },
                        '& .MuiDataGrid-virtualScroller': {
                            //opacity: 1,
                            //transition: 'opacity 0.2s',
                            //overflowY: 'auto',
                            overflowX: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '4px',
                                backgroundColor: '#F5F5F5'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                //backgroundColor: '#11cdef',
                                borderRadius: '4px'
                            }
                        },
                        '& .MuiDataGrid-footerContainer': {
                            color: '#8392ab',
                            border: 'none'
                        },
                        '& .MuiDataGrid-columnSeparator': {
                            visibility: 'hidden'
                        },
                        '&.MuiDataGrid-pagination': {
                            //backgroundColor: "red",
                            //padding: "10px",
                            width: '20px !important'
                        },

                        '&.MuiDataGrid-virtualScroller': {
                            opacity: 0,
                            transition: 'opacity 0.2s'
                        },
                        '&.MuiTablePagination-root': {
                            width: '20px'
                        },

                        '&.MuiDataGrid-virtualScroller:hover': {
                            opacity: 1
                        },
                        '& .MuiTablePagination-select': {
                            //paddingRight: 2,
                            width: '10px !important'
                        },
                        '& .MuiTablePagination-selectIcon': {
                            display: 'none'
                        },

                        '&.MuiDataGrid-toolbar .MuiDataGrid-menuList': {
                            padding: 0
                        },

                        '& .MuiDataGrid-toolbar .MuiButtonBase-root': {
                            fontSize: '14px',
                            color: '#333'
                        },

                        '& .MuiDataGrid-toolbar .MuiButtonBase-root:hover': {
                            backgroundColor: '#f0f0f0'
                        }
                    }}
                >
                    <DataGrid
                        rows={product}
                        //columns={columns1}
                        columns={columns1}
                        pageSize={5}
                        getRowId={(row) => row.id}
                        components={{ Toolbar: GridToolbar, color: 'primary' }}
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                                color: 'primary'
                            }
                        }}
                        loading={loading}
                        //autoHeight
                        //scrollbarSize={100}
                        //pageSize={5}
                        //checkboxSelection
                        //touchRipple
                        //disableColumnMenu
                        disableColumnFilter={isSmallScreen ? true : false}
                        disableDensitySelector={isSmallScreen ? true : false}
                        virtualization
                    />
                </Box>
            </Card> */}
            {/* </Card> */}
        </>
    );
}

export default DataTable;
