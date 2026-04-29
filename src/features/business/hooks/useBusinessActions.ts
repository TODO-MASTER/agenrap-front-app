'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { InitialBusinessNameSchema } from "../../../shared/types/Business/InitialBuinessNameSchema";
import { createBusinessByUrlAction } from "../services/BusinessServices";
import { toast } from "sonner";
import { InitialBusinessWeeksSchema } from "@/src/shared/types/Business/InitialBusinessWeeksSchema";
import { CreatWorkingPeriod } from "../services/WorkingService";
import { InitialBusinessServiceSchema } from "@/src/shared/types/Business/InitialBusinessServiceSchema";
import { timeUtils } from "@/src/shared/utils/timeUtils";
import { currencyUtils } from "@/src/shared/utils/currencyUtils";
import { CreateANewService } from "../services/ServiceService";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export function useBusinessActions() {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
         
          if(!data.data.alreadyInitial){
            router.push(`/business/services?bns=${businessName}`)
          }else{
               router.push(`/home?bns=${businessName}`)
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
        if(!data.data.alreadyInitial){
            router.push(`/business/hours?bns=${businessName}`)
          }else{
               router.push(`/home?bns=${businessName}`)
          }
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Erro ao tentar criar serviços');
      }
    });
  }
  return { handleCreateBusinessAction, handleCreateWkPeriodAction, handleCreateANewServiceAction, isPending };
}