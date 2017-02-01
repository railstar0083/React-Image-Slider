import React from 'react';

class SideButton extends React.Component {
	
	constructor() {
		super();
		
		this.checkSide = this.checkSide.bind(this);
		
	}
	
	checkSide(){
		//Turn slider buttons off for a moment.  They are turned back on during animation cleanup.
		var noclick = document.getElementById("left-button");
			noclick.style.pointerEvents = "none";
			noclick = document.getElementById("right-button");
			noclick.style.pointerEvents = "none";
		//If the side prop is left, fire the left slide animation, 
		//otherwise, fire the right slide animation
		if (this.props.side === "left"){
			this.props.handleLeftAnimation();
		} else if (this.props.side === "right") {
			this.props.handleRightAnimation();
		}
	}
	
	render(){
		return(
			<div className="button-side" id={this.props.side}>
				<button onClick={this.checkSide} id={this.props.side + "-button"}></button>
			</div>
		)
	}
}

SideButton.proptypes = {
	params: React.PropTypes.object.isRequired
}

export default SideButton;