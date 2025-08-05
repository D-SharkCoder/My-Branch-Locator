import React, { useContext, useState } from "react";
import Modal from "./common/Modal";
import { BranchListContext } from "../contexts/branch-listing-context";
import Input from "./common/Input";
import type { ModalBranch } from "../types/branch";
import Button from "./common/Button";
import Switch from "./common/Switch";

const BranchModal: React.FC = () => {
    const context = useContext(BranchListContext)
    if (!context) {
        throw new Error("BranchListContext must be used inside a BranchListContextProvider");
    }
    const { branchModal, setBranchModal, validation, createNewBranch, setValidation, updateBranch, defaultBranchModal } = context;

    const closeModal = () => {
        setBranchModal({...defaultBranchModal, isOpen: false, isLoading: false });
        setValidation([]);
    };

    const handleOnChange = (key: keyof ModalBranch, value: string | number | boolean) => {
        setBranchModal(prev => ({ ...prev, [key]: value }));
    };


    return (
        <Modal isOpen={branchModal?.isOpen} onClose={() => closeModal()} title={branchModal?.purpose == 'new' ? 'New branch' : 'Edit branch'}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-1">
                    <label htmlFor="name">Name:</label>
                    <Input type="text" placeholder="Name" id="name" value={branchModal?.name} onChange={(e) => handleOnChange("name", e.target.value)}></Input>
                    <p className="italic text-sm text-red-400">{validation.find((val) => val.key == 'name')?.error}</p>
                </div>
                <div className="mb-1">
                    <label htmlFor="manager">Manager:</label>
                    <Input type="text" placeholder="Manager" id="manager" value={branchModal?.manager} onChange={(e) => handleOnChange("manager", e.target.value)}></Input>
                    <p className="italic text-sm text-red-400">{validation.find((val) => val.key == 'manager')?.error}</p>
                </div>
                <div className="mb-1">
                    <label htmlFor="phone">Phone:</label>
                    <Input type="text" placeholder="Phone" id="phone" value={branchModal?.phone} onChange={(e) => handleOnChange("phone", e.target.value)}></Input>
                    <p className="italic text-sm text-red-400">{validation.find((val) => val.key == 'phone')?.error}</p>
                </div>
                <div className="mb-1">
                    <label htmlFor="address">Address:</label>
                    <Input type="text" placeholder="Address" id="address" value={branchModal?.address} onChange={(e) => handleOnChange("address", e.target.value)}></Input>
                    <p className="italic text-sm text-red-400">{validation.find((val) => val.key == 'address')?.error}</p>
                </div>
                <div className="mb-1">
                    <label htmlFor="latitude">Latitude:</label>
                    <Input type="text" placeholder="latitude" id="latitude" value={branchModal?.lat} onChange={(e) => handleOnChange("lat", e.target.value)}></Input>
                    <p className="italic text-sm text-red-400">{validation.find((val) => val.key == 'lat')?.error}</p>
                </div>
                <div className="mb-1">
                    <label htmlFor="longitude">Longitude:</label>
                    <Input type="text" placeholder="longitude" id="longitude" value={branchModal?.lng} onChange={(e) => handleOnChange("lng", e.target.value)}></Input>
                    <p className="italic text-sm text-red-400">{validation.find((val) => val.key == 'lng')?.error}</p>
                </div>
                <div className="mb-1">
                    <label htmlFor="longitude">Status:</label>
                    <Switch checked={branchModal.status} onChange={(value :boolean) => handleOnChange('status', value)}></Switch>
                </div>

                <div className="mt-4 text-right flex gap-2 justify-end">
                    <Button color="success" disabled={branchModal.isLoading} onClick={() => branchModal.purpose == 'new' ? createNewBranch() : updateBranch()}>Submit</Button>
                    <Button color="primary" onClick={() => closeModal()}>Cancel</Button>
                </div>
            </form>
        </Modal>
    )
}

export default BranchModal;