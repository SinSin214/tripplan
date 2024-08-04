'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "./appContext";
import { Tag } from "@/utils/selectionType";
import { RequestMethod } from "@/types/globalType";

type SelectionType = {
    tags: Tag[]
}

const initialSelections: SelectionType = {
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
            const res = await requestAPI(`/selections`, RequestMethod.Get);
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