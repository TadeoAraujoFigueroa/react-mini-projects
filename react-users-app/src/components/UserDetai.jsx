function UserDetail({selectedUser})
{
    return (
        <div>
            <h2>{selectedUser.name}</h2>
            <h3>{selectedUser.email}</h3>
        </div>
    )
}
export default UserDetail;