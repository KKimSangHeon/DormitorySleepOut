module.exports = function(res,message)
{
  res.status(200).send(
  {
    message: {
      text: message
    }
  }
  );
}
