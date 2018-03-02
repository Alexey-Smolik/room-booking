import React from 'react';
import JqxScheduler  from './assets/jqwidgets-react/react_jqxscheduler.js';
import * as actions from '../actions';
import {connect} from 'react-redux';


class BookTable extends React.Component {

    componentDidMount() {
        this.refs.myScheduler.on('appointmentAdd', (event) => {
            this.props.getRooms();
        });
        this.props.getEvents(1);
        console.log("EVENTS - ", this.props.events);
    }


    roomHandler() {
        return this.props.room.events.map((event) => {
            return {
                id: event.id,
                description: event.description,
                subject: event.user.username,
                calendar: event.user.username,
                from: new Date(2016, 10, 23, 9, 0, 0),
                to: new Date(2016, 10, 23, 16, 0, 0)
            }
        });
    }

    render () {
        console.log("Book table -> render", this.props);
        let appointments = new Array();
        let appointment1 = {
            id: "id1",
            description: "George brings projector for presentations.",
            location: "",
            subject: "Quarterly Project Review Meeting",
            calendar: "Room 1",
            start: new Date(2016, 10, 23, 9, 0, 0),
            end: new Date(2016, 10, 23, 16, 0, 0)
        };
        let appointment2 = {
            id: "id2",
            description: "",
            location: "",
            subject: "IT Group Mtg.",
            calendar: "Room 2",
            start: new Date(2016, 10, 24, 10, 0, 0),
            end: new Date(2016, 10, 24, 15, 0, 0)
        };
        appointments.push(appointment1);
        appointments.push(appointment2);

        //this.props.room which return array of rooms


        let source =
        {
            dataType: "array",
            dataFields: [
                { name: 'id', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'location', type: 'string' },
                { name: 'subject', type: 'string' },
                { name: 'calendar', type: 'string' },
                { name: 'start', type: 'date' },
                { name: 'end', type: 'date' }
            ],
            id: 'id',
            localData: appointments
        };
        let dataAdapter = new $.jqx.dataAdapter(source);
    
        let resources =
        {
            colorScheme: "scheme05",
            dataField: "calendar",
            orientation: "horizontal",
            source:  new $.jqx.dataAdapter(source)
        };
    
        let appointmentDataFields =
        {
            from: "start",
            to: "end",
            id: "id",
            description: "description",
            location: "place",
            subject: "subject",
            resourceId: "calendar"
        };
    
        let views =
        [
            { type: 'dayView', showWeekends: false },
            { type: 'weekView', showWeekends: false },
            { type: 'monthView' }
        ];
        return (
            <div className={'tableContainer'}>
                <JqxScheduler ref='myScheduler'
                    width={850} height={600} source={dataAdapter} dayNameFormat={'abbr'}
                    date={new $.jqx.date(2016, 11, 23)} showLegend={true}
                    view={'weekView'} resources={resources} views={views}
                    appointmentDataFields={appointmentDataFields}
                />
            </div>
        )
    }
}

// export default  BookTable;

// function mapDispatchToProps (dispatch, ownProps) {
//     return {
//        onClick: () => {
//           dispatch({ type: ADD_ROOM })
//        }
//     }
//  }

//  function mapStateToProps({ getRooms }){
//     return { getRooms: getRooms };
// }

export default connect(null,actions)(BookTable);

