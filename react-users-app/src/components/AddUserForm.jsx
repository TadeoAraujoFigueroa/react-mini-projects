function AddUserForm({ onChange, onSubmit, formData, onDelete, selectedUser })
{
    return(
    <form className = "form-container" onSubmit = {onSubmit}>
        <h2 className = "app-title">
            {selectedUser ? "editar usuario" : "agregar usuario"}
        </h2>
        <input
        type="text"
        name="name"
        placeholder="Nombre usuario..."
        value= {formData.name}
        onChange={onChange}
        className = "search-input"
        />
         <input
        type="email"
        name="email"
        placeholder="Email usuario..."
        value= {formData.email}
        onChange={onChange}
        className = "search-input"
        />
         <input
        type="text"
        name="city"
        placeholder="Ciudad usuario..."
        value= {formData.city}
        onChange={onChange}
        className = "search-input"
        />
       <button type="submit" className = "reload-btn">
            {selectedUser ? "EDITAR USUARIO" : "CREAR USUARIO"}
        </button>
        {selectedUser &&  <button type ="button" className = "reload-btn" onClick = {() => onDelete(selectedUser.id)}>
            ELIMINAR USUARIO
        </button>}
         
    </form>
    )
    
}

export default AddUserForm;
