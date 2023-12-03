import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import CustomCKEditor from 'ckeditor5-custom-build/build/ckeditor';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { API_HOST } from '@/utils/constants';
import { AppContext } from '../context/appContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';


export default function MyCKEditor({ value, onChange, isDisabled }: { value: any, onChange: any, isDisabled: boolean }) {
    const { requestAPI } = useContext(AppContext);
    function uploadAdapter(loader: any) {
        return {
            upload: async () => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const file = await loader.file;
                        // const res = await requestAPI('/image/upload', 'POST', {file: file});
                        const res = await axios.request({
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
                            default: `${API_HOST}/image/${res.data.filename}`
                        });
                    }
                    catch (err: any) {
                        toast.error(err.response.data.message);
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
            disabled={isDisabled}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
        />
    )
}