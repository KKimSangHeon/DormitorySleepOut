var app = require('./express')();

var keyboardObj = require('./routes/keyboard');
//var messageObj = require('./routes/message');
var friendObj = require('./routes/friend');
var chatroomObj = require('./routes/chat_room');

//keyboard
app.get('/keyboard', keyboardObj.returnAlive);

//message

var processMessage=require('./ProcessMessage')();
app.use('/message', processMessage);
//app.post('/message1', messageObj.returnPhoto);

//friend
app.post('/friend', friendObj.returnAddFriend);
app.delete('/friend/:user_key', friendObj.returnDelFriend);

//chat_room
app.delete('/chat_room/:user_key', chatroomObj.returnOutChat);

app.listen(8080);
console.log('Listening on port 8080...');
