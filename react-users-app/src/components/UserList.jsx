import UserItem from "./UserItem"

function UserList({ users, onSelect, selectedUser}) {
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