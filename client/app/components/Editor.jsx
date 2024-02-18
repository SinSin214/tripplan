
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link';
import Quote from '@editorjs/quote';
import { useContext, useEffect } from "react";
import { AppContext } from '../context/appContext';

export default function Editor(props) {
    const { fileUploader } = useContext(AppContext)
    useEffect(() => {
        function generateEditor() {
            return new EditorJS({
                holder: 'editorjs',     // Id of element that contains Editor
                placeholder: 'Write thread content...',
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
                            captionPlaceholder: " ",
                            uploader: {
                            async uploadByFile(file){
                                let data = await fileUploader([file]);
                                return {
                                    success: true,
                                    file: {
                                        url: data.filesInfo[0].filePath,
                                        name: data.filesInfo[0].fileName
                                    }
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
        <div id="editorjs" className="border-slate-300 border-solid border rounded">
        </div>
    )
}