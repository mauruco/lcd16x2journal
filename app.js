const Lcd = require('lcd');
const fs = require('fs');
const timeToWait = 3000;

let myLcd = new Lcd({
  rs: 21,
  e: 20,
  data: [12, 16, 24, 23],
  cols: 16,
  rows: 2
});

const getApiJournals = () => {
  
  return new Promise((resolve, reject) => {
    
    fs.readdir(`${__dirname}/journals`, (error, journals) => { resolve(journals) });
  });
}

const groupJournals = (allJournals) => {

  return new Promise((resolve, reject) => {

    let journals = [];
    allJournals.map((journal) => {
  
      journals.push(fs.readFileSync(`${__dirname}/journals/${journal}`, 'utf8'));
    });
    
    // min um journal teremos sempre
    let date = new Date().toISOString();
    date = `${date[8]}${date[9]}/${date[5]}${date[6]}/${date[0]}${date[1]}${date[2]}${date[3]}`;
    let time = new Date().toTimeString().slice(0, 5);
    journals.push(`Data: ${date}\nHora: ${time}`);
  
    resolve(journals);
  });
};

const printJournals = (journals, i, init) => {

  if(!journals[i]) return;
  let lines = journals[i].split("\n");

  myLcd.clear();
  myLcd.setCursor(0, 0);
  myLcd.print(lines[0], () => {

    myLcd.setCursor(0, 1);
    myLcd.print(lines[1]);
    
    setTimeout(() => {
      
      if(!journals[i+1]) return init();
      printJournals(journals, i+1, init);
    }, timeToWait);
  });
};

const init = async () => {

  let apiJournals = await getApiJournals();
  let journals = await groupJournals(apiJournals);
  printJournals(journals, 0, init);
};

myLcd.on('ready', () => {

  init();
});

process.on('SIGINT', function() {
  myLcd.clear();
  myLcd.close();
  process.exit();
});
