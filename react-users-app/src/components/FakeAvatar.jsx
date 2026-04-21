function FakeAvatar({user})
{
    
    if(!user) return (<strong className = "unfake-avatar-logo">NO USER SELECTED</strong>)
    return(
        <div className = "fake-avatar-logo">{user.name.substring(0,1)}</div>
    )
}

export default FakeAvatar;