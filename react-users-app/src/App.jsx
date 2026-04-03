import { useState, useEffect } from 'react'
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
  const [error, setError] = useState(null);

  useEffect(() => {
      loadUsers();
    }, []);

  async function loadUsers(){
  try 
  {
    setLoading(true);
    setError(null);
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if(!response.ok)
    {
      throw new Error("Fallo en el fetch");
    }

    const data = await response.json();

    setUsers(data);

  }
  catch(error)
  {
    setError("Error al cargar usuarios");
    console.log("ERROR: " + error);
  }
  finally{
    setLoading(false);
  }
}

  return (
   <div>    
    <h1>Users App</h1>

    { loading ? (
      <h2>Cargandooo...</h2>
    ) : (
      <UserList users = {users} onSelect = {setSelectedUser}/>
    )}


    { selectedUser && (
      <UserDetail selectedUser = {selectedUser}/>
    )}

   
    {
      error && (
        <p>{error}</p>
      )
    }

   </div>
  )
}


export default App
