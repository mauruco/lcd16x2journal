const fs = require('fs');
const { exec } = require('child_process');

// CRONTAB
// @reboot node /home/pi/lcd/app &> /dev/null &
// */15 * * * * node /home/pi/lcd/cronHandler &>> /home/pi/cron.log

const getApis = () => {
  
  return new Promise((resolve, reject) => {
    fs.readdir(`${__dirname}/apis`, (error, apis) => { resolve(apis) });
  });
}

const init = async () => {

  let apis = await getApis();

  apis.map((api) => {

    exec(`node ${__dirname}/apis/${api}`);
  });
};

init();