import { createContext, useContext } from 'react'
import { RootModelI } from 'store/models/RootModel'

const RootStoreContext = createContext<RootModelI>({} as RootModelI)

export const RooStoreProvider = RootStoreContext.Provider

export const useStore = () => useContext(RootStoreContext)
