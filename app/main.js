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

window.onload = () => {
  loadInitialTemplate();
  addFormListener();
  getAnimals();
};
