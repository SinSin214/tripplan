'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { RequestMethod } from "@/utils/constants";
import { AppContext } from "./appContext";
import { Country, Tag } from "@/utils/selectionType";

type SelectionType = {
    countries: Country[],
    tags: Tag[]
}

const initialSelections: SelectionType = {
    countries: [],
    tags: [] as Tag[]
}

export const SelectionContext = createContext({
    selections: initialSelections,
});

export default function SelectionProvider({ children }: any) {
    const { requestAPI } = useContext(AppContext);
    const [selections, setSelections] = useState<SelectionType>(initialSelections);

    useEffect(() => {
        async function getSelections() {
            const res = await requestAPI(`/selections`, RequestMethod.GET);
            setSelections(res.data);
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