import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import Assetlist from './assetlist';
import Assetfilter from './assetlistfilter';
import SolutionCard from './assetlistcard';

export default function LabTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Without Filter" value="1" />
                        <Tab label="With Filter" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Assetlist />
                </TabPanel>
                <TabPanel value="2">
                    <Assetfilter />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
