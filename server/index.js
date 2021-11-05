require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./routers/index');
const path = require('path');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.PRODUCTION === 'true' ? process.env.PRODUCTION_CLIENT_URL : process.env.DEV_CLIENT_URL,
  })
);
app.use('/api', router);

/* Если продакшен будем отдавать сбилженый реакт */
if (process.env.PRODUCTION === 'true') {
  app.use('/', express.static(path.join(__dirname, '..', 'client')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
  });
}

/* миддлвейр для обработки ошибок обязательно должен идти последним */
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (process.env.PRODUCTION === 'true') {
      app.listen(process.env.PORT || 80, () =>
        console.log('Server started on PORT: ' + process.env.PRODUCTION_PORT || 80)
      );
    } else {
      app.listen(process.env.PORT || 5000, () =>
        console.log('Server started on PORT: ' + process.env.DEV_PORT || 5000)
      );
    }
  } catch (error) {}
};

start();
