import { PostProps } from "@/utils/types";
import { TextField } from "@mui/material";
import Image from 'next/image';
import * as API from "../../../utils/apiHelper";


export default async function WritePost() {

    return (
        <div className="limited-width-layout__content">
           <TextField />
        </div>
    )
}
