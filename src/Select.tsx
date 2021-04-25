import React from 'react';
import Select from 'react-select';
import { countriesOptions } from './countries';
import styles from './Select.scss';

interface Option {
  value: string;
  label: string;
}

interface Props {
  callback: (option: Option) => void;
  selectedOption: Option;
}

const SelectCountry: React.FC<Props> = ({ callback, selectedOption }) => {
  const handleChange = (option: any) => {
    callback(option);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={countriesOptions}
      isSearchable
      placeholder={`Select location...`}
      className={styles.select}
    />
  );
};

export default SelectCountry;
