export interface ICategory
{
    id: number,
    category: string
}

export interface IServiceOffer
{
    id: number,
    provider: string,
    zipcode: number,
    title: string,
    timestamp: string,
    description: string,
    minPrice: number,
    maxPrice: number,
    category: string
}

export interface IServiceRequest
{
    id: number,
    title: string,
    minPrice: number,
    maxPrice: number,
    category: string,
    zipcode: number,
    timestamp: string,
    description: string,
    consumer: string,
    isOwner: boolean

}

export interface IUserProfile
{
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string
}

export interface IService
{
    id: number,
    producer: string,
    consumer: string,
    status: string,
    zipcode: number,
    title: string,
    timestamp: string,
    description: string,
    minPrice: number,
    maxPrice: number,
    category: string,
    rating: number
}