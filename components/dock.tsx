import DockTabs from "./dockTabs";

interface DockProps {
  onTabChange: (value: string) => void;
  isLoading?: boolean;
}

export default function Dock({ onTabChange, isLoading = false }: DockProps) {
  return (
    <div className="fixed w-full bottom-0 p-4 z-50 left-0 bg-gradient-to-t from-background via-background">
      <div className="bg-background rounded-full border border-border p-0.5 mx-auto max-w-4xl h-full">
        <DockTabs onTabChange={onTabChange} isLoading={isLoading} />
      </div>
    </div>
  );
}
