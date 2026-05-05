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
  const [storageLoad, setStorageLoad] = useState(false);
  const [message, setMessage] = useState("");
 

  /* Agregamos un nuevo estado que maneja múltiples campos, que serán los que reciba del formulario*/
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
  })
  
  const filteredUsers = users.filter(user =>
  user.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if(selectedUser)
      {
        setFormData({
          name: selectedUser.name,
          email: selectedUser.email,
          city: selectedUser.address.city
        });
      } else {
      setFormData({
          name: "",
          email: "",
          city: ""
      })
    }
  }, [selectedUser])

  useEffect( () =>{
    async function initUsers()
    {
            const savedUsers = localStorage.getItem("users");
            const lastSelectedUser = localStorage.getItem("lastSelectedUserId")
 
            if (savedUsers)
              {
                      const parsedUsers = JSON.parse(savedUsers);
                      setUsers(parsedUsers)
                      if(lastSelectedUser)
                      {
                             const userToSelect = parsedUsers.find(user => 
                            user.id.toString() === lastSelectedUser.toString()      
                      )
                            if(userToSelect)
                            {
                                setSelectedUser(userToSelect);
                            }
                      }
                      setLoading(false)
              }else
                {
                  await loadUsers();
                }
              setStorageLoad(true);
      }
      initUsers()  
    }
    , []);

  useEffect(() => {
      if(selectedUser && !filteredUsers.some(user => user.id === selectedUser.id))
        {
          setSelectedUser(null);
        }
    }, [filteredUsers, selectedUser]);

  useEffect(() => {
    if(!storageLoad) return;
      
        localStorage.setItem("users", JSON.stringify(users))     
  }, [users])

  useEffect(() => {
        if(selectedUser){localStorage.setItem("lastSelectedUserId", selectedUser.id.toString());}
        else{localStorage.removeItem("lastSelectedUserId");} 
  }, [selectedUser])

  useEffect(() => {
    if(!message) return;

    const timer = setTimeout(() =>{
      setMessage("")
    }, 3000)

    return () => clearTimeout(timer)
  }, [message])

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

  function handleUpdateUser(updatedUser) {
  setUsers((prev) =>
    prev.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    )
  );

  setSelectedUser(updatedUser);
  setMessage("Usuario actualizado con éxito")
}
 
//Utilizamos esta función para resetear los datos del navegador
  function handleReset()
  {
    localStorage.removeItem("users");
    loadUsers();
    setSelectedUser(null);
    setSearch("");
  }

  // Evita que se recargue la página al cargar el formulario
  function handleSubmit(e){
    try{

        e.preventDefault();

        const trimmedData = {
              name: formData.name.trim(),
              email: formData.email.trim(),
              city: formData.city.trim()
        }

        if(!trimmedData.name || !trimmedData.email || !trimmedData.city)
          { throw new Error("Invalid format, some keys are empty");}

      if(selectedUser){

        const updatedUser = {
          id: selectedUser.id,
          name: trimmedData.name,
          email: trimmedData.email,
          address:
          {
            city: trimmedData.city
          },
          company:
          {
            name: selectedUser.company.name
          }
        }
        handleUpdateUser(updatedUser);

      } else {
     
                    const newUser = {
                      id: Date.now(),
                      name: trimmedData.name,
                      email: trimmedData.email,
                      address:
                      {
                        city: trimmedData.city
                      },
                      company: {
                        name: "Ninguna companía especificada"
                      }
                      }

                      setUsers((prevUsers) => [newUser, ...prevUsers]);
                      setSelectedUser(newUser);  
                      setMessage("Usuario creado con éxito")         
              }   
      setError(null);
      setSearch("");
        
    }
    catch(error)
    {
      setError("Fallo al cargar usuario")
      console.log(error);
    }
   
  }
  function handleDeleteUser(id)
  {
    const deleteConfirmation = window.confirm("¿Seguro desea eliminar el usuario?")
    if(!deleteConfirmation) return;
    setUsers((prev) => (
      prev.filter(user => user.id !== id)
    ));

    if(selectedUser && selectedUser.id === id)
      {
        setSelectedUser(null);

      }
      setMessage("Usuario eliminado con éxito")
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
console.log(selectedUser);
  return (
  <div className = "App">  
    { loading ? (
      <div className = "loading-error-container"><p className ="status-message">cargandooo...</p></div>
    ) : error ? (
      <div className = "loading-error-container"><p className = "status-message error">{error}</p></div>
    ) :

      (
    <div className = "main-content">
      <h1 className = "app-title">UserHub</h1>
      <p className = "app-subtitle">Gestión local de usuarios con búsqueda, CRUD y persistencia en el navegador</p>
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className = "first-submain-content">
        
      <div className = "second-submain-content">
      <div className = "submain-content"> 

        <div className = "list-wrapper">
          <div className ="panel list-panel">
            <h3 className = "list-counter">{filteredUsers.length} usuarios encontrados</h3>

            <h2 className = "panel-title">Lista de Usuarios</h2>
            
            <UserList users = {filteredUsers} onSelect = {setSelectedUser} selectedUser = {selectedUser}/>
          </div>  
        </div>
      
        <div className = "right-panel">
          <div className = "detail-wrapper">
            <div className = "panel detail-panel">
              <h2 className = "panel-title">Detalle de usuario</h2>

               <UserDetail user = {selectedUser}/>

               <QuitSelectedUser onSelect = {setSelectedUser} />
            </div>
          </div>

        </div>
   
      </div>
       
      </div>
      <div className = "third-submain-content">
        <div className = "avatar-wrapper">
            <FakeAvatar user = {selectedUser}/>
          </div>
      </div>
      </div>
      <AddUserForm onChange = {handleChange} onSubmit = {handleSubmit} formData = {formData} 
                    onDelete = {handleDeleteUser} selectedUser = {selectedUser}/>
      <div className = "reload-btn-container">
        { !loading && (
          <button className = "reload-btn" onClick = {() => handleReset()}>
            Recargar datos
          </button>
        )}
      </div>
      {message && 
      <div className ="toast">
        {message}
      </div>
      }     
    </div>
       )}
  </div>
  )
}


export default App
