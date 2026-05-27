import { useRef, useState } from "react";
import ServicesForm from "../../components/services/servicesForm";
import ServicesList from "../../components/services/servicesList";

function ServicesPage() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedService, setSelectedService] = useState(null);
    const formRef = useRef();

    const refreshList = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const clearSelection = () => {
        setSelectedService(null);
    };

    const handleEdit = (service) => {
        setSelectedService(service);
        formRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    return (
        <>
            <h2 ref={formRef}>Gestion de Servicios</h2>
            <ServicesForm
                onServiceCreated={refreshList}
                selectedService={selectedService}
                clearSelection={clearSelection}
            />
            <ServicesList
                refreshKey={refreshKey}
                onEdit={handleEdit}
                onDelete={refreshList}
            />
        </>
    );
}

export default ServicesPage;
