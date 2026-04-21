import { useState, useEffect } from 'react'
import './App.css'
import './components/UserList'
import UserList from './components/UserList'
import UserDetail from './components/UserDetai'
import QuitSelectedUser from "./components/QuitSelectedUser"
import FakeAvatar from './components/FakeAvatar'
import AddUserForm from './components/AddUserForm'

function App() {

  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  /* Agregamos un nuevo estado que maneja múltiples campos, que serán los que reciba del formulario*/
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
  })


  const filteredUsers = users.filter(user =>
  user.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
      loadUsers();
    }, []);

  useEffect(() => {
      if(selectedUser && !filteredUsers.includes(selectedUser))
        {
          setSelectedUser(null);
        }
    }, [filteredUsers, selectedUser]);

  /* 
  Función onChange general para todos los inputs que permite establecer el nuevo usuario cuyos datos se van completando
  A medida que se escriben los campos, se va seteando el estado, siempre basandose en el estado previo.
  */
  function handleChange(e) {

    const{name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
  }))}

  // Evita que se recargue la página al cargar el formulario
  function handleSubmit(e){
    e.preventDefault();

    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      city: formData.city.trim(),
    };

    if (!trimmedData.name || !trimmedData.email || !trimmedData.city) {
      setError("Completá nombre, email y ciudad para agregar un usuario");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: trimmedData.name,
      email: trimmedData.email,
      address: {
        city: trimmedData.city,
      },
      company: {
        name: "Empresa no especificada",
      },
    };

    setUsers((prevUsers) => [newUser, ...prevUsers]);
    setSelectedUser(newUser);
    setError(null);
    setSearch("");
    setFormData({
      name: "",
      email: "",
      city: "",
    });
  }

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
    { loading ? (
      <div className = "loading-error-container"><p className ="status-message">Cargandooo...</p></div>
    ) : error ? (
      <div className = "loading-error-container"><p className = "status-message error">{error}</p></div>
    ) :

      (
    <div className = "main-content">
      <h1 className = "app-title">Users App</h1>
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className = "submain-content"> 

        <div className = "list-wrapper">
          <div className ="panel list-panel">
            <h3 className = "list-counter">{filteredUsers.length} usuarios encontrados</h3>

            <h2 className = "panel-title">Lista de Usuarios</h2>

            <UserList users = {filteredUsers} onSelect = {setSelectedUser} selectedUser = {selectedUser}/>
          </div>  
        </div>
      
        <div className = "right-panel">
          <div className = "avatar-row">
            <FakeAvatar user = {selectedUser}/>
          </div>
          <div className = "detail-wrapper">
            <div className = "panel detail-panel">
              <h2 className = "panel-title">Detalle de usuario</h2>

               <UserDetail user = {selectedUser}/>

               <QuitSelectedUser onSelect = {setSelectedUser} />
            </div>
          </div>

        </div>
   
      </div>
      <AddUserForm onAddForm = {handleChange} onSubmit = {handleSubmit} value = {formData}/>
      <div className = "reload-btn-container">
        { !loading && (
          <button className = "reload-btn" onClick = {() => loadUsers()}>
            Recargar
          </button>
        )}
      </div>

      
    </div>
       )}
  </div>
  )
}


export default App
