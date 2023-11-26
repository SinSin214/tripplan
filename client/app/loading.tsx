import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
    return(
        <div className="text-center w-full h-auto">
            <CircularProgress className="align-middle" />
        </div>
    )
}