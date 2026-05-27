import { useState, useRef } from "react";
import UserForm from "../../components/users/userForm";
import UserList from "../../components/users/userList";

function UserPage() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedUser, setSelectedUser ] = useState(null);
    const formRef = useRef();

    const refreshList = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    }

    const clearSelection = () => {
        setSelectedUser(null);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);

        formRef.current.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
        });
    };

    return (
        <>
            <h2 ref={formRef} >User Management</h2>
            <UserForm onUserCreated={refreshList} 
                selectedUser={selectedUser}
                clearSelection={clearSelection}
            />
            <UserList refreshKey={refreshKey} 
                onEdit={handleEdit}
                onDelete={refreshList}
            />
        </>
    )
}

export default UserPage;