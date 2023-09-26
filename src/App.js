import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
//import { StoreProvider } from './store1';

// routing
import Routes from 'routes';
// defaultTheme
import themes from 'themes';
// import { store } from 'store';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            {/* <ThemeProvider theme={themes(customization)}> */}
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
