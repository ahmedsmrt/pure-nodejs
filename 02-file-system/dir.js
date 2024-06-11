const fs = require('fs');


if (!fs.existsSync('./new-dir')) {
    // Create a new directory
    fs.mkdir('./new-dir', { recursive: true }, (err) => {
        if (err) throw err;
        console.log("Directory created successfully!");
    });
}




if (fs.existsSync('./new-dir')) {
    // Create a new directory
    fs.rm('./new-dir', { recursive: true }, (err) => {
        if (err) throw err;
        console.log("Directory removed successfully!");
    });
} 
