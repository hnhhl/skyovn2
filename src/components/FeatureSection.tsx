export function FeatureSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Discover The Real Value of Travel
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-green-600 text-4xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold mb-3 text-green-600">
              Car Rentals powered by Skyo
            </h3>
            <p className="text-gray-600 mb-4">
              Embark on your adventure with our car rental service.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Book now
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-green-600 text-4xl mb-4">🚌</div>
            <h3 className="text-xl font-semibold mb-3 text-green-600">
              Trains and Buses powered by Skyo
            </h3>
            <p className="text-gray-600 mb-4">
              Book a train or a bus for carefree travel.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Book now
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-green-600 text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-3 text-green-600">
              eSIMs powered by Skyo
            </h3>
            <p className="text-gray-600 mb-4">
              Unlock Instant Connectivity with our eSIM Solutions.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Buy now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
