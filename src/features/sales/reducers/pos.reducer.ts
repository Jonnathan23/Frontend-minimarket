
import type { SalesDetailItem } from "../types/sales.types";

export interface POSState {
    items: SalesDetailItem[];
    activeId: string | null;
}

export type POSAction =
    | { type: 'ADD_DETAIL'; payload: SalesDetailItem }
    | { type: 'UPDATE_DETAIL'; payload: SalesDetailItem }
    | { type: 'DELETE_DETAIL'; payload: { tempId: string } }
    | { type: 'SET_ACTIVE_ID'; payload: { tempId: string } }
    | { type: 'RESET_ACTIVE_ID' }
    | { type: 'RESET_SALE' };

export const initialPOSState: POSState = {
    items: [],
    activeId: null
};

export function posReducer(state: POSState, action: POSAction): POSState {
    switch (action.type) {
        case 'ADD_DETAIL':
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case 'UPDATE_DETAIL':
            return {
                ...state,
                items: state.items.map(item =>
                    item.tempId === action.payload.tempId ? action.payload : item
                ),
                activeId: null // Clear active ID after update
            };
        case 'DELETE_DETAIL':
            return {
                ...state,
                items: state.items.filter(item => item.tempId !== action.payload.tempId),
                activeId: state.activeId === action.payload.tempId ? null : state.activeId
            };
        case 'SET_ACTIVE_ID':
            return {
                ...state,
                activeId: action.payload.tempId
            };
        case 'RESET_ACTIVE_ID':
            return {
                ...state,
                activeId: null
            };
        case 'RESET_SALE':
            return initialPOSState;
        default:
            return state;
    }
}
