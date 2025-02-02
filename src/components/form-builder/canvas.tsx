import { useDrop } from "react-dnd";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComponentSchema } from "@/types/form-builder";
import { FormRenderer } from "./form-renderer";
import { useState } from "react";
import { ComponentPropertiesDialog } from "./component-properties-dialog";
import { ChevronUp, ChevronDown, X, Settings, CloudDownload } from "lucide-react";

interface CanvasProps {
  components: ComponentSchema[];  // Pass the components as a prop
  onComponentsChange?: (components: ComponentSchema[]) => void;
}

export function Canvas({ components, onComponentsChange }: CanvasProps) {
  const [selectedComponent, setSelectedComponent] = useState<ComponentSchema | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FORM_COMPONENT",
    drop: (item: any) => {
      const newComponent: ComponentSchema = {
        type: item.type,
        label: item.label,
        key: `${item.type}_${Date.now()}`,
        input: true,
      };
      onComponentsChange?.([...components, newComponent]);  // Update the components state
      setSelectedComponent(newComponent);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleComponentUpdate = (updatedComponent: ComponentSchema) => {
    onComponentsChange?.(
      components.map((c) => (c.key === updatedComponent.key ? updatedComponent : c))
    );
    setSelectedComponent(null);
  };

  const moveComponent = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= components.length) return;

    const newComponents = [...components];
    const [removed] = newComponents.splice(index, 1);
    newComponents.splice(newIndex, 0, removed);
    onComponentsChange?.(newComponents);
  };

  const removeComponent = (index: number) => {
    const newComponents = [...components];
    newComponents.splice(index, 1);
    onComponentsChange?.(newComponents);
  };

  return (
    <div className="flex-1">
      <Card
        ref={drop}
        className={`min-h-[calc(100vh-8rem)] p-6 relative ${
          isOver ? "border-primary border-2" : ""
        }`}
      >
        {components.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground p-10 rounded-lg bg-slate-400 dark:bg-slate-900 text-white">
            <CloudDownload className="mr-2 h-4 w-4" /> 
            Drag and drop components here
          </div>
        ) : (
          <div className="space-y-4">
            {components.map((component, index) => (
              <div key={component.key} className="relative group">
                <div className="absolute right-0 top-0 -mt-2 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => moveComponent(index, "up")}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => moveComponent(index, "down")}
                    disabled={index === components.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setSelectedComponent(component)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeComponent(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative border rounded-md p-4 hover:border-primary transition-colors cursor-pointer">
                  <FormRenderer components={[component]} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <ComponentPropertiesDialog
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
        onUpdate={handleComponentUpdate}
      />
    </div>
  );
}
