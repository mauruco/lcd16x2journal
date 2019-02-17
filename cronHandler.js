const fs = require('fs');
const { exec } = require('child_process');

// CRONTAB
// @reboot node /home/pi/lcd/app &> /dev/null &
// */15 * * * * node /home/pi/lcd/cronHandler &>> /home/pi/cron.log

const getApis = () => {
  
  return new Promise((resolve, reject) => {
    fs.readdir(`${__dirname}/apis`, (error, apis) => { resolve(apis) });
  });
};

const deleteOldJournals = () => {

  return new Promise((resolve, reject) => {

    fs.readdir(`${__dirname}/journals`, (error, journals) => {
      
      journals.map((journal, i) => {
  
        fs.unlink(`${__dirname}/journals/${journal}`, (err) => null);
      });
    });

    setTimeout(resolve, 5000);
  });
};

const init = async () => {

  // removing old stuff
  let journals = await deleteOldJournals();
  // get new stuff
  let apis = await getApis();

  apis.map((api) => {

    exec(`node ${__dirname}/apis/${api}`);
  });
};

init();