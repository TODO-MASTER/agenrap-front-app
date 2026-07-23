'use client'
import { miniIcon } from "@/src/assets/images";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button";
import { LogoutButton } from "@/src/shared/components/agenrap-ui/button/logout-button";
import EditProfileDialog from "@/src/shared/components/agenrap-ui/dialog/edit-profile-dialog";
import { UserAuthRes } from "@/src/shared/services/user.service";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


export default function TopBusinessShowcase({user}:{user:UserAuthRes}){
      const [open, setOpen] = useState(false)
      const missingPhone = !user.telephone

      return (
        <div className="flex w-full flex-wrap items-center gap-y-4 justify-between relative">
            <div className="flex items-center gap-x-2">
              <Image src={miniIcon} alt="icone da marca agenrap" className="w-18 h-18" />
              <h3 className="font-tree lg:text-4xl md:text-2xl text-xl font-medium">
                Minhas agendas
              </h3>
           
            </div>
    <div className="
                  hidden md:flex
                  fixed bottom-6 left-6 z-50
                ">
                    <LogoutButton  />
                  
                </div>
            <div className="flex items-center gap-x-3 md:w-fit justify-end">
              <EditProfileDialog setOpen={setOpen} open={open} user={user} />
              
              <div className="flex gap-x-3 items-center">
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

                <div className="
                  md:relative md:bottom-auto md:right-auto md:z-auto
                  fixed bottom-6 right-6 z-50
                ">
                  <AgenrapLinkButton
                    hrefLink="/appointments?mode=search"
                    className="
                      flex items-center justify-center gap-x-2 transition-all duration-200 shadow-lg md:shadow-none
                      md:rounded-lg md:h-fit md:w-auto md:px-8 md:py-2
                      rounded-full w-14 h-14 p-0
                    "
                  >
                    <Search size={24} color="#fff" />
                    <span className="hidden md:inline">Adicionar</span>
                  </AgenrapLinkButton>
                  
                </div>
                  <div className="
                  md:hidden flex
                  fixed bottom-6 left-6 z-50
                ">
                    <LogoutButton  />
                  
                </div>
              </div>
             
            </div>
        </div>
      )
}