import React , {useContext, useEffect, useState} from 'react';
import {auth} from '../firebase';



const AuthContext = React.createContext();


export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const organization = currentUser ? currentUser.displayName : '';
    const email = currentUser ? currentUser.email : '';


    useEffect(() => {
        if(currentUser){
            console.log("currentUser", currentUser);
            console.log("currentUser's Organization", organization);
            console.log("currentUser's Email", email);
        }
        
    
       }, [currentUser]);
    

    function signup(email, password, organization) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                return user.updateProfile({ displayName: organization })
                .then(() => {
                  // Ensure the currentUser is updated after the profile update
                  setCurrentUser(auth.currentUser);
                });
        })

    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User: ",user);
    })
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
        organization,
        email,
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