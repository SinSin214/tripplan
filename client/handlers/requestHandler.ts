import { RequestMethod } from "@/types/globalType";
import axios from "axios";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

// export const requestApi = async (path: string, method: RequestMethod, data?: object): Promise<any> => {
//     const t = useTranslations();
//     try {
//         const requestConfig = {
//             method: method,
//             url: `${process.env.NEXT_PUBLIC_API_ROUTE}${path}`,
//             data: data,
//             withCredentials: true
//         }
//         const res = await axios(requestConfig);
//         if(res.data.messageCode) {
//             toast.success(t(res.data.messageCode));
//         }
//         return res.data;
//     } catch(err: any) {
//         const error = err.response.data;
//         toast.error(t(error.messageCode));
//     }
// }