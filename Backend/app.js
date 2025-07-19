const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const errorHandler = require('./middlewares/error-handler');
const notFound = require('./middlewares/not-found');
const dbConnect = require('./db/connect');
const userRouter = require('./routes/user');
const resourceProtectedRouter = require('./routes/resource-protected');
const resourcePublicRouter = require('./routes/resource-public');

app.use(cors());
app.use(express.json());
app.use('/api/v1/resources/protected', resourceProtectedRouter);
app.use('/api/v1/resources/public', resourcePublicRouter);


app.get('/',(req,res)=>{
    res.status(200).send('Hello World');
})

app.use('/api/v1/auth', userRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not set in environment variables');
    }
    await dbConnect(process.env.MONGO_URI);
    console.log('DB connected');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();