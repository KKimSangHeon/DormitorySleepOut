/*
*
*  key 값을 파라미터로 넘겨받은 후 GetDataByDB 를 호출하여 DB로부터 데이터를 가져와 메세지를 배열로 보관한다.
*
*/

module.exports=function(key){

  var step; var building; var roomNumber; var returnDay; var destination; var phoneNumber; var registChecker;
  require('/GetDataByDB')(key, step, building, roomNumber, returnDay, destination, phoneNumber, registChecker);

  var message=new Array();



//  message[0]=


  return message;
}
