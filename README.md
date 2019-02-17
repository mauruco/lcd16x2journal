## RASPBERRY PI - NOTIFICATION STATION

![FOTO](https://raw.githubusercontent.com/mauruco/lcd16x2journal/master/img/raspberrypizeroWithLcd16x2.jpeg)

### Sobre o projeto

1. Raspberry PI Zero
2. LCD 16x2 (16pins)
3. Testado com raspbian Stretch + NodeJs 10.15.1

### SINGLE RESPONSIBILITY PRINCIPLE

* Um ponto de entrada para o cronjob cuidar das APIs em processos separados
* Se uma API falhar, nenhum outro processo trava
* APIs modulares: copiar um novo scrit para pasta APIs, criar configs/config.json se necessário e pronto
* Cada API script salva seu resultado em um txt na pasta journals
* O app.js (main script) pega os journals e joga o texto no lcd

### Como conectar o LCD

* https://pimylifeup.com/raspberry-pi-lcd-16x2/
* Configurar o LCD setings no app.js de acordo com os GIPOs selecionados

### APIs scipts pré-prontos

* https://openweathermap.org/api -> criar config e pronto
* https://developers.google.com/gmail/api/quickstart/nodejs -> criar credentils e liberar application
* 'Data e hora' é um journal padrão já pronto e rodando

### Como rodar esse projeto

* git clone https://github.com/mauruco/lcd16x2journal.git
* cd lcd16x2journal
* npm install
* node app
