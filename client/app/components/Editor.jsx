
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link';
import Quote from '@editorjs/quote';
import { useContext, useEffect } from "react";
import { AppContext } from '../context/appContext';
import axios from "axios";
import { toast } from 'react-toastify';



export default function Editor(props) {
    useEffect(() => {
        function generateEditor() {
            return new EditorJS({
                holder: 'editorjs',     // Id of element that contains Editor
                tools: {                // List available tools
                    list: {
                        class: List,
                        inlineToolbar: true
                    },
                    linkTool: {
                        class: LinkTool,
                        inlineToolbar: true
                    },
                    quote: {
                        class: Quote,
                        inlineToolbar: true
                    },
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true
                    },
                    image: {
                        class: ImageTool,
                        inlineToolbar: true,
                        config: {
                            uploader: {
                            async uploadByFile(file){
                                try {
                                    // prepare data
                                    let data = new FormData();
                                    data.append('file', file)
                                    // sending data
                                    const requestConfig = {
                                        method: 'POST',
                                        url: `${process.env.NEXT_PUBLIC_API_ROUTE}/image/upload`,
                                        data: data,
                                        headers: {
                                            'Content-Type': 'multipart/form-data'
                                        }
                                    }
                                    const res = await axios(requestConfig);
                                    return {
                                        success: true,
                                        file: {
                                            url: res.data.filePath,
                                            name: res.data.fileName
                                        }
                                    };
                                }
                                catch(err) {
                                    const res = err.response.data;
                                    toast.error(res.message);
                                }
                            }
                        }}
                    }
                },
                data: props.data,
                onReady: () => {
                    console.log('Editor.js is ready to work!')
                },
                onChange: () => {
                    var objDiv = document.getElementById("mainLayout");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }
            });
        }
        if(!props.editorInstance) props.setEditorInstance(generateEditor());
    }, []);
        
    return (
        <div id="editorjs" className="min-h-[42rem] border-black border-solid border-2">
        </div>
    )
}