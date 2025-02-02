import { useState, useEffect } from "react";
import { ComponentSchema } from "@/types/form-builder";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FormRendererProps {
  components: ComponentSchema[];
  onComponentClick?: (component: ComponentSchema) => void;
  readOnly?: boolean;
}

export function FormRenderer({ components, onComponentClick, readOnly = false }: FormRendererProps) {
  const initializeFormData = (components: ComponentSchema[]) => {
    const initialData: { [key: string]: any } = {};
    components.forEach((component) => {
      if (component.defaultValue !== undefined) {
        initialData[component.key] = component.defaultValue;
      }
    });
    return initialData;
  };

  const [formData, setFormData] = useState<{ [key: string]: any }>(initializeFormData(components));

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", JSON.stringify(formData, null, 2));
    alert("Form Submitted! Check the console for data.");
  };

  const renderComponent = (component: ComponentSchema) => {
    if (component.hidden) return null;

    const commonProps = {
      id: component.key,
      disabled: component.disabled,
      placeholder: component.placeholder || "",
      defaultValue: formData[component.key] || component.defaultValue || "",
      spellCheck: component.spellcheck,
      onChange: (e: any) => handleChange(component.key, e.target.value),
      className: `${component.prefix || component.suffix ? "rounded-none" : ""} ${readOnly ? "" : "cursor-pointer"}`,
    };

    const labelComponent = !component.hideLabel && (
      <Label htmlFor={component.key} className="mb-2 block">
        {component.label}
        {component.validate?.required && <span className="text-destructive ml-1">*</span>}
      </Label>
    );

    switch (component.type) {
      case "textfield":
      case "email":
      case "phone":
      case "number":
        return (
          <div key={component.key} className="mb-4">
            {labelComponent}
            <Input {...commonProps} type={component.inputType || "text"} />
          </div>
        );

      case "textarea":
        return (
          <div key={component.key} className="mb-4">
            {labelComponent}
            <Textarea {...commonProps} />
          </div>
        );

      case "checkbox":
        return (
          <div key={component.key} className="flex items-center space-x-2 mb-4">
            <Checkbox
              id={component.key}
              disabled={component.disabled}
              checked={formData[component.key] || !!component.defaultValue}
              onCheckedChange={(checked) => handleChange(component.key, checked)}
            />
            <Label htmlFor={component.key}>{component.label}</Label>
          </div>
        );

      case "radio":
        return (
          <div key={component.key} className="mb-4">
            {labelComponent}
            <RadioGroup value={formData[component.key] || component.defaultValue || ""} onValueChange={(value) => handleChange(component.key, value)}>
              {(component.options || []).map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${component.key}-${option.value}`} />
                  <Label htmlFor={`${component.key}-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case "select":
        return (
          <div key={component.key} className="mb-4">
            {labelComponent}
            <Select value={formData[component.key] || component.defaultValue || ""} onValueChange={(value) => handleChange(component.key, value)}>
              <SelectTrigger>
                <SelectValue placeholder={component.placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {(component.options || []).map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "button":
        return (
          <div key={component.key} className="mb-4">
            <Button className="w-full mt-4" onClick={handleSubmit}>
              {component.label || "Submit"}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="space-y-4">{components.map(renderComponent)}</div>;
}
