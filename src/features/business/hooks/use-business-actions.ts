'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useTransition } from "react";
import { InitialBusinessNameSchema } from "../schemas/business.schema";
import { createBusinessByUrlAction } from "../services/business.service";
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
export function useBusinessActions() {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const tgService = useBusinessStore(bs => bs.selectedService)
  const tgWkp = useBusinessStore(bs => bs.selectedWorkingPeriod)
  const setWeeks= useBusinessStore(bs=>bs.setWeeks)
  const usePathName = usePathname();
  const setBusiness = useBusinessStore((state) => state.setBusiness)

  function handleCreateBusinessAction(values: InitialBusinessNameSchema) {
    let bodyMount = {
      name: values.business.name
    }
    startTransition(async () => {
      try {
        const data = await createBusinessByUrlAction(bodyMount);
        toast.success(data.message || 'Nova tarefa!');
      } catch (e) {
        if (isRedirectError(e)) throw e;
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar cadastrar negócio');
      }

    });
  }
  function handleCreateWkPeriodAction(values: InitialBusinessWeeksSchema) {
    const businessName = searchParams.get("bns")
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
        if (!businessName) {
          router.push("/login")
        } else {
          const data = await CreatWorkingPeriod(bodyMount, businessName);
          toast.success(data.message || 'Periodo cadastrado!');
          //  

          if (!data.data.alreadyInitial) {
            router.push(`/business/services?bns=${businessName}`)
          } else {
            router.push(`/dashboard?bns=${businessName}`)
          }
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Erro ao criar tarefa');
      }
    });
  }
  function handleCreateANewServiceAction(values: InitialBusinessServiceSchema) {
    const businessName = searchParams.get("bns")

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
        if (!businessName) {
          router.push("/login")
        } else {
          const data = await CreateANewService(bodyServiceMount, businessName);
          toast.success(data.message || 'serviços cadastrados!');
          if (usePathName.startsWith("/dashboard/service/new")) {
            router.push(`/dashboard/service/list?bns=${businessName}`)
          } else {
            if (!data.data.alreadyInitial) {
              router.push(`/business/hours?bns=${businessName}`)
            } else {
              router.push(`/dashboard?bns=${businessName}`)
            }
          }
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar criar serviços');
      }
    });
  }
  function handleEditServiceAction(values: EditBusinessServiceSchema, setOpenEdit: Dispatch<SetStateAction<boolean>>) {
    const businessName = searchParams.get("bns")


    let durationMount = timeUtils.toHourString(Number(values.duration))
    let priceMount = currencyUtils.toCents(currencyUtils.toNumber(values.price))
    let bodyServiceMount = {
      name: values.name,
      duration: durationMount,
      value: priceMount


    }
    startTransition(async () => {
      try {
        if (!businessName || !tgService?.id) {
          toast.error("Erro desconhecido ocorreu!");
          setOpenEdit(false)
          return
        } else {
          const data = await EditServiceService(bodyServiceMount, businessName, tgService.id);
          toast.success(data.message || 'Serviço foi editado!');

          const resService = await GetBusinessPerRap(businessName)
          setBusiness(resService)
          setOpenEdit(false)

        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar criar serviços');
      }
    });
  }



    function handleDeleteServiceAction(setOpenDelete: Dispatch<SetStateAction<boolean>>) {
    const businessName = searchParams.get("bns")
    startTransition(async () => {
      try {
        if (!businessName || !tgService?.id) {
          toast.error("Erro desconhecido ocorreu!");
          setOpenDelete(false)
          return
        } else {
          const data = await DeleteServiceService(tgService?.id);
          toast.success(data.message || 'Serviço foi deletado!');

          const resService = await GetBusinessPerRap(businessName)
          setBusiness(resService)
          setOpenDelete(false)

        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar criar serviços');
      }
    });
  }
    function handleEditWorkingPeriodAction(values: EditBusinessWorkingPeriodSchema, setOpenEdit: Dispatch<SetStateAction<boolean>>) {
    const businessName = searchParams.get("bns")

    let bodyWkpMount = {
      week: values.name,
      initial: values.initial,
      end: values.end


    }
    startTransition(async () => {
      try {
        if (!businessName||!tgWkp?.id) {
          toast.error("Erro desconhecido ocorreu!");
          setOpenEdit(false)
          return
        } else {
          const data = await EditWorkingPeriodService(bodyWkpMount, businessName, tgWkp?.id);
          toast.success(data.message || 'Periodo foi editado!');

          const resWorkingPeriod = await GetWorkingPeriodPerRap(businessName)
          setWeeks(normalizeWeek(resWorkingPeriod))
          setOpenEdit(false)

        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar criar serviços');
      }
    });
  }

      function handleDeleteWkpAction(setOpenDelete: Dispatch<SetStateAction<boolean>>) {
    const businessName = searchParams.get("bns")
    startTransition(async () => {
      try {
        if (!businessName || !tgWkp?.id) {
          toast.error("Erro desconhecido ocorreu!");
          setOpenDelete(false)
          return
        } else {
          const data = await DeleteWkpService(businessName,tgWkp?.id);
          toast.success(data.message || 'Periodo foi deletado!');

        const resWorkingPeriod = await GetWorkingPeriodPerRap(businessName)
          setWeeks(normalizeWeek(resWorkingPeriod))
          setOpenDelete(false)

        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar criar serviços');
      }
    });
  }

      const handleManagerSaveAppointment = async (date:string,hour:string,customerId:number,CustomerName:string, onSucess:()=>void) => {
      const svsById = searchParams.get("svs")
  
      startTransition(async () => {
        try {
  
          var mountAppointmentBody :AppointmentReq ={
            name:CustomerName,
            date:date,
            hour:hour
          } 
  
          const targetBuinessWithServices = await saveAppointment(mountAppointmentBody,svsById!,customerId)
  
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
  

  
  return { handleCreateBusinessAction, handleCreateWkPeriodAction, handleCreateANewServiceAction, handleEditServiceAction,handleDeleteServiceAction,handleEditWorkingPeriodAction,handleDeleteWkpAction,handleManagerSaveAppointment, isPending };
}