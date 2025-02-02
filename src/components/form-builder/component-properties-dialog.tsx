import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ComponentSchema } from "@/types/form-builder";
import { useState, useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import { Trash2 } from "lucide-react";

interface ComponentPropertiesDialogProps {
  component: ComponentSchema | null;
  onClose: () => void;
  onUpdate: (component: ComponentSchema) => void;
}

export function ComponentPropertiesDialog({
  component,
  onClose,
  onUpdate,
}: ComponentPropertiesDialogProps) {
  const [properties, setProperties] = useState<ComponentSchema | null>(null);

  useEffect(() => {
    setProperties(component);
  }, [component]);

  if (!properties) return null;

  const handleChange = (key: string, value: any) => {
    setProperties({ ...properties, [key]: value });
  };

  const handleOptionChange = (index: number, key: "label" | "value", newValue: string) => {
    const updatedOptions = [...(properties?.options || [])];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [key]: newValue,
    };
    handleChange("options", updatedOptions);
  };

  const handleSubmit = () => {
    if (properties) {
      onUpdate(properties);
    }
  };

  const renderOptions = () => {
    if (properties?.type === "select" || properties?.type === "radio") {
      return (
        <div>
          <Label>Options</Label>
          <br />
          {(properties.options || []).map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <div className="flex-1">
                <Input
                  value={option.label}
                  onChange={(e) => handleOptionChange(index, "label", e.target.value)}
                  placeholder={`Option ${index + 1} Label`}
                />
              </div>
              <div className="flex-1">
                <Input
                  value={option.value}
                  onChange={(e) => handleOptionChange(index, "value", e.target.value)}
                  placeholder={`Option ${index + 1} Value`}
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() =>
                  handleChange("options", [
                    ...properties.options!.slice(0, index),
                    ...properties.options!.slice(index + 1),
                  ])
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleChange("options", [
                ...(properties.options || []),
                { label: "", value: "" },
              ])
            }
          >
            Add Option
          </Button>
        </div>
      );
    }
  };

  // Conditionally render fields based on component type
  const renderFields = () => {
    switch (properties?.type) {
      case "button":
        return (
          <>
            <div>
              <Label>Label</Label>
              <Input
                value={properties.label}
                onChange={(e) => handleChange("label", e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="disabled"
                checked={properties.disabled || false}
                onCheckedChange={(checked) => handleChange("disabled", checked)}
              />
              <Label htmlFor="disabled">Disabled</Label>
            </div>
          </>
        );
      case "select":
      case "radio":
        return (
          <>
            <div>
              <Label>Key</Label>
              <Input
                value={properties.key}
                onChange={(e) => handleChange("key", e.target.value)}
              />
            </div>
            <div>
              <Label>Label</Label>
              <Input
                value={properties.label}
                onChange={(e) => handleChange("label", e.target.value)}
              />
            </div>
            {renderOptions()}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="disabled"
                checked={properties.disabled || false}
                onCheckedChange={(checked) => handleChange("disabled", checked)}
              />
              <Label htmlFor="disabled">Disabled</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={properties.validate?.required || false}
                onCheckedChange={(checked) =>
                  handleChange("validate", {
                    ...properties.validate,
                    required: checked,
                  })
                }
              />
              <Label htmlFor="required">Required</Label>
            </div>
          </>
        );
      case "textfield":
      case "email":
      case "phone":
      case "number":
        return (
          <>
            <div>
              <Label>Key</Label>
              <Input
                value={properties.key}
                onChange={(e) => handleChange("key", e.target.value)}
              />
            </div>
            <div>
              <Label>Label</Label>
              <Input
                value={properties.label}
                onChange={(e) => handleChange("label", e.target.value)}
              />
            </div>
            <div>
              <Label>Placeholder</Label>
              <Input
                value={properties.placeholder || ""}
                onChange={(e) => handleChange("placeholder", e.target.value)}
              />
            </div>
            <div>
              <Label>Prefix</Label>
              <Input
                value={properties.prefix || ""}
                onChange={(e) => handleChange("prefix", e.target.value)}
              />
            </div>
            <div>
              <Label>Suffix</Label>
              <Input
                value={properties.suffix || ""}
                onChange={(e) => handleChange("suffix", e.target.value)}
              />
            </div>
            <div>
              <Label>Default Value</Label>
              <Input
                value={properties.defaultValue || ""}
                onChange={(e) => handleChange("defaultValue", e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="disabled"
                checked={properties.disabled || false}
                onCheckedChange={(checked) => handleChange("disabled", checked)}
              />
              <Label htmlFor="disabled">Disabled</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={properties.validate?.required || false}
                onCheckedChange={(checked) =>
                  handleChange("validate", {
                    ...properties.validate,
                    required: checked,
                  })
                }
              />
              <Label htmlFor="required">Required</Label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Sheet open={!!component} onOpenChange={() => onClose()}>
      <SheetContent
        side="right"
        className="max-w-2xl w-full overflow-y-auto max-h-screen p-6"
      >
        <SheetHeader>
          <SheetTitle>Component Properties</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">{renderFields()}</div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
