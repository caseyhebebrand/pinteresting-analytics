# Pinteresting Analytics

An analytics microservice that determines the optimal advertisement quantity and category to serve a specific user. 

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

## Usage
After cloning this repo run npm install. Create a config file for variables associated with the MySQL database, Amazon SQS queues, and ElasticSearch. Correlatethe MySQL config variables to your local MySQL instance, then load the schema found in the analytics folder. Follow installation instructions to set up [Elasticsearch and Kibana](https://www.elastic.co/) locally. Create two Standard Queues with Amazon SQS. Input the access keys and queue urls into the config variables. The client_module and aggregator_module simulate the components that connect to the analytics module. Open three terminal windows. In the first window run node client_module/index.js. This is a data generator that inputs data into the analytics component. In the second terminal window, run node analytics/server/index.js to run this component. In the last terminal window, run aggregator_module/index.js to simulate the data leaving the analytics component.

## Requirements

- Node 6.11.3
- Express 4.16.2
- MySQL 14.14
- Elasticsearch 13.3.1
- AWS-SDK 2.141.0

## Other Information

Pinteresting Analytics is a component architected as part of a Pinterest-based service that curates advertisement quantity and advertisement content based on user history. This component has been load tested with 10M+ data entries over a period of 3 months.

System architecture:
![alt tag](/photos/architecture.png)

When a user's session ends, the analytics component receives a user id, a summary of ad clicks, an engagement score, and a boolean indicating if their enagement has dropped below a threshold. The analytics component will store the ad-click history. If the engagement boolean is true:
1) User ad ratio vs. enagement history will be pulled from the database. A linear regression will be used to assess a new ad ratio. The advertisement to pin ratio determines the user's optimal advertisement quantity.
2) Top top three ad categories for a user are determined based on number of clicks in their past sessions.  

The results of the analysis are stored as part of the user session history and passed to the advertisement aggregator.

Analytics component:
![alt tag](/photos/analytics.png)
