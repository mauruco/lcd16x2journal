const fs = require('fs');
const config = require('../configs/openweathermap.json');
const axios = require('axios');

const endPoint = `${config.api}?APPID=${config.appId}&units=${config.units}&lat=${config.lat}&lon=${config.lon}`;

axios.get(endPoint)
.then((res) => {
  // handle success
  if(!res.status === 200)
    return;

  let infos = {
    name: 'openweathermap',
    firstLine: `T: ${parseInt(res.data.main.temp)}C W: ${parseInt(res.data.wind.speed)}km/h`,
    secondLine: `${res.data.weather[0].description}`
  };

  fs.writeFile(`${__dirname}/../journals/${infos.name}`, `${infos.firstLine}\n${infos.secondLine}`, (error) => null);
})
.catch((error) => null);
