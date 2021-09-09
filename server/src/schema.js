const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    "Get cities array for homepage dropdown"
    cities(country: String, state: String): [City!]!
    "Get city detailed data"
    city(country: String, state: String, city: String): City
    "Get nearest city based on IP address"
    closestCity: City
    "Get states array for homepage dropdown"
    states(country: String): [State!]!
    "Get countries array for homepage dropdown"
    countries: [Country!]!
  }

  "A city is a location for AQI"
  type City {
    city: String!
    state: String!
    country: String!
    coordinates: [String!]!
    # forecasts: [ForecastData!]
    current: Current
    # history: History
  }

  "A state contains cities"
  type State {
    state: String!
    country: String!
  }

  "A country contains states"
  type Country {
    country: String!
  }

  "Weather data for a given station"
  type WeatherData {
    ts: String!
    tp: Int
    tp_min: Int
    pr: Int
    hu: Int
    ws: Float
    wd: Int
    ic: String
  }

  "Pollution data for a given station"
  type PollutionData {
    ts: String!
    aqius: Int
    mainus: String
    # p2: Pollution
    # o3: Pollution
    # n2: Pollution
    # s2: Pollution
    # co: Pollution
  }

  # "Combined weather and pollution forecasted data"
  # type ForecastData {
  #   ts: String!
  #   aqius: Int
  #   mainus: String
  #   p2: Pollution
  #   o3: Pollution
  #   n2: Pollution
  #   s2: Pollution
  #   co: Pollution
  #   tp: Int
  #   tp_min: Int
  #   pr: Int
  # }

  # "Pollution measurements for a given station"
  # type Pollution {
  #   conc: Float
  #   aqius: Int
  # }

  # "Historic weather and pollution data for a given station"
  # type History {
  #   weather: [WeatherData!]
  #   pollution: [PollutionData!]
  # }

  "Current weather and pollution data for a given station"
  type Current {
    weather: WeatherData
    pollution: PollutionData
  }
`;

module.exports = typeDefs;
