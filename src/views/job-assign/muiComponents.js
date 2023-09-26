// muiComponents.js
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import AddIcon from '@mui/icons-material/Add';

import {
    Box,
    Button,
    Card,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
    Fab,
    IconButton,
    DialogContentText,
    DialogContent,
    DialogActions,
    Dialog,
    Divider,
    CardContent,
    CardMedia,
    CardHeader
} from '@mui/material';

import Axios from 'axios';
// import CustomModal from './CustomModal';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { isWebUri } from 'valid-url';
import ApiComponent from '../apicomp/ApiComponent';
import {
    DegreeImageapi,
    Showroomapi,
    BrandLocationapi,
    Vendorapi,
    Statusapi,
    Brandapi,
    OutletMediaListapi,
    OutletMediaFormapi,
    AddAdvertisementFormapi
} from '../apicomp/Apiurls';
import withAuth from '../pages/authentication/authentication3/withAuth';
import style from '../styles/Boxstyle';
import useStyles from '../styles/styles';
import DialogBox from './DialogBox';
import CloseIcon from '@mui/icons-material/Close';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import UnpublishedOutlinedIcon from '@mui/icons-material/UnpublishedOutlined';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
// import OrderTimeline from './timeline1';

import Branding from '../../../src/assets/images/branding.png';
import Branding1 from '../../../src/assets/images/branding1.png';
import Branding2 from '../../../src/assets/images/branding2.png';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
// import Table from './360floordiatable';

export {
    makeStyles,
    styled,
    AddAdvertisementFormapi,
    OutletMediaFormapi,
    OutletMediaListapi,
    Brandapi,
    Statusapi,
    Vendorapi,
    CardHeader,
    MoreVertIcon,
    CardMedia,
    Branding2,
    CardContent,
    Divider,
    // OrderTimeline,
    UnpublishedOutlinedIcon,
    BrandLocationapi,
    // CustomModal,
    AddIcon,
    CloseIcon,
    DeleteIcon,
    EditIcon,
    DataGrid,
    GridToolbar,
    TaskAltOutlinedIcon,
    TabContext,
    TabList,
    TabPanel,
    Tab,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    ApiComponent,
    DegreeImageapi,
    Showroomapi,
    withAuth,
    style,
    useStyles,
    DialogBox,
    Swal,
    isWebUri,
    useNavigate,
    useEffect,
    useState,
    React,
    AddCircleOutlinedIcon,
    FileUploadOutlinedIcon,
    StoreOutlinedIcon,
    IconButton,
    Box,
    Button,
    Card,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Fab,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
    Axios
};
