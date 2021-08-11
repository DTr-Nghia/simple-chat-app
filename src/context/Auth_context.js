import React, {useEffect,useState,useContext} from 'react'
import {auth} from '../firebase'
import firebase from "firebase/app"
import {useHistory} from 'react-router-dom'


const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState()
    const [loading,setLoading] = useState(true)
    const history = useHistory()
    // const [error,setError] = useState('')
    // console.log(user)
    const loginWithGoogle = () => {
        return auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    }
    const login = (email,password) => {
        return auth.signInWithEmailAndPassword(email,password)
    }
    const logout = () => {
        return auth.signOut()
    }
    const signup = (email,password) => {
        return auth.createUserWithEmailAndPassword(email,password)
    }
    const resetEmail = (email) => {
        return auth.sendPasswordResetEmail(email)
    }
    useEffect(() =>{
       const unsub = auth.onAuthStateChanged(user => {
           if(user){
                setUser(user)
                history.push('/chat')
            }
            setLoading(false)
        })
        return unsub
    },[user, history])
    
    const value = {
        user,
        loginWithGoogle,
        login,
        logout,
        signup,
        resetEmail,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => { 
    return useContext(AuthContext)
}