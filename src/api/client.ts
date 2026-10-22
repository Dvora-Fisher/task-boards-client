const API_URL = import.meta.env.VITE_API_URL
const TOKEN_KEY = 'accessToken'
export const tokenStore = {
    get() {
        return localStorage.getItem(TOKEN_KEY)
    },
    set(token:string){
        localStorage.setItem(TOKEN_KEY,token)
    },    
    clear(){
        localStorage.removeItem(TOKEN_KEY)
    }

}