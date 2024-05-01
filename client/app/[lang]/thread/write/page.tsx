'use client';
import { Button, MenuItem, Select, styled, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/[lang]/context/appContext";
import Loading from "@/app/[lang]/components/AppLoading";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFormik } from "formik";
import { newThreadSchema } from "@/utils/validationSchema";
import { Carousel } from "@/app/[lang]/components/Carousel/Carousel";
import { AuthContext } from "@/app/[lang]/context/authContext";
import { notFound } from 'next/navigation';
import { useTranslations } from "next-intl";

const Editor = dynamic(() => import('@/app/[lang]/components/Editor'), { ssr: false });

const TitleField = styled(TextField)({
    "& .MuiInputBase-input": {
        fontSize: "18px",
        fontWeight: "bold",
        padding: "12px 18px",
        height: "25px"
    }
});

const CustomTextField = styled(TextField)({
    height: 47,
    "& .MuiInputBase-input": {
        padding: "12px 18px",
        height: "25px"
    }
});

const CustomSelectField = styled(Select)({
    height: 47,
    "& .MuiInputBase-input": {
        padding: "12px 18px",
        height: "25px"
    },
    value: ''
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

interface ICountry {
    id: string,
    text: string
}

export default function WriteThread() {
    const { requestAPI, fileUploader } = useContext(AppContext);
    const { profile } = useContext(AuthContext);
    const t = useTranslations();
    // Not showing write page if not signed yet
    if (!profile.isSigned) {
        return notFound();
    }
    const [threadObject, setThreadObject] = useState({
        title: '',
        content: [],
        description: '',
        cost: '',
        countryId: '',
        tagsId: [],
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
        async function sendThread() {
            const res = await requestAPI('/thread', 'POST', threadObject);
        }
        if (threadObject.content.length) sendThread();
    }, [threadObject.content]);

    function handleOnChange(e: any) {
        setThreadObject({
            ...threadObject,
            [e.target.name]: e.target.value
        })
    }

    async function onHandleThread() {
        editorInstance.save().then((outputData: any) => {
            setThreadObject({
                ...threadObject,
                content: outputData.blocks,
                images: imageList.map((file: any) => file.fileName)
            });
        });
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
                <div className="grid grid-cols-1 gap-3 py-6 justify-items-center">
                    <TitleField
                        className="font-semibold "
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
                    <CustomTextField
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

                    <div className="flex w-full gap-x-4">
                        <CustomSelectField
                            className="w-2/3"
                        >
                            {/* {countries.map((country: ICountry) => (
                                <MenuItem
                                key={country.id}
                                value={country.text}
                                >
                                {country.text}
                                </MenuItem>
                            ))} */}
                        </CustomSelectField>

                        <CustomTextField
                            className="w-1/3"
                            type="number"
                            name="cost"
                            value={threadObject.cost}
                            InputProps={{ inputProps: { min: 0 } }}
                            placeholder={t('CostInUsd')}
                        />
                    </div>

                    <div className="w-full mb-2">
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
