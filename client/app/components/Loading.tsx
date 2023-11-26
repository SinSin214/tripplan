import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
    return(
        <Box className="text-center w-full h-auto">
            <CircularProgress className="align-middle" />
        </Box>
    )
}