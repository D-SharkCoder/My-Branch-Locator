import React, { useContext } from "react";
import { BranchListContext } from "../contexts/branch-listing-context";
import Modal from "./common/Modal";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const LocationModal: React.FC = () => {
    const context = useContext(BranchListContext)
    if (!context) {
        throw new Error("LocationModal must be used within a BranchListContextProvider");
    }
    const {mapCoordinates, setCoordinates, mapModal, setMapModal} = context;
    const closeMapModal = () => {
        setMapModal(false)
        setCoordinates({
            lat: 0,
            lng: 0
        })
    }
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "", // Or use a direct string
        // googleMapsApiKey: "AIzaSyDAGGJtITWyco5g5t4mFeTJcWegyyy50eQ", // Or use a direct string
    });
    if (mapCoordinates.lat == 0 && mapCoordinates.lng == 0) {
        return;
    }
    return (
        <>
            {isLoaded ? 
                <Modal title="Branch Location" isOpen={mapModal} onClose={()=>closeMapModal()}>
                    <GoogleMap mapContainerStyle={containerStyle} center={mapCoordinates} zoom={14}>
                        <Marker position={mapCoordinates} />
                    </GoogleMap>
                </Modal>
            : ''}
        </>
    )

    


//   return (
//   );
};

export default LocationModal;
