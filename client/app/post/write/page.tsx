'use client';
import { Button, inputClasses, styled, TextField } from "@mui/material";
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from "react";

const TitleField = styled(TextField)(`
    .${inputClasses.root} {
        font-size: 30px;
      }
`);

const MyCKEditor = dynamic(() => import('../../components/CKEditor'), { ssr: false });

export default function WritePost() {
    const [writePost, setWritePost] = useState({
        title: '',
        content: '',
        images: []
    })

    function handleOnChange(e: any) {
        setWritePost({
            ...writePost,
            [e.target.name]: e.target.value
        })
    }

    function onHandlePost() {
        console.log(writePost);
    }

    return (
        <div className="limited-width-layout__content h-screen">
            <div className="m-5">
                <TitleField
                    variant="standard"
                    placeholder="Write title..."
                    name="title"
                    value={writePost.title}
                    onChange={(e: any) => handleOnChange(e)}
                    maxRows={4}
                    multiline
                    fullWidth
                />
                <div className="mt-10">
                    <MyCKEditor
                        value={writePost.content}
                        onChange={(data: any) => setWritePost({ ...writePost, content: data })} />
                </div>
                <div className="flex justify-center mt-5">
                    <Button className="mx-2 w-24" variant="outlined">
                        Cancel
                    </Button>
                    <Button className="mx-2 w-24"
                        variant="contained"
                        onClick={() => onHandlePost()}>
                        Post
                    </Button>
                </div>
            </div>
        </div>
    )
}
