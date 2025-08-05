import React, { useContext } from "react";
import Input from "./common/Input";
import Select from "./common/Select";
import Button from "./common/Button";
import { FaPlus } from "react-icons/fa";
import { BranchListContext } from "../contexts/branch-listing-context";
import Switch from "./common/Switch";
import type { Filter } from "../types/filter";

const SearchSection: React.FC = () => {
    const context = useContext(BranchListContext)
    if (!context) {
        throw new Error("BranchListContext must be used inside a BranchListContextProvider");
    }
    const {setBranchModal, filter, setFilter} = context;
    const openBranchModal = () => {
        setBranchModal(prev => ({
            ...prev,
            isOpen: true,
            purpose: "new",
        }));
    };

    const handleChangefilter = (key: keyof Filter, value: string | number | boolean) => {
        setFilter(prev => ({ ...prev, [key]: value }));
    };
    
    return (
        <div className="m-6 flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap justify-center gap-2">
                <div>
                    <Input type="text" placeholder="Search" name="search" value={filter?.text} onChange={(e) => handleChangefilter('text', e.target.value)}></Input>
                </div>
                <div className="flex gap-2 items-center">
                    By: 
                    <Select value={filter.for} onChange={(e) => handleChangefilter('for', e.target.value)}>
                        <option value="name">Name</option>
                        <option value="manager">Manager</option>
                        <option value="location">Location</option>
                        <option value="phone">Phone</option>
                    </Select>
                </div>
                <div className="flex gap-2 items-center">
                    Sort:
                    <Select value={filter.sort} onChange={(e) => handleChangefilter('sort', e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </Select>
                </div>
                <div className="flex gap-2 items-center">
                    Status:
                    <Switch checked={filter.status} onChange={(value :boolean) => handleChangefilter('status', value)}></Switch>
                </div>
                <div className="flex md:hidden">
                    <Button color="primary" onClick={() => openBranchModal()}><FaPlus></FaPlus></Button>
                </div>
            </div>
            <div className="hidden md:flex">
                <Button color="primary" onClick={() => openBranchModal()}><FaPlus></FaPlus></Button>
            </div>
        </div>
    )
}

export default SearchSection;