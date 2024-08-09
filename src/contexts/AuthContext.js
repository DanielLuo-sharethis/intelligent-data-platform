import React , {useContext, useEffect, useState} from 'react';
import {auth} from '../firebase';



const AuthContext = React.createContext();


export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        return auth.signOut()
    }
    useEffect(() => {
         // set the current user, when we call auth.createUserWithEmailAndPassword, it call the following function
         // it return a method that we can use to unsubscribe
         // firebase set the local storage/token for us
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
            
        })

        return unsubscribe
    },[])

   

  

    const value = {
        currentUser,
        signup,
        login,
        logout
    }
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}