'use client'
import { toast } from "sonner";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { environments } from "@/src/environments/environments";
import { loginUser } from "../services/login-user";

export function useAuth() {
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const searchParams = useSearchParams()
    const router = useRouter()
    const onRegisterSubmit = async (values: any) => {
        setIsAuthLoading(true);

        try {
            const response = await fetch(environments.apiUrl + `user/register?isCustomer=${searchParams.get("cmd")=="Y"?true:false}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            const data = await response.json()
            if (data.error||data.message =="email já cadastrado!") {
                
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
      if(!response.data.emailHasVerified){
        router.push('/verify-pending-email')
      }else{
     
        if(response.data.role=="Customer"){
            router.push('/appointments')
        }else{
        router.push('/business/booking-link')
        }
      }
    } catch (error) {
      toast.error('Erro ao tentar logar');
    } finally {
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

    

    return { onRegisterSubmit,onLoginSubmit, onVerifyEmailSubmit,isAuthLoading };
}