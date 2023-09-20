import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

const Asset = Loadable(lazy(() => import('views/outlet-media/outletadvertise')));
const Assetform = Loadable(lazy(() => import('views/outlet-media/outletadform')));
const MyForm = Loadable(lazy(() => import('views/outlet-media/floordiagram')));
const MyForm1 = Loadable(lazy(() => import('views/outlet-media/360floordiagram')));
const Class = Loadable(lazy(() => import('views/outlet-media/class')));
const Brand = Loadable(lazy(() => import('views/outlet-media/brand')));
const Brandtype = Loadable(lazy(() => import('views/outlet-media/brandtype')));
const Lighttype = Loadable(lazy(() => import('views/outlet-media/lighttype')));
const Materialtype = Loadable(lazy(() => import('views/outlet-media/materialtype')));
const Adlocation = Loadable(lazy(() => import('views/outlet-media/adlocation')));
const Vendorlist = Loadable(lazy(() => import('views/outlet-media/vendorlist')));
const Showrooms = Loadable(lazy(() => import('views/outlet-media/showrooms')));
const Showroomadd = Loadable(lazy(() => import('views/outlet-media/showroomlist')));
const Status = Loadable(lazy(() => import('views/outlet-media/status')));
const Assetlist = Loadable(lazy(() => import('views/outlet-media/assetlist')));
const Assetstatus = Loadable(lazy(() => import('views/outlet-media/assetstatus')));
const Storereport = Loadable(lazy(() => import('views/outlet-media/storereport')));
const Assetindstatus = Loadable(lazy(() => import('views/outlet-media/assetindstatus')));
const Users = Loadable(lazy(() => import('views/user-management/users')));
const Roles = Loadable(lazy(() => import('views/user-management/roles')));
const Addad = Loadable(lazy(() => import('views/outlet-media/addad')));
const Asset1 = Loadable(lazy(() => import('views/outlet-media/asset')));
const Jobfor = Loadable(lazy(() => import('views/job-assign/jobfor')));
const Jobassign = Loadable(lazy(() => import('views/job-assign/jobassign')));
const Jobassignform = Loadable(lazy(() => import('views/job-assign/jobassignform')));
const Jobassignupdate = Loadable(lazy(() => import('views/job-assign/jobassignupdate')));
const Profile1 = Loadable(lazy(() => import('views/outlet-media/Profile')));
const Jobtype = Loadable(lazy(() => import('views/job-assign/jobtype')));
const DesignType = Loadable(lazy(() => import('views/job-assign/designtype')));
const DesignTypetable = Loadable(lazy(() => import('views/job-assign/designtypetable')));
const Showroomsupdate = Loadable(lazy(() => import('views/outlet-media/showroomlistupdate')));
const Outletupdate = Loadable(lazy(() => import('views/outlet-media/outletupdate')));
const Hoardinglist = Loadable(lazy(() => import('views/hoarding/hoardinglist')));
const Timeline = Loadable(lazy(() => import('views/outlet-media/timeline')));
const Timelinemob = Loadable(lazy(() => import('views/outlet-media/timelinemob')));
const Hoardingform = Loadable(lazy(() => import('views/hoarding/hoardingform')));
const Hoardingupdate = Loadable(lazy(() => import('views/hoarding/hoardingupdate')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'profile',
            element: <Profile1 />
        },
        {
            path: 'timeline',
            element: <Timeline />
        },
        {
            path: 'asset',
            element: <Asset1 />
        },
        {
            path: 'users',
            element: <Users />
        },
        {
            path: 'roles',
            element: <Roles />
        },
        {
            path: 'storereport',
            element: <Storereport />
        },
        {
            path: 'assetlist',
            element: <Assetlist />
        },
        {
            path: 'assetstatus',
            element: <Assetstatus />
        },
        {
            path: 'addad',
            element: <Addad />
        },
        {
            path: 'assetindstatus',
            element: <Assetindstatus />
        },
        {
            path: 'floordiagram',
            element: <MyForm />
        },
        {
            path: '360floordiagram',
            element: <MyForm1 />
        },
        {
            path: 'class',
            element: <Class />
        },
        {
            path: 'brand',
            element: <Brand />
        },
        {
            path: 'brandtype',
            element: <Brandtype />
        },
        {
            path: 'lighttype',
            element: <Lighttype />
        },
        {
            path: 'materialtype',
            element: <Materialtype />
        },
        {
            path: 'adlocation',
            element: <Adlocation />
        },
        {
            path: 'vendorlist',
            element: <Vendorlist />
        },
        {
            path: 'status',
            element: <Status />
        },
        {
            path: 'jobassign',
            element: <Jobassign />
        },
        {
            path: 'jobassignform',
            element: <Jobassignform />
        },
        ,
        {
            path: 'jobassignupdate/:id',
            element: <Jobassignupdate />
        },
        {
            path: 'jobfor',
            element: <Jobfor />
        },
        {
            path: 'jobtype',
            element: <Jobtype />
        },
        {
            path: 'designtype',
            element: <DesignType />
        },
        {
            path: 'designtypetable',
            element: <DesignTypetable />
        },
        {
            path: 'outletadvertise',
            element: <Asset />
        },
        {
            path: 'outletadform',
            element: <Assetform />
        },
        {
            path: 'showroomadd',
            element: <Showroomadd />
        },
        {
            path: 'timelinemob',
            element: <Timelinemob />
        },
        {
            path: 'showroomslistupdate/:id',
            element: <Showroomsupdate />
        },
        {
            path: 'outletupdate/:id',
            element: <Outletupdate />
        },
        {
            path: 'showrooms',
            element: <Showrooms />
        },
        {
            path: 'hoardinglist',
            element: <Hoardinglist />
        },
        {
            path: 'hoardingform',
            element: <Hoardingform />
        },
        {
            path: 'hoardingupdate/:id',
            element: <Hoardingupdate />
        }
    ]
};

export default MainRoutes;
