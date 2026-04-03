function UserList({ users, onSelect }) {
  return (
    <ul> 
      {users.map(user => (
        <li className = "styleChange" key={user.id} onClick={() => onSelect(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default UserList;