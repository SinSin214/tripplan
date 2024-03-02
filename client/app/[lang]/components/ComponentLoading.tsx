import { CircularProgress } from '@mui/material';

export default function ComponentLoading() {
    return(
        <div className="text-center w-full h-full bg-white opacity-50 z-10">
            <CircularProgress />
        </div>
    )
}