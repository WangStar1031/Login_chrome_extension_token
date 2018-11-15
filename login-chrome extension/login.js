var webAuth = new auth0.WebAuth({
  domain:       'hpbots.auth0.com',
  clientID:     'K73x4xqAqIa8UIIeJHkwh4OOnKORMJwF',
  redirectUri: 'https://hpbotss.auth0.com/authorize',
  responseType: 'code'
});

function login(){
  var email = $('#login-email').val();
  var code = $('#login-token').val();
  $.post("https://hpbots.com/token_manager/JRA/api_accountManager.php", {action: "login", productName: "preme-HP", eMail: email, token: code}, function(data){
    if( data == "login"){
      chrome.storage.sync.set({preme_HP_user: email});
      chrome.browserAction.setPopup({popup: "popup.html"});
      alert("login successful");
      window.close();
    } else{
      alert("Token invalid");
    }
  });
}

$(function() {
  $("#open_test").click(function() {
    window.open("test_code.html"); 
  })
})

$(function() {
  $("#btn-login").click(function() {
    login();
  });
});