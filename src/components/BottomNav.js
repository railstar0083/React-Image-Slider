import React from 'react';
import ImageButton from './ImageButton';

class BottomNav extends React.Component {
	
	constructor() {
		super();
		
		
		
	}
	
	componentDidUpdate() {
		
	}
	
	componentDidMount() {
		
	}
	
	render(){
		return(
			<div className="bottom-nav-container">
				{Object
					.keys(this.props.images)
					.map((key, i) => 
							<ImageButton
								key={key} 
								index={i}
								indexedAnimation={this.props.indexedAnimation}
								numberofslides={this.props.numberofslides}
								currentslide={this.props.currentslide}
								didanimate={this.props.didanimate}
								id={"button-" + (i + 1)} 
								ref="nav"
							/>
					)
				}
			</div>
		)
	}
}

BottomNav.proptypes = {
	//numberofslides: React.PropTypes.Number.isRequired,
	//currentslide: React.PropTypes.Number.isRequired
}

export default BottomNav;