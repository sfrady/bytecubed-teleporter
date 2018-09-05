const app = require('./app');

//query 1 : cities from Summerton in 1 jumps
const q1 = app.getCitiesInRange("Summerton", 1).map(c => c.name).join(', ');
console.log(`cities from Summerton in 1 jumps: ${q1}`);

//query 2 : cities from Summerton in 2 jumps
const q2 = app.getCitiesInRange("Summerton", 2).map(c => c.name).join(', ');
console.log(`cities from Summerton in 2 jumps: ${q2}`);

//query 3 : can I teleport from Springton to Atlantis?
const q3 = app.isNavigable("Springton", "Atlantis") ? "yes" : "no";
console.log(`can I teleport from Springton to Atlantis: ${q3}`);

//query 4 : can I teleport from Oaktown to Atlantis?
const q4 = app.isNavigable("Oaktown", "Atlantis") ? "yes" : "no";
console.log(`can I teleport from Oaktown to Atlantis: ${q4}`);

//query 5 : loop possible from Oaktown?
const q5 = app.isNavigable("Oaktown", "Oaktown") ? "yes" : "no";
console.log(`loop possible from Oaktown: ${q5}`);

//query 6 : loop possible from Fortuna?
const q6 = app.isNavigable("Fortuna", "Fortuna") ? "yes" : "no";
console.log(`loop possible from Fortuna: ${q6}`);