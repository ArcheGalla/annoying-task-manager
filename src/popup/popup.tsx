import * as React from 'react';
import * as ReactDOM from 'react-dom';


class App extends React.Component {
	render() {
		return <div>Hello World this is React app</div>
	}
}
console.log('Hello');

ReactDOM.render(<App/>, document.getElementById('popup-root'));
