import React from 'react';

class ImageSlide extends React.Component {
	
	// constructor() {
		// super();
		
	// }
	
	
	componentWillReceiveProps(nextProps) {
		
	}
	
	componentWillMount() {
	  
	}
	
	componentDidMount(props) {
	  
	}
	
	render(){
		const { details, className, id } = this.props;
		return(
			
				<div className={className} id={id}>
					<img src={details.src} height={details.height} width={details.width} alt={details.alt} />
				</div>

		)
	}
}

ImageSlide.proptypes = {
	details: React.PropTypes.object.isRequired,
	id: React.PropTypes.string.isRequired,
	className: React.PropTypes.string.isRequired,
}

export default ImageSlide;