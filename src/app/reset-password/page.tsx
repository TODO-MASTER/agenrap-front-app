import ResetPasswordForm from "@/src/features/auth/components/reset-password-form";
import { Suspense } from "react";


export default function ResetPasswordFormPage() {
   return(
    <Suspense fallback={<div className="h-dvh flex items-center justify-center">Carregando...</div>}>

    <ResetPasswordForm/>
    </Suspense>
   )
}