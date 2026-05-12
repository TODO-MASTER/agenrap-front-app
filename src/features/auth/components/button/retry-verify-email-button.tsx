'use client'
import { environments } from "@/src/environments/environments"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import { useRouter } from "next/navigation"
import { useState } from "react"

 
 
 export default function RetryVerifyEmailButton({ token }: { token: string }){
    const [isOk,setIsOk] = useState<boolean|number>(-1)
    const router = useRouter()
 async function handleRetry() {
    try{
    const response = await fetch(environments.apiUrl + `smtp/verify-email?token=${token}`, {
      method: 'GET',
    })
    if(response.ok){
      setIsOk(true)
      router.push("/login")
    }else{
      setIsOk(false)
    }
  }catch(e){
    setIsOk(false)
  }
  }

   return (
    <AgenrapButton onClick={isOk==-1?()=>handleRetry():()=>router.push("/login")} variant="purplerap" className={`flex justify-center items-center w-full px-12 mt-2 mb-0.5`}>
      {isOk==-1&&isOk.toString().includes("-1")? "Tente Novamente":"Tente efetuar o Login"}
    </AgenrapButton>
  )
}