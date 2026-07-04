"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  value: number
  decimals?: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
  duration = 1.5,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const spring = useSpring(0, {
    stiffness: 80,
    damping: 20,
    duration,
  })

  const displayValue = useTransform(spring, (latest) => {
    return `${prefix}${latest.toFixed(decimals)}${suffix}`
  })

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, value, spring])

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {displayValue}
    </motion.span>
  )
}
