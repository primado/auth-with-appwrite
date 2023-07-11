/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // setLoading(false)
        checkUserStatus();
    }, [])

    const loginUser = async (userInfo) => {
        setLoading(true);

        try {
            let response = await account.createEmailSession(userInfo.email, userInfo.password);
            console.log('SESSSION:', response);
            
            let accountDetails = await account.get();
            
            setUser(accountDetails);

        } catch(error) {
            console.log(error); 

        }

    }

    const logoutUser = async () => {
        await account.deleteSession('current');
        setUser(null);
        
    }

    const registerUser = async (userInfo) => {
        setLoading(true);

        try {
            let response = await account.create(
                ID.unique(),
                userInfo.email,
                userInfo.password1,
                userInfo.password2,
                userInfo.name
            );
            await account.createEmailSession(
                userInfo.email,
                userInfo.password1
            );
            
            let accountDetails = await account.get();
            setUser(accountDetails);
            navigate('/');
            console.log('REGISTER:', response);
            
        } catch(error) {
            console.log(error);
        }
    }

    const checkUserStatus = async () => {

        try {
            let accountDetails = await account.get();
            setUser(accountDetails)

        } catch(error) {
            console.log(error);
        }

        setLoading(false)

    };

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <h1>Loading...</h1> : children}
        </AuthContext.Provider>
    )

}

//Custome Hook
export const useAuth = () => {return useContext(AuthContext)}


export default AuthContext;