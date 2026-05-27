import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

import FormContainer from "../ui/formContainer";
import Button from "../ui/button";
import Input from "../ui/input";
import Alert from "../ui/alert";

function BarberForm({ onBarberCreated, selectedBarber, clearSelection }) {
    const { register, handleSubmit, reset } = useForm();
    const [ apiError, setApiError ] = useState(null);
    const [ apiMessage, setApiMessage ] = useState(null);

    useEffect(() => {
        if(selectedBarber){
            reset({
                fullName: selectedBarber.user.fullName,
                email: selectedBarber.user.email,
                experienceYears: selectedBarber.experienceYears,
                bio: selectedBarber.bio
            });
        } else {
            reset({
                fullName: "",
                email: "",
                experienceYears: 0,
                bio: ""
            });
        }
    }, [selectedBarber, reset]);

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
        setApiError(null);
        setApiMessage(null);
        let response;

        const payload = {
            ...data,
            role: "BARBER",
        };
        if(!payload.password) {
            delete payload.password;
        }
        try {
            if(selectedBarber){
                response = await api.put(`/barbers/${selectedBarber.userId}`, payload);
                setApiMessage(response.data.message);
            } else {
                response = await api.post("/barbers/", payload);
                setApiMessage(response.data.message);
            }
            reset();
            onBarberCreated();
        } catch (error) {
            setApiError(error);
        }
    }

    return (
        <FormContainer 
            title={selectedBarber ? "Editar Barbero" : "Crear Barbero"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    placeholder="Nombre completo"
                    register={register("fullName")}
                    autoComplete="off"
                />
                {!selectedBarber && (
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
                <Input
                    placeholder="Años de experiencia"
                    type="number"
                    register={register("experienceYears", { valueAsNumber: true })}
                    autoComplete="off"
                />
                <Input
                    placeholder="Biografía"
                    register={register("bio")}
                    autoComplete="off"
                />
                {selectedBarber && (
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
                    {selectedBarber ? "Actualizar Barbero" : "Crear Barbero"}
                </Button>
                {apiError && <Alert message={apiError} type="error" />}
                {apiMessage && <Alert message={apiMessage} type="success" />}
            </form>
        </FormContainer>
    )
}

export default BarberForm;
