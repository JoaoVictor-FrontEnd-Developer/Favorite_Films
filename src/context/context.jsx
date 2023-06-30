import { createContext, useReducer } from "react";

/**
    
    Problema com context ao armazenar objetos de uma API,

    Para resolver o problema criei um array de ID's, onde ao adicionar um novo filme, eu também
    armazenava seu id separado para verificar posteriormente com metodo "includes", pois não estava
    funcionando verificar a existencia do objeto direto no array de filmes, apenas com "string" ou "number"
    
 */

const initialState = () => {
    const actualState = localStorage.getItem('savedItems');
  
    if (actualState)
        return JSON.parse(actualState)
    
    else return {
        darkMode: false,
        id: [],
        favorites: [],
    }
}


const contextReducer = (state, action) => {
    switch (action.type) {
        case "FAVORITE":
            if (state.id.includes(action.payload.id)) {
                const newFavorites = state.favorites.filter(f => f.id !== action.payload.id)
                const newId = state.id.filter(id => id !== action.payload.id)
                return {
                    ...state,
                    id: newId,
                    favorites: newFavorites,
                }
            }
            return {
                ...state,
                id: [
                    ...state.id,
                    action.payload.id  
                ],
                favorites: [
                    ...state.favorites,
                    action.payload,
                ]
            }
        case 'CHANGE_THEME':
            return {
                ...state,
                darkMode: !state.darkMode
            }
        default:
            return state
    }
}

export const ContextTeste = createContext();

export const ContextProvider = ({ children }) => {

    
    const value = useReducer(contextReducer, initialState())
    return <ContextTeste.Provider value={value}>{children}</ContextTeste.Provider>
}