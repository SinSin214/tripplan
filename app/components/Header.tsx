import { usePathname, useRouter } from "next/navigation";
import { useContext } from 'react';
import { AppContext } from '../context';

export default function Navbar() {
    const router = useRouter();
    const pathName = usePathname();
    const { isSigned , setIsOpenAuthForm } = useContext(AppContext);
    return (
        <div className="bg-stone-800 fixed w-full h-14 z-10">
            <button 
                className={`${pathName === '/' ? 'button-navbar-active' : 'button-navbar-inactive'} button-navbar`}
                onClick={() => router.push('/')}>Home</button>
            <button 
                className={`${pathName.includes('/destination') ? 'button-navbar-active' : 'button-navbar-inactive'} button-navbar`}
                onClick={() => router.push('/destination')}>Destination</button>
            <button 
                className={`${pathName.includes('/planning') ? 'button-navbar-active' : 'button-navbar-inactive'} button-navbar`}
                onClick={() => router.push('/planning')}>Planning</button>
            <button 
                className="float-right"
                onClick={() => setIsOpenAuthForm(true)}>Sign In</button>
        </div>
    )
}