'use client'
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { InitialBusinessNameSchema } from "../../../shared/types/InitialBuinessNameSchema";
import { createBusinessByUrlAction } from "../services/BusinessServices";
import { toast } from "sonner";

export function useBusinessActions() {
     const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleCreateBusinessAction(values: InitialBusinessNameSchema) {
    let bodyMount = {
        name:values.business.name
    }
    startTransition(async () => {
      try {
        const data = await createBusinessByUrlAction(bodyMount);
        toast.success(data.message || 'Nova tarefa!');
        // router.push('');
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Erro ao criar tarefa');
      }
    });
  }
    return {handleCreateBusinessAction,isPending};
}