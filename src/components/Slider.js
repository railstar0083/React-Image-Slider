import React from 'react';
import 'whatwg-fetch';
import Gallery from './Gallery';

class Slider extends React.Component {
	constructor() {
		super();
		
		this.readOptions = this.readOptions.bind(this);
		this.findImages = this.findImages.bind(this);
		
		//initial state
		this.state = {
			images: {},
			autoplay: false,
			delay: 1,
			showsidenav: true,
			showbottomnav: true
		};
	}
	
	componentWillMount(){
		//Parse the images from the parent HTML object and store that data as an object to pass into the app.
		var sliderImages = this.findImages();
		var sliderImagesObject = {};
		for (var i = 0; i < sliderImages.length; ++i){
			if(sliderImages[i] !== undefined){
				sliderImagesObject[i] = sliderImages[i];
			}
		}
		
		//get file count and data from ../jasonSliderImages
		//This will be done with ajax or a back end function of some kind
		//for now, the URLs will be hard-coded into state
		
		//load file data into object 'images'
		// var folderImages = {
			// image1: {
				// url: '../jasonSliderImages/cat.jpg',
				// extension: 'jpg',
				// filename: 'cat.jpg',
				// height: 320,
				// width: 320
			// },
			
			// image2: {
				// url: '../jasonSliderImages/dog.jpg',
				// extension: 'jpg',
				// filename: 'dog.jpg',
				// height: 320,
				// width: 320
			// },
			
			// image3: {
				// url: '../jasonSliderImages/bunny.jpg',
				// extension: 'jpg',
				// filename: 'bunny.jpg',
				// height: 320,
				// width: 320
			// }
		// }
		
		//read the options for the slider
		var optionStates = this.readOptions();
		
		//set state
		this.setState({
			images: sliderImages,
			autoplay: optionStates[0],
			delay: optionStates[1],
			showsidenav: optionStates[2],
			showbottomnav: optionStates[3]
		});
		
	}
	
	componentDidMount() {
		//console.log("After set state")
		//console.log(this.state.showbottomnav);
	}
	
	findImages() {
		let parentContainer = document.getElementById("jasonSlider");	
		var imageArray = [];
		var numberOfImages = parentContainer.getElementsByTagName('img').length;
		for (var i=0; i < numberOfImages; i++){
			let imageData = parentContainer.getElementsByTagName('img')[i];
			imageArray.push(imageData);
		}
		return imageArray;
	}
	
	readOptions() {
		let parentContainer = document.getElementById("jasonSlider");
		//if the option exists (is not null), store it.  Otherwise, store the default value.
		if(parentContainer.getAttribute("autoplay")){
			var autoplay = parentContainer.getAttribute("autoplay");
		}else {
			var autoplay = false;
		}
		if(parentContainer.getAttribute("delay")){
			var delay = parentContainer.getAttribute("delay");
		}else {
			var delay = 1;
		}
		if(parentContainer.getAttribute("showsidenav")){
			var showsidenav = parentContainer.getAttribute("showsidenav");
		}else {
			var showsidenav = true;
		}
		if(parentContainer.getAttribute("showbottomnav")){
			var showbottomnav = parentContainer.getAttribute("showbottomnav");
		}else {
			var showbottomnav = true;
		}

		//pass the options back as an array to be read into state.
		var optionsArray = [];
		optionsArray.push(autoplay, delay, showsidenav, showbottomnav);
		return optionsArray;
	}
	
	render(){
		return(
			<div className="slider-frame">
				<p>I'm a slider!</p>
				<Gallery 
				 options={this.state}
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