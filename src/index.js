import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './app/store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#388e3c'
        },
        secondary: {
            main: '#2f0601'
        }
    }
});

const rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    rootElement
)

reportWebVitals();
