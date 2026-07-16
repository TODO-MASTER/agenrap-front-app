'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useTransition } from "react";
import { InitialatSignSchema } from "../schemas/business.schema";
import { createBusinessByUrlAction, deleteCustomerAsync } from "../services/business.service";
import { toast } from "sonner";
import { EditBusinessWorkingPeriodSchema, InitialBusinessWeeksSchema } from "@/src/features/business/schemas/business-week.schema";
import { CreatWorkingPeriod, DeleteWkpService, EditWorkingPeriodService, GetWorkingPeriodPerRap } from "../services/working-period.service";
import { EditBusinessServiceSchema, InitialBusinessServiceSchema } from "@/src/features/business/schemas/business-service.schema";
import { timeUtils } from "@/src/shared/utils/time.utils";
import { currencyUtils } from "@/src/shared/utils/currency.utils";
import { CreateANewService, DeleteServiceService, EditServiceService } from "../services/service.service";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useBusinessStore } from "@/src/shared/store/use-business.store";
import { normalizeWeek } from "@/src/shared/utils/normalize-week.utils";
import { GetBusinessPerRap } from "@/src/shared/services/business.service";
import { saveAppointment } from "@/src/shared/services/appointment.service";
import { AppointmentReq } from "@/src/shared/types/appointment.types";
import { completeAllAppointmentsAsync, CompleteAppointmentsReq } from "@/src/features/business/services/appointment.service";
import { formatPublicHandle } from "@/src/shared/utils/formatters.utils";
import { useSectionParams } from "@/src/shared/hooks/use-section-params";
import { SubscriptionRequiredError } from "@/src/shared/utils/errors";
import { handleActionError } from "@/src/shared/lib/handle-action-error";
export function useBusinessActions() {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const tgService = useBusinessStore(bs => bs.selectedService)
  const tgWkp = useBusinessStore(bs => bs.selectedWorkingPeriod)
  const setWeeks= useBusinessStore(bs=>bs.setWeeks)
  const usePathName = usePathname();
  
  const setBusiness = useBusinessStore((state) => state.setBusiness)

function handleCreateBusinessAction(values: InitialatSignSchema) {
    startTransition(async () => {
        try {
            const data = await createBusinessByUrlAction({
                name: values.business.name,
                atSign: values.business.atSign,
            })
            toast.success(data.message || 'Negócio cadastrado!')
        } catch (e) {
            if (isRedirectError(e)) throw e
            toast.error(e instanceof Error ? e.message : 'Erro ao tentar cadastrar negócio')
        }
    })
}
  function handleCreateWkPeriodAction(values: InitialBusinessWeeksSchema,onSuccess?:()=>void) {
    const atSign = searchParams.get("rap")
    let bodyMount = {
      weeks: values.business.weeks.map(wkp => {
        return {
          week: wkp.name,
          initial: wkp.initial,
          end: wkp.end
        }
      })
    }
    startTransition(async () => {
      try {
        if (!atSign) {
          router.push("/login")
        } else {
          const data = await CreatWorkingPeriod(bodyMount, atSign);
          toast.success(data.message || 'Periodo cadastrado!');
          //  

          if (!data.data.alreadyInitial) {
            router.push(`/business/services?rap=${formatPublicHandle(atSign)}`)
          }
          else if (usePathName === '/dashboard/journey' && data.data.alreadyInitial) {
            onSuccess?.()
}
          else {
            router.push(`/dashboard?rap=${formatPublicHandle(atSign)}`)
          }
        }
      } catch (e) {
            handleActionError(e, router, atSign, 'Erro ao tentar criar horario')
      }
    });
  }
  function handleCreateANewServiceAction(values: InitialBusinessServiceSchema,onSuccess?:()=>void) {
    const atSign = searchParams.get("rap")

    let bodyServiceMount = {
      services: values.business.occupations.map(wkp => {
        let durationMount = timeUtils.toHourString(Number(wkp.duration))
        let priceMount = currencyUtils.toCents(currencyUtils.toNumber(wkp.price))

        return {
          name: wkp.name,
          duration: durationMount,
          value: priceMount
        }
      })
    }
    startTransition(async () => {
      try {
        if (!atSign) {
          router.push("/login")
        } else {
          const data = await CreateANewService(bodyServiceMount, atSign);
          toast.success(data.message || 'serviços cadastrados!');
          if (usePathName.startsWith("/dashboard/service")) {
              onSuccess?.()
          } else {
            if (!data.data.alreadyInitial) {
              router.push(`/business/hours?rap=${formatPublicHandle(atSign)}`)
            } else {
              router.push(`/dashboard?rap=${formatPublicHandle(atSign)}`)
            }
          }
        }
      } catch (e) {
      handleActionError(e, router, atSign, 'Erro ao tentar criar serviços')
}
    });
  }
  function handleEditServiceAction(values: EditBusinessServiceSchema, setOpenEdit: Dispatch<SetStateAction<boolean>>) {
    const atSign = searchParams.get("rap")


    let durationMount = timeUtils.toHourString(Number(values.duration))
    let priceMount = currencyUtils.toCents(currencyUtils.toNumber(values.price))
    let bodyServiceMount = {
      name: values.name,
      duration: durationMount,
      value: priceMount


    }
    startTransition(async () => {
      try {
        if (!atSign || !tgService?.id) {
          toast.error("Erro desconhecido ocorreu!");
          setOpenEdit(false)
          return
        } else {
          const data = await EditServiceService(bodyServiceMount, tgService.id);
          toast.success(data.message || 'Serviço foi editado!');

          const resService = await GetBusinessPerRap(atSign)
          setBusiness(resService)
          setOpenEdit(false)

        }
      } catch (e) {
              if (isRedirectError(e)) throw e
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar criar serviços');
      }
    });
  }



    function handleDeleteServiceAction(setOpenDelete: Dispatch<SetStateAction<boolean>>) {
    const atSign = searchParams.get("rap")
    startTransition(async () => {
      try {
        if (!atSign || !tgService?.id) {
          toast.error("Erro desconhecido ocorreu!");
          setOpenDelete(false)
          return
        } else {
          const data = await DeleteServiceService(tgService?.id);
          toast.success(data.message || 'Serviço foi deletado!');

          const resService = await GetBusinessPerRap(atSign)
          setBusiness(resService)
          setOpenDelete(false)

        }
      } catch (e) {
              if (isRedirectError(e)) throw e
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar criar serviços');
      }
    });
  }
    function handleEditWorkingPeriodAction(values: EditBusinessWorkingPeriodSchema, setOpenEdit: Dispatch<SetStateAction<boolean>>) {
    const atSign = searchParams.get("rap")

    let bodyWkpMount = {
      week: values.name,
      initial: values.initial,
      end: values.end


    }
    startTransition(async () => {
      try {
        if (!atSign||!tgWkp?.id) {
          toast.error("Erro desconhecido ocorreu!");
          setOpenEdit(false)
          return
        } else {
          const data = await EditWorkingPeriodService(bodyWkpMount, atSign, tgWkp?.id);
          toast.success(data.message || 'Periodo foi editado!');

          const resWorkingPeriod = await GetWorkingPeriodPerRap(atSign)
          setWeeks(normalizeWeek(resWorkingPeriod))
          setOpenEdit(false)

        }
      } catch (e) {
              if (isRedirectError(e)) throw e
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar criar serviços');
      }
    });
  }

      function handleDeleteWkpAction(setOpenDelete: Dispatch<SetStateAction<boolean>>) {
    const atSign = searchParams.get("rap")
    startTransition(async () => {
      try {
        if (!atSign || !tgWkp?.id) {
          toast.error("Erro desconhecido ocorreu!");
          setOpenDelete(false)
          return
        } else {
          const data = await DeleteWkpService(atSign,tgWkp?.id);
          toast.success(data.message || 'Periodo foi deletado!');

        const resWorkingPeriod = await GetWorkingPeriodPerRap(atSign)
          setWeeks(normalizeWeek(resWorkingPeriod))
          setOpenDelete(false)

        }
      } catch (e) {
              if (isRedirectError(e)) throw e
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar criar serviços');
      }
    });
  }

const handleManagerSaveAppointment = async (
    date: string,
    hour: string,
    customerId: number | null,
    guestCustomerId: number | null,
    customerName: string,
    onSuccess: () => void
) => {
    const svsById = searchParams.get("svs")
    startTransition(async () => {
        try {
            const res = await saveAppointment(
                { name: customerName, date, hour },
                svsById!,
                customerId,
                guestCustomerId
            )
            if (res.data == null) {
                toast.error(res.message || "Algo deu errado!")
            } else {
                toast.success(res.message || "Agendamento criado!")
                onSuccess()
            }
        } catch (e) {
            if (isRedirectError(e)) throw e
            toast.error(e instanceof Error ? e.message : 'Erro ao agendar')
        }
    })
}
          const handleCompleteAllppointmentsAction = async (businessId:number,Ids:Set<number>, onSucess:()=>void) => {
  
      startTransition(async () => {
        try {
  
          var mountAppointmentBody :CompleteAppointmentsReq ={
            businessId:businessId,
            appointmentIds:Array.from(Ids)
          } 
  
          const targetBuinessWithServices = await completeAllAppointmentsAsync(mountAppointmentBody)
  
          if (targetBuinessWithServices.data == null) {
            toast.error(targetBuinessWithServices.message || "Algo deu errado, tente mais tarde!")
          }else{
          toast.success(targetBuinessWithServices.message || "entrando em agenda")
          onSucess()
          }
        } catch (e) {
          if (isRedirectError(e)) throw e;
          toast.error(e instanceof Error ? e.message : 'Erro ao tentar entrar em agenda');
  
        }
  
  
      })
    }

      function handleDeleteCustomerAction(customerId: number|null, onSuccess: () => void) {
    const atSign = searchParams.get("rap")
    if(!customerId){
      toast.error("cliente não detectado!")
      return
    }
    startTransition(async () => {
      try {
        if (!atSign) {
          toast.error("Erro desconhecido ocorreu!")
          return
        }
        await deleteCustomerAsync(atSign, customerId)
        toast.success("Cliente removido com sucesso!")
        onSuccess()
      } catch (e) {
        if (isRedirectError(e)) throw e
        toast.error(e instanceof Error ? e.message : 'Erro ao remover cliente')
      }
    })
  }
 
  

  
  return { handleCreateBusinessAction,handleDeleteCustomerAction, handleCreateWkPeriodAction, handleCreateANewServiceAction, handleEditServiceAction,handleDeleteServiceAction,handleEditWorkingPeriodAction,handleDeleteWkpAction,handleManagerSaveAppointment,handleCompleteAllppointmentsAction, isPending };
}