function QuitSelectedUser({onSelect})
{
    return (
        <button className = "clear-btn" onClick = {() => onSelect(null)}>
            Quitar usuario seleccionado
        </button>
    )
}

export default QuitSelectedUser;