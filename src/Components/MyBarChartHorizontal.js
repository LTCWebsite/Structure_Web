import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function MyBarChartHorizontal({ chartData }) {
  let delayed;
  return (
    <div>
      <Bar
        data={chartData}
        options={{
          aspectRatio: 4,
          responsive: true,
          // indexAxis: 'y',
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                font: {
                  family: "Poppins",
                  size: "13px",
                  weight: "300",
                },
              },
            },
            title: {
              display: false,
              text: "ສະແດງປະເພດເບີເປັນກຣາຟ",
              color: "#2d3436",
              font: {
                family: "Noto Sans Lao",
                size: "16px",
                weight: "300",
              },
            },
          },
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 100 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
          scales: {
            yAxes: {
              beginAtZero: true,
              barPercentage: 1.6,
              grid: {
                display: true,
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 125000,
                padding: 2,
                backdropPadding: 2,
                backdropColor: "rgba(255,255,255,1)",
                font: {
                  family: "Noto Sans Lao",
                  size: 13,
                },
                major: {
                  enable: true,
                },
              },
            },
            xAxes: {
              beginAtZero: true,
              barPercentage: 1.6,
              grid: {
                display: true,
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 125000,
                padding: 2,
                backdropPadding: 2,
                backdropColor: "rgba(255,255,255,1)",
                font: {
                  family: "Noto Sans Lao",
                  size: 13,
                },
                major: {
                  enable: true,
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

export default MyBarChartHorizontal;
