import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/form-builder/sidebar";
import { Canvas } from "@/components/form-builder/canvas";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";
import { ComponentSchema } from "@/types/form-builder";
import { FormRenderer } from "@/components/form-builder/form-renderer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github } from "lucide-react";
import { Button } from "./components/ui/button";

function App() {
  const [components, setComponents] = useState<ComponentSchema[]>([
    {
      type: "textfield",
      label: "Name",
      key: "textfield_1738511824482",
      input: true,
      placeholder: "Enter your Name",
      prefix: "",
    },
    {
      type: "number",
      label: "Age",
      key: "number_1738511853329",
      input: true,
      placeholder: "Enter your age",
    },
    {
      type: "radio",
      label: "Gender",
      key: "radio_1738511875719",
      input: true,
      options: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "Female",
        },
      ],
    },
    {
      type: "button",
      label: "Submit",
      key: "button_1738511899808",
      input: true,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="light">
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex h-14 items-center px-4">
            <h1 className="text-lg font-semibold">FormEasePro</h1>
            <div className="ml-auto flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <a>
                <Github className="h-4 w-4" />

                </a>
              </Button>
              <ModeToggle />
            </div>
          </div>
        </header>
        <main className="container p-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-1 md:col-span-2 sm:col-span-6">
              <Sidebar />
            </div>
            <div className="col-span-1 md:col-span-6 sm:col-span-6">
              <Canvas
                components={components}
                onComponentsChange={setComponents}
              />
            </div>
            <div className="col-span-1 md:col-span-4">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="preview" className="flex-1">
                    Form Preview
                  </TabsTrigger>
                  <TabsTrigger value="json" className="flex-1">
                    JSON Structure
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="json">
                  <Card className="p-4">
                    <pre className="text-sm overflow-auto max-h-[calc(100vh-12rem)]">
                      <code>{JSON.stringify(components, null, 2)}</code>
                    </pre>
                  </Card>
                </TabsContent>
                <TabsContent value="preview">
                  <Card className="p-4">
                    <h2 className="text-lg font-semibold mb-4">
                      Form Preview
                    </h2>
                    <FormRenderer components={components} readOnly />
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </DndProvider>
  </ThemeProvider>
  );
}

export default App;
