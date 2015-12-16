// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  console.log(evt)

  for (var i = 0, file; file = files[i]; i++) {
    objAction(file);
  }
}

document.addEventListener("DOMContentLoaded", function(event){
  document.getElementById('files').addEventListener('change', handleFileSelect);
});

function objAction(file){
  reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(e){
    build3dObject(e.srcElement.result);
  }
  console.log()
}

function build3dObject(obj){
  var objComponents = obj.split("\n");
  var objects = [];
  var currentObject = {v:[],f:[]};
  for (var i = 0, line; line = objComponents[i]; i++){
    var line_split = line.split(" ");
    switch (line_split.shift()) {
      case "v":
        // vector
        currentObject['v'].push(line_split);
        break;
      case "f":
        // face
        currentObject['f'].push(line_split);
        break;
      case "o":
        // object
        objects.push(currentObject);
        currentObject = {v:[],f:[]};
        break;
      case "#":
        // comment, ignore
        break;
      deafult:
        // not a valid token, ignore.
        console.log("Not valid token");
    }
  }
  objects.push(currentObject);
  console.log(objects);
}
