const fetch = require('node-fetch');
module.exports = async (mess) => {
  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mess),
    });
  } catch (error) {
    throw error
  }


}