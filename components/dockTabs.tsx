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
    <Tabs value={activeTab} onValueChange={handleTabChange} className="items-center">
      <TabsList className="gap-1 bg-transparent w-full rounded-full flex items-center justify-evenly">
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-zinc-800 p-3 rounded-l-full rounded-r-sm w-full data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="currency-and-gold"
          className="data-[state=active]:bg-zinc-800 p-3 rounded-sm w-full data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
        >
          Currency & Gold
        </TabsTrigger>
        <TabsTrigger
          value="crypto"
          className="data-[state=active]:bg-zinc-800 p-3 rounded-r-full rounded-l-sm w-full data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
        >
          Crypto
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
