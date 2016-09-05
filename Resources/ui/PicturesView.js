function PictiresView(/* ROW OBJ*/ Row){
	var view = Ti.UI.createView({
		borderColor:'#000',
		layout:'vertical',
		top:20,
		left:5,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});
	
	
	//	var db = require('lib/database');
	//	var name  = db.getName(id);
		
		//Ti.API.warn(Row.rowIndex);
	
	var lbAlbumName = Ti.UI.createLabel({
			text:Row.title,
			color:'#000',
			 font: { fontSize:30 },
			top:5,
			left:5,
			width:Ti.UI.SIZE,
			height:'7%',

		});
	view.add(lbAlbumName);

	var PView = Ti.UI.createView({
		borderColor:'#000',
		top:0,
		left:0,
		width:Ti.UI.FILL,
		height:'80%'
		});
	view.add(PView);

	var PicView = null;

	function getPic(){
		if(PicView!=null)
			PView.remove(PicView);
	var db = require('lib/database');
	PicView = db.getPictures(Row.rowIndex);

	
	
	
		PView.addEventListener('longpress', function(e){
			var anim = Ti.UI.createAnimation({
					opacity:0.4,
					duration : 2000,
   				    autoreverse : true,

				});
			PicView.animate(anim);
			var EditView = require('ui/EditPictureWindow');
			var editPic = new EditView(e.source.id,Row.title);
		});

	PView.add(PicView);

	}
	Ti.App.addEventListener('databasePicUpdated', getPic);
	getPic();

	var btnAddPhoto = Ti.UI.createButton({
			title:'Add photo to album',
			backgroundColor:'#999999',
			top:10,
			left:5,
			width:Ti.UI.SIZE,
			height:Ti.UI.SIZE,
		});
	btnAddPhoto.addEventListener('click' , function(e){
				var AddPicture = require('ui/AddPictureWindow');
				var win = new AddPicture(Row);

		});


	view.add(btnAddPhoto);
	

	
	return view;
};
module.exports = PictiresView;