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