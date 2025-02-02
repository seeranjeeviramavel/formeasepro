import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  TextIcon, 
  Hash, 
  AlignLeft, 
  CheckSquare, 
  Radio, 
  List, 
  Mail,
  Calendar,
  Phone,
  SendHorizontal
} from "lucide-react";
import { useDrag } from "react-dnd";

const components = [
  { type: "textfield", icon: TextIcon, label: "Text Field" },
  { type: "number", icon: Hash, label: "Number" },
  { type: "textarea", icon: AlignLeft, label: "Text Area" },
  { type: "checkbox", icon: CheckSquare, label: "Checkbox" },
  { type: "radio", icon: Radio, label: "Radio" },
  { type: "select", icon: List, label: "Select" },
  { type: "email", icon: Mail, label: "Email" },
  { type: "date", icon: Calendar, label: "Date" },
  { type: "phone", icon: Phone, label: "Phone" },
  { type: "button", icon: SendHorizontal , label: "Submit" },

];

const DraggableComponent = ({ type, icon: Icon, label }: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FORM_COMPONENT",
    item: { type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-move ${isDragging ? "opacity-50" : ""}`}
    >
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 my-1 bg-transparent text-foreground hover:bg-muted"
      >
        <Icon className="h-4 w-4 text-foreground" />
        {label}
      </Button>
    </div>
  );
};


export function Sidebar() {
  return (
    <Card className="h-full w-64 p-4">
      <h2 className="font-semibold mb-4">Components</h2>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-1">
          {components.map((component) => (
            <DraggableComponent key={component.type} {...component} />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}