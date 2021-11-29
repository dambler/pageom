import { DefaultActionOptions } from './DefaultActionOptions';

export type ClickActionOptions = DefaultActionOptions & {
  button?: 'left' | 'right' | 'middle';
  modifiers?: Array<'Alt' | 'Control' | 'Meta' | 'Shift'>;
};
