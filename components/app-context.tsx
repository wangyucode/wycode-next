import { createContext, Dispatch } from "react";

import { Theme } from "./nav/theme-switch";

export const INITIAL_APP_STATE: AppState = { openMenu: undefined, theme: Theme.light };

export enum ACTIONS {
    TOGGLE_MENU,
    CHANGE_THEME
};

export interface AppState {
    openMenu?: boolean;
    theme: Theme
}

export interface AppAction {
    type: ACTIONS;
    payload?: any;
}

export function reducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case ACTIONS.TOGGLE_MENU:
            return { ...state, openMenu: action.payload };
        case ACTIONS.CHANGE_THEME:
            return { ...state, theme: action.payload };
        default:
            return state;
    }
}

export const AppStateContext = createContext<AppState>(INITIAL_APP_STATE);
export const AppDispatcherContext = createContext<Dispatch<AppAction>>(() => { });