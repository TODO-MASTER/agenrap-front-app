import { agenrapCollapsableVariants } from "@/src/shared/components/agenrap-ui/collapsable/types/agenrap-collapsable-variants.type";
import { VariantProps } from "class-variance-authority";
import React from "react";

export type AgenrapCollapsableProps= VariantProps<typeof agenrapCollapsableVariants>&{
   children:React.ReactNode,
   collapseName:string,
   spawnNotifier:{
      haveNotifier:boolean,
      qtdNotifier:number
   }
}