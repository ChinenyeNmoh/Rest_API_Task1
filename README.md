# Rest_API_Task1


## Project Overview

Rest_API_Task1 is a Node.js-based RESTful API designed to fetch users within a 10-kilometer radius of a given location, specified by latitude and longitude. This API provides a simple yet effective way to query user data based on geographic location, leveraging MongoDB for data storage and geospatial querying. The primary features include distance calculation using the Haversine formula, sorting users by proximity, and pagination for managing large datasets.

### Built With
- Nodejs
- Expressjs
- MongoDb

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

-  Set up your Mongodb database cluster

### Installation

1. Clone the repository.
   ```sh
   git clone https://github.com/ChinenyeNmoh/dynamicShop.git
   ```
2. Install the required packages.
	```sh
	npm install package.json
	```

3. Configure your .env file with your port number and mongodb connection uri
	```sh
	PORT=YOUR_PORT 
    MONGO_URI=YOUR_MONGO_URI
	```
### Start the application for development.
   ```sh
   npm run server
   ```

# End points
 ### GET /users

- Description: Fetches users within a 10-kilometer radius of the provided latitude and longitude. Results are sorted by proximity and can be paginated.
- Query Parameters:
lat: Latitude of the center point.
lon: Longitude of the center point.
page: Page number for pagination (default is 1).
Response: JSON object containing users within the specified radius, sorted by distance, along with pagination metadata.

### POST /users

- Description: Creates a new user record with specified name, latitude, and longitude.
-Request Body:
name: User's name.
latitude: User's latitude.
longitude: User's longitude.
Response: JSON object containing the created user data and a success message.

### Contributing
We welcome contributions from the community. If you have suggestions to make this project better, please create a pull request or open an issue with the "enhancement" tag. Don't forget to star the project if you find it useful!

License
This project is licensed under the MIT License - see the LICENSE file for details.

## Author
- Chinenye Nmoh [Github](https://github.com/ChinenyeNmoh/) / [Linkedin](https://www.linkedin.com/in/chinenye-nmoh-88479699/) / [Email](chinenyeumeaku@gmail.com) 

