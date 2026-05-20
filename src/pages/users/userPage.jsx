import { useState } from "react";
import UserForm from "../../components/users/userForm";
import UserList from "../../components/users/userList";

function UserPage() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedUser, setSelectedUser ] = useState(null);

    const refreshList = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    }

    return (
        <>
            <h2>User Management</h2>
            <UserForm onUserCreated={refreshList} 
                selectedUser={selectedUser}
                clearSelection={() => setSelectedUser(null)}
            />
            <UserList refreshKey={refreshKey} 
                onEdit={setSelectedUser}
                onDelete={refreshList}
            />
        </>
    )
}

export default UserPage;