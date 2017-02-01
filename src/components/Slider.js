import React from 'react';
import 'whatwg-fetch';
import Gallery from './Gallery';

class Slider extends React.Component {
	constructor() {
		super();
		
		
		
		//initial state
		this.state = {
			images: {}
		};
	}
	
	componentWillMount(){
		//get file count and data from ../jasonSliderImages
		//This will be done with ajax or a back end function of some kind
		//for now, the URLs will be hard-coded into state
		
		//load file data into object 'images'
		var folderImages = {
			image1: {
				url: '../jasonSliderImages/cat.jpg',
				extension: 'jpg',
				filename: 'cat.jpg',
				height: 320,
				width: 320
			},
			
			image2: {
				url: '../jasonSliderImages/dog.jpg',
				extension: 'jpg',
				filename: 'dog.jpg',
				height: 320,
				width: 320
			},
			
			image3: {
				url: '../jasonSliderImages/bunny.jpg',
				extension: 'jpg',
				filename: 'bunny.jpg',
				height: 320,
				width: 320
			}
		}
		
		//set state
		this.setState({
			images: folderImages
		});	
	}
	
	
	
	render(){
		return(
			<div className="slider-frame">
				<p>I'm a slider!</p>
				<Gallery 
				 images={this.state.images}
				 params={this.props.params}
				 children={this.props.children}
				>
				{this.props.children}
				</Gallery>
			</div>
		)
	}
}

Slider.proptypes = {
	params: React.PropTypes.object.isRequired
}

export default Slider;