'use client';
import { Button, inputClasses, styled, TextField } from "@mui/material";
import axios from "axios";
import dynamic from 'next/dynamic';
import { useContext, useState } from "react";
import { API_HOST } from '@/utils/constants'
import { AppContext } from "@/app/context/appContext";
import { toast } from "react-toastify";
import Loading from "@/app/components/Loading";

const TitleField = styled(TextField)(`
    .${inputClasses.root} {
        font-size: 30px;
      }
`);

const MyCKEditor = dynamic(() => import('../../components/CKEditor'), { ssr: false });

export default function WritePost() {
    const { requestAPI } = useContext(AppContext);
    const [postObject, setPostObject] = useState({
        title: '',
        content: '',
        images: []
    })
    const [isLoading, setIsLoading] = useState(false);

    function handleOnChange(e: any) {
        setPostObject({
            ...postObject,
            [e.target.name]: e.target.value
        })
    }

    async function onHandlePost() {
        try {
            setIsLoading(true);
            const res = await requestAPI('/post', 'POST', postObject);
            setIsLoading(false);
        } catch(err: any){
            setIsLoading(false);
            toast.error(err.response.data.message);
        }
    }

    return (
        <div className="limited-width-layout__content h-screen">
            <div className="m-5">
                <TitleField
                    variant="standard"
                    placeholder="Write title..."
                    name="title"
                    value={postObject.title}
                    onChange={(e: any) => handleOnChange(e)}
                    disabled={isLoading}
                    maxRows={4}
                    multiline
                    fullWidth
                />
                <div className="mt-10">
                    <MyCKEditor
                        value={postObject.content}
                        isDisabled={isLoading}
                        onChange={(data: any) => setPostObject({ ...postObject, content: data })} />
                </div>
                {isLoading ? <Loading/> : ''}
                <div className="flex justify-center mt-5">
                    <Button 
                        className="mx-2 w-24" 
                        variant="outlined"
                        disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button className="mx-2 w-24"
                        variant="contained"
                        onClick={() => onHandlePost()}
                        disabled={isLoading}>
                        Post
                    </Button>
                </div>
            </div>
        </div>
    )
}
