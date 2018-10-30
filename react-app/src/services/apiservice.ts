import {ICategory, IServiceOffer} from '../models/models'

export class ApiService {
    private readonly baseUrl = "/";
    public getCategories = () => {
        return fetch(this.baseUrl + 'api/categories', {
            credentials: "same-origin"
          // headers: {
          //  Authorization: `Bearer ${this.token}`
          // }
        }).then(res => res.json() as unknown as ICategory[])
    }

    public getAllServiceOffers = () => {
        return fetch(this.baseUrl + 'api/all_service_offers', {
            credentials: "same-origin"
        }).then(res => res.json() as unknown as IServiceOffer[])
    }

    public getServiceOffer = (id: number) => {
        return fetch(this.baseUrl + 'api/service_offer/' + id, {
            credentials: "same-origin"
        }).then(res => res.json() as unknown as IServiceOffer)
    }
}