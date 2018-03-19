import React from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import * as actions from '../actions';
import {connect} from 'react-redux';

class EventsFilter extends React.Component {
	 constructor(props){
        super(props);
        this.state = {
            title: '',
            desc: '',
            startDate: moment(),
            endDate: moment()
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    componentDidMount() {
        // this.props.getEventsFrom();
    }

    submitHandler(e) {
    	e.preventDefault();
    }

    handleChangeStart(date) {
    	this.setState({
	      startDate: date
	    });
    }

    handleChangeEnd(date) {
    	this.setState({
	      endDate: date
	    });
    }

    events() {
    	if(this.props.events) {
    		console.log(this.props.events);
      	 	return(
      	 		this.props.events.map( (index, key) => {
      	 			return(
      	 				<div key={index.name + key}>{index.name}</div>
      	 			)
      	 		})
      	 	)
      	 }
    }

      // <br />

      // <input placeholder="Search" />

      // <div>
      //   <br />
      //   <span>Sort By : </span>
      //   <button>Complectation</button>
      //   <button>Vacancy</button>
      //   <button>Issues</button>
      //   <button>Capacity</button>
      //   <button>Size</button>
      //   <button>Popularity</button>
      // </div>

      // <br />

      // <div>
      //   Result:
      //   {this.events()}
      // </div>


   /* render() {
      return(
      	 <div id="head_date">

          <DatePicker
			    selected={this.state.startDate}
			    selectsStart
			    dateFormat="LLL"
			    startDate={this.state.startDate}
			    endDate={this.state.endDate}
			    onChange={this.handleChangeStart}
			/>

             <label>To</label>
			<DatePicker id="head_date_to"
			    selected={this.state.endDate}
			    selectsEnd
			    dateFormat="LLL"
			    startDate={this.state.startDate}
			    endDate={this.state.endDate}
			    onChange={this.handleChangeEnd}
			/>
		 </div>
      );     
    }
}
*/
function mapStateToProps({ events }) {
    return {
        events: events
    };
}

export default connect(mapStateToProps,actions)(EventsFilter);
