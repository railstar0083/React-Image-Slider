import React from 'react';
import ImageSlide from './ImageSlide';
import SideButton from './SideButton';

class Gallery extends React.Component {
	
	constructor() {
		super();
		
		this.handleLeftAnimation = this.handleLeftAnimation.bind(this);
		this.handleRightAnimation = this.handleRightAnimation.bind(this);
		this.countSlides = this.countSlides.bind(this);
		this.clearSelectors = this.clearSelectors.bind(this);
		
		//initial height and width state, also initial animation direction to be passed as a prop
		this.state = {
			height: 0,
			width: 0,
			animationdirection: " ",
			numberofslides: 0,
			currentslide: 1,
			stackposition: 0,
			animationtype: " ",
			didanimate: false
		}
	}
	
	componentWillUpdate(props) {
	  
	  
	}
	
	componentDidUpdate(props) {
	
	  
	}
	
	componentWillMount() {
		
	}
	
	componentDidMount() {
		//count slides, set variables
		var slidecount = this.countSlides(), 
			{height, width} = this.state,
			{images} = this.props;
		//Parse out required slider height and width
		console.log(images);
		//iterate over images to find the largest and use those values
		for ( let key in images ){
			console.log(images[key].height);
			if (images[key].height > height || images[key].width > width){
				height = images[key].height;
				width = images[key].width;
			}
		}
		//Put slide-1 on top to start.
		var firstSlide = document.getElementById("slide-1").classList;
		firstSlide.add("topSlide");
		
		//set the state
		this.setState({
			numberofslides : slidecount,
			height: height,
			width: width
		});
		
	}
	
	
	clearSelectors(visibleSlide, nextSlide) {
		//Blow out all the animation classes and set the new topSlide(After the last animation has had time to run)
		setTimeout(function(){
			visibleSlide.style.zIndex ="0";
			nextSlide.style.zIndex ="3";
			var selector = visibleSlide.classList;
				selector.remove("topSlide");
				selector.remove("slideOutLeft");
				selector.remove("slideInLeft");
				selector.remove("slideOutRight");
				selector.remove("slideInRight");
			selector = nextSlide.classList;
				selector.add("topSlide");
				selector.remove("slideOutLeft");
				selector.remove("slideInLeft");
				selector.remove("slideOutRight");
				selector.remove("slideInRight");
			//Turn slider buttons back on
			var noclick = document.getElementById("left-button");
			noclick.style.pointerEvents = "initial";
			noclick = document.getElementById("right-button");
			noclick.style.pointerEvents = "initial";
		}, 1000);
		
	}
	
	handleLeftAnimation() {
		
		//Store topSlide
		var visibleSlide = document.getElementsByClassName("topSlide");
		
		//Capture the slide ID and determine stack order
		let slideId = document.getElementsByClassName("topSlide")[0].id;
		visibleSlide = document.getElementsByClassName("topSlide")[0];
		let stackPosition = slideId.replace('slide-', '');
		stackPosition = Number(stackPosition); //make sure the value is an int
		var nextSlideNumber = 0; //create a temporary index
		if(stackPosition === this.state.numberofslides){
			nextSlideNumber = 1;
		} else {
			nextSlideNumber = stackPosition + 1;
		}
		
		//now that the next slide index is determined save that slide to a variable also.
		var nextSlide = document.getElementById("slide-" + nextSlideNumber);
		
		
		//adjust z-indexes so both slides are visible.
		visibleSlide.style.zIndex ="2";
		nextSlide.style.zIndex ="2";
		visibleSlide.className +=" slideOutLeft";
		nextSlide.className +=" slideInRight";
		//Set new current slide
		var currentSlide = 0;
		if(this.state.currentslide === this.state.numberofslides){
			currentSlide = 1
		} else {
			currentSlide = this.state.currentslide + 1;
		}
		//Set state and trigger animation!
		this.setState({
			animationdirection : "left",
			currentslide : currentSlide,
			didanimate : true
		});
		this.clearSelectors(visibleSlide, nextSlide);
	}
	
	handleRightAnimation() {
		
		//Store topSlide
		var visibleSlide = document.getElementsByClassName("topSlide");
		
		//Capture the slide ID and determine stack order
		let slideId = document.getElementsByClassName("topSlide")[0].id;
		visibleSlide = document.getElementsByClassName("topSlide")[0];
		let stackPosition = slideId.replace('slide-', '');
		stackPosition = Number(stackPosition); //make sure the value is an int
		var nextSlideNumber = 0; //create a temporary index
		if(stackPosition === 1){
			nextSlideNumber = this.state.numberofslides;
		} else {
			nextSlideNumber = stackPosition - 1;
		}
		
		//now that the next slide index is determined save that slide to a variable also.
		var nextSlide = document.getElementById("slide-" + nextSlideNumber);
		
		
		//adjust z-indexes so both slides are visible.
		visibleSlide.style.zIndex ="2";
		nextSlide.style.zIndex ="2";
		visibleSlide.className +=" slideOutRight";
		nextSlide.className +=" slideInLeft";
		//Set new current slide
		var currentSlide = 0;
		if(this.state.currentslide === 1){
			currentSlide = this.state.numberofslides;
		} else {
			currentSlide = this.state.currentslide - 1;
		}
		//Set state and trigger animation!
		this.setState({
			animationdirection : "right",
			currentslide : currentSlide,
			didanimate : true
		});
		this.clearSelectors(visibleSlide, nextSlide);
		
	}
	
	countSlides() {
		var slides=document.getElementsByTagName('img').length;
		return slides;
	}
	
	render(){
		var galleryStyle = {
			height : this.state.height,
			width : this.state.width
		};
		return(
			<div className="image-gallery" id="jasonSlider-gallery" style={galleryStyle}>
				<SideButton side="left" handleLeftAnimation={this.handleLeftAnimation} />
				<SideButton side="right" handleRightAnimation={this.handleRightAnimation} />
				{Object
					.keys(this.props.images)
					.map((key, i) => 
							<ImageSlide
								key={key} 
								index={i}
								animateLeft={this.animateLeft}
								animateRight={this.animateRight}
								numberofslides={this.state.numberofslides}
								currentslide={this.state.currentslide}
								didanimate={this.state.didanimate}
								details={this.props.images[key]}
								id={"slide-" + (i + 1)} 
								className={"animated "} 
								ref="slide"
							/>
					)
				}
			</div>
		)
	}
}

Gallery.proptypes = {
	images: React.PropTypes.object.isRequired,
	params: React.PropTypes.object.isRequired,
	children: React.PropTypes.object.isRequired
}

export default Gallery;