import { AppBar, Toolbar, Button, } from '@mui/material';
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const pathName = usePathname();
    return (
        <AppBar position="static" color="primary">
          <Toolbar>
            <Button color="secondary" className={`${pathName === '/' && "nav_item_active"}`} onClick={() => router.push('/')}>
                Home
            </Button>
            <Button color="secondary" className={`${pathName === '/destination' && "nav_item_active"}`} onClick={() => router.push('/destination')}>
                Destination
            </Button>
            <Button color="secondary" className={`${pathName === '/planning' && "nav_item_active"}`} onClick={() => router.push('/planning')}>
                Planning
            </Button>
          </Toolbar>
        </AppBar>
    )
}