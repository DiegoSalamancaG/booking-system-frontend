import {  use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

function BarberList({ onBarberCreated, selectedBarber, clearSelection }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [ apiError, setApiError ] = useState(null);
    const [ apiMessage, setApiMessage ] = useState(null);

    useEffect(() => {
        if(selectedBarber){
            setValue("fullName", selectedBarber.user.fullName);
            setValue("email", selectedBarber.user.email);
            setValue("experienceYears", selectedBarber.experienceYears);
            setValue("bio", selectedBarber.bio);
        }
    }, [selectedBarber, setValue]);

    const onSubmit = async (data) => {
        setApiError(null);
        setApiMessage(null);
        const payload = {
            ...data,
            role: "BARBER",
        };
        try {
            if(selectedBarber){
                const response = await api.put(`/barbers/${selectedBarber.userId}`, payload);
                setApiMessage(response.data.message);
            } else {
                const response = await api.post("/barbers/", payload);
                setApiMessage(response.data.message);
            }
            reset();
            onBarberCreated();
        } catch (error) {
            setApiError(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>{selectedBarber ? "Editar Barbero" : "Crear Barbero"}</h3>
            <input placeholder="nombre completo" {...register("fullName")} />
            {!selectedBarber &&
                <input placeholder="email" {...register("email")} />
            }
            <input placeholder="contraseña" type="password" {...register("password")} />
            <input type="number" {...register("experienceYears", { valueAsNumber: true})}/>
            <textarea placeholder="biografía" {...register("bio")} />
            {selectedBarber &&
                <button 
                    type="button"
                    onClick={() => {
                        clearSelection();
                    }}
                >
                    Cancelar
                </button>
            }
            <button type="submit">
                {selectedBarber ? "Actualizar Barbero" : "Crear Barbero"}
            </button>
            {apiError && <p style={{ color: "red" }}>{apiError}</p>}
            {apiMessage && <p style={{ color: "green" }}>{apiMessage}</p>}
        </form>
    )
}

export default BarberList;