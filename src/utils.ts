import {
  NEW_CASES,
  NEW_DEATHS,
  NEW_HOSPITAL_ADMISSIONS,
  NEW_VACCINATIONS,
} from './constants';

type Label = string;
interface CharProps {
  labels: Label[];
  dataset: Label[];
}

export const getVerticalChartConfig = ({ labels, dataset }: CharProps) => {
  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: NEW_DEATHS,
          data: dataset[0],
          fill: true,
          borderColor: 'rgb(61,61,61)',
          backgroundColor: 'rgba(61,61,61, 0.3)',
          pointBorderColor: 'rgb(61,61,61)',
          pointBackgroundColor: 'rgb(61,61,61)',
          pointRadius: 2,
          tension: 0.1,
          spanGaps: true,
        },
        {
          label: NEW_HOSPITAL_ADMISSIONS,
          data: dataset[1],
          fill: true,
          backgroundColor: 'rgba(179,181,198,0.4)',
          borderColor: 'rgba(54, 162, 235, 0.3)',
          pointBorderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointRadius: 2,
          tension: 0.1,
          spanGaps: true,
        },
        {
          label: NEW_CASES,
          data: dataset[2],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.3)',
          borderColor: 'rgba(179,181,198,1)',
          pointBorderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointRadius: 2,
          tension: 0.1,
        },
        {
          label: NEW_VACCINATIONS,
          data: dataset[3],
          fill: true,
          backgroundColor: 'rgba(255,227,13, 0.7)',
          borderColor: 'rgb(255,227,13)',
          pointBorderColor: 'rgb(255,227,13)',
          pointBackgroundColor: 'rgb(255,227,13)',
          pointRadius: 2,
          tension: 0.1,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      scaleFontColor: 'white',
      maintainAspectRatio: true,
      layout: {
        padding: {
          top: 5,
          left: 15,
          right: 15,
          bottom: 15,
        },
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'X axe name',
              fontColor: '#ffffff',
              fontSize: 10,
            },
            ticks: {
              fontColor: '#FFFFFF', // To format the ticks, coming on the axis/lables which we are passing.
              fontSize: 14,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Y axe name',
              fontColor: '#FFFFFF',
              fontSize: 10,
            },
            ticks: {
              fontColor: 'white',
              fontSize: 14,
            },
          },
        ],
      },
      title: {
        display: true,
        fontColor: 'blue',
        text: 'Custom Chart Title',
      },
      plugins: {
        zoom: {
          pan: {
            // Boolean to enable panning
            enabled: true,
            // Panning directions. Remove the appropriate direction to disable
            // Eg. 'y' would only allow panning in the y direction
            mode: 'xy',
          },
          // Container for zoom options
          zoom: {
            // Boolean to enable zooming
            enabled: true,
            // Zooming directions. Remove the appropriate direction to disable
            // Eg. 'y' would only allow zooming in the y direction
            mode: 'xy',
          },
        },
      },
    },
  };
};

export const verticalLinePlugin = {
  getLinePosition: function(chart, pointIndex) {
    const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
    const data = meta.data;
    return data[pointIndex]._model.x;
  },
  renderVerticalLine: function(chartInstance, pointIndex) {
    const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
    const scale = chartInstance.scales['y-axis-0'];
    const context = chartInstance.chart.ctx;

    // render vertical line
    context.beginPath();
    context.strokeStyle = '#ff0000';
    context.moveTo(lineLeftOffset, scale.top);
    context.lineTo(lineLeftOffset, scale.bottom);
    context.stroke();

    // write label
    context.fillStyle = '#ff0000';
    context.textAlign = 'center';
    context.fillText(
      'MY TEXT',
      lineLeftOffset,
      (scale.bottom - scale.top) / 2 + scale.top
    );
  },

  afterDatasetsDraw: function(chart, easing) {
    if (chart.config.lineAtIndex) {
      chart.config.lineAtIndex.forEach(pointIndex =>
        this.renderVerticalLine(chart, pointIndex)
      );
    }
  },
};
