    /*
    * 새로운 클라이언트가 들어왔을경우 내부 배열에 추가함.(라우팅을 위해 삽입.)
    * 2차원 배열 client_list 의 요소는 key, name, step, building, roomNumber, returnDay, destination, phoneNumber, registChecker,authoritychecker 순서임
    */

module.exports=function(res,client_list,client_index,client_count,v_content,limit_register){
  var message;
  var myQuery=require('./MyQuery');
  var conn=require('./AccessDB')();
  //var messageArray=require('./GetMessageArray');

  //----------------------------------------------------------------------아래부터 확인에 관한 소스
      if(v_content==='확인')
      {
            if(client_list[client_index][8]===1){
                  message='입력하신 정보\n------------\n성명 : '+client_list[client_index][2]+'\n'+client_list[client_index][3]+'동'+client_list[client_index][4]+'호\n'+'복귀날짜 : '+client_list[client_index][5]+'\n행선지 : '+ client_list[client_index][6]+'\n연락처 : '+client_list[client_index][7]+'\n------------\n재작성하시려면 1을 입력해 주세요.'
            }
            else{
                  message='입력된 정보가 없습니다. 작성을 시작하려면 아무키나 입력해 주세요'
                  client_list[client_index][1]=0;
            }
      }
//----------------------------------------------------------------------관리자 계정으로 접속
      else if(v_content==='supervisorgj@')
      {
          client_list[client_index][9]=1; //관리자 계정 활성화
          message='관리자 계정입니다.\n1.작성시간 종료 및 데이터 초기화\n2.작성 재시작\n3.외박계 조회\n4.일반계정으로 변경';
      }
      else if(client_list[client_index][9]===1)
      {
          client_list[client_index][9]=1; //관리자 계정 활성화

        if(client_list[client_index][20]===1){
              if(v_content==='1'){
                message='동을 입력해주세요'
                client_list[client_index][20]=111;
              }
              else if(v_content==='2'){
                message='이름을 입력해주세요'
                client_list[client_index][20]=12;
              }
              else{
                message='알수없는 입력입니다.\n확인 후 재입력해주세요'

              }
          }
          else if(client_list[client_index][20]===111){
                client_list[client_index][31]=v_content;
                message='날짜를 입력해주세요'
                client_list[client_index][20]=112;
          }
          else if(client_list[client_index][20]===112){
                client_list[client_index][32]=v_content;

                message=client_list[client_index][31]+client_list[client_index][32]+''; //동 날짜 재전송.. 나중에 없앨고 쿼리문으로 할것.


                client_list[client_index][20]=0; //조회 완료후 관리자 계정을 계속 사용하기 위해 초기화
          }
          else if(client_list[client_index][20]===12){
                if(v_content==='99')
                {
                    client_list[client_index][20]=0;
                    message='관리자 계정입니다.\n1.작성시간 종료 및 데이터 초기화\n2.작성 재시작\n3.외박계 조회\n4.일반계정으로 변경';
                }
                else{
                  client_list[client_index][31]=v_content;

                  myQuery.searchingByName(conn,res,client_list,client_index,client_list[client_index][31],1);  //처음에는 무조건 1page를 보여준다


                  return;
                }
          }
          else if(client_list[client_index][20]===13){
            if(v_content==='99'){
              message='관리자 계정입니다.\n1.작성시간 종료 및 데이터 초기화\n2.작성 재시작\n3.외박계 조회\n4.일반계정으로 변경'
              client_list[client_index][20]=0;
              }
            else {
              myQuery.searchingByName(conn,res,client_list,client_index,client_list[client_index][31],v_content);
              return;
            }

          }
          else if(v_content==='1'){
              message='작성시간을 종료합니다.\n---------------\n관리자 권한을 계속 사용하시려면 코드를 입력해주세요';
              limit_register[0]=0;   //서버 종료
              client_list.splice(0,client_count[0]);  //client_list 배열 다 지우기..
              client_count[0]=0;
          }
          else if(v_content==='2'){
              message='작성을 재시작합니다.\n---------------\n1.작성시간 종료 및 데이터 초기화\n2.작성 재시작\n3.외박계 조회\n4.일반계정으로 변경'
              limit_register[0]=1;   //서버 재시작
          }
          else if(v_content==='3'){
              client_list[client_index][20]=1; //외박계 조회 설정
              message='외박계를 조회합니다.\n조회할 방법을 입력해 주세요\n1.동,날짜로 조회\n2.이름으로 조회'
          }
          else if(v_content==='4'){
              message='작성을 시작합니다. 이름을 입력해주세요'
              client_list[client_index][1]=1;
              client_list[client_index][8]=0;
              client_list[client_index][9]=0;
          }
          else {
              message='알수없는 입력입니다.\n---------------\n1.작성시간 종료 및 데이터 초기화\n2.작성 재시작\n3.외박계 조회\n4.일반계정으로 변경'
          }
      }
//----------------------------------------------------------------------서버가 종료되었을 때 접속하였을 경우
      else if(limit_register[0]===0 && client_list[client_index][9]===0){
          message='외박계 작성 시간이 아닙니다.'
      }
//----------------------------------------------------------------------아래부터 작성에 관한 소스
      else if(v_content==='작성' || client_list[client_index][8]===1 && v_content==='1' || client_list[client_index][1]===0)  //작성을 누르거나 끝에서 재작성하는경우,확인을 누르고 1을 누르는경우
      {
      client_list[client_index][1]=1;
      message='작성을 시작합니다. 이름을 입력해주세요';
      client_list[client_index][8]=0;
      }

      else if(client_list[client_index][1]===1){
      client_list[client_index][2]=v_content;   //if문안에서 유효성 검사 추가할것 2~6자리글자수
      client_list[client_index][1]++;
      message=client_list[client_index][2]+'님 동을 입력해주세요';

      }
      else if(client_list[client_index][1]===2){
      client_list[client_index][3]=v_content;
      client_list[client_index][1]++;

      message='호수를 입력해주세요';

      }
      else if(client_list[client_index][1]===3){
      client_list[client_index][4]=v_content;
      client_list[client_index][1]++;

      message='귀관일을 입력해주세요';

      }
      else if(client_list[client_index][1]===4){
      client_list[client_index][5]=v_content;
      client_list[client_index][1]++;

      message='행선지를 입력해 주세요.';
      }
      else if(client_list[client_index][1]===5){
      client_list[client_index][6]=v_content;
      client_list[client_index][1]++;

      message='전화번호를 입력해 주세요';

      }
      else if(client_list[client_index][1]===6){
      client_list[client_index][7]=v_content;
      client_list[client_index][1]++;

      message= '모든 정보가 입력되었습니다 아무키나 입력해 주세요';
      }
      else if(client_list[client_index][1]===7){
        client_list[client_index][1]++;
        client_list[client_index][8]=1;
        message= '등록이 완료되었습니다\n------------\n성명 : '+client_list[client_index][2]+'\n거주정보 : '+client_list[client_index][3]+'동'+client_list[client_index][4]+'호\n'+'귀관일 : '+client_list[client_index][5]+'\n행선지 : '+ client_list[client_index][6]+'\n연락처 : '+client_list[client_index][7]+'\n------------\n처음부터 다시 입력하려면 1을 입력해 주세요';

        myQuery.insertQuery(conn,client_list[client_index][0],client_list[client_index][1],client_list[client_index][2],client_list[client_index][3],client_list[client_index][4],client_list[client_index][5],client_list[client_index][6],client_list[client_index][7],client_list[client_index][8]);
        //require('./InsertQuery')(conn,client_list[client_index][0],client_list[client_index][1],client_list[client_index][2],client_list[client_index][3],client_list[client_index][4],client_list[client_index][5],client_list[client_index][6],client_list[client_index][7],client_list[client_index][8]);
      }
      else if(client_list[client_index][1]===8){
        if(v_content==='1'){
          client_list[client_index][1]=0;
          message='재작성을 시작하려면 아무키나 입력해주세요';
        }
        else {
            message='잘못된 입력입니다. 확인 후 재 입력해주세요.';
        }
      }
      else if(client_list[client_index][1]===9){
      message='이미 등록이 완료되었습니다.\n입력하신 정보\n------------\n성명 : '+client_list[client_index][2]+'\n거주정보 : '+client_list[client_index][3]+'동'+client_list[client_index][4]+'호\n'+'귀관일 : '+client_list[client_index][5]+'\n행선지 : '+ client_list[client_index][6]+'\n연락처 : '+client_list[client_index][7]+'\n------------\n재작성하시려면 1을 입력해 주세요.';
      }

      else{
      message='잘못된 입력입니다. 확인 후 재 입력해주세요.';
      }

  require('./SendToClient')(res,message);
}
