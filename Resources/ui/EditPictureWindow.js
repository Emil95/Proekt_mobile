function EditPictureWindow (id, album_name){
	var win =Ti.UI.createWindow({
			backgroundColor:'#4d94ff',
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			layout:'vertical',
			left:10,
			top:10,
		});

	////GET DATA FOR PICTURE ID/////
	var db = require('lib/database');
	var data = db.getPictureInfo(id);


	var overView = Ti.UI.createView({
		backgroundColor: '#transparent',
		width:Ti.UI.FILL,
    	height:Ti.UI.FILL,
    	layout:'vertical',
    	left:5,
    	top:5,
		});
	win.add(overView);

	var headerView = Ti.UI.createView({
		backgroundColor:'transparent',
        width:Ti.UI.FILL,
        height:Ti.UI.SIZE,
        left:10,
        top:5,
        layout:'vertical'
	});
	overView.add(headerView);

	var lbName = Ti.UI.createLabel({
		 color: '#000',
   		 text: 'Edit photo',
    	 font: {
    		fontSize:30
    	},
    	top:0,
    	width:Ti.UI.FILL,
    	height:Ti.UI.FILL,
    	left:0
		});
	headerView.add(lbName);

	var boddy = Ti.UI.createView({
		backgroundColor:'transparent',
        width:Ti.UI.FILL,
        height:Ti.UI.SIZE,
        top:80,
        left:0,
        layout:'horizontal'
		});

	overView.add(boddy);

	var leftBoddy = Ti.UI.createView({
		backgroundColor:'transparent',
        width:'55%',
        height:Ti.UI.SIZE,
        top:0,
        left:5,
        layout:'vertical'
		});
	boddy.add(leftBoddy);
	var rightBoddy =Ti.UI.createView({
		backgroundColor:'transparent',
        width:Ti.UI.SIZE,
        height:Ti.UI.SIZE,
        top:0,
        left:20,
        layout:'vertical'
		});
	boddy.add(rightBoddy);

	var leftBoddyInside = Ti.UI.createView({
		backgroundColor:'transparent',
        width:Ti.UI.FILL,
        height:Ti.UI.SIZE,
        top:10,
        left:0,
        layout:'horizontal'
		});
	leftBoddy.add(leftBoddyInside);

	var lbComment = Ti.UI.createLabel({
			color: '#000',
    		text: 'Comment:',
    		left:0,
   			 font:{
       		 	fontSize:20
    		},
    		width:Ti.UI.SIZE,
    		height:Ti.UI.SIZE
		});
	leftBoddyInside.add(lbComment);

	var tbComment = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: '#000',
	backgroundColor:'#fff',
	left:5,
    width:Ti.UI.FILL,
    height:Ti.UI.SIZE,
    borderColor:'#000',
    
});
	tbComment.setValue(data.comment);
	leftBoddyInside.add(tbComment);

	var leftBoddyInside2 = Ti.UI.createView({
		backgroundColor:'transparent',
        width:Ti.UI.FIll,
        height:Ti.UI.SIZE,
        top:20,
        left:0,
        layout:'horizontal'
		});
	leftBoddy.add(leftBoddyInside2);
	var lbAlbumName = Ti.UI.createLabel({
			color: '#000',
    		text: 'Album:',
    		left:0,
   			 font:{
       		 	fontSize:20
    		},
    		width:Ti.UI.SIZE,
    		height:Ti.UI.SIZE
		});
	leftBoddyInside2.add(lbAlbumName);

	var albumPicker = Ti.UI.createPicker({
			color: '#000',
			backgroundColor:'#899',
    		left:5,
   			 font:{
       		 	fontSize:20
    		},
    		width:'60%',
    		height:Ti.UI.SIZE
		});

		///// GET PICKER DATA 
		///// ALBUM NAMES AND IDS

		var pickerData = db.getPickerData();

		albumPicker.add(pickerData);
		albumPicker.selectionIndicator = true;
		leftBoddyInside2.add(albumPicker);

		var selected = 0;
		for (var i = 0; i<pickerData.length-1; i++){
			if(pickerData[i].title===album_name)
				break;
			selected++;
		}
		
		albumPicker.setSelectedRow(0, selected, false);

	var lbPreview = Ti.UI.createLabel({
		color: '#000',
    		text:'Preview',
    		top:0,
    		left:0,
   			 font:{
       		 	fontSize:18
    		},
    		width:Ti.UI.SIZE,
    		height:Ti.UI.SIZE
	});
	rightBoddy.add(lbPreview);

	var picture = Ti.UI.createImageView({
				image:data.url,
 				 width:100,
 				 height:100,
 				 top:10,
 				 borderColor:'#000'

		});
	picture.addEventListener('click', function(e){
			var Prev = require('ui/PreviewPhotoWindow');
			var pic = new Prev (picture.image);
		});
	rightBoddy.add(picture);

	var footerView = Ti.UI.createView({
		backgroundColor:'transparent',
        width:Ti.UI.FIll,
        height:Ti.UI.SIZE,
        top:70,
        left:30,
        layout:'horizontal'

		});
	overView.add(footerView);

	var btnCancel = Ti.UI.createButton({
		title:'Cancel',
		left:10,
		backgroundColor:'#999999',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		});
	btnCancel.addEventListener('click', function(e){
			win.close();
		});
	footerView.add(btnCancel);
	var btnDelete = Ti.UI.createButton({
		title:'Delete photo',
		left:10,
		backgroundColor:'#999999',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		});
	btnDelete.addEventListener('click', function(e){
			db.deletePicture(id,album_name);
			var n = Ti.UI.createNotification({message:"Picture deleted!"});
			n.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
			n.offsetX = 100;
			n.offsetY = 75;
		
			n.show();
			win.close();
			

		});
	footerView.add(btnDelete);
	var btnSave = Ti.UI.createButton({
		title:'Save',
		left:10,
		backgroundColor:'#999999',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		});
	btnSave.addEventListener('click', function(e){
		db.saveChange(id, tbComment.value, albumPicker.getSelectedRow(0) ,album_name);
			var n = Ti.UI.createNotification({message:"Picture changes saved!"});
			n.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
			n.offsetX = 100;
			n.offsetY = 75;
			n.show();

			win.close();
		
		});
	footerView.add(btnSave);

	win.open();
	return win;
};
module.exports = EditPictureWindow;