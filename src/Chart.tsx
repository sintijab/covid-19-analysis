import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getVerticalChartConfig } from './utils';
import styles from './Chart.scss';
Chart.defaults.color = '#FFFFFF';

interface Day {
  date: Date;
  new_cases_smoothed_per_million: number;
  new_vaccinations_smoothed_per_million: number;
  new_deaths_smoothed_per_million: number;
  weekly_hosp_admissions_per_million: number;
}
interface Props {
  data: [Day];
}
const ChartDiagram: React.FC<Props> = ({ data }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    const labels = data.map(day => day.date);
    const dataset = [
      data.map(
        ({ new_deaths_smoothed_per_million }) =>
          new_deaths_smoothed_per_million >= 0 ||
          new_deaths_smoothed_per_million === null
      ),
      data.map(
        ({ weekly_hosp_admissions_per_million }) =>
          weekly_hosp_admissions_per_million
      ),
      data.map(
        ({ new_cases_smoothed_per_million }) => new_cases_smoothed_per_million
      ),
      data.map(
        ({ new_vaccinations_smoothed_per_million }) =>
          new_vaccinations_smoothed_per_million
      ),
    ];
    const chartConfig = getVerticalChartConfig({ labels, dataset });
    if (chartContainer && chartContainer.current) {
      new Chart(chartContainer.current, chartConfig);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} height="1800" className={styles.chart} />
    </div>
  );
};

export default ChartDiagram;
