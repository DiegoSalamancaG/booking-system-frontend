import { useRef, useState } from "react";
import BarberForm from "../../components/barbers/barberForm";
import BarberList from "../../components/barbers/barberList";

function BarberPage() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedBarber, setSelectedBarber] = useState(null);
    const formRef = useRef();

    const refreshList = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const clearSelection = () => {
        setSelectedBarber(null);
    };

    const handleEdit = (barber) => {
        setSelectedBarber(barber);
        formRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    return (
        <>
            <h2 ref={formRef}>Barber Management</h2>
            <BarberForm
                onBarberCreated={refreshList}
                selectedBarber={selectedBarber}
                clearSelection={clearSelection}
            />
            <BarberList
                refreshKey={refreshKey}
                onEdit={handleEdit}
                onDelete={refreshList}
            />
        </>
    );
}

export default BarberPage;
