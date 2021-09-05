export interface IAddUser {
    userName: string,
    displayName: string,
    password: string,
    role: string,
}

export interface IEditUser {
    id?: number,
    userName: string,
    displayName: string,
    state: string,
    role: string,
}

export interface IListUser {
    id: number,
    userName: string,
    displayName: string,
    password: string,
    state: string,
    role: string,
    createdAt: any,
    updatedAt: any
}

export interface IEditPassword {
    password: string,
    confirmPassword: string,
}

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    PUBLISHER = "PUBLISHER",
}

export enum State {
    BANNED = "BANNED",
    ACTIVATED = "ACTIVATED",
    NOT_VERIFIED = "NOT_VERIFIED",
    VERIFIED = "VERIFIED",
}