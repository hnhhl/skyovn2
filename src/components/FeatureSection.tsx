
export function FeatureSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
          Khám phá giá trị thực của du lịch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-emerald-600 text-4xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">
              Thuê xe với Skyo
            </h3>
            <p className="text-slate-600 mb-4">
              Bắt đầu cuộc phiêu lưu với dịch vụ thuê xe của chúng tôi.
            </p>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors">
              Đặt ngay
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">🚌</div>
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Tàu & Xe buýt với Skyo
            </h3>
            <p className="text-slate-600 mb-4">
              Đặt tàu hoặc xe buýt cho chuyến đi thoải mái.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Đặt ngay
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-orange-600 text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-3 text-orange-600">
              eSIM với Skyo
            </h3>
            <p className="text-slate-600 mb-4">
              Kết nối tức thì với giải pháp eSIM của chúng tôi.
            </p>
            <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
