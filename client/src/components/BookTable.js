import React from 'react';
import JqxScheduler  from './assets/jqwidgets-react/react_jqxscheduler.js';

import {connect} from 'react-redux';


class BookTable extends React.Component {
    componentDidMount() {
        this.refs.myScheduler.on('appointmentAdd', (event) => {
            console.log(event.args.appointment);
        });
    }

    roomHandler() {
        return this.props.room.map( (index,key) => {

        })
    }

    render () {
        const appointments = [];
        const appointment1 = {
            id: "id1",
            description: "George brings projector for presentations.",
            location: "",
            subject: "Quarterly Project Review Meeting",
            calendar: "Alex",
            start: new Date(2018, 2, 23, 9, 0, 0),
            end: new Date(2018, 2, 23, 16, 0, 0)
        };
        const appointment2 = {
            id: "id2",
            description: "",
            location: "",
            subject: "IT Group Mtg.",
            calendar: "Alex",
            start: new Date(2018, 2, 22, 10, 0, 0),
            end: new Date(2018, 2, 22, 15, 0, 0)
        };
        appointments.push(appointment1);
        appointments.push(appointment2);

        //this.props.room which return array of rooms

        const source =
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

        const adapter = new $.jqx.dataAdapter(source);
        const resources =
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
            location: "place",
            subject: "subject",
            resourceId: "calendar"
        };

        let views =
            [
                { type: "dayView", timeRuler: { scaleStartHour: 8, scaleEndHour: 18, formatString: 'HH:mm' }, workTime: { fromHour: 8, toHour: 19,  fromDayOfWeek: 1, toDayOfWeek: 5, } },
                { type: "weekView", showWeekends: false, timeRuler: { scaleStartHour: 8, scaleEndHour: 18, formatString: 'HH:mm' },  workTime:
                        {
                            fromDayOfWeek: 1,
                            toDayOfWeek: 5,
                            fromHour: 8,
                            toHour: 19
                        } },
                'monthView'
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

export default  BookTable;

// function mapDispatchToProps (dispatch, ownProps) {
//     return {
//        onClick: () => {
//           dispatch({ type: ADD_ROOM })
//        }
//     }
//  }
//
//  function mapStateToProps({ getRoom }){
//     return { getRoom: getRoom };
// }
//
// export default connect(mapStateToProps,mapDispatchToProps)(BookTable);