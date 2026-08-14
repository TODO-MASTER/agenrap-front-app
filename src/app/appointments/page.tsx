import { miniIcon } from "@/src/assets/images";
import BusinessDisplay from "@/src/features/customers/components/business-showcase/business-display";

import { UserProfile } from "@/src/features/customers/components/business-showcase/profile-form/profile-tabs/profile-tabs";
import TopBusinessShowcase from "@/src/features/customers/components/business-showcase/top-business-showcase";
import ScheduleEntrance from "@/src/features/customers/components/search-rap/schedule-entrance";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button";
import EditProfileDialog from "@/src/shared/components/agenrap-ui/dialog/edit-profile-dialog";
import { serverFetch } from "@/src/shared/lib/server-fetch.lib";
import { UserAuthRes } from "@/src/shared/services/user.service";
import { BusinessCtx } from "@/src/shared/types";
import { List, Search } from "lucide-react";
import Image from "next/image";
type PageMode = 'search' | 'list'

// export const dynamic = 'force-dynamic'

export default async function SearchingViewSchedulesPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>
}) {
  const [{ mode: rawMode }, res, user] = await Promise.all([
    searchParams,
    serverFetch<BusinessCtx[]>('business/search-all-business'),
    serverFetch<UserAuthRes>('user/get-one'),
  ])

  const mode: PageMode = (() => {
    if (res.length === 0) return 'search'
    if (rawMode === 'search') return 'search'
    return 'list'
  })()

  if (mode === 'search') {
    return (
      <div className="min-h-dvh flex pb-12 bg-(--agenrap-gray-200)">
        <div className="w-full max-w-3xl mx-auto flex flex-col px-6 md:px-10 pt-12 pb-8">
          <TopBusinessShowcase user={user} title="Buscar" searching bsnSize={res.length} />

          <div className="flex-1 flex flex-col items-center justify-center gap-y-10 py-10">
            <div className="relative w-full flex justify-center">
              <div className="absolute inset-x-0 top-1/2 h-px bg-(--agenrap-brown-500)/10" />
              <span className="relative bg-(--agenrap-gray-200) px-4 font-tree text-xs uppercase tracking-[0.3em] text-(--agenrap-brown-500)/50">
                encontre e agende em segundos
              </span>
            </div>

            <ScheduleEntrance />

          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="min-h-dvh flex  pb-12 bg-(--agenrap-gray-200) flex-col">
        <div className="w-full max-w-6xl mx-auto flex flex-col px-6 md:px-10 pt-12 pb-16 gap-y-10">
          <TopBusinessShowcase user={user} />
          <BusinessDisplay business={res} />
        </div>
      </div>
    )
  }
}
