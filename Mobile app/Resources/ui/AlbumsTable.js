function AlbumsTable(){
	var table = Ti.UI.createTableView({
			backgroundColor:'#fff',
			width:Ti.UI.SIZE,
			height:'70%',
			top:10,
			borderColor:'#333333',
			showVerticalScrollIndicator:true
		});
	
		

	function getData(){
			var db = require('lib/database');
       var data = db.list();
		    table.setData(data);
	}
  Ti.App.addEventListener('databaseUpdated', getData);
	getData();
	return table;
};



module.exports= AlbumsTable;