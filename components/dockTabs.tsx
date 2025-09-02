import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Banknote, Bitcoin, CircleStopIcon, Coins, House } from "lucide-react";
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
          className="flex flex-col gap-1 dark:data-[state=active]:bg-zinc-800 data-[state=active]:bg-white p-2 rounded-l-4xl rounded-r-sm w-full data-[state=active]:text-sidebar-accent-foreground data-[state=active]:shadow-none"
        >
          <House size={18} />
          <span className="relative text-xs z-10">Home</span>
        </TabsTrigger>
        <TabsTrigger
          value="currency"
          className="flex flex-col gap-1 dark:data-[state=active]:bg-zinc-800 px-5 data-[state=active]:bg-white p-2 w-full rounded-sm data-[state=active]:text-sidebar-accent-foreground data-[state=active]:shadow-none"
        >
          <Banknote size={18} />
          <span className="relative text-xs z-10">Currency</span>
        </TabsTrigger>
        <TabsTrigger
          value="gold"
          className="flex flex-col gap-1 dark:data-[state=active]:bg-zinc-800 px-5 data-[state=active]:bg-white p-2 w-full rounded-sm data-[state=active]:text-sidebar-accent-foreground data-[state=active]:shadow-none"
        >
          <CircleStopIcon size={18} />
          <span className="relative text-xs z-10">Gold</span>
        </TabsTrigger>
        <TabsTrigger
          value="crypto"
          className="flex flex-col gap-1 dark:data-[state=active]:bg-zinc-800 data-[state=active]:bg-white p-2 rounded-r-4xl rounded-l-sm w-full data-[state=active]:text-sidebar-accent-foreground data-[state=active]:shadow-none"
        >
          <Bitcoin size={18} />
          <span className="relative text-xs z-10">Crypto</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
