import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function MyDoughnutChart({ chartData }) {
  let delayed;

  return (
    <div>
      <Doughnut
        data={chartData}
        options={{
          // aspectRatio: 2,
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 90,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
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
          plugins: {
            legend: {
              display: true,
              position: "right",
              labels: {
                font: {
                  family: "Noto Sans Lao",
                  size: 13,
                },
              }
            },
            title: {
              display: false,
              text: "ສະແດງປະເພດເບີເປັນກຣາຟ",
            },
          },
        }}
      />
    </div>
  );
}

export default MyDoughnutChart;
