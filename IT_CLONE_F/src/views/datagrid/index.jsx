// Argon Dashboard 2 MUI Examples
import ; //import Table from "examples/Tables/Table";

// Argon Dashboard 2 MUI Components
  import ;
// Argon Dashboard 2 PRO MUI components
//import ArgonBadgeDot from "components/ArgonBadgeDot";
  import ;
// Argon Dashboard 2 MUI components
//import ArgonBox from "components/ArgonBox";
  import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MyDataGrid from "examples/Tables/Table/MyDataGrid";
import { columns, rows } from "./data";
import "./data.css";
//import Table from "examples/Tables/Table";
//import Data1 from "./gridexample";
import NestedDataGrid from './nesteddata';

function MyDataGrid1() {
    const columns1 = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 130,
            renderCell: (params) => <ArgonTypography variant="button">{params.value}</ArgonTypography>
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 130,
            cellClassName: 'name-column--cell',
            renderCell: (params) => (
                <ArgonTypography variant="button" fontWeight="medium" color="text">
                    {params.value}
                </ArgonTypography>
            )
        },
        { field: 'age', headerName: 'Age', type: 'number', width: 90 }
    ];

    const rows1 = [
        { id: 1, lastName: 'ahi', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 }
    ];
    return (
        <DashboardLayout>
            <DashboardNavbar />

            {/* <ArgonBox mb={3}> */}

            {/* <Table
   
      columns={[
    { name: "name", align: "left" },
    { name: "function", align: "left" },
    { name: "review", align: "left" },
    { name: "email", align: "center" },
    { name: "employed", align: "center" },
  ]}

  rows={rows}
  
   
  /> */}

            {/* <Table
  columns={[
    { name: "name", align: "left" },
    { name: "function", align: "left" },
    { name: "review", align: "left" },
    { name: "email", align: "center" },
    { name: "employed", align: "center" },
  ]}
  rows={[
    {
      name: ["https://bit.ly/3I3pbe6", "John Micheal"],
      function: "Manager",
      review: (
        <ArgonBox ml={-1.325}>
        <ArgonBadgeDot size="small" badgeContent="positive" /> 
        </ArgonBox>
      ),
      email: "john@user.com",
      employed: "23/04/18",
    },
    {
      name: ["https://bit.ly/3i0v7dg", "Alexa Liras"],
      function: "Programator",
      review: (
        <ArgonBox ml={-1.325}>
          <ArgonBadgeDot size="small" badgeContent="positive" />
        </ArgonBox>
      ),
      email: "alexa@user.com",
      employed: "11/01/19",
    },
    {
      name: ["https://bit.ly/3CzcwOK", "Laurent Perrier"],
      function: "Executive",
      review: (
        <ArgonBox ml={-1.325}>
          <ArgonBadgeDot color="dark" size="small" badgeContent="neutral" />
        </ArgonBox>
      ),
      email: "laurent@user.com",
      employed: "19/09/17",
    },
    {
      name: ["https://bit.ly/3Kza79I", "Michael Levi"],
      function: "Backend Developer",
      review: (
        <ArgonBox ml={-1.325}>
          <ArgonBadgeDot size="small" badgeContent="positive" />
        </ArgonBox>
      ),
      email: "michael@user.com",
      employed: "24/12/08",
    },
    {
      name: ["https://bit.ly/3pSf59J", "Richard Gran"],
      function: "Manager",
      review: (
        <ArgonBox ml={-1.325}>
          <ArgonBadgeDot color="error" size="small" badgeContent="negative" />
        </ArgonBox>
      ),
      email: "richard@user.com",
      employed: "04/10/21",
    },
    {
      name: ["https://bit.ly/3I3pbe6", "Miriam Eric"],
      function: "Programtor",
      review: (
        <ArgonBox ml={-1.325}>
          <ArgonBadgeDot size="small" badgeContent="positive" />
        </ArgonBox>
      ),
      email: "miriam@user.com",
      employed: "14/09/20",
    },
  ]}
/> */}
            {/* </ArgonBox> */}

            <MyDataGrid rows={rows} columns={columns} />
            {/* <Data2 />
<Time2 /> */}
            <NestedDataGrid />
        </DashboardLayout>
    );
}
export default MyDataGrid1;
