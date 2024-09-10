import axios from "axios";
import { setup } from 'axios-cache-adapter'

const api = setup({
    baseURL: 'https://api-shiningmerit.onrender.com',
  
    cache: {
      maxAge: 18 * 60 * 60 * 1000 // 18 hours
    }
})

const apiClientGet = (url, cachable = false) =>{
    
    if(!cachable){  
        return api.get(url, { cache: { maxAge : 0 } })
    }
    
    return api.get(url)

}

const apiClientPost = (url, body) =>{
    return axios.post(`https://api-shiningmerit.onrender.com${url}`, body)
}

const httpService = {
    get : apiClientGet,
    post : apiClientPost,
    put : axios.put,
    delete : axios.delete,
}

 
export default httpService;