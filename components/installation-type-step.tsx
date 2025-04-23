"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type InstallationType = "Normal" | "Elevated"

interface InstallationTypeStepProps {
  selectedInstallationType: InstallationType | null
  setSelectedInstallationType: (type: InstallationType) => void
  panelCount: number
  setInstallationPrice: (price: number) => void
}

export default function InstallationTypeStep({
  selectedInstallationType,
  setSelectedInstallationType,
  panelCount,
  setInstallationPrice,
}: InstallationTypeStepProps) {
  // Calculate installation price when selection changes
  useEffect(() => {
    if (selectedInstallationType) {
      let price = 0
      if (selectedInstallationType === "Normal") {
        price = (panelCount / 2) * 7000
      } else if (selectedInstallationType === "Elevated") {
        price = panelCount * 600 * 18
      }
      setInstallationPrice(price)
    }
  }, [selectedInstallationType, panelCount, setInstallationPrice])

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

  // Calculate prices for display
  const normalPrice = (panelCount / 2) * 7000
  const elevatedPrice = panelCount * 600 * 18

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Select Installation Type</h2>
        <p className="text-gray-600 mt-2">Choose the installation method for your solar panels</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Normal Installation */}
        <motion.div variants={itemVariants}>
          <Card
            className={`cursor-pointer transition-all hover:shadow-md h-full ${
              selectedInstallationType === "Normal"
                ? "border-2 border-yellow-500 bg-yellow-50"
                : "border border-gray-200"
            }`}
            onClick={() => setSelectedInstallationType("Normal")}
          >
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-lg">Normal Installation</h3>
                  <p className="text-gray-500 text-sm">Standard roof mounting</p>
                </div>
                {selectedInstallationType === "Normal" && (
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
                    animate={selectedInstallationType === "Normal" ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    PKR {normalPrice.toLocaleString()}
                  </motion.span>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </motion.div>

        {/* Elevated Installation */}
        <motion.div variants={itemVariants}>
          <Card
            className={`cursor-pointer transition-all hover:shadow-md h-full ${
              selectedInstallationType === "Elevated"
                ? "border-2 border-yellow-500 bg-yellow-50"
                : "border border-gray-200"
            }`}
            onClick={() => setSelectedInstallationType("Elevated")}
          >
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-lg">Elevated Installation</h3>
                  <p className="text-gray-500 text-sm">Raised mounting system</p>
                </div>
                {selectedInstallationType === "Elevated" && (
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
                    animate={selectedInstallationType === "Elevated" ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    PKR {elevatedPrice.toLocaleString()}
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
