function AddUserForm({ onChange, onSubmit, formData, onDelete, selectedUser })
{
    return(
    <form className = "form-container" onSubmit = {onSubmit}>
        <h2 className = "form-title">
            {selectedUser ? "EDITAR USUARIO" : "AGREGAR USUARIO"}
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
       <button type="submit" className = "charge-btn">
            {selectedUser ? "Editar usuario" : "Crear usuario"}
        </button>
        {selectedUser &&  <button type ="button" className = "delete-btn" onClick = {() => onDelete(selectedUser.id)}>
            Eliminar
        </button>}
         
    </form>
    )
    
}

export default AddUserForm;
