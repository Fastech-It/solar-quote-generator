"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type PanelBrand = { name: string; pricePerWatt: number; wattage: number }

const panelBrands: PanelBrand[] = [
  { name: "Canadian / Jinko 585W", pricePerWatt: 31, wattage: 585 },
  { name: "Longi Nimo x7 615W", pricePerWatt: 31, wattage: 615 },
  { name: "JA / Astro / Kingdom 585W", pricePerWatt: 29, wattage: 585 },
]

interface PanelBrandStepProps {
  selectedPanelBrand: PanelBrand | null
  setSelectedPanelBrand: (brand: PanelBrand) => void
  panelCount: number
  setPanelPrice: (price: number) => void
}

export default function PanelBrandStep({
  selectedPanelBrand,
  setSelectedPanelBrand,
  panelCount,
  setPanelPrice,
}: PanelBrandStepProps) {
  // Calculate panel price when selection changes
  useEffect(() => {
    if (selectedPanelBrand) {
      const price = selectedPanelBrand.wattage * panelCount * selectedPanelBrand.pricePerWatt
      setPanelPrice(price)
    }
  }, [selectedPanelBrand, panelCount, setPanelPrice])

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
        <h2 className="text-2xl font-bold text-gray-900">Select Panel Brand</h2>
        <p className="text-gray-600 mt-2">Choose your preferred solar panel brand</p>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4">
        {panelBrands.map((brand) => {
          const price = brand.wattage * panelCount * brand.pricePerWatt
          const isSelected = selectedPanelBrand?.name === brand.name

          return (
            <motion.div key={brand.name} variants={itemVariants}>
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? "border-2 border-yellow-500 bg-yellow-50" : "border border-gray-200"
                }`}
                onClick={() => setSelectedPanelBrand(brand)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-lg">{brand.name}</h3>
                      <p className="text-gray-500 text-sm">{brand.wattage}W per panel</p>
                    </div>
                    {isSelected && (
                      <div className="h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Price for {panelCount} panels:</span>
                      <motion.span
                        className="font-semibold text-lg"
                        initial={{ scale: 1 }}
                        animate={isSelected ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        PKR {price.toLocaleString()}
                      </motion.span>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
