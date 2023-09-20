import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    TextField,
    Box,
    OutlinedInput,
    Input
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Grow } from '@mui/material';
import { useContext } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { AuthContext } from '../../../../AuthContext';
import { Loginapi, Profileapi } from '../../../apicomp/Apiurls';
import InputLabel from '@mui/material/InputLabel';
import Axios from 'axios';
// import InputAdornment from '@mui/material/InputAdornment';

const LoginForm = () => {
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: ''
    };
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const { login } = useContext(AuthContext);

    const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
        setLoading(true);
        try {
            const response = await Axios.post(Loginapi, {
                email: values.email,
                password: values.password
            });

            const token = response.data.auth_token;

            login(token);

            const userResponse = await Axios.get(Profileapi, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            const userId = userResponse.data.id;
            localStorage.setItem('id', userId);

            setStatus({ success: true });
            setSubmitting(false);

            navigate('/dashboard/default');
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials.');

            if (err.response) {
                setErrors({ submit: err.response.data.message });
            } else {
                setErrors({ submit: 'An error occurred. Please try again.' });
            }

            setStatus({ success: false });
            setSubmitting(false);
        }
        setLoading(false);
    };

    const handleFocus = () => {
        setError('');
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched, handleChange, handleBlur, isSubmitting, values }) => (
                <Form noValidate>
                    {/* <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        label="Email address"
                        // {...getFieldProps('email')}
                        //error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        value={values.email}
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        // {...getFieldProps('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        //error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    /> */}
                    {/* <FormControl fullWidth error={touched.email && Boolean(errors.email)}>
                        <TextField
                            id="outlined-adornment-email-login"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Email"
                            onFocus={handleFocus}
                            // InputLabelProps={{
                            //     shrink: 'true' // <-- Use string 'true' instead of boolean true
                            // }}
                            endAdornment={
                                // <-- Use "endAdornment" instead of "endadornment"
                                <InputAdornment position="end">
                                    <IconButton edge="end" size="large">
                                        <AccountCircleIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            // focused={true}
                        />

                        {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                    </FormControl> */}
                    <FormControl variant="standard" fullWidth error={touched.email && Boolean(errors.email)}>
                        <TextField
                            //   label="With normal TextField"
                            id="standard-start-adornment"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Email"
                            onFocus={handleFocus}
                            variant="standard"
                            fullWidth
                        />
                        {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                    </FormControl>
                    <br />
                    <br />
                    <FormControl variant="standard" fullWidth error={touched.password && Boolean(errors.password)}>
                        {/* <InputLabel htmlFor="standard-adornment-password">Password</InputLabel> */}
                        <TextField
                            id="standard-adornment-password"
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="standard"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                    </FormControl>
                    {/* <FormControl variant="outlined" error={touched.password && Boolean(errors.password)} fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            //focused={true}
                            id="outlined-adornment-password"
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            //shrink="true"
                            // InputLabelProps={{
                            //     shrink: 'true' // <-- Use string 'true' instead of boolean true
                            // }}
                        />
                        {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                    </FormControl> */}
                    {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" fullWidth>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            fullWidth
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl> */}
                    {/* <FormControl fullWidth error={touched.password && Boolean(errors.password)}>
                        <TextField
                            id="outlined-adornment-password-login"
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                    </FormControl> */}

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    {error && (
                        <Box sx={{ mt: 3 }}>
                            <Grow in={Boolean(error)}>
                                <FormHelperText error>{error}</FormHelperText>
                            </Grow>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                disabled={isSubmitting || loading}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                                sx={{ color: 'white' }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Login'}
                            </Button>
                        </AnimateButton>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
