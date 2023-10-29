import axios from 'axios';
import { useContext } from 'react';
import { ErrorContext } from '@/app/context';


export async function request(path: string, method: string, data?: Object): Promise<any> {
    try {
        console.log(`${process.env.API_ROUTE}${path}`)
        let res = await axios({
            method: method,
            url: `${process.env.NEXT_PUBLIC_API_ROUTE}${path}`,
            headers: { 'Authorization': 'Bearer ' + getToken() },
            data: data
        });
        return res.data;
    } catch(err: any) {
        // showErrorDialog(true, err.data.message);
    }
}

function getToken() {
    return 'aaa';
}

function showErrorDialog(state: boolean, error: string) {
    const { setErrorDlg } = useContext(ErrorContext);
    setErrorDlg({
        show: true,
        error: error
    })
}