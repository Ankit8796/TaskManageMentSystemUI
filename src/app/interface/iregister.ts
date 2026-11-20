export interface Iregister {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string
}

export interface IreturnMessage
{
    message?:string,
    success:string,
    token?:string
}

export interface Ilogin
{
    email:string,
    password:string
}
