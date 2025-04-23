"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type MeterType = "Single Phase" | "Three Phase"

interface MeterTypeStepProps {
  selectedMeterType: MeterType | null
  setSelectedMeterType: (type: MeterType) => void
  setMeterPrice: (price: number) => void
}

export default function MeterTypeStep({ selectedMeterType, setSelectedMeterType, setMeterPrice }: MeterTypeStepProps) {
  // Calculate meter price when selection changes
  useEffect(() => {
    if (selectedMeterType) {
      const price = selectedMeterType === "Single Phase" ? 135000 : 110000
      setMeterPrice(price)
    }
  }, [selectedMeterType, setMeterPrice])

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
        <h2 className="text-2xl font-bold text-gray-900">Select Meter Type</h2>
        <p className="text-gray-600 mt-2">Choose the type of meter for your solar system</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Single Phase */}
        <motion.div variants={itemVariants}>
          <Card
            className={`cursor-pointer transition-all hover:shadow-md h-full ${
              selectedMeterType === "Single Phase"
                ? "border-2 border-yellow-500 bg-yellow-50"
                : "border border-gray-200"
            }`}
            onClick={() => setSelectedMeterType("Single Phase")}
          >
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-lg">Single Phase</h3>
                  <p className="text-gray-500 text-sm">Standard residential meter</p>
                </div>
                {selectedMeterType === "Single Phase" && (
                  <div className="h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              {/* <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price:</span>
                  <motion.span
                    className="font-semibold text-lg"
                    initial={{ scale: 1 }}
                    animate={selectedMeterType === "Single Phase" ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    PKR 135,000
                  </motion.span>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </motion.div>

        {/* Three Phase */}
        <motion.div variants={itemVariants}>
          <Card
            className={`cursor-pointer transition-all hover:shadow-md h-full ${
              selectedMeterType === "Three Phase" ? "border-2 border-yellow-500 bg-yellow-50" : "border border-gray-200"
            }`}
            onClick={() => setSelectedMeterType("Three Phase")}
          >
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-lg">Three Phase</h3>
                  <p className="text-gray-500 text-sm">For commercial or larger systems</p>
                </div>
                {selectedMeterType === "Three Phase" && (
                  <div className="h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              {/* <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price:</span>
                  <motion.span
                    className="font-semibold text-lg"
                    initial={{ scale: 1 }}
                    animate={selectedMeterType === "Three Phase" ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    PKR 110,000
                  </motion.span>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
