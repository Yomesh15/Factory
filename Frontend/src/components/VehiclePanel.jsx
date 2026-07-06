import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import LookingForDriver from "./LookingForDriver";


const vehicles = [
  {
    id: 1,
    name: "Car",
    image: "https://thfvnext.bing.com/th/id/OIP.EurB14O474OuqHFWEGvGCgHaD7?w=314&h=180&c=7&r=0&o=7&cb=thfvnextfalcon4&dpr=1.3&pid=1.7&rm=3",
    seats: 4,
    distance: "2.1 km",
    arrival: "5 mins away",
    price: "₹189",

    driverName: "Rahul Sharma",
    vehicleNumber: "RJ14 AB 4589",
    vehicleColor: "White",
    vehicleModel: "Maruti Suzuki Dzire",
    driverRating: "4.9 ★",
  },
  {
    id: 2,
    name: "Auto",
    image:
      "data:image/webp;base64,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",
    seats: 3,
    distance: "2.1 km",
    arrival: "4 mins away",
    price: "₹120",

    driverName: "Ranveer Singh",
    vehicleNumber: "RJ25 CH 1919",
    vehicleColor: "Yellow",
    vehicleModel: "Piaggio",
    driverRating: "4.3 ★",
  },
  {
    id: 3,
    name: "Bike",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.yrv-ysQeXPA21Llkam1k1gHaE4?cb=thfvnextfalcon4&rs=1&pid=ImgDetMain&o=7&rm=3",
    seats: 1,
    distance: "2.1 km",
    arrival: "2 mins away",
    price: "₹79",

    driverName: "Gopal Sharma",
    vehicleNumber: "RJ14 ND 8391",
    vehicleColor: "Black",
    vehicleModel: "Splendor",
    driverRating: "4.2 ★",
  },
];



const VehiclePanel = ({ pickup, destination }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showLookingDriver, setShowLookingDriver] = useState(false);
  const navigate = useNavigate()

  const rideConfirm = () => {
    try {

      setTimeout(() => {
        navigate("/waitingfordriver", {
          state: {
            vehicle: selectedVehicle,
            pickup,
            destination,
          },
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1500);
      
      toast.success("Ride booked successfully! 🚖");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!showLookingDriver && selectedVehicle) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [showLookingDriver, selectedVehicle]);


  if (showLookingDriver) {
    return (
      <LookingForDriver
        vehicle={selectedVehicle}
        pickup={pickup}
        destination={destination}
      />
    );
  }

  return (
    <div className="w-full bg-white rounded-t-3xl p-5">
      {selectedVehicle ? (
        <div>
          <button
            onClick={() => {
              setSelectedVehicle(null)
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="mb-4 px-4 py-2 bg-gray-200 rounded-lg"
          >
            ← Back
          </button>

          <img
            src={selectedVehicle.image}
            alt={selectedVehicle.name}
            className="w-48 h-32 object-contain mx-auto"
          />

          <h2 className="text-3xl font-bold text-center mt-4">
            {selectedVehicle.name}
          </h2>

          <div className="mt-8 space-y-4 border rounded-2xl p-5">

            <div className="flex justify-between">
              <span>Driver</span>
              <span className="font-semibold">{selectedVehicle.driverName}</span>
            </div>

            <div className="flex justify-between">
              <span>Vehicle Model</span>
              <span>{selectedVehicle.vehicleModel}</span>
            </div>

            <div className="flex justify-between">
              <span>Vehicle Color</span>
              <span>{selectedVehicle.vehicleColor}</span>
            </div>

            <div className="flex justify-between">
              <span>Number Plate</span>
              <span className="font-semibold">
                {selectedVehicle.vehicleNumber}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Driver Rating</span>
              <span>{selectedVehicle.driverRating}</span>
            </div>

            <div className="flex justify-between">
              <span>Distance</span>
              <span>{selectedVehicle.distance}</span>
            </div>

            <div className="flex justify-between">
              <span>Arrival Time</span>
              <span>{selectedVehicle.arrival}</span>
            </div>

            <div className="flex justify-between">
              <span>Seats</span>
              <span>{selectedVehicle.seats}</span>
            </div>

            <div className="flex justify-between text-xl font-bold pt-2 border-t">
              <span>Fare</span>
              <span>{selectedVehicle.price}</span>
            </div>

          </div>

          <button
            className="w-full mt-6 cursor-pointer bg-black text-white py-3 rounded-xl text-lg"
            onClick={() => {
              rideConfirm()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            Confirm Ride
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Choose a Ride</h2>

          <div className="space-y-5">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => {
                  setSelectedVehicle(vehicle);
                  setShowLookingDriver(true);

                  setTimeout(() => {
                    setShowLookingDriver(false);

                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }, 50);
                  }, 3000);
                }}
                className="flex items-center justify-between border rounded-2xl p-4 cursor-pointer hover:border-black hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-20 h-14 object-contain"
                  />

                  <div>
                    <h3 className="text-lg font-semibold">
                      {vehicle.name}
                      <span className="text-sm font-normal text-gray-500">
                        {" "}
                        • {vehicle.seats} Seats
                      </span>
                    </h3>

                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <IoLocationSharp />
                      <span>{vehicle.distance}</span>
                    </div>

                    <p className="text-sm text-gray-500">
                      {vehicle.arrival}
                    </p>
                  </div>
                </div>

                <h4 className="text-xl font-bold">{vehicle.price}</h4>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VehiclePanel;