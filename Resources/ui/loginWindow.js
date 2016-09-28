function loginWindow(){
	var win = Ti.UI.createWindow({
	backgroundColor:'#4d94ff',
		layout:'vertical'	
	});

	
	
	var mainView = Ti.UI.createView({
			backgroundColor:'transparent',
			layout:'vertical',
			width:'90%',
			height:'70%',
			top:30,
			left:'5%'
		});

	win.add(mainView);

	var btnCreateAcc = Ti.UI.createButton({
		title:'Create Account',
		backgroundColor:'#999999',
		top:10,
		left:'65%',
		width:Ti.UI.SIZE,
    	height:Ti.UI.SIZE
		});
	btnCreateAcc.addEventListener('click', function(e){
			var CreateAcc = require('ui/CreateAccountWindow');
			var create = new CreateAcc();
		});
	mainView.add(btnCreateAcc);

	var labelUsername = Ti.UI.createLabel({
		text:'Username:',
		width:Ti.UI.FILL,
		color:'#000',
		top:50,
		left:20,
	});

	mainView.add(labelUsername);

	var tbUser = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: '#000',
	backgroundColor:'#fff',
	
    width:Ti.UI.FILL,
    height:Ti.UI.SIZE,
    borderColor:'#000',
    top:10
});
	mainView.add(tbUser);

	var labelPass = Ti.UI.createLabel({
		text:'Password:',
		width:Ti.UI.FILL,
		color:'#000',
		top:5,
		left:20,
	});

	mainView.add(labelPass);
var tbPass = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: '#000',
	backgroundColor:'#fff',
	
    width:Ti.UI.FILL,
    height:Ti.UI.SIZE,
    borderColor:'#000',
    top:10,
    passwordMask:true
});
mainView.add(tbPass);
var btnLogin = Ti.UI.createButton({
		title:'Log in',
		backgroundColor:'#999999',
		top:20,
		left:'30%',
		width:Ti.UI.SIZE,
    	height:Ti.UI.SIZE

		});
	var json;
	btnLogin.addEventListener('click', function(e){
		var xhr = Ti.Network.createHTTPClient({
		onload: function() {
		Ti.API.info("Received text: " + this.responseText);
		json = JSON.parse(this.responseText); 
		if(this.responseText!=null){
		var Main = require("ui/MainWindow");
		var win = new Main(json);}
		else {
			lbStatus.text="Wrong username or password";
		}
		},
	onerror: function(e) {
	Ti.API.debug("STATUS: " + this.status);
	Ti.API.debug("TEXT:   " + this.responseText);
	Ti.API.debug("ERROR:  " + e.error);
	alert('There was an error retrieving the remote data. Try again.');
	},
	timeout:5000
	});
	xhr.open("POST", "http://10.0.3.2:8080/SpringService/services/login");
	xhr.setRequestHeader("Content-Type", "application/json");
	var data = { username:tbUser.value, password:tbPass.value};
	var JsonData = JSON.stringify(data);
	Ti.API.debug(JsonData);
	xhr.send(JsonData);
});
	mainView.add(btnLogin);

	var lbStatus = Ti.UI.createLabel({
		text:'',
		width:Ti.UI.FILL,
		color:'red',
		top:10,
		left:5,
		});
	mainView.add(lbStatus);
	return win;
};
module.exports = loginWindow;