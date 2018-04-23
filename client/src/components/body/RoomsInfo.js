import React from 'react';
import { connect } from 'react-redux';
import {
	getRoomActiveIssues,
    createIssue,
} from "../../actions/";
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
			inputElem: '',
			isOpen: false
		};
		this.clearInputValue = this.clearInputValue.bind(this);
		this.handleIssueAdd = this.handleIssueAdd.bind(this);
		this.inputHandler = this.inputHandler.bind(this);
	};

 	componentDidMount() {
 		window.addEventListener('click', this.sideClick);
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
    componentWillUnmount() {
        window.removeEventListener('click', this.sideClick);
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
    			this.props.dispatch(createIssue(data));
    			this.props.dispatch(getRoomActiveIssues(this.props.selectedRoom.id));
	    		e.target.previousSibling.value = "";
	    		this.setState({
	    			inputValue: ""
	    		});
    		}
    	}
    };

    issuesList(issues) {
		if(issues) {
			return issues.map( (issue) => {
	    		return <div className="room-issue" key={issue.id}> {issue.description} </div>
	    	});
		}
    };

    handleClick = () => {
    	this.setState({
			isOpen: !this.state.isOpen
		})
	};

    carouselRender() {
      if(!this.props.selectedRoom.images.length)
      	return  <img className="room-image" alt="image" src='/images/no-image-available.png'/>;
      else if(this.props.selectedRoom.images.length === 1)
      	return <img className="room-image" alt="image" src={this.props.selectedRoom.images[0].url} />;
	  else
	  	return <ControlledCarousel images={this.props.selectedRoom.images}/>
    }
	render() {		
		return (				
			<div className="overlay">
                <div className="room-info">
                    <div className="info-close" onClick={() => this.props.handleMouseEvent('')} ></div>
                    <div className="room-image">
                        { this.carouselRender()}
                    </div>
                    <div className="room-desc-cont">
						<div className="room-description"><span className="selection">Description:</span> {this.props.selectedRoom.description}
							<p className="company"><span className="selection">Company address:</span> {this.props.selectedRoom.company.address}</p>
                        </div>
                        <div className="room-issues-container">
							<div className="room-issues"><span className="selection">Issues:</span><button className="open_hidden"  title={this.state.isOpen ? 'Hidden the issues' : 'Open the issues'} onClick={this.handleClick}> {this.state.isOpen ? 'Hide' : 'Show'} </button> { this.state.isOpen && this.issuesList(this.props.issues) } </div>
                            {this.props.userRole !== 3 && <div className="room-issues-form">
								<p className="the_issue">Please, describe the issue:</p>
                                <textarea className="room-issues-input" maxLength={150} onChange={ (e) => this.inputHandler(e, 1)}></textarea>
                                <button className="room-issues-button" onClick={(e) => this.inputHandler(e)}>Add issue</button>
                            </div>}
                        </div>
                    </div>
                </div>
			</div>
		);
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

export default connect()(RoomsInfo);
