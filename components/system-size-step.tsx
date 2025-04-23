"use client"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type SystemSize = { value: string; label: string; panels: number }

const systemSizes: SystemSize[] = [
  { value: "6", label: "6KW (10 Panels)", panels: 10 },
  { value: "10", label: "10KW (16 Panels)", panels: 16 },
  { value: "15", label: "15KW (24 Panels)", panels: 24 },
  { value: "20", label: "20KW (32 Panels)", panels: 32 },
  { value: "25", label: "25KW (38 Panels)", panels: 38 },
]

interface SystemSizeStepProps {
  selectedSize: SystemSize | null
  setSelectedSize: (size: SystemSize) => void
}

export default function SystemSizeStep({ selectedSize, setSelectedSize }: SystemSizeStepProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Select Your System Size</h2>
        <p className="text-gray-600 mt-2">Choose the system size that best fits your energy needs</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {systemSizes.map((size) => (
          <motion.div key={size.value} variants={itemVariants}>
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedSize?.value === size.value
                  ? "border-2 border-yellow-500 bg-yellow-50"
                  : "border border-gray-200"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg">{size.label}</h3>
                  <p className="text-gray-500 text-sm">Recommended for {size.value}KW usage</p>
                </div>
                {selectedSize?.value === size.value && (
                  <div className="h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
