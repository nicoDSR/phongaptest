
//The directory to store data
var store;

//Used for status updates
var $status;
var $prueba;

//URL of our asset
var assetURL = "http://192.168.1.117:8081/images/auto.jpg";

//File name of our important data file we didn't ship with the app
var fileName = "mydatafilee.jpg";

function init() {
	console.log("Iniciando");
	$status = document.querySelector("#status");
    $prueba = document.querySelector("#prueba");
	$status.innerHTML = "Checking for data file.";
    
	store = cordova.file.dataDirectory;
    console.log(store);
	//Check for the file. 
	window.resolveLocalFileSystemURL(store + fileName, appStart, downloadAsset);
    $prueba.innerHTML = "Iniciooo";
}

function downloadAsset() {
    console.log("downloadAsset");
    $prueba.innerHTML = "About to start transfer";
	var fileTransfer = new FileTransfer();
	 
	fileTransfer.download(assetURL, store + fileName, 
		function(entry) {
			console.log("Success!");
            $prueba.innerHTML = "Success!"
			appStart();
		}, 
		function(err) {
			console.log("Error");
        $prueba.innerHTML = "Error!"
			console.dir(err);
		});
}

//I'm only called when the file exists or has been downloaded.
function appStart() {
	$status.innerHTML = "App ready!";
}

function download(){
    var fileTransfer = new FileTransfer();
    var uri = encodeURI("http://192.168.1.117:8081/images/auto.jpg");
    var fileURL = cordova.file.applicationStorageDirectory + fileName;
fileTransfer.download(
    uri,
    fileURL,
    function(entry) {
        console.log("download complete: " + entry.toURL());
    },
    function(error) {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("upload error code" + error.code);
    },
    false,
    {
        headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
        }
    }
);
}
function download1(){

// !! Assumes variable fileURL contains a valid URL to a path on the device,
//    for example, cdvfile://localhost/persistent/path/to/downloads/

var fileTransfer = new FileTransfer();
var uri = encodeURI("http://192.168.1.117:8081/images/auto.jpg");
var fileURL = cordova.file.externalDataDirectory + "auto.jpg";
fileTransfer.download(
    uri,
    fileURL,
    function(entry) {
        entry.file(success, fail);
        console.log("download completeee: " + entry.toURL());
        
    },
    function(error) {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("upload error code" + error.code);
    },
    false,
    {
        headers: {
           
        }
    }
);
}
function success(file) {
    console.log("File size: " + file.size);
}

function fail(error) {
    alert("Unable to retrieve file properties: " + error.code);
}

// obtain properties of a file
