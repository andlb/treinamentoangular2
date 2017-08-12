var a = [{test:1}, {test:2}, {test:3}];
a.forEach(function(entry) {
    console.log(entry);
});

var data = new Date("1980-11-14");
console.log(data);
console.log(data.getUTCDate() +" - " + (data.getUTCMonth()+1)  +" - " + data.getFullYear());
console.log(data.getUTCDay() +" - " + (data.getUTCMonth()+1)  +" - " + data.getFullYear());

var data = new Date();
console.log(data);
console.log(data.getUTCDate() +" - " + (data.getUTCMonth()+1)  +" - " + data.getFullYear());
console.log(data.getUTCDay() +" - " + (data.getUTCMonth()+1)  +" - " + data.getFullYear());