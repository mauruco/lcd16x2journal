const Lcd = require('lcd');
const fs = require('fs');
const timeToWait = 3000;

// lcd setings
let myLcd = new Lcd({
  rs: 21,
  e: 20,
  data: [12, 16, 24, 23],
  cols: 16,
  rows: 2
});
// read journals
const getApiJournals = () => {
  
  return new Promise((resolve, reject) => {
    
    fs.readdir(`${__dirname}/journals`, (error, journals) => { resolve(journals) });
  });
}
// push to one obj
const groupJournals = (allJournals) => {

  return new Promise((resolve, reject) => {

    let journals = [];
    allJournals.map((journal) => {
  
      journals.push(fs.readFileSync(`${__dirname}/journals/${journal}`, 'utf8'));
    });
    
    // time journals is always present
    let d = new Date();
    let weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    let secondLines = ['Preguica', 'Comecou', 'Continua', 'Acaba logo', 'Ta acabando', 'Sextou', 'Partiu'];
    let weekDay = weekDays[d.getDay()];
    let secondLine = secondLines[d.getDay()];
    let date = d.toISOString();
    date = `${date[8]}${date[9]}/${date[5]}${date[6]}`;
    let time = d.toTimeString().slice(0, 5);
    journals.push(`${weekDay}: ${date} ${time}\n${secondLine}`);
  
    resolve(journals);
  });
};
// print
const printJournals = (journals, i, init) => {

  if(!journals[i]) return;
  let lines = journals[i].split("\n");

  myLcd.clear();
  myLcd.setCursor(0, 0);
  myLcd.print(lines[0], () => {

    // second line is optional
    if(lines[1]){

      myLcd.setCursor(0, 1);
      myLcd.print(lines[1]);
    }
    // next journal
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

// lcd ready
myLcd.on('ready', () => {

  init();
});
//
process.on('SIGINT', function() {
  myLcd.clear();
  myLcd.close();
  process.exit();
});
