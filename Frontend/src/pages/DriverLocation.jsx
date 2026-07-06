import { useLocation } from "react-router-dom";

const DriverLocation = () => {
    const { state } = useLocation();

    const { vehicle, pickup, destination } = state || {};

    return (
        <div>
            driver
        </div>
    );
};

export default DriverLocation;