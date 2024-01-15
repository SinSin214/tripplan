'use client';
import { Button, inputClasses, styled, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/context/appContext";
import Loading from "@/app/components/AppLoading";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const Editor = dynamic(() => import('@/app/components/Editor'), { ssr: false });

const TitleField = styled(TextField)({
    "& .MuiInputBase-input": {
      fontSize: "18px",
      fontWeight: "bold",
      padding: "12px 18px"
    }
});

const DescriptionField = styled(TextField)({
    "& .MuiInputBase-input": {
        padding: "12px 18px"
    }
});

export default function WriteThread() {
    const { requestAPI } = useContext(AppContext);
    const [threadObject, setThreadObject] = useState({
        title: '',
        content: [],
        description: '',
        images: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [editorInstance, setEditorInstance] = useState<any>();

    useEffect(() => {
        async function sendThread () {
            try {
                setIsLoading(true);
                const res = await requestAPI('/thread', 'POST', threadObject);
                toast.success(res.message);
            } catch(err: any) {
                toast.error(err.response.data.message);
            } finally {
                setIsLoading(false);
            }
        }
        if(threadObject.content.length) sendThread();
    }, [threadObject.content]);

    function handleOnChange(e: any) {
        setThreadObject({
            ...threadObject,
            [e.target.name]: e.target.value
        })
    }

    async function onHandleThread() {
        try {
            setIsLoading(true);
            editorInstance.save().then((outputData: any) => {
                setThreadObject({
                    ...threadObject,
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
        <div className="md-limited-width-layout__content">
            <div>
                <TitleField
                    className="mt-2 font-semibold "
                    variant="outlined"
                    placeholder="Title..."
                    name="title"
                    value={threadObject.title}
                    onChange={(e: any) => handleOnChange(e)}
                    disabled={isLoading}
                    inputProps={{ 
                        maxLength: 100
                     }}
                    fullWidth
                    required
                />
                <DescriptionField
                    className="mt-2"
                    variant="outlined"
                    placeholder="Short description..."
                    name="description"
                    value={threadObject.description}
                    onChange={(e: any) => handleOnChange(e)}
                    disabled={isLoading}
                    inputProps={{ maxLength: 300 }}
                    fullWidth
                    required
                />
                <div className="mt-2">
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
                        onClick={() => onHandleThread()}
                        disabled={isLoading}>
                        Post
                    </Button>
                </div>
            </div>
        </div>
    )
}
