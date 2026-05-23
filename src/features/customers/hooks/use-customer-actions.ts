'use client'
import { Dispatch, SetStateAction, useTransition } from "react";
import { toast } from "sonner";
import { ChangePasswordAction, JoinScheduleByRapName, UpdatePhoneAction } from "../services/customer.service";
import { useRouter, useSearchParams } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { GetFullDays, handleCancelAppointment, saveAppointment } from "@/src/shared/services/appointment.service";
import { BusinessCtx } from "@/src/shared/types";
import { AppointmentReq } from "@/src/shared/types/appointment.types";
import { GetBusinessPerRap } from "@/src/shared/services/business.service";
import { ContactSchema, PasswordSchema } from "@/src/features/customers/schemas/customer-profile.schema";


export function useCustomerActions() {
  const [isGetOnePending, startGetOneTransition] = useTransition();
  const [isJoinPending, startJoinTransition] = useTransition();
  const [isSaveAppointmentPending, startSaveAppointment] = useTransition();
  const [isStartBookedDaysTransition, startBookedDaysTransition] = useTransition();
  const [isStartCancelApptTransition,startCancelApptTransition] = useTransition()
      const [isPhonePending, startPhoneTransition] = useTransition()
    const [isPasswordPending, startPasswordTransition] = useTransition()
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
    if(serviceId==null)return
    startBookedDaysTransition(async () => {
    const bookedDays = await GetFullDays(Number(serviceId), month.getMonth()+1, month.getFullYear())
    setFullDays(bookedDays.data.days) 
        })
}
  const handleCancelAppointmentAction = async (appontmentId:number,businessId:number,customerId:number|null=null,onSucess:()=>void) => {
    if(!businessId){
              toast.error('Verifique o arroba rap e tente novamente! :/');
      return
    }
    startCancelApptTransition(async () => {
    const res =await  handleCancelAppointment(businessId,appontmentId,customerId)
    try{
      if(res.data){
        toast.success(res.message??"agendamento está cancelado!")
        onSucess()
      }
    } catch (e) {
        if (isRedirectError(e)) throw e;
        toast.error(e instanceof Error ? e.message : 'Erro desconhecido');

      }

        })
}
   function handleUpdatePhone(
        values: ContactSchema,
        onSuccess: () => void,
        onError: () => void
    ) {
        startPhoneTransition(async () => {
            try {
                await UpdatePhoneAction(values.telephone ?? '')
                toast.success('Telefone atualizado com sucesso!')
                onSuccess()
            } catch (e) {
                toast.error(e instanceof Error ? e.message : 'Erro ao atualizar telefone')
                onError()
            }
        })
    }
 
    function handleChangePassword(
        values: PasswordSchema,
        onSuccess: () => void,
        onError: () => void
    ) {
        startPasswordTransition(async () => {
            try {
                await ChangePasswordAction(values.currentPassword, values.newPassword)
                toast.success('Senha alterada com sucesso!')
                onSuccess()
            } catch (e) {
                toast.error(e instanceof Error ? e.message : 'Erro ao alterar senha')
                onError()
            }
        })
    }
 

  return { handleSearchByRap, handleJoinScheduleByRap,handleCancelAppointmentAction,
    handleChangePassword,
    handleUpdatePhone,
    handleSaveAppointment,handleMonthChange,
    isStartCancelApptTransition, isGetOnePending, isJoinPending,isSaveAppointmentPending,isStartBookedDaysTransition,isPhonePending,isPasswordPending };
}