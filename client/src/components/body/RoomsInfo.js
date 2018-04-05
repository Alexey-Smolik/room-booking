import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../../actions/index";
import Carousel from 'react-bootstrap/lib/Carousel';

class RoomsInfo extends React.Component {

// Getting props from NavBar & Redux, getting issues from Server.
// Getting handleMouseEvent from LeftNavBar

// Side-click event that reading first class name letters & parent className then changes LeftNavBar(by handleMouseEvent) state.  
// Side-clicks prevented if input field is not empty.

// Input value resets if other info-button being clicked.

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.selectedRoom.id,
			issues: this.props.selectedRoom.issues,
			inputValue: '',
			inputElem: ''
		};
		this.clearInputValue = this.clearInputValue.bind(this);
		this.handleIssueAdd = this.handleIssueAdd.bind(this);
		this.inputHandler = this.inputHandler.bind(this);
	};

 	componentDidMount() {
 		window.addEventListener('click', this.sideClick);
 	};

 	componentWillUnmount() {
 		window.removeEventListener('click', this.sideClick);
 	};

 	componentWillReceiveProps() {
 		this.setState({
 			issueAdd: false
 		});

 		if(this.state.inputElem) {
 			let input = this.state.inputElem;
 			input.value = "";
 		}
 	};



 	clearInputValue(e) {
 		if(this.state.inputValue) {
 			if(this.props.selectedRoom.id !== this.state.id) {
	 			let input = this.state.inputElem;
	 			input.value = "";
	 			this.setState({
	 				inputValue: ''
	 			});
	 		}
 		}
 	};

	handleIssueAdd = () => {
		this.setState({
			issueAdd: !this.state.issueAdd
		});
	};

	sideClick = (e) => {
		if(this.state.inputValue) {
			return;
		}
		if(e.target.className === 'overlay') {
			this.props.handleMouseEvent('');
		}
	};

    inputHandler(e, num) {
		if(e && num) {
    		if(e.target.value) {
    			this.setState({
	    			inputValue : e.target.value,
	    			inputElem: e.target
	    		});
    		}
    	} else {
    		if(this.state.inputValue) {
    			const data = {
    				description: this.state.inputValue,
    				active: true,
    				roomId: this.props.selectedRoom.id
    			};
    			this.props.createIssue(data);
    			this.props.getRoomIssues(this.props.selectedRoom.id);
	    		e.target.previousSibling.value = "";
	    		this.setState({
	    			inputValue: ""
	    		});
    		}
    	}
    };

    issueAdd() {
  		return(
    		<div className="room-issues-form"> 
        		<textarea className="room-issues-input" onChange={ (e) => this.inputHandler(e, 1)}></textarea>
				<button className="room-issues-button" onClick={(e) => this.inputHandler(e)}>Ok</button>
        	</div>
    	);
    };

    issuesList(props) {
		if(props) {
			return props.map( (item, index) => {
	    		return <div className="room-issue" key={index}> {item.description} </div>
	    	});
		}
    };

    carouselRender() {
      if(!this.props.selectedRoom.images.length)
      	return [];
      else if(this.props.selectedRoom.images.length === 1)
      	return <img className="room-image" alt="#" src={this.props.selectedRoom.images[0].url} />;
	  else
	  	return <ControlledCarousel images={this.props.selectedRoom.images}/>
    }

    infoRender(){
        return(
            <div className="room-info">
                <div className="info-close" onClick={() => this.props.handleMouseEvent('')} >x</div>
                <div className="room-image">
					       { this.carouselRender()}   	
                </div>
                <div className="room-description">Description: {this.props.selectedRoom.description}</div>
                
                <div className="room-issues-container">
                	<div className="room-issues">Issues: {this.props.issues.length ? this.issuesList(this.props.issues) : this.issuesList(this.props.selectedRoom.issues) } </div>
                	{this.issueAdd()}
                </div>
            </div>
        );
    };

	render() {		
		return (				
			<div className="overlay">{this.infoRender()}</div>
		);
	};
}

function mapStateToProps({ issues }) {
    return {
        issues: issues
    };
}

class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      index: 0,
      direction: null
    };
  };

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  };

  renderItem() {
  	return this.props.images.map( (item, index) => {
  		return(
  			<Carousel.Item key={item.id}>
	          <img key={index+item.id} className="room-image" width={900} height={500} alt="900x500" src={item.url} />
	          <Carousel.Caption key={index}></Carousel.Caption>
	        </Carousel.Item>
  		);
  	});
  };

  render() {
    const { index, direction } = this.state;

    return (
      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
      >

        {this.renderItem()}        
      </Carousel>
    )
  }
}

export default connect(mapStateToProps, actions)(RoomsInfo);
