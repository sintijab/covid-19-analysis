const { GraphQLScalarType } = require('graphql');

const { ApolloServer, gql } = require('apollo-server');
const snakeCase = require('lodash.snakecase');
 
const typeDefs = gql`
  scalar Date

  type Data {
    date: Date
    new_cases: Float
    new_cases_smoothed: Float
    total_deaths: Float
    new_deaths: Float
    new_deaths_smoothed: Float
    total_cases: Float
    total_cases_per_million: Float
    new_cases_per_million: Float
    new_cases_smoothed_per_million: Float
    total_deaths_per_million: Float
    new_deaths_per_million: Float
    new_deaths_smoothed_per_million: Float
    stringency_index: Float
    population: Float
    population_density: Float
    median_age: Float
    aged_5_older: Float
    aged_0_older: Float
    gdp_per_capita: Float
    extreme_poverty: Float
    cardiovasc_death_rate: Float
    diabetes_prevalence: Float
    female_smokers: Float
    male_smokers: Float
    handwashing_facilities: Float
    hospital_beds_per_thousand: Float
    life_expectancy: Float
    human_development_index: Float
    reproduction_rate: Float
    icu_patients: Float
    icu_patients_per_million: Float
    hosp_patients: Float
    hosp_patients_per_million: Float
    weekly_icu_admissions: Float
    weekly_icu_admissions_per_million: Float
    weekly_hosp_admissions: Float
    weekly_hosp_admissions_per_million: Float
    new_tests: Float
    total_tests: Float
    total_tests_per_thousand: Float
    new_tests_per_thousand: Float
    new_tests_smoothed: Float
    new_tests_smoothed_per_thousand: Float
    positive_rate: Float
    tests_per_case: Float
    tests_units: Float
    total_vaccinations: Float
    people_vaccinated: Float
    people_fully_vaccinated: Float
    new_vaccinations: Float
    new_vaccinations_smoothed: Float
    total_vaccinations_per_hundred: Float
    people_vaccinated_per_hundred: Float
    people_fully_vaccinated_per_hundred: Float
    new_vaccinations_smoothed_per_million: Float
  }

  type Locale {
    population: String
    location: String
    data: [Data]
  }
 
  type Query {
    locale(id: String): Locale
  }
`;

var mockDatabase = require('./20.04.2021 19.57.json');

const fieldResolver = (source, args, contextValue, info) => {
  return source[snakeCase(info.fieldName)]
};

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value;
  },
})

const resolvers = {
  Query: {
    locale: (parent, { id }, context, info) => {
      return mockDatabase[id];
    },
  },
  Date: dateScalar,
};

const server = new ApolloServer({ 
  fieldResolver,
  resolvers,
  typeDefs
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});