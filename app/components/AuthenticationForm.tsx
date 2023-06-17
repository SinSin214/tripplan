import { Button, Dialog, TextField } from '@mui/material';

export default function Footer() {
    return (
        <Dialog open={true}>
            <div className="authentication-popup">
                <div className="text-3xl mb-3">Sign in</div>
                <TextField className="my-2.5" label="Email" variant="outlined" type="email" size="small" fullWidth />
                <TextField className="my-2.5" label="Password" variant="outlined" type="password" size="small" fullWidth />
                <Button className="my-2.5 w-full" variant="contained">Sign in</Button>
            </div>
        </Dialog>
    )
}