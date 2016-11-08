exports.returnOutChat = function(req, res) {
		
		var v_user_key = req.params.user_key;
		console.log("*** chat_room.returnOutChat =====================================")
		console.log("*** user_key : " + v_user_key)
		
		if(v_user_key == null) {
	    res.status(400).send("Invalid parameter")
	  } else {
	  	//res.status(200).send({text:'안녕하세요~! jeedragoniron입니다.'});
	  	res.status(200).send({code: 0, message:'SUCCESS', comment:'정상응답'});    
	  }
	  
    res.end();
};