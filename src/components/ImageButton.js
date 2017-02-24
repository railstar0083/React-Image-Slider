import React from 'react';

class ImageButton extends React.Component {
	
	constructor() {
		super();
		
		this.checkIndex = this.checkIndex.bind(this);
		this.changeSlide = this.changeSlide.bind(this);
		
		this.state = {
			isSelected: false
		}
	}
	
	componentWillUpdate() {
		
	}
	
	componentDidUpdate() {
		this.checkIndex();
	}
	
	componentDidMount() {
		this.checkIndex();
	}
	
	checkIndex(e) {
		var thisButton = document.getElementsByClassName("bottom-nav-button")[this.props.index];
		var buttonId = thisButton.id;
		let stackPosition = buttonId.replace('button-', '');
		stackPosition = Number(stackPosition); //make sure the value is an int
		var selector = thisButton.classList;
		if(stackPosition === this.props.currentslide){
			selector.add("current-slide");
		}else{
			selector.remove("current-slide");
		}
		
	}
	
	changeSlide() {
		if(this.props.didanimate === true){
			return;//prevents spam clicking of the animating buttons
		}
		
		var thisButton = document.getElementsByClassName("bottom-nav-button")[this.props.index];
		var buttonId = thisButton.id;
		let stackPosition = buttonId.replace('button-', '');
		stackPosition = Number(stackPosition); //make sure the value is an int
		if(stackPosition === this.props.currentslide){
			return;
		} else {
			this.props.indexedAnimation(stackPosition);
		}
		
	}
	
	render(){
		return(
			<div className="bottom-nav-button" id={this.props.id} onClick={this.changeSlide} onTouchStart={this.changeSlide} >
				
			</div>
		)
	}
}

ImageButton.proptypes = {
	
}

export default ImageButton;