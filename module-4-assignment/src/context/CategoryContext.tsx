import React, { createContext, useReducer, useContext, ReactNode } from 'react'

interface AppProviderProps {
    children: ReactNode
}

interface AppState {
    category: Category | null
}

type Action =
    | { type: 'setCategory'; payload: Category }
    | { type: 'clearCategory' }

const initialState: AppState = {
    category: null,
}

interface Category {
    id: string
    category_name: string
    category_description: string
    is_active: boolean
}

const AppContext = createContext<{
    state: AppState
    dispatch: React.Dispatch<Action>
}>({
    state: initialState,
    dispatch: () => null,
})

const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'setCategory':
            return { ...state, category: action.payload }
        case 'clearCategory':
            return { ...state, category: null }
        default:
            return state
    }
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)