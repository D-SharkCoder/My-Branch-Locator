import type { MapCoordinate } from "./map"

export type Branch = MapCoordinate & {
    name: string,
    manager: string,
    address: string,
    phone: string,
    status: boolean
}

export type ModalBranch = Branch & {
    isOpen: boolean,
    purpose: "new" | "update"
}