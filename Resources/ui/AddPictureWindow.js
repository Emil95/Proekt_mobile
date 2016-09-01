function AddPictureWindow (Row){
	var win =Ti.UI.createWindow({
			backgroundColor:'#4d94ff',
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			layout:'vertical',
			left:10,
			top:10,
		});
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
   		 text: 'Add Photo',
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

	var lbAlbum = Ti.UI.createLabel({
			color: '#000',
    		text:Row.title,
    		left:5,
   			 font:{
       		 	fontSize:20
    		},
    		width:Ti.UI.SIZE,
    		height:Ti.UI.SIZE
		});
		leftBoddyInside2.add(lbAlbum);


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
				image:'/images/no-image.png',
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

	var btnAddPhoto = Ti.UI.createButton({
		title:'Add Photo',
		backgroundColor:'#999999',
		width:Ti.UI.SIZE,
    	height:Ti.UI.SIZE

		});
	btnAddPhoto.addEventListener('click', function(e){
			
		//	var TakePicture = require('ui/TakePhotoWindow');
		//	var pic = new TakePicture(Row.number);
		
		Ti.Media.showCamera({
				success:function(event) {
					var image = event.media;
					picture.image = image;
					
					//save for future use
					var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'photo'+ Row.title + Row.number +'.png');
					f.write(image);
				//	db.addPhoto(_bounty.id,f.nativePath);
				},
				cancel:function() {},
				error:function(error) {
					var a = Ti.UI.createAlertDialog({title:'Camera unavailable'});
						a.setMessage('Unexpected error: ' + error.code);
					
					a.show();
				},
				saveToPhotoGallery:true,
				allowEditing:true,
				mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
			});
		 
	});
		
	rightBoddy.add(btnAddPhoto);

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
	var btnAddPhotoToAlbum = Ti.UI.createButton({
		title:'Add photo to album',
		left:30,
		backgroundColor:'#999999',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		});
	btnAddPhotoToAlbum.addEventListener('click', function(e){
			if(tbComment.value!='' && picture.image!='/images/no-image.png'){
				var db = require('lib/database');
				db.addPhoto(Row.rowIndex, picture.image, tbComment.value);
				
				win.close();
			}
			else{
				if(tbComment.value == ''){
					tbComment.borderColor='red';
					alert('Comment is missing!');
				}
				else if (picture.image =='/images/no-image.png'){
					picture.borderColor='red';
					alert('Photo is missing!');
				}
				else {
					tbComment.borderColor='red';
					picture.borderColor='red';
					alert('Comment and photo missing!');
				}
			}


		});
	footerView.add(btnAddPhotoToAlbum);

	win.open();
	return win;
};
module.exports = AddPictureWindow;