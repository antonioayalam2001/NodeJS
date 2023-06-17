const googleSignOut = document.getElementById('google_SignOut');
googleSignOut.onclick = () => {
      //Google nos proporciona esta función
      console.log(google.accounts.id);
//      Realizando logOut
      google.accounts.id.revoke(localStorage.getItem('email'), done => {
            localStorage.clear();
            location.reload();
      });
}

const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:3000/api/auth/google'
    :'https://projectapinodejstunas.herokuapp.com/api/auth/google'

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
                let res = await fetch(url, {
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
                // console.log(localStorage)
          } catch (e) {
          }
    }

function decodeJwtResponse(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
}