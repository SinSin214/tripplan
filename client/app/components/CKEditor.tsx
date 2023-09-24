import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import CustomCKEditor from 'ckeditor5-custom-build/build/ckeditor';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { API_HOST } from '@/utils/constants';


export default function MyCKEditor({ value, onChange }: { value: any, onChange: any }) {
    function uploadAdapter(loader: any) {
        return {
            upload: () => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const file = await loader.file;
                        const response = await axios.request({
                            method: "POST",
                            url: `${API_HOST}/image/upload`,
                            data: {
                                file: file
                            },
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        });
                        resolve({
                            default: `${API_HOST}/image/${response.data.filename}`
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
            editor={CustomCKEditor}
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