'use client'
import { VariantProps } from "class-variance-authority";

import React from "react";
import { agenrapCollapsableVariants } from "./AgenrapCollapsableVariants";
import { IGroupOccupationsProps } from "@/src/shared/interfaces/business/IGroupOccupationsProps";
import { FieldArrayPath, FieldArrayWithId, FieldValues } from "react-hook-form";


export interface IAgenrapCollapsableProps<> extends  VariantProps<typeof agenrapCollapsableVariants>{
   children:React.ReactNode,
   collapseName:string,
   spawnNotifier:{
      haveNotifier:boolean,
      qtdNotifier:number
   }
}