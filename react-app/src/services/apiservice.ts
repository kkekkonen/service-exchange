import {ICategory, IService, IServiceOffer, IServiceRequest, IUserProfile, IServiceRequestOffer} from '../models/models'

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

    public getAllServiceRequests = () => {
        return fetch(this.baseUrl + 'api/all_requests', {
            credentials: "same-origin"
        }).then(res => res.json() as unknown as IServiceRequest[])
    }

    public getMyServiceOffers = () => {
        return fetch(this.baseUrl + 'api/my_service_offers', {
            credentials: "same-origin"
        }).then(res => res.json() as unknown as IServiceOffer[])
    }

    public getMyConsumerServices = () => {
        return fetch(this.baseUrl + 'api/my_consumer_services', {
            credentials: "same-origin"
        }).then(res => res.json() as unknown as IService[])
    }

    public getMyProviderServices = () => {
        return fetch(this.baseUrl + 'api/my_provider_services', {
            credentials: "same-origin"
        }).then(res => res.json() as unknown as IService[])
    }

    public getServiceOffer = (id: number) => {
        return fetch(this.baseUrl + 'api/service_offer/' + id, {
            credentials: "same-origin"
        }).then(res => res.json() as unknown as IServiceOffer)
    }

    public getServiceRequest = (id: number) => {
        return fetch(this.baseUrl + 'api/request/' + id, {
            credentials: "same-origin"
        }).then(res => res.json() as unknown as IServiceRequest)
    }

    public getMyRequests = () => {
        return fetch(this.baseUrl + 'api/my_requests', {
            credentials: "same-origin"
        }).then(res => res.json() as unknown as IServiceRequest[])
    }

    public getLoggedUserProfile = () => {
        return fetch(this.baseUrl + 'api/logged_user_profile', {
            credentials: "same-origin"
        }).then(res => res.json() as unknown as IUserProfile)
    }

    public getUserProfile = (id: number) => {
        return fetch(this.baseUrl + 'api/user_profile/' + id, {
            credentials: "same-origin"
        }).then(res => res.json() as unknown as IUserProfile)
    }

    public getOffersForRequest = (id: number) => {
        return fetch(this.baseUrl + 'api/get_request_offers/' + id, {
            credentials: "same-origin"
        }).then(res => res.json() as unknown as IServiceRequestOffer[])
    }

    public logoutLoggedUser = () => {
        return fetch(this.baseUrl + 'logout', {
            credentials: "same-origin"
        }).then(res => {
            if (res) {
                window.location.replace(this.baseUrl);
            }
        }).catch(
            error => console.log(error)
        )

    }

    public createServiceRequest = (
        title: string,
        categoryId: number,
        minPrice: number,
        maxPrice: number,
        description: string,
        zipCode: number) => {
        return fetch(this.baseUrl + 'api/create_request', {
            credentials: "same-origin",
            method: 'post',
            body: JSON.stringify({
                "title": title,
                "category_id": categoryId,
                "minPrice": minPrice,
                "maxPrice": maxPrice,
                "description": description,
                "zipcode": zipCode
            })
        }).then(res => res.ok)
    }
}
