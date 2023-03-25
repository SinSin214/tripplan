import { AppBar, Toolbar, Button, Box, BottomNavigation, BottomNavigationAction, } from '@mui/material';
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const pathName = usePathname();
    return (
        <BottomNavigation
            className="bg-stone-800"
            sx={{ '.MuiBottomNavigationAction-label': {
                fontSize: '1.25rem',
                color: 'white'
            }}}
            showLabels
            onChange={(event, value) => {
                router.push(value);
            }}>
            <BottomNavigationAction 
                className={`${pathName === '/' && "nav_item_active"} nav_items `}
                label="Home" 
                value="/" />
            <BottomNavigationAction 
                className={`${pathName === '/destination' && "nav_item_active"} nav_items`}
                label="Destination" 
                value="/destination" />
            <BottomNavigationAction 
                className={`${pathName === '/planning' && "nav_item_active"} nav_items`}
                label="Planning" 
                value="/planning" />
        </BottomNavigation>
    )
}