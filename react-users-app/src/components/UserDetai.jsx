function UserDetail({user})
{
    if(!user) return <p className = "empty-message">Seleccioná un usuario</p>
    return (
        <div className = "user-detail">
            <h3>{user.name}</h3>
            <p>
                <strong>Email:</strong>{user.email}
            </p>
            <p>
                <strong>Ciudad:</strong>{user.address.city}
            </p>
            <p>
                <strong>Empresa:</strong>{user.company.name}
            </p>
        </div>
    )
}
export default UserDetail;