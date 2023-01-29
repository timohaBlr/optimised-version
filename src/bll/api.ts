import axios from "axios";

export const instance = axios.create({
    withCredentials: false,
    baseURL: 'https://reqres.in/api/products',
    timeout: 1000,
});


export const fetching_API = {
    // variable param for more functionality
    getData: function (per_page: number, page: number) {
        return instance.get(`/?per_page=${per_page}&page=${page}`)
            .then(response => response.data)
         // errors handling for developers
            .catch(err => {
               throw err
            })
            .finally()
    },
    getCurrentItem: function (id: number) {
        return instance.get(`/?id=${id}`)
            .then(response => response.data)
         // errors handling for developers
            .catch(err => {
               throw err
            })
            .finally()
    },
}
