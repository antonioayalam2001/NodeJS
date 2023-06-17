var params = new URLSearchParams(window.location.search);
// Function to render Users
var divUsers = $('#divUsuarios');
let formEnviar = $("#form-enviar");
let formInput = $('#txtMessage');
let divChatBox = $('#divChatbox');
let name = params.get("name");
let room = params.get("room");

// const params = new URLSearchParams(window.location.search)
function renderUsers(persons) { //{} {} {}
      var html = " ";
      html += ` <li>
            <a href="javascript:void(0)" class="active"> Chat de <span> ${params.get("room")} </span></a>
            </li>`
      for (var i = 0; i < persons.length; i++) {
            html += `<li>
            <a data-id = "${persons[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${persons[i].name} <small class="text-success">online</small></span></a>
            </li>`
      }
      divUsers.html(html)
}

function renderMessages(message, me = false) {
      let messageHTML = " ";
      let date = new Date(message.date)
      let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
      let parsedDate = date.getHours() + ' ' +  date.getMinutes() + ' ' +  seconds
      let adminClass = "info"
      if (message.user === "Admin"){
            adminClass = "danger";
      }
      if (me) {
            messageHTML += `<li class="reverse">
                  <div class="chat-content">
                        <h5>${message.user}</h5>
                        <div class="box bg-light-inverse">${message.msg}.</div>
                  </div>
                  <div class="chat-img"><img alt="user" src="assets/images/users/5.jpg"/></div>
                  <div class="chat-time">${parsedDate}</div>
            </li>`
      }else{
            messageHTML += `
                  <li class="animated fadeIn">
                  ${message.user === "Admin" ?  ""  : '<div class="chat-img"><img alt="user" src="assets/images/users/1.jpg"/></div>'}
                  <div class="chat-content">
                        <h5>${message.user}</h5>
                        <div class="box bg-light-${adminClass}">${message.msg}</div>
                  </div>
                  <div class="chat-time">${parsedDate}</div>
            </li>`
      }

      divChatBox.append(messageHTML);
}

function scrollBottom() {

      // selectors
      var newMessage = divChatBox.children('li:last-child');

      // heights
      var clientHeight = divChatBox.prop('clientHeight');
      var scrollTop = divChatBox.prop('scrollTop');
      var scrollHeight = divChatBox.prop('scrollHeight');
      var newMessageHeight = newMessage.innerHeight();
      var lastMessageHeight = newMessage.prev().innerHeight() || 0;

      if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
            divChatBox.scrollTop(scrollHeight);
      }
}


//Listeners
divUsers.on('click', "a", function () {
      //Referencing a
      let id = $(this).data('id');
      console.log(id)
})

formEnviar.on("submit", function (e) {
      e.preventDefault();
      if (formInput[0].value.trim().length === 0) {
            return;
      }
      socket.emit("sendmessage", {
            name,
            msg: formInput[0].value
      }, callback => {
            formInput[0].value = "";
            formInput[0].focus();
            renderMessages(callback, true);
            scrollBottom();
      })
})

