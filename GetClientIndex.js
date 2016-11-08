/*
  키값을 찾아서 인덱스를 반환하는 함수

*/

module.exports=function(arr,size,key){

  for(var i=0;i<size[0];i++){
    if(arr[i][0]===key){
      return i;      //키를 찾을경우 인덱스 반환
    }
  }
  return -99; //못찾을 경우 -99반환

}
