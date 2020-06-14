var ctx = document.getElementById("myChart").getContext("2d");
var data = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
    {
        label: "f(x) = x",
        function: polynomial,
        data: [],
        borderColor: "rgba(153, 102, 255, 1)",
        fill: false,
        type: "line"
    },
    {
        label: "f(x) = x",
        function: polynomial,
        data: [],
        backgroundColor: ["rgba(0, 255, 0, 0.5)"],
        fill: false,
        type: "bar"
    }]
}

function polynomial(x) {
    return x;
}

function calculateBarPositions(left, data) {
    var xPositions = [];
    var yPositions = [];
    var output = [];
    if (left == false) {
        if (data) {
            console.log("good to go!");
            for(var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                    xPositions.push(data.labels[j]);
                    yPositions.push(data.datasets[i].function(data.labels[j]));
                }
            }
            yPositions.splice(yPositions.length / 2, yPositions.length / 2);
            xPositions.splice(xPositions.length / 2, xPositions.length / 2);
            xPositions.push(xPositions[xPositions.length - 1] - xPositions[xPositions.length - 2] + xPositions[xPositions.length - 1]);
            yPositions.push((polynomial(xPositions[xPositions.length -1]) + polynomial(xPositions[xPositions.length -2])) / 2);
            console.log(yPositions);
            console.log(xPositions);

            for (var i = 1; i < yPositions.length; i++) {
                output.push((yPositions[i-1] + yPositions[i])/2);
            }
            console.log(output);
            return output;
        }
        
    }else {
        console.log("good to go!");
            for(var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                    xPositions.push(data.labels[j]);
                    yPositions.push(data.datasets[i].function(data.labels[j]));
                }
            }
            yPositions.splice(yPositions.length / 2, yPositions.length / 2);
            xPositions.splice(xPositions.length / 2, xPositions.length / 2);
            xPositions.push(xPositions[xPositions.length - 1] - xPositions[xPositions.length - 2] + xPositions[xPositions.length - 1]);
            yPositions.push((polynomial(xPositions[xPositions.length -1]) + polynomial(xPositions[xPositions.length -2])) / 2);
            console.log(yPositions);
            console.log(xPositions);

            for (var i = 0; i < yPositions.length; i++) {
                if (i == 0) {
                    output.push(0);
                    continue;
                }
                output.push((yPositions[i-1] + yPositions[i])/2);
            }
            console.log(output);
            return output;
    }
    
}

Chart.pluginService.register({
    beforeInit: function(chart) {
        // We get the chart data
        var data = chart.config.data;
        var yBarPositions = calculateBarPositions(false, data);

        // For every dataset ...
        for (var i = 0; i < data.datasets.length; i++) {

            // For every label ...
            for (var j = 0; j < data.labels.length; j++) {

                // We get the dataset's function and calculate the value
                if(data.datasets[i].type !== "bar") {
                    var fct = data.datasets[i].function,
                    x = data.labels[j],
                    y = fct(x);
                    // Then we add the value to the dataset data
                    data.datasets[i].data.push(y);
                }else if (data.datasets[i].type == "bar") {
                    data.datasets[i].data = yBarPositions;
                }
                
                if (data.datasets[i].backgroundColor !== undefined) {
                    data.datasets[i].backgroundColor.push(data.datasets[i].backgroundColor[0]);
                }
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


