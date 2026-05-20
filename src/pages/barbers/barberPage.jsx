import { useState } from "react";
import BarberForm from "../../components/barbers/barberForm";
import BarberList from "../../components/barbers/barberList";

function BarberPage() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedBarber, setSelectedBarber ] = useState(null);

    const refreshList = () =>{
        setRefreshKey((refreshKey) => refreshKey + 1);
    }

    return (
        <>
            <h2>Barber Management</h2>
            <BarberForm onBarberCreated={refreshList}
                selectedBarber={selectedBarber}
                clearSelection={() => setSelectedBarber(null)}
            />
            <BarberList refreshKey={refreshKey}
                onEdit={setSelectedBarber}
                onDelete={refreshList}
            />
        </>
    )
}

export default BarberPage;