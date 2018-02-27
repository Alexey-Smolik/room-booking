$( document ).ready(function() {
    $(function () {
        $("#schedule").jqs({

            mode: "edit", // read
            hour: 24, // 12
            periodDuration: 30, // 15/30/60
            data: [],
            periodOptions: true,
            periodColors: [],
            periodTitle: "",
            periodBackgroundColor: "rgba(82, 155, 255, 0.5)",
            periodBorderColor: "#2a3cff",
            periodTextColor: "#000",
            periodRemoveButton: "Remove",
            periodTitlePlaceholder: "Title",
            days: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            onInit: function () {},
            onAddPeriod: function () {},
            onRemovePeriod: function () {},
            onClickPeriod: function () {}

        });
    });
});