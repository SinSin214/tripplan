'use client';
import { Button, inputClasses, inputLabelClasses, styled, TextField } from "@mui/material";
import dynamic from 'next/dynamic';

const TitleField = styled(TextField)(`
    .${inputClasses.root} {
        font-size: 30px;
      }
`)

export default function WritePost() {
    const MyCKEditor = dynamic(() => import('../../components/CKEditor'), { ssr: false });
    return (
        <div className="limited-width-layout__content h-screen">
            <div className="m-5">
                <TitleField 
                    variant="standard"
                    placeholder="Write title..."
                    maxRows={4}
                    multiline
                    fullWidth
                    />
                <div className="mt-10">
                    <MyCKEditor />
                </div>
                <div className="flex justify-center mt-5">
                    <Button className="mx-2 w-24" variant="outlined">
                        Cancel
                    </Button>
                    <Button className="mx-2 w-24" variant="contained">
                        Post
                    </Button>
                </div>
            </div>
        </div>
    )
}
