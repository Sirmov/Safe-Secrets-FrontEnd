export interface Auditable {
    _createdOn: number;
    _updatedOn?: number;
}

export interface Identifiable {
    _id: string;
}

export interface Possession {
    _ownerId: string;
}

export interface CollectionObject extends Identifiable, Auditable {}

export interface CollectionPossession extends CollectionObject, Possession {}
