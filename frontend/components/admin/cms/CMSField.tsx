import React from 'react';
import { FieldSchema } from '../../../lib/cms/types';
import { TextField } from './fields/TextField';
import { BooleanField } from './fields/BooleanField';
import { SelectField } from './fields/SelectField';
import { ImageUploadField } from './fields/ImageUploadField';
import { JSONListField } from './fields/JSONListField';

interface CMSFieldProps {
    field: FieldSchema;
    value: any;
    onChange: (value: any) => void;
    error?: string;
}

export function CMSField({ field, value, onChange, error }: CMSFieldProps) {
    switch (field.type) {
        case 'text':
        case 'textarea':
        case 'number':
        case 'url':
            return <TextField field={field} value={value} onChange={onChange} error={error} />;

        case 'boolean':
            return <BooleanField field={field} value={value} onChange={onChange} />;

        case 'select':
            return <SelectField field={field} value={value} onChange={onChange} error={error} />;

        case 'image':
            return <ImageUploadField field={field} value={value} onChange={onChange} error={error} />;

        case 'json_list':
            return <JSONListField field={field} value={value} onChange={onChange} error={error} />;

        default:
            return <TextField field={field} value={value} onChange={onChange} error={error} />;
    }
}
