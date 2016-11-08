exports.returnText = function(req, res) {

    var v_type = req.body.type;
    var v_user_key = req.body.user_key;
    var v_content = req.body.content;


    console.log("*** message.returnText =====================================")
    console.log("*** type : " + v_type);
    console.log("*** user_key : " + v_user_key);
    console.log("*** content : " + v_content);


    if(write_step===0 && v_content==='작성')
    {
          write_step++;
    res.status(200).send(
			{
				message: {
					text: '작성을 시작합니다. 이름을 입력해주세요'

				}
			}
    );
  
    console.log(write_step + "스텝");

  }
  else if(write_step===1){
    res.status(200).send(
      {
        message: {
          text: '이름을 입력해주세요.'

        }
      }
    );


  }
  else if(write_step===2){
    res.status(200).send(
      {
        message: {
          text: '동을 입력해주세요'

        }
      }
    );


  }
  else if(write_step===3){
    res.status(200).send(
      {
        message: {
          text: '호수를 입력해주세요'

        }
      }
    );


  }
  else if(write_step===4){
    res.status(200).send(
      {
        message: {
          text: '복귀일날짜를 입력해주세요'

        }
      }
    );
  }
  else if(v_content==='확인')
  {
    res.status(200).send(
      {
        message: {
          text: '확인을 시작합니다.'

        }
      }
    );


  }
  else{
    console.log(write_step + "스텝");
    res.status(200).send(
      {
        message: {
          text: '잘못된 입력.'

        }
      }
    );


  }

};


exports.returnText1 = function(req, res) {


	  var v_type = req.body.type;
    var v_user_key = req.body.user_key;
    var v_content = req.body.content;

    console.log("*** message.returnText1 =====================================")
    console.log("*** type : " + v_type);
    console.log("*** user_key : " + v_user_key);
    console.log("*** content : " + v_content);

		res.status(200).send(
			{
				message: {
					text: '안녕하세요~! jeedragoniron입니다.',

				}
			}
		);
};



exports.returnPhoto = function(req, res) {
	res.status(200).send(
		{
			message: {
				text: '안녕하세요~! jeedragoniron입니다.',
				photo: {
					url: 'http://cfile29.uf.tistory.com/image/1417003E50571476355801',
					width: 640,
					height: 480
				},
				message_button: {
					label: '받기',
					url: 'http://cfile29.uf.tistory.com/image/1417003E50571476355801'
				}
			},
			keyboard: {
				type: 'buttons',
				buttons: [
					'처음으로',
					'다시 등록하기',
					'취소하기'
				]
			}
		}
	);
};
