import { useState, useEffect, Dispatch, SetStateAction } from "react";

function usePersistedState<T>(
    key: string,
    defaultValue: T
): [T, Dispatch<SetStateAction<T>>, () => void] {
    const getStoredValue = (key: string, defaultValue: T): T => {
        try {
            if (typeof window === "undefined") {
                return defaultValue;
            }
      
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.warn(`Error reading ${key} from localStorage:`, error);
            return defaultValue;
        }
    };

    const setStoredValue = (key: string, value: T): void => {
        try {
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.warn(`Error saving ${key} to localStorage:`, error);
        }
    };

    const [state, setState] = useState<T>(() => getStoredValue(key, defaultValue));

    useEffect(() => {
        setStoredValue(key, state);
    }, [key, state]);

    const clearPersistedValue = () => {
        try {
            if (typeof window !== "undefined") {
                window.localStorage.removeItem(key);
            }
            setState(defaultValue);
        } catch (error) {
            console.warn(`Error removing ${key} from localStorage:`, error);
        }
    };

    return [state, setState, clearPersistedValue];
}

export default usePersistedState; 