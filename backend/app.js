
const bcrypt = require("bcrypt");
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');
dotenv.config({path: path.join(__dirname, 'config', 'config.env')})
const cookieParser = require('cookie-parser');
const {notFound,errorHandler} = require('./middlewares/errorMiddleware')
const bodyParser = require('body-parser')


const userRoutes = require('./routes/userRoute');

const products = require('./routes/product');
const orders = require('./routes/order');
const parts= require('./routes/parts');
// const payment= require('./routes/payment');

const stripe= require('./controllers/stripe');
const getUser = require('./controllers/getuserController');
const createOrder = require("./routes/createOrders");
const userInfo = require('./routes/userInfo');



connectDatabase();
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: [process.env.CLIENT_URL ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use('/api/v1/', userRoutes);
app.use('/api/v1/',products);
app.use('/api/v1/',parts);

app.use('/api/v1/',orders)
// app.use('/api/v1/',payment)

app.use('/api/v1/',stripe)
app.use('/api/v1/',getUser);
app.use('/api/v1/',createOrder)
app.use('/api/v1/',userInfo)






// app.use(notFound);
// app.use(errorHandler);
app.listen(7000, () => {
  console.log('Server is running on port 7000');
});