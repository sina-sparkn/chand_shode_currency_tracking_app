import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface DockTabsProps {
  onTabChange: (value: string) => void;
  isLoading?: boolean;
}

export default function DockTabs({
  onTabChange,
  isLoading = false,
}: DockTabsProps) {
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
      <TabsList className="bg-transparent w-full rounded-full flex items-center justify-evenly">
        <TabsTrigger
          value="all"
          className="dark:data-[state=active]:bg-zinc-800 data-[state=active]:bg-white p-4 rounded-l-4xl rounded-r-sm w-full data-[state=active]:text-sidebar-accent-foreground data-[state=active]:shadow-none"
        >
          {activeTab === "all" && isLoading && (
            <div className="absolute inset-0 animate-pulse"></div>
          )}
          <span className="relative z-10">All</span>
        </TabsTrigger>
        <TabsTrigger
          value="currency-and-gold"
          className="dark:data-[state=active]:bg-zinc-800 px-5 data-[state=active]:bg-white p-4 w-full rounded-sm data-[state=active]:text-sidebar-accent-foreground data-[state=active]:shadow-none"
        >
          {activeTab === "currency-and-gold" && isLoading && (
            <div className="absolute inset-0 animate-pulse"></div>
          )}
          <span className="relative z-10">Currency&Gold</span>
        </TabsTrigger>
        <TabsTrigger
          value="crypto"
          className="dark:data-[state=active]:bg-zinc-800 data-[state=active]:bg-white p-4 rounded-r-4xl rounded-l-sm w-full  data-[state=active]:text-sidebar-accent-foreground data-[state=active]:shadow-none"
        >
          {activeTab === "crypto" && isLoading && (
            <div className="absolute inset-0 animate-pulse"></div>
          )}
          <span className="relative z-10">Crypto</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
