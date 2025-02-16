import { useState, useEffect } from 'react'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en.json'

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function PhoneInput({ value, onChange, error }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState('BR')
  const [nationalNumber, setNationalNumber] = useState('')

  const countries = getCountries()

  useEffect(() => {
    const fullNumber = `+${getCountryCallingCode(selectedCountry)}${nationalNumber}`
    onChange(fullNumber)
  }, [selectedCountry, nationalNumber, onChange])

  const formatPhoneNumber = (number: string) => {
    // Remove non-numeric characters
    const cleaned = number.replace(/\D/g, '')
    
    // Format based on country
    if (selectedCountry === 'BR') {
      if (cleaned.length <= 2) return cleaned
      if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
    }
    
    return cleaned
  }

  return (
    <div className="flex gap-2">
      <div className="relative w-24">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white"
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country} +{getCountryCallingCode(country)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <input
          type="tel"
          value={nationalNumber}
          onChange={(e) => setNationalNumber(formatPhoneNumber(e.target.value))}
          className={`w-full px-3 py-2 bg-white dark:bg-gray-700 border ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white`}
          placeholder={en[selectedCountry]}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  )
}
