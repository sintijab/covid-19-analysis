import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import ChartDiagram from './Chart';
import SelectCountry from './Select';
import { Country } from './Countries';
import styles from './App.scss';
import {
  HEADER,
  SUB_HEADER,
  AUTHOR,
  CITATION,
  CITATION_LINK,
  ONLINE_RESOURCE,
  CITATION_AUTHOR,
  AUTHOR_NAME,
  AUTHOR_LINK,
} from './constants';
import NewsCard from './NewsCard';

const getDataQuery = (locale: Country['value']) =>
  gql`
  query GetData {
    dataset(id: "${locale}") {
      date
      new_cases_smoothed_per_million
      new_vaccinations_smoothed_per_million
      new_deaths_smoothed_per_million
      weekly_hosp_admissions_per_million
    }
  }
`;

export default function App() {
  const [selectedOption, selectOption] = useState({
    value: 'ESP',
    label: 'Spain',
  });
  const { loading, error, data = {} } = useQuery(
    getDataQuery(selectedOption.value)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { dataset } = data;

  return (
    <main>
      <header className={styles.header}>
        <div className={styles.h3}>{SUB_HEADER}</div>
        <h1 className={styles.h1}>{HEADER}</h1>
        <div className={styles.h5}>
          {AUTHOR}
          <a className={styles.link} href={AUTHOR_LINK}>
            {AUTHOR_NAME}
          </a>
          {CITATION}
          <a className={styles.link} href={CITATION_LINK}>
            {ONLINE_RESOURCE}
          </a>
          {CITATION_AUTHOR}
        </div>
      </header>
      <NewsCard />
      <div></div>
      <div>
        <SelectCountry
          callback={selectOption}
          selectedOption={selectedOption}
        />
      </div>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <div className={styles.chart}>
            <ChartDiagram data={dataset} />
          </div>
        </>
      )}
    </main>
  );
}
