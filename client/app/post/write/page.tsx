'use client';
import { Button, inputClasses, styled, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/context/appContext";
import Loading from "@/app/components/AppLoading";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const Editor = dynamic(() => import('@/app/components/Editor'), { ssr: false });

const TitleField = styled(TextField)(`
    .${inputClasses.root} {
        font-size: 30px;
      }
`);

export default function WritePost() {
    const { requestAPI } = useContext(AppContext);
    const [postObject, setPostObject] = useState({
        title: '',
        content: [],
        images: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [editorInstance, setEditorInstance] = useState<any>();

    useEffect(() => {
        async function sendThread () {
            try {
                setIsLoading(true);
                await requestAPI('/post', 'POST', postObject);
            } catch(err: any) {
                toast.error(err.response.data.message);
            } finally {
                setIsLoading(false);
            }
        }
        if(postObject.content.length) sendThread();
    }, [postObject.content]);

    function handleOnChange(e: any) {
        setPostObject({
            ...postObject,
            [e.target.name]: e.target.value
        })
    }

    async function onHandlePost() {
        try {
            setIsLoading(true);
            editorInstance.save().then((outputData: any) => {
                setPostObject({
                    ...postObject,
                    content: outputData.blocks
                });
            });
        } catch (err: any) {
            toast.error(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="limited-width-layout__content" id="writePost">
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
                <Editor
                    editorInstance={editorInstance}
                    setEditorInstance={setEditorInstance} />
            </div>
            {isLoading ? <Loading /> : ''}
            <div className="flex justify-center my-5">
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
    )
}
