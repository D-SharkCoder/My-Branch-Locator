import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

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
  defaultBranchModal: ModalBranch;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  mapCoordinates: MapCoordinate;
  setCoordinates: React.Dispatch<React.SetStateAction<MapCoordinate>>;
  mapModal: boolean;
  setMapModal: React.Dispatch<React.SetStateAction<boolean>>;
  validation: validationItem[];
  setValidation: React.Dispatch<React.SetStateAction<validationItem[]>>;
  getBranches: () => void;
  createNewBranch: () => void;
  updateBranch: () => void;
  deleteBranch: (id :number) => void;
};

type validationItem = {
    key: string,
    error: string
}


type HttpRequest = {
  url :string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body? :any
}

export const defaultBranchModal: ModalBranch = {
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
}

const defaultMapCoordinates: MapCoordinate = {
  lat: 0,
  lng: 0
}

const defaultFilter :Filter = {
  text: '',
  for: 'any',
  sort: 'asc',
  status: true,
}
export const BranchListContext = createContext<BranchListContextType | null>(null);

export default function BranchListContextProvider({children}: Props) {
    const [branchModal, setBranchModal] = useState<ModalBranch>(defaultBranchModal);
    const [mapModal, setMapModal] = useState<boolean>(false);
    const [filter, setFilter] = useState<Filter>(defaultFilter);
    const [mapCoordinates, setCoordinates] = useState<MapCoordinate>(defaultMapCoordinates);
    const [branches, setBranch] = useState<Branch[]>([]);
    const [validation, setValidation] = useState<validationItem[]>([])

    function parseLaravelValidationErrors(errorResponse: any): validationItem[] {
      if (!errorResponse || typeof errorResponse !== "object" || !errorResponse.errors) {
        return [];
      }
      const errors = errorResponse.errors;
      return Object.entries(errors).map(([key, messages]) => ({
        key,
        error: Array.isArray(messages) && messages.length > 0 ? messages[0] : "Invalid input",
      }));
    }

    const getBranches = async () :Promise<void> => {
      const notif = toast.loading("Loading branches...")
      await processRequest({
        method: "GET",
        url: "/api/branches"
      })
      .then(res => res.json())
      .then(data => {
        toast.success("Done", {id: notif})
        setBranch(data)
      })
      .catch(err => console.error('Fetch error:', err));
    }

    const processRequest = async (param :HttpRequest) :Promise<Response> => {
      return await fetch(param.url, {
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json"
        },
        method: param.method,
        body: param.body
      })
    }

    const createNewBranch = async () :Promise<void> => {
      if (branchModal.isLoading) return;
      setBranchModal(prev => ({...prev, isLoading: true}))
      const notif = toast.loading("Creating new branch...")
      await processRequest({
        method: "POST",
        url: "/api/branches",
        body: JSON.stringify({
          ...branchModal
        })
      })
      .then(async res => {
        const data = await res.json();
        if (!res.ok && data.errors) {
          const validationErrors = parseLaravelValidationErrors(data);
          setValidation(validationErrors);
          setBranchModal(prev => ({...prev, isLoading: false}))
          toast.error("Failed to create new branch", {id: notif});
          return
        }
        getBranches()
        toast.success("Successfully created new branch", {id: notif});
        setValidation([])
        setBranchModal({...defaultBranchModal, isLoading: false, isOpen: false})
      })
      .catch(err => console.error('Fetch error:', err));
    }

    const updateBranch = async () :Promise<void> => {
      if (branchModal.isLoading) return;
      const notif = toast.loading("Updating the branch...")
      setBranchModal(prev => ({...prev, isLoading: true}))
      await processRequest({
        method: "PUT",
        url: `/api/branches/${branchModal.id}`,
        body: JSON.stringify({
          ...branchModal
        })
      })
      .then(async res => {
        const data = await res.json();
        if (!res.ok && data.errors) {
          const validationErrors = parseLaravelValidationErrors(data);
          setValidation(validationErrors);
          setBranchModal({...defaultBranchModal, isLoading: false, isOpen: false})
          toast.error("Failed to update branch", {id: notif});
          return
        }
        getBranches()
        toast.success("Successfully updated branch", {id: notif});
        setValidation([]);
        setBranchModal({...defaultBranchModal, isLoading: false, isOpen: false})
      })
      .catch(err => console.error('Fetch error:', err));
    }

    const deleteBranch = async (id: number) :Promise<void> => {
      const notif = toast.loading("Deleting the branch...")
      processRequest({
        method: "DELETE",
        url: `api/branches/${id}`
      })
      .then(async (res) => {
        await getBranches()
        console.log(res)
        if (res.status == 500) {
          return toast.error("Failed to delete branch", {id: notif});
        }
        toast.success("Successfully delete branch", {id: notif});
      })
      .catch(err => console.error('Fetch error:', err))
    }

    return (
        <BranchListContext.Provider value={{ branches, setBranch, branchModal, setBranchModal, defaultBranchModal, filter, setFilter, mapCoordinates, setCoordinates, mapModal, setMapModal, validation, setValidation, getBranches, createNewBranch, updateBranch, deleteBranch }}>
            {children}
        </BranchListContext.Provider>
    )
}