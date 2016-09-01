function AddAlbumWindow(){
	var self = Ti.UI.createWindow({
		title:'Add new album',
		backgroundColor:'#ffffff',
		width:'80%',
        height:'50%'
	
	});



var overView =Titanium.UI.createView({
	borderRadius:10,
	backgroundColor: '#ffffff',
	width:Ti.UI.FILL,
    height:Ti.UI.FILL,
    layout:'vertical',
    left:5
});
self.add(overView);

//////////////////
//// Main view
var headerView = Titanium.UI.createView({
        backgroundColor:'transparent',
        width:Ti.UI.FILL,
        height:Ti.UI.SIZE,
        left:0,
        layout:'vertical'
    });

overView.add(headerView);
var lbAlbum = Ti.UI.createLabel({
    color: '#000',
    text: 'Create new album',
    font: {
    		fontSize:22
    	},
    top:10,
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    left:5
    
});
headerView.add(lbAlbum);

///////////////////////////////////
//////////////////////////////////
        //// body view
var body = Ti.UI.createView({
        backgroundColor:'transparent',
        width:Ti.UI.FILL,
        height:Ti.UI.SIZE,
        top:50,
        left:20,
        layout:'horizontal'
    });

overView.add(body);
var lbAlbumName = Ti.UI.createLabel({
    color: '#000',
    text: 'Album name:',
    left:0,
    font:{
        fontSize:20
    },
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE
    
});
body.add(lbAlbumName);

var tbAlbumName = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: '#000',
    left:10,
    width:Ti.UI.FILL,
    height:Ti.UI.SIZE,
    borderColor:'#000',


});
body.add(tbAlbumName);

///////////////////////////////////////////////
////////////buttons view

var footerView = Ti.UI.createView({
        backgroundColor:'transparent',
        width:Ti.UI.FILL,
        height:Ti.UI.SIZE,
        top:30,
        left:40,

        layout:'horizontal'
    });
overView.add(footerView);

var btnCancel = Titanium.UI.createButton({
    title: 'Cancel',
	backgroundColor: '#999999',
	left:10,
    borderColor:'#3333ff',
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE
});
footerView.add(btnCancel);

btnCancel.addEventListener('click',function(e)
{
    self.close();
    
});
var btnCreate = Titanium.UI.createButton({
    title: 'Create',
	backgroundColor: '#999999',
    borderColor:'#3333ff',
    left:10,
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE
});
footerView.add(btnCreate);

btnCreate.addEventListener('click',function(e)
{   
   	var db = require('lib/database');
     var rez =db.add(tbAlbumName.value);
     if(rez){
        alert('The name you entered already exists!');
     }
     else {
        self.close();
     }
    
});


	self.open();
	return self;
};
module.exports = AddAlbumWindow;
