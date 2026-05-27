import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

import FormContainer from "../ui/formContainer";
import Button from "../ui/button";
import Input from "../ui/input";
import Alert from "../ui/alert";

function ServicesForm({ onServiceCreated, selectedService, clearSelection }) {
    const { register, handleSubmit, reset } = useForm();
    const [apiMessage, setApiMessage] = useState(null);
    const [apiError, setApiError] = useState(null);
    
    useEffect( () => {
        if(selectedService){
            reset({
                name: selectedService.name,
                description: selectedService.description,
                price: selectedService.price,
                durationMinutes: selectedService.durationMinutes
            });
        } else {
            reset({
                name: "",
                description: "",
                price: 0,
                durationMinutes: 0
            });
        }
    },[selectedService, reset]);

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
        try {
            if(selectedService){
                response = await api.put(`/services/${selectedService.id}`, payload);
                setApiMessage(response.data.message);
            } else {
                response = await api.post("/services/", payload);
                setApiMessage(response.data.message);
            }
            reset();
            onServiceCreated();
        } catch (error) {
            setApiError(error);
        }
    }

    return (
        <FormContainer 
            title ={selectedService ? "Editar Servicio" : "Crear Servicio"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    placeholder="Nombre del servicio"
                    register={register("name")}
                />
                <Input
                    placeholder="Descripción del servicio"
                    register={register("description")}
                />
                <Input
                    placeholder="Precio"
                    type="number"
                    register={register("price", { valueAsNumber: true })}
                />
                <Input
                    placeholder="Duración (minutos)"
                    type="number"
                    register={register("durationMinutes", { valueAsNumber: true })}
                />
                {selectedService && (
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
                    {selectedService ? "Actualizar Servicio" : "Crear Servicio"}
                </Button>
                {apiError && <Alert message={apiError} type="error" />}
                {apiMessage && <Alert message={apiMessage} type="success" />}
            </form>
        </FormContainer>
    )

}

export default ServicesForm;
