function AddUserForm({ onAddForm, onSubmit, value })
{
    return(
    <form className = "form-container" onSubmit = {onSubmit}>
        <h2 className = "app-title">Agregar Usuario</h2>
        <input
        type="text"
        name="name"
        placeholder="Nombre usuario..."
        value= {value.name}
        onChange={onAddForm}
        className = "search-input"
        />
         <input
        type="email"
        name="email"
        placeholder="Email usuario..."
        value= {value.email}
        onChange={onAddForm}
        className = "search-input"
        />
         <input
        type="text"
        name="city"
        placeholder="Ciudad usuario..."
        value= {value.city}
        onChange={onAddForm}
        className = "search-input"
        />
        <button type="submit" className = "reload-btn">
            Cargar usuario
        </button>
    </form>
    )
    
}

export default AddUserForm;
