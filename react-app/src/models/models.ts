export interface ICategory
{
    id: number,
    category: string
}

export interface IServiceOffer
{
    id: number,
    provider: string,
    providerid: number,
    zipcode: number,
    title: string,
    timestamp: string,
    description: string,
    minPrice: number,
    maxPrice: number,
    category: string,
    categoryid: number
}

export interface IServiceRequest
{
    id: number,
    title: string,
    minPrice: number,
    maxPrice: number,
    category: string,
    categoryid: number,
    zipcode: number,
    timestamp: string,
    description: string,
    consumer: string,
    consumerid: number,
    isOwner: boolean
    pending: number,
}

export interface IUserProfile
{
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    currentPassword: string,
    newPassword: string,
    newPasswordAgain: string,
}

export interface IServiceRequestOffer
{
    id: number,
    price: number,
    status: string,
    timestamp: string,
    description: string,
    requestId: number,
    provider: string,
    providerid: number
}

export interface IService
{
    id: number,
    provider: string,
    providerid: number,
    consumer: string,
    consumerid: number,
    status: string,
    zipcode: number,
    title: string,
    timestamp: string,
    description: string,
    price: number,
    category: string,
    rating: number
}
