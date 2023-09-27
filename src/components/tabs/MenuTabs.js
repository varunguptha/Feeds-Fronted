import React, { useState } from 'react';
import { Tabs, Tab, Paper, Box } from '@mui/material';
import SalesTable from '../../pages/homePage/HomePage';
import SalesForm from '../../pages/salesform/SalesForm';
import StockTable from '../../pages/StockTable';
import StockForm from '../../pages/StockForm';

const TabPanel = ({ children, value, index }) =>
{
    return (
        <div hidden={value !== index}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
};

const AppTabs = () =>
{
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) =>
    {
        setTabValue(newValue);
    };

    return (
        <Paper>
            <Tabs
                value={tabValue}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Sales Table" />
                <Tab label="Sales Form" />
                <Tab label="Stock Table" />
                <Tab label="Stock Form" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <SalesTable />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <SalesForm />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <StockTable />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
                <StockForm />
            </TabPanel>
        </Paper>
    );
};

export default AppTabs;
