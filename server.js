const http = require('http');
const app = require('./server/express-app');

// Define the port
const port = process.env.PORT || 5000;

// Create http server
const server = http.createServer(app);

// Listen server on port
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});