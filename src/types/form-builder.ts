export interface ComponentSchema {
  label: string;
  type: string;
  key: string;
  input: boolean;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  description?: string;
  tooltip?: string;
  required?: boolean;
  action?: string;
  options?: any[];
  validate?: {
    required?: boolean;
    pattern?: string;
    minLength?: string;
    maxLength?: string;
    custom?: string;
  };
  defaultValue?: any;
  multiple?: boolean;
  labelPosition?: 'top' | 'left' | 'right' | 'bottom';
  hidden?: boolean;
  clearOnHide?: boolean;
  unique?: boolean;
  persistent?: boolean;
  protected?: boolean;
  tableView?: boolean;
  modalEdit?: boolean;
  widget?: {
    type: string;
  };
  inputType?: string;
  inputFormat?: string;
  inputMask?: string;
  spellcheck?: boolean;
  customClass?: string;
  tabindex?: string;
  autofocus?: boolean;
  id?: string;
}

export interface FormSchema {
  components: ComponentSchema[];
  title?: string;
  display?: 'form' | 'wizard';
  theme?: 'light' | 'dark';
}