import DefaultActionOptions from './DefaultActionOptions';

type ClickActionOptions = DefaultActionOptions & {
  button?: 'left' | 'right' | 'middle';
  modifiers?: Array<'Alt' | 'Control' | 'Meta' | 'Shift'>;
};

export default ClickActionOptions;
