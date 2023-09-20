import Grid from '@mui/material/Grid';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import errorImage from '../../../assets/images/sammy-no-connection.png';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo); // log the error message to the console
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <MainCard title="Something Went Wrong">
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid xs={3}>
                            {' '}
                            <img src={errorImage} alt="Error" />
                        </Grid>
                    </Grid>

                    {/* <h1>Something went wrong.</h1> */}
                </MainCard>
            ); // display an error message to the user
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
