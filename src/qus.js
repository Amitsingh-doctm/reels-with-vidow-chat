




const d = new Date();
var n1 = d.toLocaleTimeString();
var n2 = d.toDateString();
  let x= n1.toUpperCase();
      let g= n2.slice(4);
      let f=g+" "+x;

  


var array = [{ id: 1, date: f }, { id: 2, date: 'Aug 1 2021 5: 41: 25 PM' }, { id: 1, date: 'Aug 1 2021 5: 41: 25 AM' }];

array.sort(function (a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return c - d;
});
console.log(array);