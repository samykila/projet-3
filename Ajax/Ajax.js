


//strict mode
"use strict"

// on recupère les données AJAX grace a un Callback Get
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText)
    }
    console.log(response);
};
        

      
