require('dotenv').config();

const ALLOWED_URL = process.env.ALLOWED_URL || 'https://google.com';

module.exports = {
  ALLOWED_URL
};
