import React, { useEffect } from "react";
import Card from './common/Card';
import Button from './common/Button';
import { FaTrash, FaEdit, FaMap, FaPhone, FaLocationArrow } from 'react-icons/fa';
import { FaCircleCheck, FaPerson } from 'react-icons/fa6';
import { useContext } from 'react';
import {BranchListContext} from '../contexts/branch-listing-context';
import type { Branch } from '../types/branch';

const BranchGridSection: React.FC = () => {
    
  const context = useContext(BranchListContext)  
  if (!context) {
    throw new Error("BranchListContext must be used inside a BranchListContextProvider");
  }
  const { branches, filter, setBranchModal, setCoordinates, setMapModal, getBranches, deleteBranch } = context;

  const filteredBranches = branches.length > 0 ? branches.filter(
    (branch) => branch.status == (filter.status)
  ) : [];

  const openBranchModal = (branch: Branch) => {
    setBranchModal(prev => ({
      ...prev,
      ...branch,
      isOpen: true,
      purpose: "update",
      isLoading: false
    }));
  };

  const selectBranchMap = (latitude :number, longitude :number) => {
    setCoordinates({
      lat: latitude,
      lng: longitude
    });
    setMapModal(true)
  }

  const handleDelete = (branch: Branch) => {
    if (branch.id) {
      deleteBranch(branch.id)
    }
  }
  useEffect(() => {
    getBranches()
  }
  ,[]);

    return (
        <div className='flex flex-wrap justify-center gap-5' data-testid="BranchGridListing">
            {filteredBranches.length > 0 ? 
              filteredBranches.map((branch :Branch, index :number)=>{
                return <Card className='w-[300px] flex flex-col' key={index} data-testid="BranchCard">
                <div className='flex flex-col flex-1'>
                  <h1 className='mb-2 text-xl font-bold'>{branch.name}</h1>
                  <div className='flex flex-col flex-grow gap-1 text-sm'>
                    <div className='flex flex-row'>
                      <div className='flex w-1/6 mt-1 text-xs align-middle'><FaPerson/></div>
                      <p className='w-5/6'>{branch.manager}</p>
                    </div>
                    <div className='flex flex-row'>
                      <div className='flex w-1/6 mt-1 text-xs align-middle'><FaPhone/>:</div>
                      <p className='w-5/6'>{branch.phone}</p>
                    </div>
                    <div className='flex flex-row'>
                      <div className='flex w-1/6 mt-1 text-xs align-middle'><FaLocationArrow/></div>
                      <p className='w-5/6'>{branch.address}</p>
                    </div>
                    <div className='flex flex-row'>
                      <div className='flex w-1/6 mt-1 text-xs align-middle'><FaMap/></div>
                      <p className='w-5/6'>{branch.lat}, {branch.lng}</p>
                    </div>
                    <div className="flex flex-row">
                      <div className='flex w-1/6 mt-1 text-xs align-middle'><FaCircleCheck/></div>
                      <p className={branch.status ? 'text-green-500' : 'text-red-500'}>{branch.status ? 'Active' : 'Inactive'}</p>
                    </div>
                  </div>
                </div>
                <div className='flex justify-end gap-1 mt-2'>
                  <Button color={'primary'} disabled={branch.lat == 0 && branch.lng == 0} onClick={() => selectBranchMap(branch.lat, branch.lng)}><FaMap/></Button>
                  <Button color={'secondary'} onClick={() => openBranchModal(branch)} ><FaEdit/></Button>
                  <Button color={'danger'} onClick={() => handleDelete(branch)}><FaTrash/></Button>
                </div>
              </Card>
            }) : 
            'No branches'
            }
        </div>
    )
}

export default BranchGridSection;