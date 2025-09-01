import DockTabs from "./dockTabs";

export default function Dock() {
  return (
    <div className="fixed w-full bottom-0 p-4 left-0 bg-gradient-to-t from-background via-background">
      <div className="bg-background rounded-full border p-5 py-7 w-full h-full">
        <DockTabs />
      </div>
    </div>
  );
}
