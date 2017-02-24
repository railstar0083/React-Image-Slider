import React from 'react';
import ImageSlide from './ImageSlide';
import SideButton from './SideButton';
import BottomNav from './BottomNav';
import * as Swipe from './Swipe';

class Gallery extends React.Component {
	
	constructor() {
		super();
		
		this.handleLeftAnimation = this.handleLeftAnimation.bind(this);
		this.handleRightAnimation = this.handleRightAnimation.bind(this);
		this.handleIndexedAnimation = this.handleIndexedAnimation.bind(this);
		this.indexedAnimation = this.indexedAnimation.bind(this);
		this.countSlides = this.countSlides.bind(this);
		this.clearSelectors = this.clearSelectors.bind(this);
		this.disableButtons = this.disableButtons.bind(this);
		this.autoPlayAnimation = this.autoPlayAnimation.bind(this);
		
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
		if(this.props.options.autoplay === "true"){
			let clickFlag = false;
			this.autoPlayAnimation(clickFlag);
		}
	  
	}
	
	componentDidUpdate(props) {
		//Add event listener for swipe events
		var gallery = document.getElementById("jasonSlider-gallery")
		Swipe.init(gallery, callback => {
			if (callback === "LEFT"){
				this.handleLeftAnimation();
			}else if(callback === "RIGHT"){
				this.handleRightAnimation();
			}
		});
		
		
	}
	
	componentWillMount() {
		
	}
	
	componentDidMount(props) {
		//count slides, set variables
		var slidecount = this.countSlides(), 
			{height, width} = this.state,
			{images} = this.props.options;
		//Parse out required slider height and width

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
		
		//is the Bottom nav enabled?
		let bottomNav = this.props.options.showbottomnav;
		var offset;
		if (bottomNav === "true"){
			offset = 20;
		} else {
			offset = 0;
		}
		
		//set the state
		this.setState({
			numberofslides : slidecount,
			height: height + offset,
			width: width
		});
		
	}
	
	componentWillUnmount() {
		//Shut that listener off, but allow animations to finish.
		var gallery = document.getElementById("jasonSlider-gallery")
		Swipe.kill(gallery, callback => {
			if (callback === "LEFT"){
				this.handleLeftAnimation();
			}else if(callback === "RIGHT"){
				this.handleRightAnimation();
			}
		});
		
	}
	
	autoPlayAnimation(clickFlag){
		let counter = this.props.options.delay;
		var timer;
		if (clickFlag === "true"){
			window.clearTimeout(timer);
			return
		}
		//Autoscroll routine
	    if(this.state.didanimate === true){
			return;
		}else{
			timer = window.setTimeout(() => {
				let click = false;
				this.handleLeftAnimation(click);
			}, counter * 1000);
		}
	}
	
	disableButtons(){
		//Turn slider buttons off for a moment.  They are turned back on during animation cleanup.
		var noclick = document.getElementById("left-button");
			noclick.style.pointerEvents = "none";
			noclick = document.getElementById("right-button");
			noclick.style.pointerEvents = "none";
		
		setTimeout(() => {
			//Turn slider buttons back on
			var noclick = document.getElementById("left-button");
				noclick.style.pointerEvents = "initial";
				noclick = document.getElementById("right-button");
				noclick.style.pointerEvents = "initial";
		}, 2000);
	}
	
	clearSelectors(visibleSlide, nextSlide) {
		//Blow out all the animation classes and set the new topSlide(After the last animation has had time to run)
		setTimeout(() => {
			visibleSlide.style.zIndex ="0";
			nextSlide.style.zIndex ="3";
			var selector = visibleSlide.classList;
				selector.remove("topSlide");
				selector.remove("slideOutLeft");
				selector.remove("slideInLeft");
				selector.remove("slideOutRight");
				selector.remove("slideInRight");
				selector.remove("fadeOut");
			selector = nextSlide.classList;
				selector.add("topSlide");
				selector.remove("slideOutLeft");
				selector.remove("slideInLeft");
				selector.remove("slideOutRight");
				selector.remove("slideInRight");
				selector.remove("fadeIn");
			//toggle the animation boolean back to false
			this.setState({
				didanimate : false
			});
		}, 1000);
		
		
	}
	
	handleLeftAnimation(click) {
		
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
		//clear selectors
		this.clearSelectors(visibleSlide, nextSlide);
	}
	
	handleRightAnimation(click) {
		
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
		//clear selectors
		this.clearSelectors(visibleSlide, nextSlide);
		
	}
	
	handleIndexedAnimation(newStackPosition) {
		this.indexedAnimation(newStackPosition);
	}
	
	indexedAnimation(newStackPosition){
		//Store topSlide
		var visibleSlide = document.getElementsByClassName("topSlide");
		//Capture the slide ID and determine stack order
		let slideId = document.getElementsByClassName("topSlide")[0].id;
		visibleSlide = document.getElementsByClassName("topSlide")[0];
		let stackPosition = slideId.replace('slide-', '');
		stackPosition = Number(stackPosition); //make sure the value is an int
		var nextSlideNumber = newStackPosition; //create a temporary index

		//now that the next slide index is determined save that slide to a variable also.
		var nextSlide = document.getElementById("slide-" + nextSlideNumber);
		
		//adjust z-indexes so both slides are visible.
		visibleSlide.style.zIndex ="2";
		nextSlide.style.zIndex ="2";
		visibleSlide.className +=" fadeOut";
		nextSlide.className +=" fadeIn";
		//Set new current slide
		var currentSlide = nextSlideNumber;
		
		//Set state and trigger animation!
		this.setState({
			animationdirection : "indexed",
			currentslide : currentSlide,
			didanimate : true
		});
		//clear selectors
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
		let bottomNav;
		if(this.props.options.showbottomnav === "true"){
			bottomNav = (
				<BottomNav indexedAnimation={this.handleIndexedAnimation} numberofslides={this.state.numberofslides} currentslide={this.state.currentslide} didanimate={this.state.didanimate} images={this.props.options.images}/>
			)
		}
		return(
			<div className="image-gallery" id="jasonSlider-gallery" style={galleryStyle}>
				<SideButton side="left" handleLeftAnimation={this.handleLeftAnimation} disableButtons={this.disableButtons} didanimate={this.state.didanimate} />
				<SideButton side="right" handleRightAnimation={this.handleRightAnimation} disableButtons={this.disableButtons} didanimate={this.state.didanimate} />
				{Object
					.keys(this.props.options.images)
					.map((key, i) => 
							<ImageSlide
								key={key} 
								index={i}
								animateLeft={this.animateLeft}
								animateRight={this.animateRight}
								numberofslides={this.state.numberofslides}
								currentslide={this.state.currentslide}
								didanimate={this.state.didanimate}
								details={this.props.options.images[key]}
								id={"slide-" + (i + 1)} 
								className={"animated "} 
								ref="slide"
							/>
					)
				}
				{ bottomNav }
			</div>
		)
	}
}

Gallery.proptypes = {
	images: React.PropTypes.object.isRequired,
	params: React.PropTypes.object.isRequired,
	children: React.PropTypes.object.isRequired,
	options: React.PropTypes.object.isRequired
}

export default Gallery;