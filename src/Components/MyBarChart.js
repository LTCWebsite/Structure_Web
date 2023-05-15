import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function MyBarChart({ chartData }) {
  let delayed;

  return (
    <div>
      <Bar
        data={chartData}
        options={{
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
              display: true,
              text: "",
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
                delay = context.dataIndex * 200 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
          scales: {
            yAxes: {
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
                  family: "Poppins",
                  size: 13,
                },
                major: {
                  enable: true,
                },
              },
            },
            xAxes: {
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
                  family: "Poppins",
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

export default MyBarChart;
