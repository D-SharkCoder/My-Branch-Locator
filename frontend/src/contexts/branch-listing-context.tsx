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
      purpose: "new"
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
    
    const [branches, setBranch] = useState<Branch[]>([
        {
          name: "North Caloocan",
          manager: "Mark Anthony Santos",
          address: "Phase 4, Stall 1 Langit Rd, Caloocan, 1428 Metro Manila",
          phone: "+639090688481",
          lat: 14.77868279164669,
          lng: 121.0439676877257,
          status: true
        },
        {
          name: "Bagumbong Caloocan",
          manager: "Mark Angelo Santos",
          address: "Rainbow Village 5 Phase 2, Blk38 Lt4, beside Alfamart Rainbow Village, Rainbow Ave, Bagumbong, Caloocan, 1421",
          phone: "+639670878808",
          lat: 14.750896711557004,
          lng: 121.03179981523148,
          status: true
        },
        {
          name: "Nova Plaza Mall",
          manager: "Mark Adrian Santos",
          address: "3rd Floor, Nova Plaza Mall, Quirino Hwy, Novaliches Proper, Quezon City, 1123 Metro Manila",
          phone: "+639670878801",
          lat: 14.722181516635802,
          lng: 121.04862445519773,
          status: true
        },
        {
          name: "Talipapa, Quezon City",
          manager: "Sheena Mae Banastas",
          address: "Lot 21, Blk 5 Santa Sabina St, Quezon City, 1116 Metro Manila",
          phone: "+639176316511",
          lat: 14.690634365817415,
          lng: 121.02957004445221,
          status: true
        },
    
    ]);

    return (
        <BranchListContext.Provider value={{ branches, setBranch, branchModal, setBranchModal, filter, setFilter, mapCoordinates, setCoordinates, mapModal, setMapModal }}>
            {children}
        </BranchListContext.Provider>
    )
}