import React, { useContext, useState, useEffect, useRef } from "react";
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
    const {setBranchModal, filter, setFilter, defaultFilter, getBranches} = context;
    const openBranchModal = () => {
        setBranchModal(prev => ({
            ...prev,
            id: null,
            isOpen: true,
            purpose: "new",
        }));
    };

    const [debouncedFilter, setDebouncedFilter] = useState<Filter>(defaultFilter);

    const didMountFilterRef = useRef(false);
    useEffect(() => {
        if (!didMountFilterRef.current) {
            didMountFilterRef.current = true;
            return;
        }
        const timer = setTimeout(() => {
            setDebouncedFilter(filter);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [filter]);
    
    const didMountDebouncedRef = useRef(false);
    useEffect(() => {
        if (debouncedFilter) {
            if (!didMountDebouncedRef.current) {
                didMountDebouncedRef.current = true;
                return;
            }
            getBranches()
        }
    }, [debouncedFilter]);


    const handleChangefilter = (key: keyof Filter, value: string | number | boolean) => {
        setFilter(prev => ({ ...prev, [key]: value }));
    };
    
    return (
        <div className="flex flex-wrap items-center justify-between m-6">
            <div className="flex flex-wrap justify-center gap-2">
                <div>
                    <Input type="text" placeholder="Search" name="search" value={filter?.text} onChange={(e) => handleChangefilter('text', e.target.value)}></Input>
                </div>
                <div className="flex items-center gap-2">
                    By: 
                    <Select value={filter.for} onChange={(e) => handleChangefilter('for', e.target.value)}>
                        <option value="name">Name</option>
                        <option value="manager">Manager</option>
                        <option value="address">Address</option>
                        <option value="phone">Phone</option>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    Sort:
                    <Select value={filter.sort} onChange={(e) => handleChangefilter('sort', e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
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