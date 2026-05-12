'use client'
import { Dispatch, SetStateAction, useTransition } from "react";
import { toast } from "sonner";
import { JoinScheduleByRapName } from "../services/customer.service";
import { useRouter, useSearchParams } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { GetFullDays, saveAppointment } from "@/src/shared/services/appointment.service";
import { BusinessCtx } from "@/src/shared/types";
import { AppointmentReq } from "@/src/shared/types/appointment.types";
import { GetBusinessPerRap } from "@/src/shared/services/business.service";


export function useCustomerActions() {
  const [isGetOnePending, startGetOneTransition] = useTransition();
  const [isJoinPending, startJoinTransition] = useTransition();
  const [isSaveAppointmentPending, startSaveAppointment] = useTransition();
  const [isStartBookedDaysTransition, startBookedDaysTransition] = useTransition();
  const router = useRouter();
   const useSearchParam = useSearchParams()
   const serviceId = useSearchParam.get("svs")

  const handleSearchByRap = (businessName: string, setSearchBsn: Dispatch<SetStateAction<"not-init" | BusinessCtx | null>>) => {

    startGetOneTransition(async () => {
      try {

        const targetBuinessWithServices = await GetBusinessPerRap(businessName)
        setSearchBsn(targetBuinessWithServices)
      } catch (e) {
        if (isRedirectError(e)) throw e;
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar entrar em agenda');
      }
    })
  }
  const handleJoinScheduleByRap = async (searchBsn: string) => {
    if (searchBsn == null || searchBsn == "not-init") return

    startJoinTransition(async () => {
      try {

        const targetBuinessWithServices = await JoinScheduleByRapName(searchBsn)

        if (targetBuinessWithServices.data == null) {
          toast.error(targetBuinessWithServices.message || "você já está aqui!")
          router.push("/appointments?mode=list")

        }else{
        toast.success(targetBuinessWithServices.message || "entrando em agenda")
        router.push(`/${targetBuinessWithServices.data.name}`)
        }
      } catch (e) {
        if (isRedirectError(e)) throw e;
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar entrar em agenda');

      }


    })
  }
    const handleSaveAppointment = async (date:string,hour:string) => {
    

    startSaveAppointment(async () => {
      try {

        var mountAppointmentBody :AppointmentReq ={
          name:null,
          date:date,
          hour:hour
        } 

        const targetBuinessWithServices = await saveAppointment(mountAppointmentBody,serviceId!,null)

        if (targetBuinessWithServices.data == null) {
          toast.error(targetBuinessWithServices.message || "Algo deu errado, tente mais tarde!")
          router.push("/appointments?mode=list")

        }else{
        toast.success(targetBuinessWithServices.message || "entrando em agenda")
         router.push("/appointments?mode=list")
        }
      } catch (e) {
        if (isRedirectError(e)) throw e;
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar entrar em agenda');

      }


    })
  }
  const handleMonthChange = async (month: Date,setFullDays:Dispatch<SetStateAction<string[]>>) => {
    startBookedDaysTransition(async () => {
    const bookedDays = await GetFullDays(Number(serviceId), month.getMonth()+1, month.getFullYear())
    setFullDays(bookedDays.data.days) 
        })
}

  return { handleSearchByRap, handleJoinScheduleByRap, isGetOnePending, isJoinPending,isSaveAppointmentPending,handleSaveAppointment,handleMonthChange,isStartBookedDaysTransition };
}