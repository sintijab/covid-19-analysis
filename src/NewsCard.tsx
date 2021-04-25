import React from 'react';
import { NewsHeaderCard } from 'react-ui-cards';
import masksIcon from './masks.jpg';
import measuresIcon from './measures.jpg';
import owdIcon from './owd.jpg';

import styles from './NewsCard.scss';

interface Props {
  href?: string;
  title?: string;
  author?: string;
  date?: string;
  thumbnail?: any;
  tags?: any;
}

const NewsCard: React.FC<Props> = ({
  href,
  title,
  author,
  date,
  thumbnail,
  tags,
}) => {
  return (
    <div className={styles.slider}>
      <NewsHeaderCard
        author={'Sintija Birgele'}
        date={'April 25th, 2021'}
        title={'The emergence of the covid-19 crisis'}
        href={
          'https://www.researchgate.net/publication/351090433_The_magnitude_of_the_failures_to_respond_effectively_to_the_emergence_of_of_the_covid-19_crisis'
        }
        thumbnail={masksIcon}
        className={styles.card}
      />
      <NewsHeaderCard
        author={'NCIRD'}
        date={'April 2nd, 2021'}
        title={'Impact of prevention measures'}
        href={
          'https://www.cdc.gov/coronavirus/2019-ncov/science/science-briefs/fully-vaccinated-people.html'
        }
        thumbnail={measuresIcon}
        className={styles.card}
      />
      <NewsHeaderCard
        author={'OWD'}
        title={'COVID-19 Data Explorer'}
        href={'https://ourworldindata.org/coronavirus-data-explorer'}
        thumbnail={owdIcon}
        className={styles.card}
      />
    </div>
  );
};

export default NewsCard;
