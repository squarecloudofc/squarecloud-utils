## Informações
Module designed to support Square Cloud activities.

## Install
```
npm install @squarecloud/utils
```

```javascript
const { Status: { ram, ramTotal, ramUsed } } = require("@squarecloud/utils");
// Or use directly @squarecloudofc/status

const { Terminal: { info, warn, error, success, debug } } = require("@squarecloud/utils");
error("Example error message :think:");

// Registry system.
const { Registry: { add, del, check } } = require("@squarecloud/utils");

add("Hello log", "log.txt");
add("Another message in same log", "log.txt");
add("Another timeZone?", "US_Logs.txt", "US/Central");

del("US_Logs.txt"); // Delete the US_Logs file.

if (check("US_Logs.txt")) {
    console.log("US_Logs exists!");
} 

const { webhook, apply, prototypes } = require("@squarecloud/utils");

// Discord Easy Webhook
webhook("hi friend", "https://discord......");
webhook({ content: "example object webhook" }, "https://discord......");

// Protect your code
apply(() => { console.log(USER) }, "log.txt"); 
// support file or webhook (discord);

Example save in log.txt:
00/00/0000 00:00:00 -> ReferenceError: USER is not defined

// Add Util prototypes;
prototypes();

"potato".capitalize -> "Potato";
[1, 2, 3, 4, 5].random() -> 3 // Give random array value;

```

## LICENSE
This project is licensed under the Apache License 2.0