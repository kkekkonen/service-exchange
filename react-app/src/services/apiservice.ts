import {ICategory} from '../models/models'

export class ApiService {
    private readonly baseUrl = "/";
    public getCategories = () => {
        return fetch(this.baseUrl + 'api/categories', {
          // headers: {
          //  Authorization: `Bearer ${this.token}`
          // }
        }).then(res => res.json() as unknown as ICategory[])
    }
}