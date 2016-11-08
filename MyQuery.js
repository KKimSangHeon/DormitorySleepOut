exports.insertQuery = function(conn,userkey,step,name,building,roomnumber,returnday,destination,phonenumber,registchecker) {

//select 문 써서 이미 존재하면 update 하고 존재하지 않으면 insert할것.

  var sql = 'SELECT * FROM user WHERE userkey=?';
  var sql2;
  conn.query(sql,[userkey],function(err, rows){
    if(err){
        console.log('insertData DB Error(1)');
    }
    else {
          if(rows.length===0){
                //검색된 결과가 없으므로 insert into...
                sql2='INSERT INTO user VALUES(?,?,?,?,?,?,?,?,?)';
                conn.query(sql2,[userkey,step,name,building,roomnumber,returnday,destination,phonenumber,registchecker],function(err,result){
                  if(err){
                    console.log(err);
                  }
                  else {
                    console.log('DB insert');
                  }
                });
            }
            else{
                //검색된 결과가 존재하므로 update
                sql2='UPDATE user SET step=?,name=?,building=?,roomnumber=?,returnday=?,destination=?,phonenumber=?,registchecker=? WHERE userkey=?';
                conn.query(sql2,[step,name,building,roomnumber,returnday,destination,phonenumber,registchecker,userkey],function(err,result){
                  if(err){
                    console.log(err);
                  }
                  else {
                    console.log('DB update');
                  }
                });
            }
        }
    });
};


exports.searchingByName = function(conn,res,client_list,client_index,name,page){
    var sql = 'SELECT * FROM user WHERE name=?';

    conn.query(sql,[name],function(err,result){
      if(err){
        console.log(err);
      }
      else {
        if(result.length===0){
                message='해당하는 데이터가 존재하지 않습니다.\n이름을 재입력해주세요\n99.관리자화면복귀';
          }
        else {
                client_list[client_index][20]=13; //페이지를 넘기기 위한 작업
                var pages=Math.floor(result.length/80)+1;
                message='';

                var start=(page-1)*80;
                var end=(page*80)-1;

                if(start+1>result.length)
                {
                  message='해당 페이지가 존재하지 않습니다. 확인 후 재입력해주세요'
                }
                else {
                  if(end>=result.length-1){
                    end=result.length-1;
                  }
                  for(var i=start ; i<=end ; i++){
                    message+=i+1+'.'+result[i].name+':'+result[i].building+'동'+result[i].roomnumber+'호'+result[i].returnday+'귀관 \n';
                  }
                  message+='--------------------\n'+page+'/'+pages+'페이지\n넘어가실 페이지를 입력해주세요\n99.관리자화면복귀\n';
                }


        }
    }
    require('./SendToClient')(res,message);

});
}
