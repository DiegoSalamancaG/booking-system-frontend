import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

import FormContainer from "../ui/formContainer";
import Button from "../ui/button";
import Input from "../ui/input";
import Select from "../ui/select";
import Alert from "../ui/alert";

function UserForm({ onUserCreated, selectedUser, clearSelection }) {
    const { register, handleSubmit, reset } = useForm();
    const [apiMessage, setApiMessage] = useState(null);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
    if (selectedUser) {
        reset({
            fullName: selectedUser.fullName,
            email: selectedUser.email,
            role: selectedUser.role,
            password: ""
        });
    } else {
        reset({
            fullName: "",
            email: "",
            role: "CLIENT",
            password: ""
        });
    }
}, [selectedUser, reset]);

    useEffect( () => {
        if(apiMessage || apiError) {
            const timer = setTimeout(() => {
                setApiMessage(null);
                setApiError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [apiMessage, apiError]);

    const onSubmit = async (data) => {
        setApiMessage(null);
        setApiError(null);
        let response;

        const payload = {...data};
        if(!payload.password) {
           delete payload.password;
        }

        try {
            if (selectedUser) {
                response = await api.put(`/users/${selectedUser.id}`, payload);
                setApiMessage(response.data.message);
                clearSelection();
            } else {
                response = await api.post("/users/", payload);
                setApiMessage(response.data.message);
                reset();
            }            
            onUserCreated();
        } catch (error) {
            setApiError(error);
        }
    }

    return (
        <FormContainer
            title={selectedUser ? "Editar Usuario" : "Crear Usuario"}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    placeholder="Nombre completo"
                    register={register("fullName")}
                    autoComplete="off"
                />
                {!selectedUser && (
                    <Input
                        placeholder="Email"
                        register={register("email")}
                        autoComplete="off"
                    />
                )}
                <Input
                    placeholder="Contraseña"
                    type="password"
                    register={register("password")}
                    autoComplete="new-password"
                />
                <Select register={register("role")} autoComplete="off">
                    <option value="CLIENT" defaultValue>User</option>
                    <option value="BARBER">Barber</option>
                    <option value="ADMIN">Admin</option>
                </Select>
                {selectedUser && (
                    <Button
                        type="button"
                        onClick={() => {
                            reset();
                            clearSelection();
                        }}
                    >
                        Cancelar Edición
                    </Button>
                )}
                <Button type="submit">
                    {selectedUser ? "Actualizar Usuario" : "Crear Usuario"}
                </Button>
                {apiError && <Alert message={apiError} type="error" />}
                {apiMessage && <Alert message={apiMessage} type="success" />}
            </form>
        </FormContainer>
    )
}

export default UserForm;
