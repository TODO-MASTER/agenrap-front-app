import { toast } from "sonner";
import { registerUser } from "../services/registerUser";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { environments } from "@/src/environments/environments";
import { loginUser } from "../services/loginUser";

export function useAuth() {
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const router = useRouter()
    const onRegisterSubmit = async (values: any) => {
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
    const onLoginSubmit = async (values: any) => {
           setIsAuthLoading(true);

    try {
    //   toast.success('Conectando...');
      const response = await loginUser(values);
      if(!response.data.emailHasVerified){
        router.push('/verify-pending-email')
      }else{
        router.push('/business/meu-link')
      }
    //   toast.success('Login realizado com sucesso!');
    //   router.push('/home');
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