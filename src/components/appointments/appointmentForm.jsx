import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

import FormContainer from "../ui/formContainer";
import Button from "../ui/button";
import Input from "../ui/input";
import Select from "../ui/select";
import Alert from "../ui/alert";

function toDateTimeLocalValue(value) {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
}

function calculateEndTime(startTime, durationMinutes) {
    if (!startTime || !durationMinutes) return "";

    const startDate = new Date(startTime);
    if (Number.isNaN(startDate.getTime())) return "";

    const endDate = new Date(startDate.getTime() + Number(durationMinutes) * 60000);
    return toDateTimeLocalValue(endDate);
}

function getReservationId(appointment) {
    return appointment?.reservationId || appointment?.id;
}

function getAppointmentBarberId(appointment) {
    return appointment?.barberId || appointment?.barber?.id || "";
}

function getAppointmentClientId(appointment) {
    return appointment?.clientId || appointment?.client?.id || "";
}

function getAppointmentServiceId(appointment) {
    return appointment?.serviceId || appointment?.service?.id || "";
}

function AppointmentForm({ onAppointmentCreated, selectedAppointment, clearSelection }) {
    const { register, handleSubmit, reset } = useForm();
    const [apiMessage, setApiMessage] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [barbers, setBarbers] = useState([]);
    const [clients, setClients] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedServicePreview, setSelectedServicePreview] = useState(null);
    const [startTimePreview, setStartTimePreview] = useState("");

    const fetchFormOptions = async () => {
        try {
            setApiError(null);
            const [barbersResponse, clientsResponse, servicesResponse] = await Promise.all([
                api.get("/barbers"),
                api.get("/users?role=CLIENT&orderBy=fullName&order=asc"),
                api.get("/services?orderBy=name&order=asc")
            ]);

            setBarbers(barbersResponse.data.data || []);
            setClients((clientsResponse.data.data || []).filter((user) => user.role === "CLIENT"));
            setServices((servicesResponse.data.data || []).filter((service) => service.isActive));
        } catch (error) {
            setApiError(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchFormOptions();
    }, []);

    useEffect(() => {
        if (selectedAppointment) {
            const serviceId = getAppointmentServiceId(selectedAppointment);
            const serviceFromOptions = services.find((service) => Number(service.id) === Number(serviceId));

            reset({
                barberId: getAppointmentBarberId(selectedAppointment),
                clientId: getAppointmentClientId(selectedAppointment),
                serviceId,
                startTime: toDateTimeLocalValue(selectedAppointment.startTimeUTC || selectedAppointment.startTime),
                endTime: toDateTimeLocalValue(selectedAppointment.endTimeUTC || selectedAppointment.endTime),
                durationMinutes: selectedAppointment.durationMinutes,
                priceAtBooking: selectedAppointment.priceAtBooking,
                status: selectedAppointment.status,
                notes: selectedAppointment.notes
            });
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStartTimePreview(toDateTimeLocalValue(selectedAppointment.startTimeUTC || selectedAppointment.startTime));
            setSelectedServicePreview(serviceFromOptions || {
                ...selectedAppointment.service,
                durationMinutes: selectedAppointment.durationMinutes,
                price: selectedAppointment.priceAtBooking
            });
        } else {
            reset({
                barberId: "",
                clientId: "",
                serviceId: "",
                startTime: "",
                endTime: "",
                durationMinutes: 0,
                priceAtBooking: 0,
                status: "SCHEDULED",
                notes: ""
            });
            setStartTimePreview("");
            setSelectedServicePreview(null);
        }
    }, [selectedAppointment, reset, services]);

    useEffect(() => {
        if (apiMessage || apiError) {
            const timer = setTimeout(() => {
                setApiMessage(null);
                setApiError(null);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [apiMessage, apiError]);

    const handleServiceChange = (serviceId) => {
        const service = services.find((s) => Number(s.id) === Number(serviceId));
        setSelectedServicePreview(service || null);
    };

    const handleStartTimeChange = (startTime) => {
        setStartTimePreview(startTime);
    };

    const onSubmit = async (data) => {
        setApiMessage(null);
        setApiError(null);

        const payload = {
            barberId: Number(data.barberId),
            clientId: Number(data.clientId),
            serviceId: Number(data.serviceId),
            startTime: new Date(data.startTime).toISOString(),
            status: data.status,
            notes: data.notes.trim()
        };
        console.log("Payload a enviar:", payload);


        try {
            let response;
            if (selectedAppointment) {
                response = await api.put(`/reservations/${getReservationId(selectedAppointment)}`, payload);
                setApiMessage(response.data.message);
                clearSelection();
            } else {
                response = await api.post("/reservations/", payload);
                setApiMessage(response.data.message);
                reset();
            }

            onAppointmentCreated();
        } catch (error) {
            setApiError(error);
        }
    };

    return (
        <FormContainer title={selectedAppointment ? "Editar Reserva" : "Crear Reserva"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Select register={register("barberId", { valueAsNumber: true })}>
                    <option value="">Selecciona un barbero</option>
                    {barbers.map((barber) => (
                        <option key={barber.userId} value={barber.userId}>
                            {barber.user?.fullName || `Barbero #${barber.userId}`}
                        </option>
                    ))}
                </Select>

                <Select register={register("clientId", { valueAsNumber: true })}>
                    <option value="">Selecciona un cliente</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.fullName}
                        </option>
                    ))}
                </Select>

                <Select
                    register={register("serviceId", {
                        valueAsNumber: true,
                        onChange: (event) => handleServiceChange(event.target.value)
                    })}
                >
                    <option value="">Selecciona un servicio</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </Select>

                <Input
                    placeholder="Inicio"
                    type="datetime-local"
                    register={register("startTime", {
                        onChange: (event) => handleStartTimeChange(event.target.value)
                    })}
                />
                <Input
                    placeholder="Termino"
                    type="datetime-local"
                    value={calculateEndTime(
                        startTimePreview,
                        selectedServicePreview?.durationMinutes
                    )}
                    disabled
                />
                <Input
                    placeholder="Duracion (minutos)"
                    type="number"
                    value={selectedServicePreview?.durationMinutes || ""}
                    disabled
                />
                <Input
                    placeholder="Precio al reservar"
                    type="number"
                    value={selectedServicePreview?.price || ""}
                    disabled
                />

                <Select register={register("status")}>
                    <option value="SCHEDULED">Agendada</option>
                    <option value="COMPLETED">Completada</option>
                    <option value="CANCELLED">Cancelada</option>
                    <option value="NO_SHOW">No asistio</option>
                </Select>

                <Input
                    placeholder="Notas"
                    {...register("notes")}
                    autoComplete="off"
                />

                {selectedAppointment && (
                    <Button
                        type="button"
                        onClick={() => {
                            reset();
                            clearSelection();
                        }}
                    >
                        Cancelar Edicion
                    </Button>
                )}
                <Button type="submit">
                    {selectedAppointment ? "Actualizar Reserva" : "Crear Reserva"}
                </Button>
                {apiError && <Alert message={apiError} type="error" />}
                {apiMessage && <Alert message={apiMessage} type="success" />}
            </form>
        </FormContainer>
    );
}

export default AppointmentForm;
