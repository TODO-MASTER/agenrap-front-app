import AgenrapButton from "../button/AgenrapButton";
import { SidebarTrigger } from "../../ui/sidebar";

export default function AgenrapHeader(){
    return(
        <header className="flex w-full bg-(--agenrap-brown-200) h-20 border-b border-b-black">
               <SidebarTrigger/>
        </header>
    )
}