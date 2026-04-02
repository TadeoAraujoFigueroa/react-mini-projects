import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import './components/UserList'
import UserList from './components/UserList'
import UserDetail from './components/UserDetai'

function App() {

  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function loadUsers(){
  try 
  {
    setLoading(true);
    setError(null);
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if(!response.ok)
    {
      setError(true)
      throw new Error("Fallo en el fetch");
    }

    const data = await response.json();

    setUsers(data);

    setLoading(false);

  }
  catch(error)
  {
    setError(true);
    console.log("ERROR: " + error);
  }}

  return (
   <div>    
    <h1>Users App</h1>

    <button onClick = {loadUsers}>
      Cargar Usuarios
    </button>

    { Array.isArray(users) && (
      <UserList users = {users} onSelect = {setSelectedUser}/> 
    )}
    

    { selectedUser && (
      <UserDetail selectedUser = {selectedUser}/>
    )}

    { loading &&
    (
      <h3>CARGANDO...</h3>
    )}
    {
      error && (
        <h3>ERROR EN LA CARGA</h3>
      )
    }

   </div>
  )
}


export default App
