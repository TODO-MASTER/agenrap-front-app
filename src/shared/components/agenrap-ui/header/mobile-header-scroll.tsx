"use client"

import { useEffect, useState } from "react"
import AgenrapHeader from "@/src/shared/components/agenrap-ui/header/agenrap-header"

export default function MobileHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
  
      <AgenrapHeader isDefault={false} isScrolled={isScrolled} />

  )
}