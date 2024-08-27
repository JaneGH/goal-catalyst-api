require('dotenv').config();
require('express-async-errors');

// Extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

// Middleware setup
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(express.json()); // Only one instance needed
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/api/v1/', (req, res) => {
  res.send('Api goals');
});

// Routes setup
const authRouter = require('./routes/auth');
const goalsRouter = require('./routes/goals');
const emailRoutes = require('./routes/email');

// Verify routes
app.use('/api/v1/email', authenticateUser, emailRoutes);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/goals', authenticateUser, goalsRouter);

// Error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();