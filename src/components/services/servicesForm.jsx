import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import api from "../../api/axios";

function ServicesForm({ onServiceCreated, selectedService, clearSelection }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [apiMessage, setApiMessage] = useState(null);
    const [apiError, setApiError] = useState(null);
    
    useEffect( () => {
        if(selectedService){
            setValue("name", selectedService.name);
            setValue("description", selectedService.description);
            setValue("price", selectedService.price);
            setValue("durationMinutes", selectedService.durationMinutes);
        }
    },[selectedService, setValue]);

    const onSubmit = async (data) => {
        setApiMessage(null);
        setApiError(null);
        console.log("Payload a enviar:", data);
        try {
            if(selectedService){
                const response = await api.put(`/services/${selectedService.id}`, data);
                setApiMessage(response.data.message);
            } else {
                const response = await api.post("/services/", data);
                setApiMessage(response.data.message);
            }
            reset();
            onServiceCreated();
        } catch (error) {
            setApiError(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>{selectedService ? "Editar Servicio" : "Crear Servicio"}</h3>
            <input placeholder="nombre del servicio" {...register("name")} />
            <input placeholder="descripción del servicio" {...register("description")} />
            <input type="number" placeholder="precio" {...register("price", { valueAsNumber: true})} />
            <input type="number" placeholder="duración (minutos)" {...register("durationMinutes", { valueAsNumber: true})} />
            {selectedService && 
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
                {selectedService ? "Actualizar Servicio" : "Crear Servicio"}
            </button>
            {apiError && <p style={{ color: "red" }}>{apiError}</p>}
            {apiMessage && <p style={{ color: "green" }}>{apiMessage}</p>}
        </form>
    )

}

export default ServicesForm;