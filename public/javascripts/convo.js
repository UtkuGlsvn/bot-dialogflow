/**
 * @Author: utkuglsvn <glsvn>
 * @Date:   2019-05-21T12:40:07+03:00
 * @Last modified by:   glsvn
 * @Last modified time: 2019-05-21T12:41:26+03:00
 */



var botui = new BotUI('api-bot');

var socket = io.connect('http://localhost:8010');
// read the BotUI docs : https://docs.botui.org/

botui.message.add({
  content: 'Selam,konuşmak için bir şeyler yazınız:)',
  delay: 1000,
}).then(function () {
  botui.action.text({
    action: {
      placeholder: 'Selam yazarak başlayabiliriz:)', }
  }
).then(function (res) {
  socket.emit('fromClient', { client : res.value }); // sends the message typed to server
    console.log(res.value); // will print whatever was typed in the field.
  }).then(function () {
    socket.on('fromServer', function (data) { // recieveing a reply from server.
      console.log(data.server);
      newMessage(data.server);
      addAction();
  })
});
})

function newMessage (response) {
  botui.message.add({
    content: response,
    delay: 0,
  })
}

function addAction () {
  botui.action.text({
    action: {
      placeholder: 'konuşmaya devam edebiliriz:)',
    }
  }).then(function (res) {
    socket.emit('fromClient', { client : res.value });
    console.log('client response: ', res.value);
  })
}
