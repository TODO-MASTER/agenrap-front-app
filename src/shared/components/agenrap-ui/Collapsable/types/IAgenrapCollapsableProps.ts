'use client'
import { VariantProps } from "class-variance-authority";

import React from "react";
import { agenrapCollapsableVariants } from "./AgenrapCollapsableVariants";


export interface IAgenrapCollapsableProps<> extends  VariantProps<typeof agenrapCollapsableVariants>{
   children:React.ReactNode,
   collapseName:string,
   spawnNotifier:{
      haveNotifier:boolean,
      qtdNotifier:number
   }
}