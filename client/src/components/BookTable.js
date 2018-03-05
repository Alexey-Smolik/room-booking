import React from 'react';
import JqxScheduler  from './assets/jqwidgets-react/react_jqxscheduler.js';
import * as actions from '../actions';
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

        this.refs.myScheduler.on('appointmentDelete', (event) => {
            console.log(event);
        });
    }

    roomHandler() {
        if(this.props.room){
            return this.props.room.events.map((event) => {
                return {
                    id: 'id1',
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

        const source =
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

        const dataAdapter = new $.jqx.dataAdapter(source);

        const resources =
            {
                colorScheme: "scheme01",
                dataField: "calendar",
                source: new $.jqx.dataAdapter(source)
            };

        const appointmentDataFields =
            {
                from: "start",
                to: "end",
                id: "id",
                description: "description",
                location: "location",
                subject: "subject",
                resourceId: "calendar"
            };

        const views =
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


        //console.log(appointments);
        if (appointments) {
            appointments.forEach(appointment => {
                this.refs.myScheduler.deleteAppointment(appointment);
                this.refs.myScheduler.addAppointment(appointment);
            });

        }

        //console.log("Data", this.props);
        return (
            <div className={'tableContainer'}>
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