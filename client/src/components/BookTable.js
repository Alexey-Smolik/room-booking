import React from 'react';
import JqxScheduler from './jqwidgets-react/react_jqxscheduler.js';
import * as actions from '../actions';
import {connect} from 'react-redux';


class BookTable extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isDialogOpen : false
        }
    }

    componentDidMount() {
        this.refs.myScheduler.on('appointmentAdd', (event) => {
            if(!event.args.appointment.originalData.description.userId){

                let start = new Date(event.args.appointment.originalData.start);
                let end = new Date(event.args.appointment.originalData.end);

                delete event.args.appointment.originalData['id'];
                event.args.appointment.originalData.name = event.args.appointment.originalData.subject;
                event.args.appointment.originalData.description = event.args.appointment.originalData.description;
                event.args.appointment.originalData.date_from = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes()));
                event.args.appointment.originalData.date_to = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), end.getMinutes()));
                event.args.appointment.originalData.roomId = this.props.room.id;
                event.args.appointment.originalData.userId = this.props.user.id;
                this.props.createEvent(event.args.appointment.originalData);
            }
        });

        this.refs.myScheduler.on('appointmentDelete', (event) => {
            console.log(1);
        });

        this.refs.myScheduler.on('editDialogOpen', (event) => {
            this.setState({isDialogOpen: true});
        });

        this.refs.myScheduler.on('editDialogClose', (event) => {
            this.setState({isDialogOpen: false});
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

    shouldComponentUpdate(){

        return !this.state.isDialogOpen;
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
                    start: event.date_from,
                    end: event.date_to
                }
            });
        }
    }

    render () {
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
                    timeRuler: {scaleStartHour: 8, scaleEndHour: 18, formatString: 'HH:mm', timeZones: [{ id: 'UTC', text: 'UTC' }]},
                    workTime: {fromHour: 8, toHour: 19, fromDayOfWeek: 1, toDayOfWeek: 5,}
                },
                {
                    type: "weekView",
                    showWeekends: false,
                    timeRuler: {scaleStartHour: 8, scaleEndHour: 18, formatString: 'HH:mm'}, timeZones: [{ id: 'UTC', text: 'UTC' }],
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

