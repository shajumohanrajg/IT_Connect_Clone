import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
// import dayjs from 'dayjs';

const OrderTimeline = () => {
    const theme = useTheme();

    const orderStatusColor = (id) => {
        switch (id) {
            case '1':
                return {
                    color: theme.palette.info.main, // Replace with the correct color from your theme
                    text: 'Active',
                    dotColor: theme.palette.info.dark // Replace with the correct color from your theme
                };
            case '2':
                return {
                    color: theme.palette.success.main, // Replace with the correct color from your theme
                    text: 'Expired',
                    dotColor: theme.palette.success.dark // Replace with the correct color from your theme
                };
            case '3':
                return {
                    color: theme.palette.warning.main, // Replace with the correct color from your theme
                    text: 'expired',
                    dotColor: theme.palette.warning.dark // Replace with the correct color from your theme
                };
            case '4':
                return {
                    color: theme.palette.success.main, // Replace with the correct color from your theme
                    text: 'delivered',
                    dotColor: theme.palette.success.dark // Replace with the correct color from your theme
                };
            default:
                return {
                    color: theme.palette.error.main, // Replace with the correct color from your theme
                    text: 'cancelled',
                    dotColor: theme.palette.error.dark // Replace with the correct color from your theme
                };
        }
    };

    // Placeholder data
    const data = [
        {
            createdAt: new Date(),
            orderNumber: '123',
            status: { id: '1' },
            id: '1',
            model: 'Vivo',
            vendor: 'OOH',
            brand: 'Vivo 53',
            updated: '17-08-2023'
        },
        {
            createdAt: new Date(),
            orderNumber: '456',
            status: { id: '2' },
            id: '2',
            model: 'Oppo',

            vendor: 'Genaral',
            brand: 'Oppo 11',
            updated: '13-07-2023'
        },
        {
            createdAt: new Date(),
            orderNumber: '678',
            status: { id: '3' },
            id: '3',
            model: 'Vivo',

            vendor: 'Other',
            brand: 'Vivo Y27/100',
            updated: '10-06-2023'
        }
        // {
        //     createdAt: new Date(),
        //     orderNumber: '879',
        //     status: { id: '4' },
        //     id: '4',
        //     model: 'Vivo'
        // }
        // Add more data items here
    ];

    return (
        <>
            <Timeline position="right" sx={{ mt: 0, pt: 0 }}>
                {data.map(({ createdAt, orderNumber, status, id, model, brand, vendor, updated }) => {
                    const text = orderStatusColor(status.id.toString())?.text;
                    const color = orderStatusColor(status.id.toString())?.color;
                    const dotColor = orderStatusColor(status.id.toString())?.dotColor;

                    return (
                        <TimelineItem key={orderNumber}>
                            <TimelineOppositeContent sx={{ display: 'none' }} />
                            <TimelineSeparator>
                                <TimelineDot variant="outlined" sx={{ borderColor: dotColor }} />
                                <TimelineConnector sx={{ width: '1px' }} />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Box
                                    sx={{
                                        backgroundColor: '#fff2ea',
                                        borderRadius: 2,
                                        p: 1
                                    }}
                                >
                                    {/*   <Tooltip arrow title={dayjs(createdAt).format('lll')}>
                                        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                                            {dayjs(createdAt).fromNow()}
                                        </Typography>
                                    </Tooltip>*/}
                                    <Typography variant="h5" sx={{ color: 'black' }}>
                                        {/* Replace with your translation logic */}
                                        {updated}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'black' }}>
                                        {/* Replace with your translation logic */}
                                        {`Status: ${text}`}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'black' }}>
                                        {/* Replace with your translation logic */}
                                        {`Modal: ${model}`}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'black' }}>
                                        {/* Replace with your translation logic */}
                                        {`Vendor: ${vendor}`}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'black' }}>
                                        {/* Replace with your translation logic */}
                                        {`Brand: ${brand}`}
                                    </Typography>
                                    <Button variant="text" onClick={() => console.log(`Clicked order ${id}`)} size="small">
                                        <Typography variant="subtitle2" sx={{ color: 'black' }}>
                                            #{orderNumber}
                                        </Typography>
                                    </Button>
                                </Box>
                            </TimelineContent>
                        </TimelineItem>
                    );
                })}
                {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <Pagination
                        count={1} // Replace with actual page count
                        page={1} // Replace with current page
                        onChange={(e, page) => console.log(`Page changed to ${page}`)}
                        siblingCount={0}
                        boundaryCount={0}
                        size="small"
                        color="primary"
                    />
                </Box> */}
            </Timeline>
        </>
    );
};

export default OrderTimeline;
