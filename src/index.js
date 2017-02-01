// let's go!
import React from 'react';
import 'whatwg-fetch';
import { render } from 'react-dom';
import './css/style.css';
import './css/animate.css';
import Slider from './components/Slider';

const Root = () => {
	return (
		<div>
			<Slider />
		</div>
	)
}

render(<Root/>, document.querySelector('#jasonSlider'));