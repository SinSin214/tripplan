import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomCKEditor from 'ckeditor5-custom-build/build/ckeditor';

export default function MyCKEditor() {
    
    return (
        <CKEditor
          editor={CustomCKEditor}
        />
      )
}