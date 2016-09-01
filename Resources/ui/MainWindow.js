function MainWindow(){
	var self = Ti.UI.createWindow({
		backgroundColor:'#4d94ff',
		layout:'vertical'	
	});

	var mainView = Ti.UI.createView({
			backgroundColor:'transparent',
			layout:'horizontal',
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			left:0
		});

	self.add(mainView);

	var AlbumView = require('ui/AlbumsView');
	var Albums = require('ui/AlbumsTable');
	 var picView = null;

	var table = new Albums();
	var albums = new AlbumView(table);
	table.addEventListener('click' , function(e){
			if(picView!=null)
				mainView.remove(picView);

			var PicturesView = require('ui/PicturesView');
			picView = new PicturesView(e.rowData);	
			mainView.add(picView);
			 

		});
	
	
	
	mainView.add(albums);
	 
	
	return self;
};
module.exports = MainWindow;
