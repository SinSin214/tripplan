/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Bold, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FontSize } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { Image, ImageCaption, ImageUpload, ImageResizeButtons, ImageResize, ImageResizeEditing, ImageToolbar } from '@ckeditor/ckeditor5-image';
import { Link } from '@ckeditor/ckeditor5-link';
import { List, ListProperties } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
declare class Editor extends ClassicEditor {
    static builtinPlugins: (typeof BlockQuote | typeof Bold | typeof Essentials | typeof FontSize | typeof Heading | typeof HorizontalLine | typeof Image | typeof ImageCaption | typeof ImageUpload | typeof ImageResize | typeof ImageResizeButtons | typeof ImageResizeEditing | typeof ImageToolbar | typeof Italic | typeof Link | typeof List | typeof ListProperties | typeof Paragraph | typeof Strikethrough | typeof Underline)[];
    static defaultConfig: {
        toolbar: {
            items: string[];
        };
        language: string;
    };
}
export default Editor;
