var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var makeRandomCode = function makeRandomCode(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
 }

 
var showAlert = function showAlert(msg){
    $('#alert-error').show();
    $('#alert-error').text(msg);
}

var shuffle = function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

var addInPlace = function addInPlace(arrayMain, data){
    if (arrayMain.length==0 || arrayMain[arrayMain.length-1].score>data.score || Number.isNaN(data.score)) // If the first element or smaller that smallest
        arrayMain.push(data)
    else{
        for (i=0;i<arrayMain.length;i++){
            if (data.score >= arrayMain[i].score || Number.isNaN(arrayMain[i].score)){
                arrayMain.splice(i,0,data)
                break
            }
        }
    }
    return arrayMain;
}
  