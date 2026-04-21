import UserItem from "./UserItem"

function UserList({ users, onSelect, selectedUser}) {
  if(users.length === 0) return (
    <p>NO EXISTEN USUARIOS QUE CUMPLAN CON LA BÚSQUEDA</p>
  )
  return (
    <ul className = "user-list"> 
      {users.map(user => (
        <UserItem
         user = {user} 
         key = {user.id} 
         onSelect = {onSelect} 
         isSelected = {selectedUser != null ? user.id === selectedUser.id : false}
         />
      ))}
    </ul>
  );
}

export default UserList;