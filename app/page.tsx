"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useReactToPrint } from "react-to-print"
import { useRef } from "react"
import { ArrowLeft, ArrowRight, Download, Printer, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import SystemSizeStep from "@/components/system-size-step"
import PanelBrandStep from "@/components/panel-brand-step"
import InverterStep from "@/components/inverter-step"
import InstallationTypeStep from "@/components/installation-type-step"
import MeterTypeStep from "@/components/meter-type-step"
import PersonalInfoStep from "@/components/personal-info-form"
import QuoteSummary from "@/components/quote-summary"
import { useToast } from "@/components/ui/use-toast"

// Define types
type SystemSize = { value: string; label: string; panels: number }
type PanelBrand = { name: string; pricePerWatt: number; wattage: number }
type InverterBrand = "Huawei" | "Growatt / Fox" | "Solis / Goodwe"
type InverterCapacity = "10" | "15" | "20" | "25"
type InstallationType = "Normal" | "Elevated"
type MeterType = "Single Phase" | "Three Phase"
export type PersonalInfo = {
  name: string
  phone: string
  city: string
  address: string
  email: string
}

export default function SolarQuoteGenerator() {
  const { toast } = useToast()

  // Step tracking
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 7

  // Form state
  const [selectedSize, setSelectedSize] = useState<SystemSize | null>(null)
  const [selectedPanelBrand, setSelectedPanelBrand] = useState<PanelBrand | null>(null)
  const [selectedInverterBrand, setSelectedInverterBrand] = useState<InverterBrand | null>(null)
  const [selectedInverterCapacity, setSelectedInverterCapacity] = useState<InverterCapacity | null>(null)
  const [selectedInstallationType, setSelectedInstallationType] = useState<InstallationType | null>(null)
  const [selectedMeterType, setSelectedMeterType] = useState<MeterType | null>(null)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    phone: "",
    city: "",
    address: "",
    email: "",
  })

  // Price calculations
  const [panelPrice, setPanelPrice] = useState(0)
  const [inverterPrice, setInverterPrice] = useState(0)
  const [installationPrice, setInstallationPrice] = useState(0)
  const [meterPrice, setMeterPrice] = useState(0)

  // For PDF printing
  const componentRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef:  componentRef,
  })

  // Navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Reset all selections and go back to step 1
  const handleStartOver = () => {
    setSelectedSize(null)
    setSelectedPanelBrand(null)
    setSelectedInverterBrand(null)
    setSelectedInverterCapacity(null)
    setSelectedInstallationType(null)
    setSelectedMeterType(null)
    setPersonalInfo({
      name: "",
      phone: "",
      city: "",
      address: "",
      email: "",
    })
    setPanelPrice(0)
    setInverterPrice(0)
    setInstallationPrice(0)
    setMeterPrice(0)
    setCurrentStep(1)
  }

  // Handle form submission
  const handleSubmitQuote = () => {
    // Here you would typically send the data to your backend
    console.log("Quote submitted with personal info:", personalInfo)

    // Show success message
    toast({
      title: "Quote Request Submitted",
      description: `Thank you, ${personalInfo.name}! We'll contact you shortly with your personalized solar quote.`,
      duration: 5000,
    })
  }

  // Check if current step is complete to enable next button
  const isCurrentStepComplete = () => {
    switch (currentStep) {
      case 1:
        return !!selectedSize
      case 2:
        return !!selectedPanelBrand
      case 3:
        return !!selectedInverterBrand && !!selectedInverterCapacity
      case 4:
        return !!selectedInstallationType
      case 5:
        return !!selectedMeterType
      case 6:
        return !!(personalInfo.name && personalInfo.phone && personalInfo.city && personalInfo.address)
      default:
        return true
    }
  }

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Sun className="h-10 w-10 text-yellow-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Solar System Quote Generator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate your personalized solar system quote in minutes. Follow the steps below to get started.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        {/* Step content */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ type: "tween", duration: 0.3 }}
              className="flex-grow"
            >
              {currentStep === 1 && <SystemSizeStep selectedSize={selectedSize} setSelectedSize={setSelectedSize} />}

              {currentStep === 2 && selectedSize && (
                <PanelBrandStep
                  selectedPanelBrand={selectedPanelBrand}
                  setSelectedPanelBrand={setSelectedPanelBrand}
                  panelCount={selectedSize.panels}
                  setPanelPrice={setPanelPrice}
                />
              )}

              {currentStep === 3 && selectedSize && (
                <InverterStep
                  selectedInverterBrand={selectedInverterBrand}
                  setSelectedInverterBrand={setSelectedInverterBrand}
                  selectedInverterCapacity={selectedInverterCapacity}
                  setSelectedInverterCapacity={setSelectedInverterCapacity}
                  setInverterPrice={setInverterPrice}
                />
              )}

              {currentStep === 4 && selectedSize && (
                <InstallationTypeStep
                  selectedInstallationType={selectedInstallationType}
                  setSelectedInstallationType={setSelectedInstallationType}
                  panelCount={selectedSize.panels}
                  setInstallationPrice={setInstallationPrice}
                />
              )}

              {currentStep === 5 && (
                <MeterTypeStep
                  selectedMeterType={selectedMeterType}
                  setSelectedMeterType={setSelectedMeterType}
                  setMeterPrice={setMeterPrice}
                />
              )}

              {currentStep === 6 && <PersonalInfoStep personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />}

              {currentStep === 7 && (
                <div className="space-y-6">
                  <QuoteSummary
                    ref={componentRef}
                    selectedSize={selectedSize}
                    selectedPanelBrand={selectedPanelBrand}
                    selectedInverterBrand={selectedInverterBrand}
                    selectedInverterCapacity={selectedInverterCapacity}
                    selectedInstallationType={selectedInstallationType}
                    selectedMeterType={selectedMeterType}
                    personalInfo={personalInfo}
                    panelPrice={panelPrice}
                    inverterPrice={inverterPrice}
                    installationPrice={installationPrice}
                    meterPrice={meterPrice}
                  />

                  {/* <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
                    
                    <Button type="button" onClick={handleSubmitQuote} className="bg-yellow-500 hover:bg-yellow-600">
                      Submit Quote Request
                    </Button>
                  </div> */}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <div className="flex gap-2">
            {currentStep === totalSteps && (
              <>
              <Button type="button" variant="outline" onClick={handleStartOver} className="flex items-center">
                      <Sun className="mr-2 h-4 w-4" /> Start New Quote
                    </Button>
                <Button variant="outline" onClick={() => handlePrint()} className="flex items-center">
                  <Printer className="mr-2 h-4 w-4" /> Print Quote
                </Button>
                <Button variant="outline" onClick={() => handlePrint()} className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </>
            )}

            {currentStep < totalSteps && (
              <Button
                onClick={nextStep}
                disabled={!isCurrentStepComplete()}
                className="flex items-center bg-yellow-500 hover:bg-yellow-600"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
