import { Metadata } from "next";
import AgenrapSidebar from "../shared/components/agenrap-ui/sidebar/AgenrapSideBar";
import { SidebarInset, SidebarProvider } from "../shared/components/ui/sidebar";
import AgenrapHeader from "../shared/components/agenrap-ui/header/AgenrapHeader";
import RapAuthForm from "../features/auth/components/RapAuthForm";



export const metadata: Metadata = {
  title: "Cadastro | Agenrap",
  description: "Automatize sua agenda"
};

export default function RegisterPage() {
  return (
    <main className="w-full h-full flex ">
     
      <SidebarProvider>
        <AgenrapSidebar color="#" />
        <SidebarInset>
          <AgenrapHeader />
           <div className="w-[50%]  flex flex-col p-32 justify-center ">
        <div className="w-fit gap-10 flex flex-col">
          <h1 className="text-4xl  font-cinzel text-center font-bold"><span className="font-tree font-semibold ">Cadastro com</span> Agenrap</h1>
          <RapAuthForm />
        </div>
      </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
