import { useRef, useState } from "react";
import AppointmentForm from "../../components/appointments/appointmentForm";
import AppointmentList from "../../components/appointments/appointmentList";

function AppointmentPage() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const formRef = useRef();

    const refreshList = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const clearSelection = () => {
        setSelectedAppointment(null);
    };

    const handleEdit = (appointment) => {
        setSelectedAppointment(appointment);
        formRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    return (
        <>
            <h2 ref={formRef}>Gestion de Reservas</h2>
            <AppointmentForm
                onAppointmentCreated={refreshList}
                selectedAppointment={selectedAppointment}
                clearSelection={clearSelection}
            />
            <AppointmentList
                refreshKey={refreshKey}
                onEdit={handleEdit}
                onDelete={refreshList}
            />
        </>
    );
}

export default AppointmentPage;
