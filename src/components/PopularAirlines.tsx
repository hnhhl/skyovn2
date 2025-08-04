import { AirlineLogo } from './AirlineLogo'

export function PopularAirlines() {
  const airlines = [
    { name: 'Vietnam Airlines', code: 'VN' },
    { name: 'VietJet Air', code: 'VJ' },
    { name: 'Jetstar Pacific', code: 'BL' },
    { name: 'Bamboo Airways', code: 'QH' },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">
          Popular Airlines in Vietnam
        </h2>
        <p className="text-gray-600 mb-8">
          Book cheap flights on your favourite airlines
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {airlines.map((airline, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex justify-center mb-4">
                <AirlineLogo
                  airlineCode={airline.code}
                  className="h-16 w-auto group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                {airline.name}
              </h3>
              <p className="text-sm text-gray-500">{airline.code}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
