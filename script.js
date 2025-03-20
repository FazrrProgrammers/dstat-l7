const socket = io("http://localhost:3000");

Highcharts.chart("chart-container", {
    chart: {
        type: "spline",
        backgroundColor: "#1e293b",
    },
    title: {
        text: "Request Per Detik",
        style: { color: "#ffffff" },
    },
    xAxis: {
        type: "datetime",
        labels: { style: { color: "#ffffff" } }
    },
    yAxis: {
        title: { text: "Jumlah Request", style: { color: "#ffffff" } },
        labels: { style: { color: "#ffffff" } }
    },
    series: [{ name: "Requests", data: [], color: "#22c55e" }]
});

const chart = Highcharts.charts[0];

socket.on("update", (data) => {
    const x = (new Date()).getTime();
    const y = data.requests;
    
    if (chart.series[0].data.length > 20) {
        chart.series[0].addPoint([x, y], true, true);
    } else {
        chart.series[0].addPoint([x, y], true);
    }
});
