import type { MapCoordinate } from "./map"

export type Branch = MapCoordinate & {
    id?: number | null,
    name: string,
    manager: string,
    address: string,
    phone: string,
    status: boolean
}

export type ModalBranch = Branch & {
    id?: number | null
    isOpen: boolean,
    purpose: "new" | "update",
    isLoading: boolean
}