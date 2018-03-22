import React from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import * as actions from '../actions';
import {connect} from 'react-redux';


// Imports in App.js

class EventsFilter extends React.Component {
	 constructor(props){
        super(props);
        this.state = {
            title: '',
            desc: '',
            startDate: moment(),
            endDate: moment(),
            ddd : '2018-03-21 10:36:00',
            dde : '2018-03-21 13:36:00',
            response: ""
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
      this.setState({
        // response: this.props.getRoomsByDate(new Date(this.state.startDate._d ).toISOString(), new Date(this.state.endDate._d).toISOString())
        response: this.props.getRoomsByDate(this.state.ddd, this.state.dde)
      });
      // console.log("Dates : ", new Date(this.state.startDate._d ).toISOString(), new Date(this.state.endDate._d).toISOString())
      // console.log("Dates From :", this.state.ddd, " To : ", this.state.dde);
      // console.log("Response : ", this.state.response);
    }

    handleChangeStart(date) {
    	this.setState({
	      startDate: date
	    });
      // console.log("START :", this.state, this.props);
    }

    handleChangeEnd(date) {
    	this.setState({
	      endDate: date
	    });
      // console.log("END :", this.state, this.props);
    }

    events() {
    	if(this.props.events) {
    		// console.log(this.props.events);
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


    render() {
      return(
          <div className='dates_filter'>
      	 <div id='filter_date_from'>
      	 	<p className='start'>Start:</p>
            <DatePicker
    			    selected={this.state.startDate}
    			    selectsStart
    			    dateFormat="LLL"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    timeCaption="time"
    			    startDate={this.state.startDate}
    			    endDate={this.state.endDate}
    			    onChange={this.handleChangeStart}
    			/>
         </div>
              <div id='filter_date_to'>
              <p className='end'>End:</p>
    			<DatePicker
    			    selected={this.state.endDate}
    			    selectsEnd
    			    dateFormat="LLL"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    timeCaption="time"
    			    startDate={this.state.startDate}
    			    endDate={this.state.endDate}
    			    onChange={this.handleChangeEnd}
    			/>
              </div>
          <div className="buttons_filter">
            <button className='filter_btn' onClick={this.submitHandler}>Search</button>
            <button className='filter_btn'>Cancel</button>
              <form className="hello" name="search" action="#" method="get">
                  <label id="username_hello">Hello, </label>
                  <a className="link_log" href="/auth/logout">Log out</a>
              </form>
            </div>

          </div>
      );     
    }
}

function mapStateToProps({ events, rooms }) {
    return {
        events: events,
        rooms: rooms
    };
}

export default connect(mapStateToProps,actions)(EventsFilter);
