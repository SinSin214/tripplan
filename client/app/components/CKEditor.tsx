import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
// import CustomCKEditor from 'ckeditor5-custom-build/build/ckeditor';
import Editor from '@ckeditor/ckeditor5-build-classic'

const HOST = 'localhost:3001';


export default function MyCKEditor({ value, onChange }: { value: any, onChange: any }) {
    function uploadAdapter(loader: any) {
        return {
            upload: () => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const file = await loader.file();
                        const response = await axios.request({
                            method: "POST",
                            url: `${HOST}/image/upload`,
                            data: {
                                files: file
                            },
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        });
                        resolve({
                            default: `${HOST}/${response.data.filename}`
                        });
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            }
        };
    }

    function uploadPlugin(editor: any) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
            return uploadAdapter(loader);
        };
    }

    return (
        <CKEditor
            editor={Editor}
            config={{
                extraPlugins: [uploadPlugin]
            }}
            data={value}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
        />
    )
}