import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import withAuth from '../pages/authentication/authentication3/withAuth';
import { Brandapi } from '../apicomp/Apiurls';

const CustomDataGrid = ({ isSmallScreen, rows, columns, ...props }) => {
    // const isSmallScreen = useMediaQuery('(max-width:600px)');
    return (
        <Card sx={{ backgroundColor: '#FFFFFf' }}>
            <Box
                height="60vh"
                width="100%"
                fontWeight={8}
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
                        color: '#444444',
                        fontWeight: '500 !important'
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
                <DataGrid rows={rows} columns={columns} {...props} />
            </Box>
        </Card>
    );
};

export default withAuth(CustomDataGrid);
