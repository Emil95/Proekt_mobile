var db = Ti.Database.open('ProektSliki');
db.execute('CREATE TABLE IF NOT EXISTS albumi(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, number INTEGER  )');
db.execute('CREATE TABLE IF NOT EXISTS sliki(id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, comment TEXT , albumi_id INTEGER )');

db.close();



var add = function(_name) {
	var db = Ti.Database.open('ProektSliki');

	var res = db.execute("SELECT name FROM albumi WHERE name = ?",_name);
	if(res.isValidRow()){
		db.close();
		return 1;
	}
	else{
	db.execute("INSERT INTO albumi(name,number) VALUES(?,?) ",_name, 0);

		db.close();

	//Dispatch a message to let others know the database has been updated
	Ti.App.fireEvent("databaseUpdated");
	return 0;
	}
};
exports.add = add;

exports.list = function(){
	var dataList = [];
	var db = Ti.Database.open('ProektSliki');
	var results = db.execute('SELECT * FROM albumi ORDER BY name ASC');
	while(results.isValidRow()){
		

				 var row = Ti.UI.createTableViewRow({
				 title:results.fieldByName('name'),
    			 className:'forumEvent', // used to improve table performance
    			 backgroundSelectedColor:'blue',
    			 number:results.fieldByName('number'),
                 rowIndex:results.fieldByName('id'), // custom property, useful for determining the row during events
                 width:Ti.UI.FILL,
                 height:35,
                 backgroundColor:'#999999',
                 borderColor:'#000'
  				});

  				var labelAlbum = Ti.UI.createLabel({
  				left:5,
    			color:'#000',
    			text:results.fieldByName('name'),
    			width:'80%',
    			height:Ti.UI.SIZE,
  				});
  				row.add(labelAlbum);

  				var labelDetails = Ti.UI.createLabel({
    			color:'#fff',
    			backgroundColor:'blue',
    			left:'85%',
    			borderRadius:15,
    			text:results.fieldByName('number'),
    			width:Ti.UI.SIZE,
    			height:Ti.UI.SIZE,
    			
  				});
  			row.add(labelDetails);


		dataList.push(row);
		results.next();
}
	
	results.close();
	db.close();

	return dataList;

};

exports.getPictures = function (id){
	var db = Ti.Database.open('ProektSliki');
	var rez = db.execute('SELECT * FROM sliki WHERE albumi_id = ? ',id);
	var table =Ti.UI.createScrollView({		
                 layout:'vertical',
                 width:Ti.UI.FILL,
                 height:Ti.UI.FILL,
                 showVerticalScrollIndicator:true,
                 left:0,
                 top:0
  				});

	var positionTop =5;
	var positionLeft =5;
	var flag = 0;
	 
	while(rez.isValidRow()){

		 var row = Ti.UI.createView({
		 		 title:row,
                 width:Ti.UI.FILL,
                 height:Ti.UI.SIZE,
                 layout:'horizontal',
                 top:positionTop,
                 left:positionLeft
                
  				});

		 		for(var i = 0; i<2 && rez.isValidRow() ; i++){

		 		var coll = Ti.UI.createView({
                 width:'50%',
                 left:0,
                 top:0,
                 height:Ti.UI.SIZE,
                 layout:'vertical',
                index:rez.fieldByName('id')
                
  				});



  				var IvPicture = Ti.UI.createImageView({
 				 image:rez.fieldByName('url'),
 				 width:100,
 				 height:90,
 				 id:rez.fieldByName('id')
 				 
				});
  				
  				

  				coll.add(IvPicture);
  				var lbComment = Ti.UI.createLabel({
    			color:'#000',
    			top:10,
    			text:rez.fieldByName('comment'),
    			width:Ti.UI.SIZE,
    			height:Ti.UI.SIZE,
    			
  				});
  				coll.add(lbComment);

				
		row.add(coll);
		
		rez.next();
		}

		table.add(row);
		
		rez.next();
	}
	rez.close();
	db.close();
	
	return table;
};
exports.addPhoto = function (albumID, URL, comm){
	var db = Ti.Database.open('ProektSliki');
	db.execute('INSERT INTO sliki( url , comment , albumi_id ) VALUES(?, ? , ?) ', URL, comm, albumID);
	var numberUpdate = db.execute('SELECT number FROM albumi WHERE id = ?',albumID );
	var num = numberUpdate.fieldByName('number');
	db.execute('UPDATE albumi SET number = ?  WHERE id = ?',num+1 ,albumID );
	db.close();
	Ti.App.fireEvent("databaseUpdated");
	Ti.App.fireEvent("databasePicUpdated");
	
};

exports.getPictureInfo = function(id){
	var data ;
	var db = Ti.Database.open('ProektSliki');
	var rez = db.execute('SELECT * FROM sliki WHERE id = ?' ,id);
	while(rez.isValidRow()){
			
				data = {
				url:rez.fieldByName('url'),
				comment:rez.fieldByName('comment'),
				album_id:rez.fieldByName('albumi_id')};

		
		rez.next();
	}
	rez.close();
	db.close();
	return data;

};
exports.getPickerData = function(){
	var data = [];
	var db = Ti.Database.open('ProektSliki');
	var rez = db.execute('SELECT * FROM albumi ' );
	while(rez.isValidRow()){
		
			var row = Ti.UI.createPickerRow({
				title:rez.fieldByName('name'),
				id:rez.fieldByName('id'),
				number:rez.fieldByName('number')
				});
			
		data.push(row);
		rez.next();
	}
	rez.close();
	db.close();
	return data;

};
exports.deletePicture = function(id, albumName){
	var db = Ti.Database.open('ProektSliki');
	db.execute('DELETE FROM sliki WHERE id = ?', id);
	var numberUpdate = db.execute('SELECT number FROM albumi WHERE name = ?',albumName );
	var num = numberUpdate.fieldByName('number');
	db.execute('UPDATE albumi SET number = ?  WHERE name = ?',num-1 ,albumName);
	db.close();
	
	Ti.App.fireEvent("databaseUpdated");
	Ti.App.fireEvent("databasePicUpdated");
	

};

exports.saveChange = function(id, commentChange , albumNameTo , albumNameFrom){
	var db = Ti.Database.open('ProektSliki');
	var rez = db.execute('SELECT id, number FROM albumi WHERE name = ?',albumNameTo);
	var idTo = rez.fieldByName('id');
	var numberTo = rez.fieldByName('number');

	db.execute('UPDATE sliki SET comment = ? , albumi_id = ? WHERE id = ?', commentChange,idTo, id );
	db.execute('UPDATE albumi SET number = ? WHERE id = ?', numberTo+1, idTo );

	var rez = db.execute('SELECT number FROM albumi WHERE name = ?',albumNameFrom );
	var numberFrom = rez.fieldByName('number');
	db.execute('UPDATE albumi SET number = ? WHERE name = ?', numberFrom-1, albumNameFrom );


	db.close();
	Ti.App.fireEvent("databaseUpdated");
	Ti.App.fireEvent("databasePicUpdated");
};


var updateDatabase = function(data) {
	var db = Ti.Database.open('ProektSliki');
	var getDataAlbumi = data.albumi;
	for (var i = 0 ; i<data.albumi.length;i++){
		var albId = getDataAlbumi[i].albumId;
		var albName =getDataAlbumi[i].name;
		var albSize = getDataAlbumi[i].number;
		var getSliki = getDataAlbumi[i].sliki;
			for (var i = 0 ; i<getSliki.length;i++){
				var slikaId = getSliki[i].slikaId;
				var slikaUrl = getSliki[i].url;
				var slikaComment = getSliki[i].comment;

				db.execute('INSERT INTO sliki(id , url , comment , albumi_id ) VALUES(? ,?, ? , ?) ',slikaId, slikaUrl, slikaComment, albId);
			}

		db.execute("INSERT INTO albumi(id , name, number) VALUES(?, ?,?) ",albId, albName, albSize);
	}
	

	

		db.close();

	
	Ti.App.fireEvent("databaseUpdated");
	return 0;
	
};
exports.updateDatabase = updateDatabase;

var getDbforSync = function(id) {
	var db = Ti.Database.open('ProektSliki');
	
	
	var albumiData = [];
	var rez = db.execute('SELECT * FROM albumi' );
	while(rez.isValidRow()){
		var slikiData = [];
		var slikiRez = db.execute('SELECT * FROM sliki WHERE id=?', rez.fieldByName('id'));
			while(slikiRez.isValidRow()){
				var slika = {
					slikaId:slikiRez.fieldByName('id'),
					url:slikiRez.fieldByName('url'),
					comment:slikiRez.fieldByName('comment')
				}
			slikiData.push(slika);
			slikiRez.next();
		}
		slikiRez.close();
		var albums ={	
				albumId:rez.fieldByName('id'),
				name:rez.fieldByName('name'),
				number:rez.fieldByName('number'),
				sliki:slikiData
				}

			

		albumiData.push(albums);
		rez.next();
	}
	var data={userId:id,albumi:albumiData};
		rez.close()
		db.close();

	
	
	return data;
	
};
exports.getDbforSync = getDbforSync;
