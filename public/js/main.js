$(document).ready(function () {
    var appointments = new Array();
    var appointment1 = {
        id: "id1",
        description: "George brings projector for presentations.",
        location: "",
        subject: "Quarterly Project Review Meeting",
        calendar: "Alex",
        start: new Date(2018, 2, 23, 9, 0, 0),
        end: new Date(2018, 2, 23, 16, 0, 0)
    }
    var appointment2 = {
        id: "id2",
        description: "",
        location: "",
        subject: "IT Group Mtg.",
        calendar: "Alex",
        start: new Date(2018, 2, 24, 10, 0, 0),
        end: new Date(2018, 2, 24, 15, 0, 0)
    }
    appointments.push(appointment1);
    appointments.push(appointment2);
    // prepare the data
    var source =
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
    var adapter = new $.jqx.dataAdapter(source);
    $("#scheduler").jqxScheduler({
        date: new $.jqx.date(2018, 0, 27),
        width: '100%',
        height: '75%',
        source: adapter,
        view: 'weekView',
        showLegend: true,
        ready: function () {
            $("#scheduler").jqxScheduler('ensureAppointmentVisible', 'id1');
        },
        resources:
            {
                colorScheme: "scheme06",
                dataField: "calendar",
                source: new $.jqx.dataAdapter(source)
            },
        appointmentDataFields:
            {
                from: "start",
                to: "end",
                id: "id",
                description: "description",
                location: "place",
                subject: "subject",
                resourceId: "calendar"
            },
        views:
            [
                'dayView',
                { type: "weekView", showWeekends: false, timeRuler: { scaleStartHour: 8, scaleEndHour: 18 },  workTime:
                        {
                            fromDayOfWeek: 1,
                            toDayOfWeek: 5,
                            fromHour: 8,
                            toHour: 19
                        } },
                'monthView'
            ]
    });
});