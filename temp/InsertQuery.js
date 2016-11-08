module.exports = function(conn,userkey,step,name,building,roomnumber,returnday,destination,phonenumber,registchecker) {

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
