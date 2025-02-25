const loadInitialTemplate = () => {
  const template = `
<div id="container">
 <h1>Login</h1>
 <form id="animal-form"> 
    <div> 
      <label>Nombre</label>
      <input name="name" />
    </div>
    <div> 
         <label>Tipo</label>
         <input name="tipo" />
     </div>
     <button type="submit">Enviar</button>
</form>
<ul id="animal-list"></ul>
</div>
`;

  const body = document.getElementsByTagName("body")[0];
  body.innerHTML = template;
};

const getAnimals = async () => {
  const response = await fetch("/animals");
  const animals = await response.json();
  const template = (animal) => `
   <li> 
 ${animal.name} ${animal.lastname} <button data-id="${animal._id}">Eliminar</button>
</li>
`;

  const animalList = document.getElementById("animal-list");
  animalList.innerHTML = animals.map((animal) => template(animal)).join("");

  animals.forEach((animal) => {
    const animalNode = document.querySelector(`[data-id="${animal._id}"]`);
    animalNode.onclick = async (e) => {
      await fetch(`/animals/${animal._id}`, { method: "DELETE" });
      animalNode.parentNode.remove();
      console.log("Eliminado con éxito");
    };
  });
};

const addFormListener = () => {
  const animalForm = document.getElementById("animal-form");
  animalForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(animalForm);
    const data = Object.fromEntries(formData.entries());
    await fetch("/animals", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Usuario creado con éxito: " + JSON.stringify(data));
    animalForm.reset();
    getAnimals();
  };
};

const checkLogin = () => {
  localStorage.getItem("jwt");
};

const animalsPage = () => {
  loadInitialTemplate();
  addFormListener();
  getAnimals();
};
const loadRegisterTemplate = () => {
  const template = `
<div id="container">
 <h1>Register</h1>
 <form id="register-form">
    <div> 
      <label>Correo</label>
      <input name="email" />
    </div>
    <div> 
         <label>Contraseña</label>
         <input name="password" />
     </div>
     <button type="submit">Enviar</button>
</form>
<a href='#' id='login'>Iniciar sesión</a>
</div>
`;

  const body = document.getElementsByTagName("body")[0];
  body.innerHTML = template;
};
const addRegisterListener = () => {};
const gotoLoginListener = () => {};

const registerPage = () => {
  console.log("pagina de registro");
  loadRegisterTemplate();
  addRegisterListener();
  gotoLoginListener();
};

const loginPage = () => {
  loadLoginTemplate();
  addLoginListener();
  gotoRegisterListener();
};
const loadLoginTemplate = () => {
  const template = `
<div id="container">
 <h1>Login</h1>
 <form id="login-form">
    <div> 
      <label>Correo</label>
      <input name="email" />
    </div>
    <div> 
         <label>Contraseña</label>
         <input name="password" />
     </div>
     <button type="submit">Enviar</button>
</form>
<a href='#' id='register'>Registrarse</a>
</div>
`;

  const body = document.getElementsByTagName("body")[0];
  body.innerHTML = template;
};

const gotoRegisterListener = () => {
  const gotoRegister = document.getElementById("register");
  gotoRegister.onclick = (e) => {
    e.preventDefault();
    registerPage();
  };
};
const addLoginListener = () => {
  const loginForm = document.getElementById("login-form");
  loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.text();
    if (response.status >= 300) {
      const errorNode = document.getElementById("error");
      errorNode.innerHTML = responseData;
    } else {
      console.log(responseData);
    }
  };
};

window.onload = () => {
  const isLoggedIn = checkLogin();
  if (isLoggedIn) {
    animalsPage();
  } else {
    loginPage();
  }
};
