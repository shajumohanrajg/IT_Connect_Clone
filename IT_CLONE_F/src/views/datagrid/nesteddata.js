import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    {
        field: 'address',
        headerName: 'Address',
        width: 250
        //valueGetter: (params) =>
        //`${params.getValue('street') || ''} ${params.getValue('city') || ''} ${params.getValue('state') || ''}`,
    },
    { field: 'street', headerName: 'Street', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 150 }
];

const rows = [
    { id: 1, name: 'John Smith', street: '123 Main St', city: 'Anytown', state: 'CA' },
    { id: 2, name: 'Jane Doe', street: '456 Park Ave', city: 'Anytown', state: 'NY' },
    {
        id: 3,
        name: 'Bob Johnson',
        street: '789 Broadway',
        city: 'Anytown',
        state: 'TX',
        children: [
            { id: 4, name: 'Alex Brown', street: '1111 Lincoln Road', city: 'Miami', state: 'FL' },
            { id: 5, name: 'Bethany Green', street: '2222 Collins Ave', city: 'Miami', state: 'FL' }
        ]
    }
];

export default function NestedDataGrid() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                isRowSelectable={(params) => !params.row.children}
                getChildRows={(parentRow) => parentRow.children}
            />
        </div>
    );
}
