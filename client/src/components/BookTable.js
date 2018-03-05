import React from 'react';
import JqxScheduler  from './jqwidgets-react/react_jqxscheduler.js';
import * as actions from '../actions';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


class BookTable extends React.Component {
    componentDidMount() {
        this.props.getEvents(1);

        this.refs.myScheduler.on('appointmentAdd', (event) => {
            event.args.appointment.originalData.name = event.args.appointment.originalData.subject;
            event.args.appointment.originalData.date_from = event.args.appointment.originalData.start;
            event.args.appointment.originalData.date_to = event.args.appointment.originalData.end;
            event.args.appointment.originalData.roomId = this.props.room.id;
            event.args.appointment.originalData.userId = 1;
            //this.props.createEvent(event.args.appointment.originalData);
        });

        this.refs.myScheduler.deleteAppointment("id1");

        this.refs.myScheduler.on('appointmentDelete', (event) => {
            console.log('aaa');
        });

        this.refs.myScheduler.ensureAppointmentVisible('id1');

    }

    buttonHandler(){
        console.log(this.refs.myScheduler);
        this.refs.myScheduler.ensureAppointmentVisible('id1');
        this.refs.myScheduler.deleteAppointment("id1");
        //this.refs.myScheduler.deleteAppointment("id2");
    }

    roomHandler() {
        if(this.props.room){
            return this.props.room.events.map((event) => {
                return {
                    id: "id" + event.id,
                    description: event.description,
                    location: event.user.username,
                    subject: event.name,
                    calendar: event.user.username,
                    start: new Date(event.date_from).toISOString(),
                    end: new Date(event.date_to).toISOString()
                }
            });
        }
    }

    render () {
        let appointments = this.roomHandler();

        let source =
            {
                dataType: "array",
                dataFields: [
                    {name: 'id', type: 'string'},
                    {name: 'description', type: 'string'},
                    {name: 'location', type: 'string'},
                    {name: 'subject', type: 'string'},
                    {name: 'calendar', type: 'string'},
                    {name: 'start', type: 'date'},
                    {name: 'end', type: 'date'}
                ],
                id: 'id',
                localData: appointments
            };

        let dataAdapter = new $.jqx.dataAdapter(source);

        let resources =
            {
                colorScheme: "scheme01",
                dataField: "calendar",
                source: new $.jqx.dataAdapter(source)
            };

        let appointmentDataFields =
            {
                from: "start",
                to: "end",
                id: "id",
                description: "description",
                location: "location",
                subject: "subject",
                resourceId: "calendar"
            };

        let views =
            [
                {
                    type: "dayView",
                    timeRuler: {scaleStartHour: 8, scaleEndHour: 18, formatString: 'HH:mm'},
                    workTime: {fromHour: 8, toHour: 19, fromDayOfWeek: 1, toDayOfWeek: 5,}
                },
                {
                    type: "weekView",
                    showWeekends: false,
                    timeRuler: {scaleStartHour: 8, scaleEndHour: 18, formatString: 'HH:mm'},
                    workTime:
                        {
                            fromDayOfWeek: 1,
                            toDayOfWeek: 5,
                            fromHour: 8,
                            toHour: 19
                        }
                },
                'monthView'
            ];

        if (appointments) {
            appointments.forEach(appointment => {
                this.refs.myScheduler.addAppointment(appointment);
            });
        }
        console.log("Table props", this.props);

        return (
            <div className={'tableContainer'}>
                <button onClick={this.buttonHandler.bind(this)} >Return</button>
                <JqxScheduler ref='myScheduler'
                              width={850} height={600} source={dataAdapter} dayNameFormat={'abbr'}
                              date={new $.jqx.date(2018, 3, 1)} showLegend={true}
                              view={'weekView'} resources={resources} views={views}
                              appointmentDataFields={appointmentDataFields} renderAppointment={appointments} />
            </div>
        )
    }
}


function mapStateToProps({ events }){
    return { room: events };
}

export default connect(mapStateToProps,actions)(BookTable);
//ReactDOM.render(<App />, document.getElementById('app'));