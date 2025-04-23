"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type InverterBrand = "Huawei" | "Growatt / Fox" | "Solis / Goodwe"
type InverterCapacity = "10" | "15" | "20" | "25"

const inverterPrices = {
  "Huawei": { "10": 340000, "15": 385000, "20": 430000, "25": 450000 },
  "Growatt / Fox": { "10": 185000, "15": 230000, "20": 320000, "25": 340000 },
  "Solis / Goodwe": { "10": 235000, "15": 255000, "20": 290000, "25": 330000 },
}

const inverterBrands: InverterBrand[] = ["Huawei", "Growatt / Fox", "Solis / Goodwe"]
const inverterCapacities: InverterCapacity[] = ["10", "15", "20", "25"]

interface InverterStepProps {
  selectedInverterBrand: InverterBrand | null
  setSelectedInverterBrand: (brand: InverterBrand) => void
  selectedInverterCapacity: InverterCapacity | null
  setSelectedInverterCapacity: (capacity: InverterCapacity) => void
  setInverterPrice: (price: number) => void
}

export default function InverterStep({
  selectedInverterBrand,
  setSelectedInverterBrand,
  selectedInverterCapacity,
  setSelectedInverterCapacity,
  setInverterPrice,
}: InverterStepProps) {
  // Calculate inverter price when selection changes
  useEffect(() => {
    if (selectedInverterBrand && selectedInverterCapacity) {
      const price = inverterPrices[selectedInverterBrand][selectedInverterCapacity]
      setInverterPrice(price)
    }
  }, [selectedInverterBrand, selectedInverterCapacity, setInverterPrice])

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
        <h2 className="text-2xl font-bold text-gray-900">Select Inverter</h2>
        <p className="text-gray-600 mt-2">Choose an inverter brand and capacity that fits your needs</p>
      </div>

      {/* Brand Selection */}
      <div>
        <h3 className="font-medium text-lg mb-3">1. Select Inverter Brand</h3>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4">
          {inverterBrands.map((brand) => {
            const isSelected = selectedInverterBrand === brand

            return (
              <motion.div key={brand} variants={itemVariants}>
                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? "border-2 border-yellow-500 bg-yellow-50" : "border border-gray-200"
                  }`}
                  onClick={() => setSelectedInverterBrand(brand)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-lg">{brand}</h3>
                      </div>
                      {isSelected && (
                        <div className="h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Capacity Selection - Only show if brand is selected */}
      {selectedInverterBrand && (
        <div>
          <h3 className="font-medium text-lg mb-3">2. Select Inverter Capacity</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {inverterCapacities.map((capacity) => {
              const isSelected = selectedInverterCapacity === capacity
              const price = selectedInverterBrand ? inverterPrices[selectedInverterBrand][capacity] : 0

              return (
                <motion.div key={capacity} variants={itemVariants}>
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? "border-2 border-yellow-500 bg-yellow-50" : "border border-gray-200"
                    }`}
                    onClick={() => setSelectedInverterCapacity(capacity)}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-between w-full">
                          <h3 className="font-medium">{capacity}KW</h3>
                          {isSelected && (
                            <div className="h-5 w-5 bg-yellow-500 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        {/* <div className="text-center mt-2">
                          <p className="text-sm text-gray-500">Price:</p>
                          <motion.p
                            className="font-semibold"
                            initial={{ scale: 1 }}
                            animate={isSelected ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            PKR {price.toLocaleString()}
                          </motion.p>
                        </div> */}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      )}

      {/* Price Preview - Show when both brand and capacity are selected */}
      {selectedInverterBrand && selectedInverterCapacity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Selected Inverter:</p>
              <p className="text-gray-600">
                {selectedInverterBrand} - {selectedInverterCapacity}KW
              </p>
            </div>
            {/* <div className="text-right">
              <p className="font-medium">Price:</p>
              <p className="text-xl font-bold">
                PKR {inverterPrices[selectedInverterBrand][selectedInverterCapacity].toLocaleString()}
              </p>
            </div> */}
          </div>
        </motion.div>
      )}
    </div>
  )
}
