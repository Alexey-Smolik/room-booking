$(document).ready(function () {
    $.ajax({
        url: "/api/users/current",
        type: 'GET',
        data: {},
        success: function(result){
            $('#username').append(`Hello, ${result.username}`);
        },
        error: function(err) {
            location.href="/";
        }
    });

    //$('.aside-menu').append('<li><a href="/cras/">TEST</a></li>');

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

    $("#scheduler").jqxScheduler({
        date: new $.jqx.date(2018, 0, 27),
        width: '100%',
        height: '75%',
        source: adapter,
        view: 'weekView',
        /*showLegend: true,
        editDialogCreate: function (dialog, fields, editAppointment) {
            fields.repeatContainer.hide();
            fields.statusContainer.hide();
            fields.timeZoneContainer.hide();
            fields.colorContainer.hide();
            fields.subjectLabel.html("Title");
            fields.locationLabel.html("Where");
            fields.fromLabel.html("Start");
            fields.toLabel.html("End");
            fields.resourceLabel.html("Calendar");
        },*/
        ready: function () {
            $("#scheduler").jqxScheduler('ensureAppointmentVisible', 'id2');
            },
            resources:
                {
                    colorScheme: "scheme01",
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
                    { type: "dayView", timeRuler: { scaleStartHour: 8, scaleEndHour: 18, formatString: 'HH:mm' }, workTime: { fromHour: 8, toHour: 19,  fromDayOfWeek: 1, toDayOfWeek: 5, } },
                    { type: "weekView", showWeekends: false, timeRuler: { scaleStartHour: 8, scaleEndHour: 18, formatString: 'HH:mm' },  workTime:
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