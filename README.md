# express-rid-middleware

A simple middleware for **ExpressJS** based on rid module that adds requests identifier on Request for logging and easy debug and on Response headers 🚀
# Installation

    npm install express-rid-middleware


## Usage

    import ridMiddleware from 'express-rid-middleware';  
      
    const app = express();  
      
    app.use(ridMiddleware())

You will have the request id inside **req.context.rid**



    app.use(ridMiddleware({ setResponseHeader: true }))
If you want to set also **x-request-id** header on response