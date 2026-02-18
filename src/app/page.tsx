import Image from "next/image";
import { Input } from "../shared/components/ui/input";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Cadastro - Agenrap",
  description: "Automatize sua agenda"
};

export default function Home() {
  return (
    <div className="">
    <Input />
    </div>
  );
}
