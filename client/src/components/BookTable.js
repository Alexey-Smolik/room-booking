import React from 'react';
import JqxScheduler  from './assets/jqwidgets-react/react_jqxscheduler.js';
import * as actions from '../actions';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Table from './Table';


class BookTable extends React.Component {



    componentDidMount() {
        this.refs.myScheduler.on('appointmentAdd', (event) => {
            // this.props.getRooms();
            console.log("BookTable -> componentDidMount")
        });
        //this.props.getRoom(this.props.match.params.roomID);

    }

    // componentWillUnmount(){
    //     //this.refs.myScheduler.destroy();
    //     console.log("Destroy");
    // }
    componentWillMount(){console.log("BookTable -> componentWillMount")};
    componentWillUnmount(){console.log("BookTable -> componentWillUnmount")};
    componentDidUpdate(){ this.refs.myScheduler.endAppointmentsUpdate();};
    // componentWillReceiveProps(){this.refs.myScheduler.beginAppointmentsUpdate();};
    componentWillUpdate(){this.refs.myScheduler.beginAppointmentsUpdate();};



    renderTable(appointments){
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




        return (<div className={'tableContainer'}>
            <JqxScheduler ref='myScheduler'
                          width={850} height={600}
                          source={dataAdapter}
                          dayNameFormat={'abbr'}
                          date={new $.jqx.date(2018, 1, 1)}
                          showLegend={true}
                          view={'weekView'}
                          resources={resources}
                          views={views}
                          appointmentDataFields={appointmentDataFields}
                          touchAppointmentsMinHeight={80}/>
        </div>)
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
        if( this.props.room) {

        }



        let app1 = {
            id: "id"+2,
            description:23
        }

        let appointments = new Array();
        let appointment1 = {
            id: "id1",
            description: "George brings projector for presentations.",
            location: "",
            subject: "DSDSDSDSDS",
            calendar: "Room 1",
            start: new Date(2018, 1, 23, 9, 0, 0),
            end: new Date(2018, 1, 23, 16, 0, 0)
        };
        let appointment2 = {
            id: "id2",
            description: "AAAAA",
            location: "AAAAA",
            subject: "IT Group Mtg.",
            calendar: "Room 2",
            start: new Date(2018, 1, 25, 9, 0, 0),
            end: new Date(2018, 1, 25, 16, 0, 0)
        };

        if(this.props.match.params.roomID > 2) {
            appointments.push(appointment2);
        } else {
            appointments.push(appointment1);
        }

        console.log("Data -> " , appointments);

        return (
            <div>
                {this.renderTable(appointments)}
            </div>
        );
    }
}



 function mapStateToProps({ events }){
    return { events: events };
}

export default connect(mapStateToProps,actions)(BookTable);

