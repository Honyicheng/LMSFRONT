 const TOKENKEY= '"token"'; // 定义token的存储键名
export const getToken = () => {
    return localStorage.getItem(TOKENKEY); // 从本地存储中获取token 
}
export const setToken = (token) => {
    localStorage.setItem(TOKENKEY, token); // 将token存储到本地存储
}
export const clearToken = () => {
    localStorage.removeItem(TOKENKEY); // 清除本地存储中的token
}   