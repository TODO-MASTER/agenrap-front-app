"use client"

import Link from "next/link";
import { useSearchParams, redirect } from "next/navigation";
import { useEffect } from "react";
import { CalendarClock, LayoutDashboard, Scissors } from "lucide-react";

export default function DashboardMobileNav() {
  const searchParams = useSearchParams();
  const rap = searchParams.get("rap");

  useEffect(() => {
    if (!rap) {
      redirect("/login");
    }
  }, [rap]);

  if (!rap) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-(--agenrap-brown-200) border-t border-black/20 grid grid-cols-3 z-30">
      <Link href={`/dashboard/journey/list?rap=${rap}`} className="flex flex-col items-center justify-center gap-y-0.5 text-black/70 active:text-[#BB77EE]">
        <CalendarClock size={20} />
        <span className="text-[10px] font-tree font-medium">Expediente</span>
      </Link>
      <Link href={`/dashboard?rap=${rap}`} className="flex flex-col items-center justify-center gap-y-0.5 text-black/70 active:text-[#BB77EE]">
        <LayoutDashboard size={20} />
        <span className="text-[10px] font-tree font-medium">Dashboard</span>
      </Link>
      <Link href={`/dashboard/service/list?rap=${rap}`} className="flex flex-col items-center justify-center gap-y-0.5 text-black/70 active:text-[#BB77EE]">
        <Scissors size={20} />
        <span className="text-[10px] font-tree font-medium">Serviços</span>
      </Link>
    </div>
  );
}