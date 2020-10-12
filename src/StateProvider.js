import React ,{useContext,createContext, useReducer} from 'react'

//prepare the data layer
export const StateContext = createContext();

// wrap our app and provide the data layer to our app
export const StateProvider = ({reducer,initialState,children})=>(
    <StateContext.Provider value={useReducer(reducer,initialState)}> 
     {children} 
    </StateContext.Provider>
)

// pull inforamation from the data layer
export const useStateValue = ()=> useContext(StateContext)