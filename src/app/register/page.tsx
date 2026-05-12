import { Metadata } from "next";
import AgenrapSidebar from "../../shared/components/agenrap-ui/sidebar/agenrap-side-bar";
import { SidebarInset, SidebarProvider } from "../../shared/components/ui/sidebar";
import AgenrapHeader from "../../shared/components/agenrap-ui/header/agenrap-header";
import RapAuthForm from "../../features/auth/components/rap-auth-form";
import Image from "next/image";
import { macroLogo } from "../../assets/images";
import { redirect } from "next/navigation";



export const metadata: Metadata = {
  title: "Cadastro | Agenrap",
  description: "Automatize sua agenda"
};

export default async function RegisterPage({
    searchParams
}: {
    searchParams: Promise<{ cmd?: string }>
})  {
  const {cmd:cmdp} = await searchParams;
  if(cmdp!="Y"&&cmdp!="N"||!cmdp){
    redirect("/welcome")
  }
  return (
    <main className="w-full h-full min-h-lvh   flex">
      <div className="w-full h-full flex justify-center items-center absolute inset-0 -z-10">
        <Image src={macroLogo} alt="" fill loading="eager"  />
      </div>
      <div className="lg:w-[50%] w-full  flex flex-col items-center  bg-(--agenrap-gray-200) justify-center ">
           <div className="flex md:hidden mb-2 justify-center items-center ">
        <Image src={macroLogo} alt="" loading="eager"  style={{ objectFit: "contain", width: "100px", height: "100px" }}/>
      </div>
        <div className="w-fit gap-10 flex flex-col">
          <h1 className="md:text-4xl text-2xl  font-cinzel text-center font-bold"><span className="font-tree font-semibold ">Cadastro com</span> Agenrap</h1>
          <RapAuthForm isLogin={false} />
        </div>
      </div>
      <div className="w-[50%]  hidden lg:flex flex-col p-32 pl-7 bg-(--agenrap-brown-500)/75  ">
      {cmdp=="Y"?<div className="flex gap-1">
          <span className="w-1.75 h-full  bg-(--agenrap-yellow-200)"></span>
          <div className="flex flex-col gap-y-1">
          <p className="text-white font-tree font-bold lg:text-5xl text-2xl  ">Agora seu agendamento</p>
          <p className="text-white font-tree font-bold lg:text-5xl text-2xl mb-2">é muito rápido</p>
          <p className="text-white font-tree font-medium lg:text-xl text-lg ">Aqui você agenda sozinho,</p>
          <p className="text-white font-tree font-medium lg:text-xl text-lg">com dados referentes ao serviço antecipados</p>
          <p className="text-white font-tree font-medium lg:text-xl text-lg">em conjunto a um ambiente preparado para seu conforto!</p>
          </div>
        </div>:
        <div className="flex gap-1">
          <span className="w-1.75 h-full  bg-(--agenrap-yellow-200)"></span>
          <div className="flex flex-col gap-y-1">
          <p className="text-white font-tree font-bold lg:text-5xl text-2xl  ">Seu negócio merece</p>
          <p className="text-white font-tree font-bold lg:text-5xl text-2xl mb-2">ferramentas que escalam</p>
          <p className="text-white font-tree font-medium lg:text-xl text-lg ">Aqui sua agenda funciona do seu jeito: clientes marcam</p>
          <p className="text-white font-tree font-medium lg:text-xl text-lg">sozinhos e você consegue focar no que gosta de fazer,</p>
          <p className="text-white font-tree font-medium lg:text-xl text-lg">atender bem e cuidar do seu dia a dia.</p>
          </div>
        </div>
}
      </div>

    </main>
  );
}
