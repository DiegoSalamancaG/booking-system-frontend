import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

function UserForm({ onUserCreated, selectedUser, clearSelection }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [apiMessage, setApiMessage] = useState(null);
    const [apiError, setApiError] = useState(null);

    useEffect( () => {
        if(selectedUser){
            setValue("fullName", selectedUser.fullName);
            setValue("email", selectedUser.email);
            setValue("role", selectedUser.role);
        }
    },[selectedUser, setValue]);

    const onSubmit = async (data) => {
        setApiMessage(null);
        setApiError(null);
        try {
            if (selectedUser) {
                const response = await api.put(`/users/${selectedUser.id}`, data);
                setApiMessage(response.data.message);
            } else {
                const response = await api.post("/users/", data);
                setApiMessage(response.data.message);
            }            
            reset();
            onUserCreated();
        } catch (error) {
            setApiError(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>{selectedUser ? "Editar Usuario" : "Crear Usuario"}</h3>
            <input placeholder="nombre completo" {...register("fullName")} />
            {!selectedUser && 
                <input placeholder="email" {...register("email")} />
            }
            <input placeholder="contraseña" type="password" {...register("password")} />
            <select {...register("role")}>
                <option value="CLIENT">User</option>
                <option value="BARBER">Barber</option>
                <option value="ADMIN">Admin</option>
            </select>
            {selectedUser && 
                <button 
                    type="button" 
                    onClick={() => {
                        reset();
                        clearSelection();
                    }}>
                    Cancelar Edición
                </button>
            }
            <button type="submit">
                {selectedUser ? "Actualizar Usuario" : "Crear Usuario"}
            </button>
            {apiError && <p style={{ color: "red" }}>{apiError}</p>}
            {apiMessage && <p style={{ color: "green" }}>{apiMessage}</p>}
        </form>
    )
}

export default UserForm;
