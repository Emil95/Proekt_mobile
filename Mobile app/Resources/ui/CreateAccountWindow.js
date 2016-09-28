function CreateAccountWindow(){
var win = Ti.UI.createWindow({
	backgroundColor:'#4d94ff',
		layout:'vertical'	
	});

var lbhead = Ti.UI.createLabel({
		text:'Create New Account',
		width:Ti.UI.FILL,
		color:'#000',
		top:10,
		left:5,
		});
	win.add(lbhead);
var mainView = Ti.UI.createScrollView({
			backgroundColor:'transparent',
			layout:'vertical',
			width:'90%',
			height:'90%',
			top:15,
			left:'5%'
		});

	win.add(mainView);

	var labelName = Ti.UI.createLabel({
		text:'Name:',
		width:Ti.UI.FILL,
		color:'#000',
		top:5,
		left:20,
	});

	mainView.add(labelName);

	var tbName = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: '#000',
	backgroundColor:'#fff',
	
    width:Ti.UI.FILL,
    height:Ti.UI.SIZE,
    borderColor:'#000',
    top:10
});
	mainView.add(tbName);

	var labelLastName = Ti.UI.createLabel({
		text:'Lastname:',
		width:Ti.UI.FILL,
		color:'#000',
		top:5,
		left:20,
	});

	mainView.add(labelLastName);
var tbLastName = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: '#000',
	backgroundColor:'#fff',
	
    width:Ti.UI.FILL,
    height:Ti.UI.SIZE,
    borderColor:'#000',
    top:10,
    
});
mainView.add(tbLastName);

var labelEmail = Ti.UI.createLabel({
		text:'Email:',
		width:Ti.UI.FILL,
		color:'#000',
		top:5,
		left:20,
	});

	mainView.add(labelEmail);
var tbEmail = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: '#000',
	backgroundColor:'#fff',
	
    width:Ti.UI.FILL,
    height:Ti.UI.SIZE,
    borderColor:'#000',
    top:10,
    
});
mainView.add(tbEmail);


	var labelUsername = Ti.UI.createLabel({
		text:'Username:',
		width:Ti.UI.FILL,
		color:'#000',
		top:5,
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

var labelConfirm = Ti.UI.createLabel({
		text:'Confirm Password:',
		width:Ti.UI.FILL,
		color:'#000',
		top:5,
		left:20,
	});

	mainView.add(labelConfirm);
var tbConfPass = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: '#000',
	backgroundColor:'#fff',
	
    width:Ti.UI.FILL,
    height:Ti.UI.SIZE,
    borderColor:'#000',
    top:10,
    passwordMask:true
});
mainView.add(tbConfPass);

var btnCreate = Ti.UI.createButton({
		title:'Create',
		backgroundColor:'#999999',
		top:20,
		left:'30%',
		width:Ti.UI.SIZE,
    	height:Ti.UI.SIZE

		});

btnCreate.addEventListener('click', function(e){
		if(tbName.value!="" && tbLastName.value!="" && tbUser.value!="" && tbPass.value!=""
		&& tbConfPass.value!="" && tbEmail.value!="" && tbPass.value==tbConfPass.value){
			var xhr = Ti.Network.createHTTPClient({
			onload: function() {
				Ti.API.info("Received text: " + this.responseText);
				json = JSON.parse(this.responseText); 
				lbStatus.color='green';
				lbStatus.text="Account Created Succsessfuly!";
		
		},
			onerror: function(e) {
				Ti.API.debug("STATUS: " + this.status);
				Ti.API.debug("TEXT:   " + this.responseText);
				Ti.API.debug("ERROR:  " + e.error);
				if(this.status==0){
				lbStatus.text ="User with that username already exits. Please choose another one ";
				lbStatus.color='red';
				}
				else
					alert('There was an error retrieving the remote data. Try again.');
	},
		timeout:5000
		});
		xhr.open("POST","http://10.0.3.2:8080/SpringService/services/create");
		xhr.setRequestHeader("Content-Type", "application/json");
		var data = {
			firstName:tbName.value,
			lastName:tbLastName.value,
			email:tbEmail.value,
			username:tbUser.value,
			password:tbPass.value
			};
		var jsondata = JSON.stringify(data);
		Ti.API.debug(jsondata);
		xhr.send(jsondata);
		
	}
	else {
		lbStatus.text="There are empty fields!";
		
	}

	});
	
	mainView.add(btnCreate);

	var lbStatus = Ti.UI.createLabel({
		text:'',
		width:Ti.UI.FILL,
		color:'red',
		top:10,
		left:5,
		});
	mainView.add(lbStatus);

	var btnBack = Ti.UI.createButton({
		title:'Back to Login',
		backgroundColor:'#999999',
		top:20,
		left:0,
		width:Ti.UI.SIZE,
    	height:Ti.UI.SIZE
		});

	btnBack.addEventListener('click', function(e){
			win.close();
		});

	mainView.add(btnBack);
	win.open();
	return win;
};
module.exports = CreateAccountWindow;