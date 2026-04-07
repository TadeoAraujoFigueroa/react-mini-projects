function UserItem({user, onSelect, isSelected})
{
    return(
        <li 
        className = {`user-item ${isSelected ? "selected" : ""}`}
        onClick = {() => onSelect(user)}
        >
            {user.name}
        </li>
    )
}

export default UserItem; 