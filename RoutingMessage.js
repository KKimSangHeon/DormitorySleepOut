/*
* 2차원 배열 client_list 의 요소는 key, step, building, roomNumber, returnDay, destination, phoneNumber, registChecker,authoritychecker 순서임
*/

module.exports=function(route){

    var client_list=new Array();
    var client_count=new Array();
    client_count[0]=0;  //call by ref로 하기위해 배열로...
    var limit_register=new Array();
    limit_register[0]=1;  //작성시간 제한을 위해 정의

  route.post('/',function(req,res){
    var v_type = req.body.type;
    var v_user_key = req.body.user_key;
    var v_content = req.body.content;

    console.log("*** message.returnText =====================================")
    console.log("*** type : " + v_type);
    console.log("*** user_key : " + v_user_key);
    console.log("*** content : " + v_content);

    var client_index=require('./GetClientIndex')(client_list,client_count,v_user_key); //클라이언트의 인덱스를 구한다.

    if(client_index===-99){  //새로운 사용자 입력일 경우 한 행을 추가한다
      client_list[client_count[0]]=new Array();
      client_list[client_count[0]][0]=v_user_key;
      client_list[client_count[0]][9]=0; //관리자계정이 아님
      client_list[client_count[0]][1]=0; //step 초기화
      client_index=client_count[0];
      client_count[0]++;
    }
      /*
        여기서 client_list[client_count[0]][20]이 1이면 message를 처리하고 아니면 39행이 처리하도록..
        배열을 넘겨서 조회 할 데이터(동, 날짜)를 넣고 조회
        client_list[client_count[0]][20]이 2이면 이름으로 조회임
      */


    require('./SendMessage')(res,client_list,client_index,client_count,v_content,limit_register);

    
  });
  return route;
}
