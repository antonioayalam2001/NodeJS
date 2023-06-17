const googleSignOut = document.getElementById('google_SignOut');
const buttonLogin = document.querySelector('.buttonLogin');
const buttonSignUp = document.querySelector('.buttonSignUp');
const buttonValidateToken = document.querySelector('.buttonValidateToken');
const myForm = document.querySelector('form');

buttonSignUp.addEventListener('click',evt => {
      evt.preventDefault();
      localStorage.clear('token')
      location.reload();
})


googleSignOut.onclick = () => {
      //Google nos proporciona esta función
      console.log(google.accounts.id);
//      Realizando logOut
      google.accounts.id.revoke(localStorage.getItem('email'), done => {
            localStorage.clear();
            location.reload();
      });
}
//Dar acceso a los diferentes dominios
// https://console.cloud.google.com/apis/credentials?project=driven-lore-313416&pli=1
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:3000/api/auth/'
    : 'https://projectapinodejstunas.herokuapp.com/api/auth/'

myForm.addEventListener('submit', async e => {
      e.preventDefault();
      const formData = {}
      for (let element of myForm) {
            if (element.name.length > 0) formData[element.name] = element.value;
      }
      if (formData.email === '' || formData.password === ''){
            return alert("Los campos no pueden estar vacíos")
      }
      const response = await fetch(url + "login", {
            headers: {
                  "Content-Type": 'application/json'
            }, method: "POST", body: JSON.stringify(formData)
      });
      //Extraer únicamente el JWT
      const {msg, token} = await response.json();
      if (!token) {
            alert(msg)
            return console.error(msg)
      }
      localStorage.setItem('token', token);
      buttonValidateToken.style.display = "block"
      window.location = "chat.html"
})

// buttonValidateToken.addEventListener('click', async evt => {
//       evt.preventDefault();
//       let token = localStorage.getItem('token');
//       if (!token){
//             return console.error("No hay ningun token actualmente")
//       }
//       const response = await fetch(url, {
//             headers: {
//                   "Content-Type": 'application/json',
//                   "x-token" : token
//             }, method: "GET"
//       });
//
//       const data = await response.json();
//       console.log(data)
// })

async function handleCredentialResponse(response) {
      // decodeJwtResponse() is a custom function defined by you
      // to decode the credential response.
      // console.log("ID: " + responsePayload.sub);
      // console.log('Full Name: ' + responsePayload.name);
      // console.log('Given Name: ' + responsePayload.given_name);
      // console.log('Family Name: ' + responsePayload.family_name);
      // console.log("Image URL: " + responsePayload.picture);
      // console.log("Email: " + responsePayload.email);
      // console.log(response.credential)
      const responsePayload = decodeJwtResponse(response.credential);
      const payload = {
            token: response.credential
      }
      try {
            let res = await fetch(url + "google", {
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  method: "POST",
                  body: JSON.stringify(payload)
            });
            let data = await res.json();
            console.log(data);
            //Almacenando correo en el LocalStorage
            localStorage.setItem("email", data.user.email);
            localStorage.setItem('token', data.token);
            // console.log(localStorage)
            window.location = "chat.html";
      } catch (e) {
      }
}

function decodeJwtResponse(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
}