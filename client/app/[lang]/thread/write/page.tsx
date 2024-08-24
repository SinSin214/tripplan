'use client';
import { Button, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, styled, TextField } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/[lang]/context/appContext";
import Loading from "@/app/[lang]/components/AppLoading";
import dynamic from "next/dynamic";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from "@mui/icons-material/Cancel";
import { useFormik } from "formik";
import { newThreadSchema } from "@/utils/validationSchema";
import { Carousel } from "@/app/[lang]/components/Carousel/Carousel";
import { notFound } from 'next/navigation';
import { useTranslations } from "next-intl";
import { SelectionContext } from "../../context/selectionContext";
import { Country } from "@/types/selectionType";
import { ThreadDetail } from "@/types/threadType";
import { RequestMethod } from "@/types/globalType";
import axios from "axios";

const Editor = dynamic(() => import('@/app/[lang]/thread/components/Editor'), { ssr: false });

type FileInfo = {
    fileName: string,
    filePath: string
}

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
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);
    const initialThread = {
        title: "",
        description: "",
        content: [],
        countryId: "",
        tagsId: [],
        attachedImages: [],
        allImageNames: []
    }
    const { requestAPI, navigation, fileUploader } = useContext(AppContext);
    const { selections } = useContext(SelectionContext);
    const [threadObject, setThreadObject] = useState<ThreadDetail>(initialThread);
    const [editorInstance, setEditorInstance] = useState<any>();
    const t = useTranslations();

    const formik = useFormik({
        initialValues: initialThread,
        validationSchema: newThreadSchema,
        onSubmit: async (values) => {
            await onSubmitThread();
        }
    });

    useEffect(() => {
        const checkSession = async () => {
            try {
                setIsLoading(true);
                const isAllowed = await requestAPI('/auth/check_permission', RequestMethod.Get);
                setIsAllowed(isAllowed);
            } finally {
                setIsLoading(false);
            }
        }
        checkSession();
    }, [])

    useEffect(() => {
        async function createThread() {
            const requestConfig = {
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_ROUTE}/thread`,
                data: threadObject,
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const res = await axios(requestConfig);
        }
        if (threadObject.content.length) createThread();
    }, [threadObject.content]);

    const onChangeTextProperty = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setThreadObject({
            ...threadObject,
            [name]: value
        })
    }

    const onChangeTags = (e: SelectChangeEvent<string[]>) => {
        setThreadObject({
            ...threadObject,
            tagsId: e.target.value as string[]
        })
    }

    const onChangeCountry = (e: SelectChangeEvent<string>) => {
        setThreadObject({
            ...threadObject,
            countryId: e.target.value
        })
    }

    const onRemoveTag = (e: React.MouseEvent, selectedId: string): ((event: any) => void) | undefined => {
        e.preventDefault();
        setThreadObject({
            ...threadObject,
            tagsId: threadObject.tagsId.filter(item => item !== selectedId)
        })
        return;
    }

    async function onSubmitThread() {
        editorInstance.save().then((outputData: any) => {
            setThreadObject({
                ...threadObject,
                content: outputData.blocks,
                // images: imageList.map((file: any) => file.fileName)
            });
        });
    }

    // async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    //     const uploadImages = e.target.files;
    //     const imageInfo = [];
    //     if(uploadImages) {
    //         for(let i = 0; i < uploadImages.length; i++) {
    //             const image = uploadImages[i];
    //             imageInfo.push({
    //                 filePath: URL.createObjectURL(image),
    //                 fileName: image.name,
    //                 fileObject: image
    //             })
    //         }
    //         setThreadObject({
    //             ...threadObject,
    //             images: threadObject.images.concat(imageInfo)
    //         })
    //     }
    // }

    async function uploadImage(e: any) {
        try {
            setIsLoadingUpload(true);
            const uploadImages = e.target.files;
            const res = await fileUploader(uploadImages);
            const filesInfo: FileInfo[] = res.filesInfo;
            setThreadObject({
                ...threadObject,
                attachedImages: threadObject.attachedImages.concat(filesInfo),
                allImageNames: threadObject.allImageNames.concat(filesInfo.map(item => item.fileName))
            })
        } finally {
            setIsLoadingUpload(false);
        }
    }

    if(isLoading) {
        return <Loading/>
    } else if(isAllowed === false) {
        return notFound()
    }

    return (
        <div className="md-limited-width-layout__content">
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-3 py-6 justify-items-center">
                    <FormControl fullWidth>
                        <TextField className="font-semibold"
                            variant="outlined"
                            label="Title"
                            name="title"
                            value={threadObject.title}
                            onChange={onChangeTextProperty}
                            disabled={isLoading}
                            inputProps={{
                                maxLength: 100
                            }}
                            fullWidth
                            required />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField variant="outlined"
                            label="Description"
                            name="description"
                            value={threadObject.description}
                            onChange={onChangeTextProperty}
                            disabled={isLoading}
                            inputProps={{ maxLength: 300 }}
                            fullWidth
                            required />
                    </FormControl>

                    <div className="flex w-full gap-x-4">
                        <FormControl className="w-1/3">
                            <InputLabel required>{t('Country')}</InputLabel>
                            <Select 
                                name="countryId"
                                label={t("Country")}
                                value={threadObject.countryId}
                                onChange={onChangeCountry}
                                required>
                                {selections.countries.length ? selections.countries.map((item: Country) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {t(item.id)}
                                    </MenuItem>
                                )) : ''}
                            </Select>
                        </FormControl>
                        <FormControl className="w-2/3">
                            <InputLabel required>{t('Tags')}</InputLabel>
                            <Select
                                name="tagsId"
                                label={t("Tags")}
                                multiple
                                displayEmpty
                                value={threadObject.tagsId}
                                onChange={onChangeTags}
                                renderValue={(selectedIds: string[]) => {
                                    type TagObject = {
                                        id: string,
                                        colorCode: string
                                    }
                                    const tagObjects = selectedIds.map(id => ({
                                        id: id,
                                        colorCode: selections.tags.find(item => item.id === id)?.colorCode
                                    })) as TagObject[];
                                    return (
                                        <div>
                                            {tagObjects.map((selectedTag: TagObject) => (
                                                <Chip key={selectedTag.id}
                                                    style={{backgroundColor: `${selectedTag.colorCode}`}}
                                                    className="mx-1 border border-slate-300 border-solid"
                                                    label={t(selectedTag.id)}
                                                    onDelete={(e) => onRemoveTag(e, selectedTag.id)}
                                                    deleteIcon={<CancelIcon onMouseDown={(e) => e.stopPropagation()} />}
                                                />
                                            ))}
                                        </div>
                                    )
                                }}
                                required>
                                {selections.tags.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        <Checkbox checked={threadObject.tagsId.includes(item.id)} />
                                        <ListItemText primary={t(item.id)} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="w-full mb-2">
                        <Editor editorInstance={editorInstance} setEditorInstance={setEditorInstance} />
                    </div>
                    {threadObject.attachedImages.length ?
                        <div className="border-slate-300 border-solid border rounded h-[500px] w-full">
                            <Carousel data={threadObject.attachedImages} />
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

                    {isLoadingUpload ? <Loading /> : ''}
                    <div className="flex justify-center my-5">
                        <Button
                            className="mx-2 w-24"
                            variant="outlined"
                            disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button className="mx-2 w-24"
                            variant="contained"
                            onClick={onSubmitThread}
                            disabled={isLoading}>
                            Post
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
