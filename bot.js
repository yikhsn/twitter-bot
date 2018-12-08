const config = require('./config');
const Twit = require('twit');

const Twitter = new Twit(config);

Twitter.post(
    'statuses/update',
    { status: 'This is an automated test!' },
    (err, data, response) => {
      console.log(err, data, response);
    }
  )
  
// Retweet a given tweet
Twitter.post('statuses/retweet/:id', { id: '697162548957700096' })