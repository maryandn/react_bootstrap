import {createContext, useState} from 'react'
import React from 'react'

export const CurrentUserContext = createContext([{}, p=>{}])

export const CurrentUserProvider = ({children}) => {

    const [state, setState] = useState({
        isLoading: false,
        isLoggedIn: false,
        subCategoryId: null,
        subCategoryName: '',
        editCategory: false,
        editSubCategory: false,
        editCardProduct: false,
        setProperties: false,
        userId: null,
        tokenValid: true
    })
    return (
        <CurrentUserContext.Provider value={[state, setState]}>
            {children}
        </CurrentUserContext.Provider>
    )
}
