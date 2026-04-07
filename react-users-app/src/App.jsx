import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import './components/UserList'
import UserList from './components/UserList'
import UserDetail from './components/UserDetai'
import QuitSelectedUser from "./components/QuitSelectedUser"

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
   <div className = "App">    

   
      <h1 className = "app-title">Users App</h1>
   
    

    

    { loading ? (
      <p className ="status-message">Cargandooo...</p>
    ) : error ? (
      <p className = "status-message error">{error}</p>
    ) :
      (
    <div className = "main-content">
      <div className ="panel list-panel">
        <h2 className = "panel-title">Lista de Usuarios</h2>

            <UserList users = {users} onSelect = {setSelectedUser} selectedUser = {selectedUser}/>
      </div>  
      <div className = "panel detail-panel">
        <h2 className = "panel-title">Detalle de usuario</h2>

            <UserDetail user = {selectedUser}/>
            <QuitSelectedUser onSelect = {setSelectedUser} />
      </div>

    </div>
       ) }
    
    </div>
  )
}


export default App
