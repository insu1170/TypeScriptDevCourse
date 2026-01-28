var figlet = require("figlet");


figlet("gg", (err, data) => {
    if (err) {
        console.log(err)
        return;

    }
    console.log(data)
})