'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "./appContext";
import { Tag, Country } from "@/types/selectionType";
import { RequestMethod } from "@/types/globalType";

type SelectionType = {
    tags: Tag[],
    countries: Country[]
}

const initialSelections: SelectionType = {
    tags: [],
    countries: []
}

export const SelectionContext = createContext({
    selections: initialSelections,
});

export default function SelectionProvider({ children }: any) {
    const { requestAPI } = useContext(AppContext);
    const [selections, setSelections] = useState<SelectionType>(initialSelections);

    useEffect(() => {
        async function getSelections() {
            const res = await requestAPI(`/selections`, RequestMethod.Get);
            setSelections(res);
        }
        getSelections();
    }, [])

    return (
        <SelectionContext.Provider
            value={{
                selections,
            }}>
                {children}
        </SelectionContext.Provider>
    )
}