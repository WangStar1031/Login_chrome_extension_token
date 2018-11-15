
function canUseProduct(){
	chrome.storage.sync.get('preme_HP_user', function(data){
		if( data.preme_HP_user){
			var email = data.preme_HP_user;
			$.post("https://hpbots.com/token_manager/JRA/api_accountManager.php", {action: "canUseProduct", productName: "preme-HP", eMail: email}, function(data){
				if( data != "YES"){
					chrome.browserAction.setPopup({popup: "login.html"});
					window.close();
				}
			});
		} else{
			chrome.browserAction.setPopup({popup: "login.html"});
			window.close();
		}
	});
}
canUseProduct();

// $("#logout").click(function(){
// 	chrome.storage.sync.get('preme_HP_user', function (data) {
// 		if( !data.preme_HP_user){
// 			var email = data.preme_HP_user;
// 			$.post("https://hpbots.com/token_manager/JRA/api_accountManager.php", {action: "logout", productName: "preme-HP", eMail: email}, function(data){
// 				console.log(data);
// 				chrome.browserAction.setPopup({popup: "login.html"});
// 				chrome.storage.sync.set({preme_HP_user: ""});
// 				window.close();
// 			});
// 		}
// 	});
// });

function loadAllTasks() {
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (!savedTasks || typeof (savedTasks) !== "object")
        return;
    for (let taskName in savedTasks){
        $("#select-task").append('<option>' + taskName + '</option>')
    }
}
function loadTaskFromStorage(taskName) {
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));
    return savedTasks[taskName];
}

loadAllTasks();

localStorage.getItem('itemCount');

$('#autobuy-slider').click(function() {
  let checkbox = $('#autobuy-checkbox');
  if ($(checkbox).prop('checked')) {
    $("#checkout-ms").css("border-color", "#605e5e");
  	$("#checkout-ms").css("color", "#605e5e");
  	$('label[for="checkout-delay"]').css("color", "#605e5e");
  	$('label[for="checkout-ms"]').css("color", "#605e5e");
  	$("#checkout-ms").val("0000");
  	$("#checkout-ms").prop('disabled', true);
  } else {
  	$("#checkout-ms").css("border-color", "#bf0d33");
	$("#checkout-ms").css("color", "#bf0d33");
	$('label[for="checkout-delay"]').css("color", "#bf0d33");
	$('label[for="checkout-ms"]').css("color", "#bf0d33");
	$("#checkout-ms").prop('disabled', false);
  }
});

$(function() {
	$("#items-btn").click(function() {
		window.open("items.html")
	})
	$("#restock-btn").click(function() {
		window.open("restocks.html")
	})
	$("#checkout-btn").click(function() {
		window.open("checkout.html")
	})
	$("#time-btn").click(function() {
		window.open("timer.html")
	})
	$(".start-btn").click(function() {

		let task = loadTaskFromStorage($("#select-task").val());        
		let autobuy = $("#autobuy-checkbox").is(":checked");
		let delay = $("#checkout-ms").val();

        chrome.runtime.sendMessage({ run: true, data: {
            task: task.cells
        } });

  		chrome.storage.sync.set({'autobuy': autobuy, 'delay': delay}, function() {});
            
		//messing around with notifications for restocks page....
		//let options = {
			//type: "basic",
			//title: "Supreme Restock",
			//message: "Mona Lisa Tee Black",
			//iconUrl: '/images/Hp_Beta7.png',
			//actions: [
				//{title: "small", action: "action1"},
				//{title: "medium", action: "action2"}
			//]
		//};

		//chrome.notifications.create(options, callback);

		//function callback() {
			//console.log("popup done");

		//}


	})
});

var btnLogout = document.getElementById('logout');
btnLogout.onclick = function(){
	chrome.storage.sync.get('preme_HP_user', function (data) {
		if( data.preme_HP_user){
			var email = data.preme_HP_user;
			$.post("https://hpbots.com/token_manager/JRA/api_accountManager.php", {action: "logout", productName: "preme-HP", eMail: email}, function(data){
				console.log(data);
				chrome.browserAction.setPopup({popup: "login.html"});
				chrome.storage.sync.set({preme_HP_user: ""});
				window.close();
			});
		} else{
			chrome.browserAction.setPopup({popup: "login.html"});
			window.close();
		}
	});
};