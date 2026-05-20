'use client'
import { toast } from "sonner";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { environments } from "@/src/environments/environments";
import { loginUser } from "../services/login-user";
import { JoinScheduleByRapName } from "@/src/features/customers/services/customer.service";
import { clearPendingRap, getPendingRap, setPendingRap } from "@/src/shared/utils/cookies.utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { GetBusinessPerRap } from "@/src/shared/services/business.service";

export function useAuth() {
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const searchParams = useSearchParams()
    const router = useRouter()
    const onRegisterSubmit = async (values: any) => {
        setIsAuthLoading(true);

        try {
            const response = await fetch(environments.apiUrl + `user/register?isCustomer=${searchParams.get("cmd") == "Y" ? true : false}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            const data = await response.json()
            if (searchParams.get('rap')) {
                setPendingRap(searchParams.get('rap')!)
                router.push('/verify-pending-email')
            }

            else if (data.error || data.message == "email já cadastrado!") {

                toast.error(data.message ?? "Erro desconhecido");
            } else {
                toast.success(data.message ?? "Erro desconhecido");
                router.push('/verify-pending-email')
            }
            return data;
        } catch (error) {
            toast.error("Ocorreu um erro! :/");

        }

        finally {
            setIsAuthLoading(false);

        }
    };
    const onLoginSubmit = async (values: any) => {
        setIsAuthLoading(true);
        try {
            const response = await loginUser(values);
            if (!response.data.emailHasVerified) {
                router.push('/verify-pending-email')
            } else {
                const rap = searchParams.get('rap')
                if (rap) return rap
                if (response.data.role == "Customer") {
                    router.push('/appointments')
                } else {
                    router.push('/business/booking-link')
                }
            }
        } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Erro ao tentar logar');
}finally {
            setIsAuthLoading(false);
        }
    };


    const onVerifyEmailSubmit = async (values: any) => {
        setIsAuthLoading(true);

        try {
            const response = await fetch(environments.apiUrl + "user/register", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            const data = await response.json()
            if (data.error) {
                const parsedError = JSON.parse(data.error);
                toast.error(parsedError.message ?? "Erro desconhecido");
            } else {
                toast.success(data.message ?? "Erro desconhecido");
                router.push('/verify-pending-email')
            }
            return data;
        } catch (error) {
            toast.error("Ocorreu um erro! :/");

        }

        finally {
            setIsAuthLoading(false);

        }



    };
const withCheckRapLogin = async (values: any) => {
    setIsAuthLoading(true)
    const rapFromUrl = searchParams.get('rap')
    if (rapFromUrl) setPendingRap(rapFromUrl)
    
    const rap = await onLoginSubmit(values)
    if (rap) {
        const tgbyRap = await GetBusinessPerRap(rap)
        if(!tgbyRap.haveAct){

       
        try{
        const response = await JoinScheduleByRapName(rap)
        clearPendingRap()
        if (response.data) {
            toast.success(response.message ?? "")
            router.push(`/${rap}`)
        } else {
            toast.error(response.message ?? "algo deu errado")
            router.push("/appointments")
        }
    }catch (e) {
              if (isRedirectError(e)) throw e;
              toast.error(e instanceof Error ? e.message : 'Erro ao tentar entrar em agenda');
      
            }
             }else{
                router.push(`/${rap}`)
             }
    }
    setIsAuthLoading(false)
}



    return { onRegisterSubmit, onLoginSubmit,withCheckRapLogin, onVerifyEmailSubmit, isAuthLoading };
}