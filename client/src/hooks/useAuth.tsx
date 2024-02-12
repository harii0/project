
const useAuth = () => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    const setAuth = (token: string, user: string) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', user)
    }
    
    const removeAuth = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
    
    return { token, user, setAuth, removeAuth }
}

export default useAuth