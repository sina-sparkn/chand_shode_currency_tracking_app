import DockTabs from "./dockTabs";

interface DockProps {
  onTabChange: (value: string) => void;
}

export default function Dock({ onTabChange }: DockProps) {
  return (
    <div className="fixed w-full bottom-0 p-4 z-50 left-0 bg-gradient-to-t from-background via-background">
      <div className="bg-background rounded-full border p-0.5 mx-auto max-w-4xl h-full">
        <DockTabs onTabChange={onTabChange} />
      </div>
    </div>
  );
}
