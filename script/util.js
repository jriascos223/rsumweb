var ctx = document.getElementById("myChart").getContext("2d");
var data = {
    labels: [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [/* {
        label: "f(x) = x", // Name it as you want
        function: function(x) { return x },
        data: [], // Don't forget to add an empty data array, or else it will break
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
    }, */
    {
        label: "fucking bar graph", // Name it as you want
        function: function(x) { return x },
        data: [], // Don't forget to add an empty data array, or else it will break
        backgroundColor: [],
        type: "bar"
    },
    {
        label: "f(x) = x²",
        function: function(x) { return x*x },
        data: [],
        borderColor: "rgba(153, 102, 255, 1)",
        fill: false
    },
    {
        label: "f(x) = x * log(x)",
        function: function(x) {return x*Math.log(x)},
        borderColor: "rgba(225, 206, 86, 1)",
        data: [],
        fill: false
    }]
}

Chart.pluginService.register({
    beforeInit: function(chart) {
        // We get the chart data
        var data = chart.config.data;

        // For every dataset ...
        for (var i = 0; i < data.datasets.length; i++) {

            // For every label ...
            for (var j = 0; j < data.labels.length; j++) {

                // We get the dataset's function and calculate the value
                var fct = data.datasets[i].function,
                    x = data.labels[j],
                    y = fct(x);
                // Then we add the value to the dataset data
                data.datasets[i].data.push(y);
                console.log(data.datasets[i].backgroundColor);
            }
        }
    }
});

var myBarChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            xAxes: [{
                categoryPercentage: 1.0,
                barPercentage: 1.0
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});


