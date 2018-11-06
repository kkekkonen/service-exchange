import {ICategory, IServiceOffer, IServiceRequest, IUserProfile} from '../models/models'

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

    public createServiceRequest = (title: string) => {
        return fetch(this.baseUrl + 'api/create_request', {
            credentials: "same-origin",
            method: 'post',
            body: JSON.stringify({
                "title": title,
                "category_id": 1,
                "minPrice": 1,
                "maxPrice": 2,
                "description": "test",
                "zipcode": 12345
            })
        }).then(res => res.ok)
    }
}