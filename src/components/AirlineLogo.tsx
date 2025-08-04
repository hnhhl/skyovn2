import React from 'react'

interface AirlineLogoProps {
  airlineCode: string
  className?: string
}

export function AirlineLogo({ airlineCode, className = "h-8 w-auto" }: AirlineLogoProps) {
  const getAirlineLogo = (code: string) => {
    const logos: { [key: string]: { url: string; alt: string } } = {
      'VN': {
        url: 'https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_rectangular/VN.png',
        alt: 'Vietnam Airlines'
      },
      'VJ': {
        url: 'https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_rectangular/VJ.png',
        alt: 'VietJet Air'
      },
      'QH': {
        url: 'https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_rectangular/QH.png',
        alt: 'Bamboo Airways'
      },
      'VU': {
        url: 'https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_rectangular/VU.png',
        alt: 'Vietravel Airlines'
      },
      'BL': {
        url: 'https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_rectangular/BL.png',
        alt: 'Jetstar Pacific'
      }
    }

    return logos[code] || {
      url: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="32" viewBox="0 0 80 32"><rect width="80" height="32" fill="%234F46E5" rx="4"/><text x="40" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">${code}</text></svg>`,
      alt: code
    }
  }

  const logo = getAirlineLogo(airlineCode)

  return (
    <img
      src={logo.url}
      alt={logo.alt}
      className={className}
      style={{ objectFit: 'contain' }}
      loading="lazy"
    />
  )
}

export function getAirlineFullName(code: string): string {
  const names: { [key: string]: string } = {
    'VN': 'Vietnam Airlines',
    'VJ': 'VietJet Air',
    'QH': 'Bamboo Airways',
    'VU': 'Vietravel Airlines',
    'BL': 'Jetstar Pacific'
  }
  return names[code] || code
}
