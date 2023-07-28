import type { HTMLAttributes } from 'react';

import type { convertHtmlToReact } from '@hedgedoc/html-to-react';

import { Button } from '../button';
import type { ColProps, GridProps } from '../grid';
import { Col, Grid } from '../grid';
import { Subtitle } from '../typography';
import { Input } from './input';
import { Select, type SelectOptionsType } from './select';
import { TextArea } from './text-area';

export type InputTypes = 'text' | 'select' | 'textarea';

type InputTypeAttribute =
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'hidden'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

type CommonField = {
  name: string;
  label: ReturnType<typeof convertHtmlToReact>;
  visible?: boolean;
  colSpan?: ColProps['colSpan'];
};

type TextField = CommonField & {
  type: InputTypeAttribute;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  disabled?: boolean;
};

type TextAreaField = CommonField & {
  type: 'textarea';
  disabled?: boolean;
};

type SelectField = CommonField & {
  type: 'select';
  options: Array<SelectOptionsType>;
};

type SubtitleField = CommonField & {
  type: 'subtitle';
};

type SubmitButton = CommonField & {
  type: 'submit';
  disabled?: boolean;
};

type AllFields =
  | TextField
  | TextAreaField
  | SelectField
  | SubtitleField
  | SubmitButton;

const isTextAreaField = (field: AllFields): field is TextAreaField =>
  field.type === 'textarea';

const isSelectField = (field: AllFields): field is SelectField =>
  field.type === 'select';

const isSubtitleField = (field: AllFields): field is SubtitleField =>
  field.type === 'subtitle';

const isSubmitButton = (field: AllFields): field is SubmitButton =>
  field.type === 'submit';

export type FormBuilderProps = {
  fields: Array<AllFields>;
  cols?: GridProps['cols'];
};

export const FormBuilder = ({ fields, cols = 2 }: FormBuilderProps) => {
  return (
    <Grid cols={cols}>
      {fields
        .filter(({ visible }) => visible !== false)
        .map((field) => {
          if (isSelectField(field)) {
            return (
              <Col colSpan={field.colSpan} key={field.name}>
                <Select
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  options={field.options}
                />
              </Col>
            );
          }

          if (isTextAreaField(field)) {
            return (
              <Col colSpan={field.colSpan} key={field.name}>
                <TextArea name="address" label={field.label} />
              </Col>
            );
          }

          if (isSubtitleField(field)) {
            return (
              <Col colSpan={field.colSpan || 2} key={field.name}>
                <Subtitle>{field.label}</Subtitle>
              </Col>
            );
          }

          if (isSubmitButton(field)) {
            return (
              <Col colSpan={field.colSpan} key={field.name}>
                <Button type="submit" disabled={field.disabled}>
                  {field.label}
                </Button>
              </Col>
            );
          }

          return (
            <Col colSpan={field.colSpan} key={field.name}>
              <Input
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                disabled={field.disabled}
              />
            </Col>
          );
        })}
    </Grid>
  );
};