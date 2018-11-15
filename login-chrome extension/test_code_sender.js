var webAuth = new auth0.WebAuth({
  domain:       'hpbots.auth0.com',
  clientID:     'K73x4xqAqIa8UIIeJHkwh4OOnKORMJwF',
  redirectUri: 'https://hpbotss.auth0.com/authorize', // what do I put here??
  responseType: 'code' 
});


function sendEmail(){
  var email = $("#email_test").val();

  webAuth.passwordlessStart({
    connection: 'email',
    send: 'code',
    email: email
  }, function (err,res) {
    if (err) {
      alert("invalid email, Try Again.");
      // Handle error
    }
    // do whatever you want here that shows that the email was sent.
    $('#email_test').hide();
  });
}
$(function() {
  $("#submit-test").click(function() {
    sendEmail();
  });
});