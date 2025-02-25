const mongoose = require ('mongoose')

const uri = "mongodb://localhost:27017/miBaseDeDatos";

mongoose.connect(uri)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));


const User = mongoose.model('User', {
  username: String,
  edad: Number,
})


const crear = async () => {
  const user = new User({ username: 'Alexis', edad: 25}) 
  const savedUser = await user.save()
  console.log(savedUser)
}

//crear()

const buscarTodo = async () => {
  const users = await User.find()
  console.log(users)
}

//buscarTodo()
 
const buscar = async () => {
  const user = await User.find({ username: 'Alexis' })
  console.log(user)
}

//buscar()

const buscarUno = async () => {
  const user = await User.findOne({ username: 'Alexis' })
  console.log(user)
}

//buscarUno()

const actualizar = async () => {
  const user = await User.findOne({ username: 'Alexis' })
  console.log(user)
  user.edad = 30;
  await user.save()
}

//actualizar()

const eliminar = async () => {
  const user = await User.findOne({ username: 'Felipe' })
    if ( user ) 
     {
       await user.deleteOne();
     }
   }


//eliminar()


