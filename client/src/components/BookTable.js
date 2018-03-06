import React from 'react';
import JqxScheduler from './jqwidgets-react/react_jqxscheduler.js';
import * as actions from '../actions';
import {connect} from 'react-redux';


class BookTable extends React.Component {
    componentDidMount() {
        this.refs.myScheduler.on('appointmentAdd', (event) => {
            if(!event.args.appointment.originalData.description.userId){
                /*event.args.appointment.originalData.name = event.args.appointment.originalData.subject;
                event.args.appointment.originalData.description = event.args.appointment.originalData.description;
                event.args.appointment.originalData.date_from = event.args.appointment.originalData.start;
                event.args.appointment.originalData.date_to = event.args.appointment.originalData.end;
                event.args.appointment.originalData.roomId = this.props.room.id;
                event.args.appointment.originalData.userId = this.props.room.events.user.id;
                this.props.createEvent(event.args.appointment.originalData);*/
            }
        });
    }

    componentWillMount(){
        this.props.getCurrentUser();
        if(this.props.room){
            this.props.getEvents(this.props.room.id);
        }
    }

    componentWillUpdate(){
        if(this.refs.myScheduler){
            this.refs.myScheduler.getDataAppointments().forEach(appointment => {
                this.refs.myScheduler.deleteAppointment(appointment.id);
            });
        }
    }

    roomHandler() {
        if(this.props.room){
            return this.props.room.events.map((event) => {
                return {
                    description: {
                        userId: event.user.id.toString()
                    },
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

        console.log("PRops table", this.props);

        const $ = window.$;

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
                id: "id",
                description: "description",
                location: "location",
                subject: "subject",
                resourceId: "calendar",
                from: "start",
                to: "end"
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

function mapStateToProps({ events , user }) {
    return {
        room: events,
        user: user
    };
}

export default connect(mapStateToProps,actions)(BookTable);

