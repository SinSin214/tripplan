import { CircularProgress } from '@mui/material';

export default function AppLoading() {
    return(
        <div className="w-full h-full fixed bg-white opacity-50 z-10">
            <CircularProgress className="absolute top-[40%] left-[49%]" />
        </div>
    )
}