'use client';
import { Fragment, useContext, useEffect } from "react";
import { ProfileContext } from "../context/profileContext";
import { AppContext } from "../context/appContext";

export default function ThreadLayout({ children }: { children: React.ReactNode }) {
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}