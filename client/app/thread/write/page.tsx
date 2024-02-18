'use client';
import { Button, styled, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/context/appContext";
import Loading from "@/app/components/AppLoading";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFormik } from "formik";
import { newThreadSchema } from "@/utils/validationSchema";
import { Carousel } from "@/app/components/Carousel/Carousel";
import { ProfileContext } from "@/app/context/profileContext";
import { notFound } from 'next/navigation';

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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export default function WriteThread() {
    const { requestAPI, fileUploader } = useContext(AppContext);
    const { profile } = useContext(ProfileContext);
    // Not showing write page if not signed yet
    if(!profile.isSigned) {
        return notFound();
    }
    const [threadObject, setThreadObject] = useState({
        title: '',
        content: [],
        description: '',
        images: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [editorInstance, setEditorInstance] = useState<any>();
    const [imageList, setImageList] = useState<any>([]);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            content: "",
            confirmPassword: ""
        },
        validationSchema: newThreadSchema,
        onSubmit: async (values) => {
            await onHandleThread();
        }
    });

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
                    content: outputData.blocks,
                    images: imageList.map((file: any) => file.fileName)
                });
            });
        } catch (err: any) {
            toast.error(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function uploadImage(e: any) {
        let uploadImages = e.target.files;
        setIsLoading(true);
        let res = await fileUploader(uploadImages);
        setImageList([...imageList, ...res.filesInfo]);
        setIsLoading(false);
    }

    return (
        <div className="md-limited-width-layout__content">
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 justify-items-center">
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
                    <div className="mt-2 w-full mb-2">
                        <Editor
                            editorInstance={editorInstance}
                            setEditorInstance={setEditorInstance} />
                    </div>
                    {imageList.length ? 
                        <div className="border-slate-300 border-solid border rounded h-[500px] w-full">
                            <Carousel data={imageList} />
                        </div> : ''
                    }
                    <Button
                        className="mt-2"
                        component="label" 
                        variant="contained" 
                        startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput 
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => uploadImage(e)} />
                    </Button>

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
            </form>
        </div>
    )
}
