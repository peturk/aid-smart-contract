var button = document.getElementById("show-more");

button.onclick = function(){
    var obj = {
        table: []
      };
    obj.table.push({id: 1, square:2});
    var json = JSON.stringify(obj);
    var fs = require('fs');
    fs.writeFile('myjsonfile.json', json, 'utf8', callback);
}
