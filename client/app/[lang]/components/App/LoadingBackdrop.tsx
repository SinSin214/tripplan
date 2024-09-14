'use client';
import { Backdrop, CircularProgress } from "@mui/material";

export default function LoadingBackdrop(props: {loading: boolean}) {

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={props.loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}