import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export function MotionSection(props: HTMLMotionProps<"section">) {
  return <motion.section {...props} />
}
