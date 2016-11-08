module.exports = function(conn,res,name){
    var sql = 'SELECT * FROM user WHERE name=?';

    conn.query(sql,[name],function(err,result){
      if(err){
        console.log(err);
      }
      else {
        if(result.length===0){
          message='해당하는 데이터가 존재하지 않습니다.';
      }
      else {
          message='';
        for(var i in result){
          message+=result[i].name+':'+result[i].building+'동'+result[i].roomnumber+'호'+result[i].returnday+'귀관 \n';
        }

      }
    }
    require('./SendToClient')(res,message);
});
}
