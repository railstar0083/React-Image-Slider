import React from 'react';

class SideButton extends React.Component {
	
	constructor() {
		super();
		
		this.checkSide = this.checkSide.bind(this);
		
	}
	
	componentDidUpdate() {
		
	}
	
	componentDidMount() {
		
	}
	
	checkSide(){
		if(this.props.didanimate === true){
			return;//prevents spam clicking of the animating buttons
		}
			
		this.props.disableButtons();
		//If the side prop is left, fire the left slide animation, 
		//otherwise, fire the right slide animation
		let click = true;
		if (this.props.side === "left"){
			this.props.handleLeftAnimation(click);
		} else if (this.props.side === "right") {
			this.props.handleRightAnimation(click);
		}
		
	}
	
	render(){
		return(
			<div className="button-side" id={this.props.side}>
				<button onClick={this.checkSide} onTouchStart={this.checkSide} id={this.props.side + "-button"}></button>
			</div>
		)
	}
}

SideButton.proptypes = {
	params: React.PropTypes.object.isRequired,
	didanimate: React.PropTypes.bool.isRequired
}

export default SideButton;