import { useState } from "react";
import ServicesForm from "../../components/services/servicesForm";
import ServicesList from "../../components/services/servicesList";

function ServicesPage() {
    const [ refreshKey, setRefreshKey ] = useState(0);
    const [ selectedService, setSelectedService ] = useState(null);

    const refreshList = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    }

    return(
        <>
            <h2>Gestión de Servicios</h2>
            <ServicesForm onServiceCreated={refreshList} 
                selectedService={selectedService} 
            />
            <ServicesList refreshKey={refreshKey}
                onEdit={setSelectedService} 
                onDelete={refreshList}        
            />
        </>
    )
}

export default ServicesPage;