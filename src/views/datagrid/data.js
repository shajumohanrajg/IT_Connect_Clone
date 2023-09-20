const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 }
];

const rows = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
    { id: 3, firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com' }
];

const storeList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'Showroom',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Region',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'State',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'DOB',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },

    {
        field: 'gst_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'ASM',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    },

    {
        field: 'net_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'Brand',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'DOB',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Brand',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Total Branding',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Available Branding',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Expired Branding',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }
    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];

const AAList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Vendor Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },

    {
        field: 'gst_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'Vendor Update Image Old',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    },

    {
        field: 'net_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'Vendor Update Image New',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const storeList1 = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'Showroom',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Region',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'State',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'DOB',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },

    {
        field: 'gst_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'ASM',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    },

    {
        field: 'net_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'Brand',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'DOB',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Brand',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Total Branding',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Available Branding',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Expired Branding',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }
    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const OAList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Showroom Location',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Branding Type',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Brand Location',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },

    {
        field: 'gst_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'Brand',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    },

    {
        field: 'net_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'Model(Product) Name',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Width',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Height',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Material',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Region',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: '	AD Image',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: '	Job Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }
    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const DIMList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Showroom Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: '	Grade',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const ShowroomDetailList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Showroom',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'RSM',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'ASM',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },

    {
        field: 'gst_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'Manager',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    },

    {
        field: 'net_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'CUG No',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Landline',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'E-Mail',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Region',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'State',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Address',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const ClassManagementList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const BrandManagementList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const BrandTypeList = [
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const VendorList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const BrandLocationList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const MaterialTypeList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const LightTypeList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const StatusList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Visibility',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const HoardingList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Site Location',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Site Type',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Brand Location',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },

    {
        field: 'gst_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'Brand',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    },

    {
        field: 'net_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'Model Name',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Width (Feet)',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Height (Feet)',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Rent',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Rent Type',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Material',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'AD Image',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Job Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const JobList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Assign By',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Job For',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Job Type',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },

    {
        field: 'gst_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'Assign Date',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    },

    {
        field: 'net_amount',
        //valueFormatter: ({ value }) => "₹ " + value,
        headerName: 'Design Type',
        headerClassName: 'super-app-theme--header',
        flex: 0.6
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Showroom/Location',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Priority',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Assign To',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Dead Line',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'org_name',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const JobForList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const JobTypeList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Job For',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Job type',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const JobDesignTypeList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Job For',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Job type',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Design type',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const QuickViewList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Assign By',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Assign To',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Time',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const UserList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Role',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const RolesList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Description',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Level',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const RoleManagementList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'View',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Modify',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Delete',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Update Asset Image',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const MediaResearchList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Area Name',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Pincode',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Medium',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const ViewJobList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Title',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Domain',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Resource',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Task Take Time Duration',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
const ViewRatingList = [
    {
        field: 'id',
        //valueFormatter: ({ value }) => "PO" + value,
        headerName: 'S.No',
        cellClassName: 'super-app-theme--cell',
        headerClassName: 'super-app-theme--header',
        flex: 0.4
        // cellClassName: "name-column--cell",
    },
    {
        field: 'vendor',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Title',

        headerClassName: 'super-app-theme--header',
        flex: 0.7,
        filterable: 'true'

        // cellClassName: "name-column--cell",
    },

    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Domain',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Resource',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Task Take Time Duration',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Status',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    },
    {
        field: 'branches',
        //valueFormatter: ({ value }) => value.name,
        headerName: 'Rating',

        headerClassName: 'super-app-theme--header',
        flex: 0.9
        // cellClassName: "name-column--cell",
    }

    //   {
    //     headerName: "Actions",
    //     field: "action",
    //     flex: 0.4,
    //     headerClassName: "super-app-theme--header",
    //     renderCell: (params) => (
    //       <div>
    //         {/* <IconButton
    //             aria-label="view"
    //             color="warning"
    //             size="large"
    //             onClick={() => viewVendor(params.id)}
    //           >
    //             <VisibilityIcon fontSize="small" />
    //           </IconButton>
    //           <IconButton
    //             aria-label="update"
    //             color="success"
    //             size="large"
    //             onClick={() => updateVendor(params.id)}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton> */}

    //         {/* <IconButton
    //             aria-label="delete"
    //             color="error"
    //             size="large"
    //             onClick={() => deleteVendor(params.id)}
    //           >
    //             <DeleteIcon fontSize="small" />
    //           </IconButton> */}
    //       </div>
    //     ),
    //   },
];
