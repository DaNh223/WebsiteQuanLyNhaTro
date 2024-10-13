// import React, { createContext, useContext, useEffect, useState } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [userImg, setUserImg] = useState(sessionStorage.getItem('userImg'));

//     useEffect(() => {
//         console.log('hehe');
//     }, [userImg])

//     return (
//         <UserContext.Provider value={{ userImg, setUserImg }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUserContext = () => {
//     return useContext(UserContext);
// };


// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [userImg, setUserImg] = useState(null);

    return (
        <UserContext.Provider value={{ userImg, setUserImg }}>
            {children}
        </UserContext.Provider>
    );
};
