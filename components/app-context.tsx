import { createContext, Dispatch } from "react";
import { Theme } from "./types";

export const INITIAL_APP_STATE: AppState = { theme: Theme.light };

export enum ACTIONS {
    CHANGE_THEME
};

export interface AppState {
    theme: Theme
}

export interface AppAction {
    type: ACTIONS;
    payload?: any;
}

export function reducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case ACTIONS.CHANGE_THEME:
            return { ...state, theme: action.payload };
        default:
            return state;
    }
}

export const AppStateContext = createContext<AppState>(INITIAL_APP_STATE);
export const AppDispatcherContext = createContext<Dispatch<AppAction>>(() => { });