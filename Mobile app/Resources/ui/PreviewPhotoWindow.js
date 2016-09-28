function PreviewPhotoWindow(imageURL){
	var win = Ti.UI.createWindow({
			height:Ti.UI.FILL,
			width:Ti.UI.FIll,
			backgroundColor:'#4d94ff',
		});
	var imagePreview = Ti.UI.createImageView({
				image:imageURL,
 				 width:'95%',
 				 height:'90%',
 				 top:10,
 				 left:10,
		});
	win.add(imagePreview);

	var btnDone = Ti.UI.createButton({
			title:'Done',
			backgroundColor:'#999999',
			width:Ti.UI.SIZE,
    		height:50,
    		top:'90%',
    		left:'70%',

		});
	btnDone.addEventListener('click', function(e){
			win.close();
		});
	win.add(btnDone);

	win.open();
	return win;
};
module.exports = PreviewPhotoWindow;