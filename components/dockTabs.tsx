import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface DockTabsProps {
  onTabChange: (value: string) => void;
}

export default function DockTabs({ onTabChange }: DockTabsProps) {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="items-center"
    >
      <TabsList className="gap-1 bg-transparent w-full rounded-full flex items-center justify-evenly">
        <TabsTrigger
          value="all"
          className="dark:data-[state=active]:bg-zinc-800 data-[state=active]:bg-white p-3 rounded-l-4xl rounded-r-sm flex-1 data-[state=active]:text-sidebar-accent-foreground data-[state=active]:shadow-none"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="currency-and-gold"
          className="dark:data-[state=active]:bg-zinc-800 data-[state=active]:bg-white p-3 flex-1 !rounded-sm data-[state=active]:text-sidebar-accent-foreground data-[state=active]:shadow-none"
        >
          Currency & Gold
        </TabsTrigger>
        <TabsTrigger
          value="crypto"
          className="dark:data-[state=active]:bg-zinc-800 data-[state=active]:bg-white p-3 rounded-r-4xl rounded-l-sm flex-1 data-[state=active]:text-sidebar-accent-foreground data-[state=active]:shadow-none"
        >
          Crypto
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
