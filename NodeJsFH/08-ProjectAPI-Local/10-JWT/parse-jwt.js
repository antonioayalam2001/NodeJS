const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vcmEgQXlhbGEiLCJpYXQiOjE1MTYyMzkwMjJ9.3aS9kjT-g5pjnMAdZQ_5CXmvNUdRpNYP4YyKNUR7r4c"
//Permite decodificar un token
//Hacerlo en el navegador
function parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
};

parseJwt(token);