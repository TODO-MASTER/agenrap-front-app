import { Suspense } from "react";


export default function ResetPasswordForm() {
   return(
    <Suspense fallback={<div className="h-dvh flex items-center justify-center">Carregando...</div>}>

    <ResetPasswordForm/>
    </Suspense>
   )
}