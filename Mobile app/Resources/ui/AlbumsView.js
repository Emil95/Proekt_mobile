function AlbumsView(table){
	var view = Ti.UI.createView({
		layout:'vertical',
		width:'30%',
		height:Ti.UI.FILL,
		top:10,
		left:5
});
	////////////////////////////////////////
	// BUTTON
	var btnCreateAlbum = Ti.UI.createButton({
		title:'Create new album',
		backgroundColor:'#999999',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
	});
	view.add(btnCreateAlbum);
	btnCreateAlbum.addEventListener('click', function(e){
		var AddAlbum = require('ui/AddAlbumWindow');
		var add = new AddAlbum();
		
	
	});
	
	//////////////////////////////////////
	///////// TABLE VIEW FOR ALBUMS

	view.add(table);
	
	return view;
};
module.exports = AlbumsView;