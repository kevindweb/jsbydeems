var urlInput = document.getElementById("urlInput");
var submitButton = document.getElementById("submitButton");
var errorBox = document.getElementsByClassName("error")[0];
var testURL = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

submitButton.onclick = function(e){
  e.preventDefault();
  testUrl = urlInput.value.match(testURL);
  if(testUrl){
    $("urlInput").val('');
    sendURL(testUrl);
  } else{
    errorBox.innerHTML = '<br>Please enter a real website.';
  }
}

function sendURL(testUrl){
  var data = {shortUrl:testUrl};
  $.post('/postResponse',data,function(data){
    errorBox.innerHTML = JSON.stringify(data);
    // errorBox.innerHTML = '<br> { '+Object.keys(data)[0].split("[]")[0]+' : '+data[Object.keys(data)]+' } ';
  });
}
