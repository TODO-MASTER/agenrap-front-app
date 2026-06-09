'use client'
import { miniIcon } from "@/src/assets/images";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button";
import EditProfileDialog from "@/src/shared/components/agenrap-ui/dialog/edit-profile-dialog";
import { UserAuthRes } from "@/src/shared/services/user.service";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


export default function TopBusinessShowcase({user}:{user:UserAuthRes}){
      const [open, setOpen] = useState(false)
        const missingPhone = !user.telephone
    return(

  
<div className="flex w-full flex-wrap items-center gap-y-4 justify-between">
            <div className="flex items-center gap-x-2">
              <Image src={miniIcon} alt="icone da marca agenrap" className="w-18 h-18" />
              <h3 className="font-tree lg:text-4xl md:text-2xl text-xl font-medium">
                Minhas agendas
              </h3>
            </div>

            <div className="flex items-center gap-x-3 md:w-fit w-full justify-end">
              <EditProfileDialog setOpen={setOpen} open={open} user={user} />
              <div className="flex gap-x-1 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                title="Meu perfil"
                className="relative w-9 h-9 rounded-full flex items-center justify-center
                   text-xs font-bold text-white cursor-pointer
                   border-2 border-(--agenrap-brown-500) hover:border-(--agenrap-purple-500)
                   hover:ring-2 hover:ring-(--agenrap-purple-500)/20 transition-all"
                style={{ background: 'var(--agenrap-brown-500)' }}
              >
                {user.initials}
                {missingPhone && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-(--agenrap-gray-200)"
                    style={{ background: 'var(--agenrap-yellow-500)' }}
                  />
                )}
              </button>
              <AgenrapLinkButton
                hrefLink="/appointments?mode=search"
                className="flex items-center px-8 gap-x-2"
              >
                <Search size={25} color="#fff" />
                Adicionar
              </AgenrapLinkButton>
              </div>
            </div>
          </div>

            )
}
