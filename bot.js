const config = require('./config');
const axios = require('axios');
const Twit = require('twit');

const T = new Twit(config);

const onAuthenticated = (err, res) => {
  if (err) throw err;

  console.log('Authentication successful. Running bot...\r\n');
};

T.get('account/verify_credentials', {
  include_entities: false,
  skip_status: true,
  include_email: false
}, onAuthenticated);


const controlTweet = async() => {
  const min = 1;
  const max = 6223;
  
  const ran = Math.floor(Math.random() * (max - min + 1)) + min;

  const data = await getData(ran);

  const ayat = getAyat(data);

  tweetIt(ayat);
};

const tweetIt = (status) => {
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

const getData = async (id) => {
  const res = await axios(`https://www.bacaquran.online/api/ayat/${id}`);    

  return res.data;
};

const getAyat = (data) => {
  const ayat = 
    `${data.terjemahan_idn}

(${data.surat.nama_surat}:${data.nomor_ayat})
    `;

  return ayat;
};

setInterval(controlTweet, 300000);