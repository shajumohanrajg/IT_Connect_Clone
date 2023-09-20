import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import * as React from 'react';

export default function DataGridWithFilters() {
    const [pageSize, setPageSize] = React.useState(5);
    const [filters, setFilters] = React.useState({});
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100
    });

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
    };

    const handleFilterChange = (field, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value
        }));
    };

    const filteredData = React.useMemo(() => {
        let filtered = data;

        Object.entries(filters).forEach(([field, value]) => {
            filtered = filtered.filter((row) => row[field] === value);
        });

        return filtered;
    }, [data, filters]);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={filteredData}
                columns={columns}
                pageSize={pageSize}
                components={{
                    Toolbar: GridToolbar
                }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Page Size</InputLabel>
                    <Select value={pageSize} onChange={handlePageSizeChange}>
                        {[5, 10, 20].map((size) => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Filter</InputLabel>
                    <Select
                        onChange={(event) => {
                            handleFilterChange('commodity', event.target.value);
                        }}
                    >
                        <MenuItem value="">All Commodities</MenuItem>
                        {new Set(data.map((row) => row.commodity)).delete('').map((commodity) => (
                            <MenuItem key={commodity} value={commodity}>
                                {commodity}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'commodity', headerName: 'Commodity', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 }
];
