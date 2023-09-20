import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
//import { StoreProvider } from './store1';

// routing
import Routes from 'routes';
// defaultTheme
import themes from 'themes';
// import { store } from 'store';

import BackButton from './BackButton';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            {/* <Provider store={store}> */}
            {/* <ThemeProvider theme={themes(customization)}> */}
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                {/* <BackButton /> */}
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
            {/* </Provider> */}
        </StyledEngineProvider>
    );
};

export default App;
