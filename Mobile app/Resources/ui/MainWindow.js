function MainWindow(data){
	var self = Ti.UI.createWindow({
		backgroundColor:'#4d94ff',
		layout:'vertical'	
	});
	var UserId = data.userId;
	Ti.API.debug(UserId);
	var mainView = Ti.UI.createView({
			backgroundColor:'transparent',
			layout:'horizontal',
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			left:0
		});
	

	self.add(mainView);
	var db = require('lib/database');
	db.updateDatabase(data);
	var AlbumView = require('ui/AlbumsView');
	var Albums = require('ui/AlbumsTable');
	 var picView = null;

var rightView = Ti.UI.createView({
			backgroundColor:'transparent',
			layout:'vertical',
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			left:0
		});
	

	var table = new Albums();
	var albums = new AlbumView(table);
	table.addEventListener('click' , function(e){
			if(picView!=null)
				rightView.remove(picView);

			var PicturesView = require('ui/PicturesView');
			picView = new PicturesView(e.rowData);	
			rightView.add(picView);
			 

		});
	
	
	 var btnSynchronize = Ti.UI.createButton({
		title:'Synchronize',
		backgroundColor:'#999999',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		top:5,
	});
	rightView.add(btnSynchronize);
	btnSynchronize.addEventListener('click', function(e){
		var xhr = Ti.Network.createHTTPClient({
		onload: function() {
				Ti.API.info("Received text: " + this.responseText);
				json = JSON.parse(this.responseText); 
				
		
		},
			onerror: function(e) {
				Ti.API.debug("STATUS: " + this.status);
				Ti.API.debug("TEXT:   " + this.responseText);
				Ti.API.debug("ERROR:  " + e.error);
					alert('There was an error retrieving the remote data. Try again.');
	},
		timeout:5000
		});

		xhr.open("POST","http://10.0.3.2:8080/SpringService/services/synchronize");
		xhr.setRequestHeader("Content-Type", "application/json");
		var db = require('lib/database');
		var data = db.getDbforSync(UserId);
		var jsondata = JSON.stringify(data);
		Ti.API.debug(jsondata);
		xhr.send(jsondata);
		
	});

	mainView.add(albums);
	mainView.add(rightView);
	self.open();
	 
	
	return self;
};
module.exports = MainWindow;
