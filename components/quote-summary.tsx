"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Sun, User, Phone, MapPin, Mail, Home } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { PersonalInfo } from "@/app/page"
import fastech from "../public/fastech.png"
import Image from "next/image";

type SystemSize = { value: string; label: string; panels: number }
type PanelBrand = { name: string; pricePerWatt: number; wattage: number }
type InverterBrand = "Huawei" | "Growatt / Fox" | "Solis / Goodwe"
type InstallationType = "Normal" | "Elevated"
type MeterType = "Single Phase" | "Three Phase"
type InverterCapacity = "10" | "15" | "20" | "25"

interface QuoteSummaryProps {
  selectedSize: SystemSize | null
  selectedPanelBrand: PanelBrand | null
  selectedInverterBrand: InverterBrand | null
  selectedInverterCapacity: InverterCapacity | null
  selectedInstallationType: InstallationType | null
  selectedMeterType: MeterType | null
  personalInfo: PersonalInfo
  panelPrice: number
  inverterPrice: number
  installationPrice: number
  meterPrice: number
}

const QuoteSummary = forwardRef<HTMLDivElement, QuoteSummaryProps>(
  (
    {
      selectedSize,
      selectedPanelBrand,
      selectedInverterBrand,
      selectedInverterCapacity,
      selectedInstallationType,
      selectedMeterType,
      personalInfo,
      panelPrice,
      inverterPrice,
      installationPrice,
      meterPrice,
    },
    ref,
  ) => {
    const boreprice = 23000;
    const trmpprice  = 10000;
    const emprice = selectedInverterCapacity == "10" ? 100000 : selectedInverterCapacity == "15" ? 110000 : selectedInverterCapacity == "20" ? 125000 : 140000;
    const installationcharges = selectedInstallationType === "Normal" ? (selectedSize?.panels ?? 0) * 600 * 4 : (selectedSize?.panels ?? 0) * 600 * 2;
    const totalPrice = (panelPrice + inverterPrice + installationPrice + meterPrice + boreprice + trmpprice + emprice + installationcharges) * 1.1 ;

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

    // Format date for the quote
    const today = new Date()
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    return (
      <div className="space-y-6 print:p-10" ref={ref}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Your Solar System Quote</h2>
          <p className="text-gray-600 mt-2">Quote generated on {formattedDate}</p>
        </div>

        <div className="flex justify-center mb-6">
          <Image alt="Fastech Logo" src={fastech} className="flex items-center justify-center h-16 w-16  bg-yellow-100 rounded-full" />
            {/* <Sun className="h-10 w-10 text-yellow-500" /> */}
            
          {/* </div> */}
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
          {/* Customer Information */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid print:grid-cols-4 print:gap-x-2 print:gap-y-4">
                  <div className="print:border-b print:pb-2">
                    <div className="flex items-center ">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Name</span>
                    </div>
                    <span className="font-medium">{personalInfo.name}</span>
                  </div>

                  <div className=" print:border-b print:pb-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Phone</span>
                    </div>
                    <span className="font-medium print:block print:mt-1">{personalInfo.phone}</span>
                  </div>

                  <div className=" print:border-b print:pb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">City</span>
                    </div>
                    <span className="font-medium print:block print:mt-1">{personalInfo.city}</span>
                  </div>

                  {personalInfo.email && (
                    <div className=" print:border-b print:pb-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-600">Email</span>
                      </div>
                      <span className="font-medium print:block print:mt-1">{personalInfo.email}</span>
                    </div>
                  )}

                  <div className="print:text-center print:border-b print:pb-2">
                    <div className="flex items-center print:justify-center">
                      <Home className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Address</span>
                    </div>
                    <span className="font-medium print:block print:mt-1">{personalInfo.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">System Configuration</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">System Size:</span>
                    <span className="font-medium">{selectedSize?.label}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Panel Brand:</span>
                    <span className="font-medium">{selectedPanelBrand?.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Inverter Brand:</span>
                    <span className="font-medium">{selectedInverterBrand}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Inverter Capacity:</span>
                    <span className="font-medium">{selectedInverterCapacity}KW</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Installation Type:</span>
                    <span className="font-medium">{selectedInstallationType}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Meter Type:</span>
                    <span className="font-medium">{selectedMeterType}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                {/* <h3 className="font-semibold text-lg mb-4">Cost Breakdown</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Solar Panels:</span>
                    <span className="font-medium">PKR {panelPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Inverter:</span>
                    <span className="font-medium">PKR {inverterPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Installation:</span>
                    <span className="font-medium">PKR {installationPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Meter:</span>
                    <span className="font-medium">PKR {meterPrice.toLocaleString()}</span>
                  </div>

                  <Separator className="my-2" />
                  </div>
                  */}

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <motion.span
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      PKR {totalPrice.toLocaleString()}
                    </motion.span>
                  </div>
                
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Additional Information</h3>

                <div className="space-y-2 text-gray-600 text-sm">
                  <p>• This quote is valid for 5 days from the date of generation.</p>
                  <p>• Installation timeline: 2-3 weeks after confirmation.</p>
                  <p>• Payment terms: 60% advance, 20% on panels and structure installation 20% after complete electrical work.</p>
                  <p>• Free maintenance for the first year.</p>
                  <p>• Net metering cost as per actual not inlcuded in quotation</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    )
  },
)

QuoteSummary.displayName = "QuoteSummary"

export default QuoteSummary
