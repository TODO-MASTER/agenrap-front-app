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

export default async function ServiceSchedulePage({
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
      <div className="h-dvh flex bg-(--agenrap-gray-200) gap-y-3 flex-col items-center justify-center w-fit mx-auto">
        <header className="flex flex-col gap-1 items-center justify-center ">
          <Image src={miniIcon} alt="" loading="eager" className="w-50  " />
          <p className="font-cinzel font-bold md:text-3xl text-xl text-center"><span className="font-tree font-semibold">Buscando serviço com</span> Agenrap</p>
        </header>
        <div className="flex flex-col w-full gap-y-2 items-end">
          <ScheduleEntrance />
          {res.length > 0 &&
            <AgenrapLinkButton hrefLink="/appointments?mode=list" className="flex items-center rounded-md  justify-center  w-fit self-end px-4 py-2 h-fit gap-x-2"   >
              <List size={25} color="#fff" />
              Agendas</AgenrapLinkButton>
          }

        </div>
      </div>
    )
  } else {
    return (

      <div className="h-dvh flex bg-(--agenrap-gray-200) flex-col">
        <div className="h-dvh rounded-md p-8 gap-y-8 pt-12 flex flex-col w-full">

          <TopBusinessShowcase user={user}/>

          <BusinessDisplay business={res} />
        </div>
      </div>

    )
  }

}
