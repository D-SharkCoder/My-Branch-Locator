import React, { createContext, useState } from "react";

import type {ReactNode} from "react";
import type { Branch } from "../types/branch";
import type { ModalBranch } from "../types/branch";
import type { Filter } from "../types/filter";
import type { MapCoordinate } from "../types/map";
type Props = {
  children: ReactNode;
};

type BranchListContextType = {
  branches: Branch[];
  setBranch: React.Dispatch<React.SetStateAction<Branch[]>>;
  branchModal: ModalBranch;
  setBranchModal: React.Dispatch<React.SetStateAction<ModalBranch>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  mapCoordinates: MapCoordinate;
  setCoordinates: React.Dispatch<React.SetStateAction<MapCoordinate>>;
  mapModal: boolean;
  setMapModal: React.Dispatch<React.SetStateAction<boolean>>;
  getBranches: () => void;
  upsertBranch: () => void;
};

export const BranchListContext = createContext<BranchListContextType | null>(null);

export default function BranchListContextProvider({children}: Props) {
    const [branchModal, setBranchModal] = useState<ModalBranch>({
      name: "",
      manager: "",
      address: "",
      phone: "",
      lat: 0,
      lng: 0,
      status: true,
      isOpen: false,
      purpose: "new",
      isLoading: false
    });
    const [mapModal, setMapModal] = useState<boolean>(false);
    const [filter, setFilter] = useState<Filter>({
      text: '',
      for: 'any',
      sort: 'asc',
      status: true,
    });
    const [mapCoordinates, setCoordinates] = useState<MapCoordinate>({
      lat: 0,
      lng: 0
    });
    
    const [branches, setBranch] = useState<Branch[]>([]);

    const getBranches = () :void => {
      fetch('/api/test')
          .then(res => {
            console.log(res)
          })
          .catch(err => console.error('Fetch error:', err));
    }

    const upsertBranch = () :void => {
      fetch('/api/test')
          .then(res => {
            console.log(res)
            getBranches()
          })
          .catch(err => console.error('Fetch error:', err));
    }

    return (
        <BranchListContext.Provider value={{ branches, setBranch, branchModal, setBranchModal, filter, setFilter, mapCoordinates, setCoordinates, mapModal, setMapModal, getBranches, upsertBranch }}>
            {children}
        </BranchListContext.Provider>
    )
}