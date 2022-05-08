## Informações
Modulo desenvolvido para auxiliar nas atividades da Square Cloud

## Instalação
```
npm install squarecloud-utils
```

## Forma de uso em Javascript

```javascript
const square = require("squarecloud-utils");

square.terminal.error / success / debug / warn
square.terminal.error("isso é um erro") // retorna no console a frase colorida em vermelho.

square.status.ram / ramUsed / ramTotal
square.status.ram() // 23/100MB

square.general.log / check / remove
square.general.log("oi, isso é uma mensagem de log", "arquivodelog.log") // salva a mensagem "oi, isso é [...]" no arquivo arquivodelog.log

square.general.webhook(objeto, url) // envia webhook para o discord;
```

## LICENSE
Este projeto está licenciado sob a Licença Apache License 2.0