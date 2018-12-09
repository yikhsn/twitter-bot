const config = require('./config');
const Twit = require('twit');

const T = new Twit(config);

T.get('account/verify_credentials', {
  include_entities: false,
  skip_status: true,
  include_email: false
}, onAuthenticated);

function onAuthenticated(err, res) {
  if (err) {
      throw err
  }

  console.log('Authentication successful. Running bot...\r\n')
}

const tweet = (status) => {
  T.post( 'statuses/update', { 
    status: status
  }, (err, data, response) => {
    if (response) {
      console.log(`Tweeted`);
    }
    if (err){
      console.log(err, data);
    }
  });
};

setInterval(() => {
  
  const min = 1;
  const max = 6223;
  const ran = Math.floor(Math.random() * (max - min + 1)) + min;

  tweet(ran);
}, 36000);
