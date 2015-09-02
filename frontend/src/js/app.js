import React from 'react';

class HelloWorld extends React.Component {

	render() {
		return <div>Hello World</div>;
	}
}

React.render(<HelloWorld />, document.getElementById('main'));

