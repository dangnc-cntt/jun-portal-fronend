export interface IAddUser {
    id: number
    username: string,
    fullName: string,
    password: string,
    email: string
    phone: string
    address: string
    gender: string
}

export interface IListUser {
    id: number,
    username: string,
    fullName: string,
    password: string,
    state: string,
    role: string,
    createdAt: any,
    updatedAt: any
}


export enum State {
    BANNED = "BANNED",
    ACTIVATED = "ACTIVATED",
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}