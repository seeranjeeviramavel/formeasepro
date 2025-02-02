
# FormEasePro

FormEasePro is a dynamic, JSON Schema-driven form builder and renderer application built using React, Shadcn UI, and Tailwind CSS. It allows you to easily create, customize, and render forms through a drag-and-drop interface. The form schema is auto-generated as you design the form, making it intuitive for developers and designers alike.

## Features

- **Drag and Drop Interface**: Effortlessly build forms by dragging and dropping form elements into a canvas.
- **JSON Schema Generation**: Automatically generate JSON schema based on the layout of the form.
- **Form Rendering**: Render the form dynamically using the generated JSON schema.
- **Shadcn UI Integration**: A seamless, modern UI powered by Shadcn components.
- **Component Support**: Multiple form components such as text fields, number fields, text areas, checkboxes, radio buttons, selects, and more.

## Available Form Components

The following components are available for inclusion in your forms:

- **Text Field**: A basic text input field.
- **Number**: A number input field.
- **Text Area**: A multi-line text input field.
- **Checkbox**: A checkbox field for selecting options.
- **Radio**: A radio button group for selecting one option.
- **Select**: A dropdown select input.
- **Email**: A text field that validates email input.
- **Date**: A date picker input.
- **Phone**: A phone number input field.
- **Submit Button**: A button to submit the form.

## Installation

To get started with the FormEasePro app, follow the steps below to set up your local environment:

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/formeasepro.git
cd formeasepro
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the form builder in action.

## How It Works

### Form Builder
- The form builder allows you to drag and drop form components like text fields, numbers, checkboxes, etc., directly onto the canvas.
- As you design the form, the underlying JSON schema is automatically generated, reflecting the structure of your form.

### Form Renderer
- Once the form is built, you can render it using the generated JSON schema.
- The app will interpret the JSON schema and display the form dynamically.

### Form Components Example

```js
{
    "type": "textfield",
    "label": "Name",
    "key": "textfield_1738511824482",
    "input": true,
    "placeholder": "Enter your Name",
  },
```

The above JSON object represents a text field component with an associated icon and label.

## Development

If you wish to contribute to the development of FormEasePro, follow the steps below to set up your development environment:

1. Fork the repository and clone it locally.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Create a feature branch: `git checkout -b feature-branch`
5. Make your changes and submit a pull request.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Shadcn UI**: A UI library for React to provide modern, flexible components.
- **Tailwind CSS**: Utility-first CSS framework for building custom designs.
- **React DnD**: A library for implementing drag-and-drop functionality in React.
- **Zod**: Schema validation for inputs and form data.
- **Vite**: A fast build tool for modern web projects.

## Contributing

We welcome contributions! If you would like to contribute to FormEasePro, feel free to submit an issue or a pull request. Please ensure your code follows the project's coding standards and passes all tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
