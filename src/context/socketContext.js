import React, { createContext, useState } from "react";


const SocketContext = createContext();


const ContextProvider = ({children})=>{
  
    const [LoggedIn,setLogin] = useState(false);
    const [uemail,setMail] = useState("");
   const [pass,setPass] = useState("");
   const [token,setToken] = useState("this is token");
   



    return (
        <SocketContext.Provider value={{
             LoggedIn,
             setLogin,
             uemail,
             setMail,
             pass,
             setPass,
             token,
             setToken

                
    
            }
        }>
            {children}
        </SocketContext.Provider>
    )
}

export {ContextProvider,SocketContext}

