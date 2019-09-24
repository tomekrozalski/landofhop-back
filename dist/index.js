"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongodbSession = _interopRequireDefault(require("connect-mongodb-session"));

var _es6Promise = _interopRequireDefault(require("es6-promise"));

require("dotenv/config");

require("isomorphic-fetch");

var _resources = require("./v1/resources");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_es6Promise.default.polyfill();

const MongoDBStore = (0, _connectMongodbSession.default)(_expressSession.default);
const {
  CLIENT,
  MONGODB_PASSWORD,
  MONGODB_USERNAME,
  NODE_ENV,
  PORT,
  SESSION_SECRET
} = process.env;
const mongoDbUrl = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@landofhop-ku9ye.mongodb.net/landofhop?retryWrites=true`;
const app = (0, _express.default)();
const store = new MongoDBStore({
  uri: mongoDbUrl,
  collection: 'sessions'
});
app.use(_bodyParser.default.json());
app.use((0, _expressSession.default)({
  cookie: {
    maxAge: 30 * 60 * 1000,
    httpOnly: NODE_ENV === 'production'
  },
  name: 'session_auth',
  resave: true,
  rolling: true,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  store,
  unset: 'destroy'
}));
app.use((0, _cors.default)({
  origin: CLIENT,
  credentials: true
}));
app.use('/api/v1/country', _resources.country);

_mongoose.default.connect(mongoDbUrl).then(() => {
  app.listen(PORT || 3100);
}).catch(err => {
  // eslint-disable-next-line no-console
  console.log(err);
});