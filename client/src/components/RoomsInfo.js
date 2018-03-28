import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";

class RoomsInfo extends React.Component {

// Getting props from NavBar & Redux, getting issues from Server.

// Side-click event that reading first class name letters and changes Redux state.  
// Side-clicks prevented if input field is not empty.

// When closing by info-close button changes Redux state(for info-button colouring!).

// Input value resets if other info-button being clicked.

	constructor(props) {
		super(props); 
		this.state = {
			id: '',
			issues: ['issue1', 'issue2', 'issue3'],
			inputValue: '',
			inputElem: '',
			issueAdd: false
		}
		this.clearInputValue = this.clearInputValue.bind(this);
		this.handleIssueAdd = this.handleIssueAdd.bind(this);
	}

 	componentDidMount() {
 		window.addEventListener('click', this.sideClick);
 		this.setState({
 			id: this.props.mouseEvents.id,
 		})
 		console.log(this.props.getIssues(this.props.mouseEvents.id))
 	}

 	componentWillUnmount() {
 		window.removeEventListener('click', this.sideClick);
 	}

 	componentWillReceiveProps() {
 		this.setState({
 			issueAdd: false
 		})

 		if(this.state.inputElem) {
 			let input = this.state.inputElem;
 			input.value = "";
 		}
 	}

 	clearInputValue(e) {
 		if(this.state.inputValue) {
 			if(this.props.mouseEvents.id !== this.state.id) {
	 			let input = this.state.inputElem;
	 			input.value = "";
	 			this.setState({
	 				inputValue: ''
	 			})
	 		}
 		}
 	}

	sideClick = (e) => {
		if(this.state.inputValue) {
			return;
		}
		let name = e.target.className.substr(0, 4);
		if(name !== 'room' && name !== 'info') {
			this.props.handleMouseEvent('');
		}
	}

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
    			this.props.createIssue(this.state.inputValue);
	    		// this.props.getIssues();
	    		e.target.previousSibling.value = "";
	    		this.setState({
	    			inputValue: ""
	    		})
    		}
    	}
    }

    issueAdd() {
    	if(this.state.issueAdd) {
    		return(
	    		<div className="room-issues-form"> 
	        		<textarea className="room-issues-input" onChange={ (e) => this.inputHandler(e, 1)}></textarea>
					<button className="room-issues-button" onClick={(e) => this.inputHandler(e)}>Ok</button>
	        	</div>
	    	)
    	} else {
    		return <button className="room-button" onClick={() => this.handleIssueAdd()}>Add</button>
    	}
    }

    issuesList() {
    	return this.state.issues.map( (item, index) => {
    		return <div className="room-issue" key={index}> {item} </div>
    	});
    }

	handleIssueAdd = () => {
		this.setState({
			issueAdd: !this.state.issueAdd
		})
	}

    infoRender(){
        return(
            <div className="room-info">
                <div className="info-close" onClick={() => this.props.handleMouseEvent('')}>x</div>
                <div className="room-image">
                    <img className="room-image-image" src='img.jpg' alt='#' />
                </div>
                <div className="room-description">Description: {this.props.mouseEvents.description}</div>
                
                <div className="room-issues-container">
                	<div className="room-issues">Issues: {this.issuesList()} </div>
                	{this.issueAdd()}
                </div>
            </div>
        )
    }

	render() {		
		return (				
			<div>{this.infoRender()}</div>
		);
	}
}

function mapStateToProps({ issues }) {
    return {
        issues: issues
    };
}

export default connect(mapStateToProps, actions)(RoomsInfo);