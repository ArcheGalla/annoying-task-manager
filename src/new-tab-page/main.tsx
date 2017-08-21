import * as React from 'react';
import {render} from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

const App = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppBar title="My AppBar" />
    </MuiThemeProvider>
);

render(
    <App />,
    document.getElementById('main-root')
);

render(<App/>, document.getElementById('main-root'));
