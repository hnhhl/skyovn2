
export function FeatureSection() {
  const features = [
    {
      icon: '🚗',
      title: 'Thuê xe',
      description: 'Thuê xe ô tô với giá ưu đãi tại mọi điểm đến',
      color: 'emerald'
    },
    {
      icon: '🏨',
      title: 'Khách sạn',
      description: 'Đặt phòng khách sạn với hơn 1 triệu lựa chọn',
      color: 'blue'
    },
    {
      icon: '📱',
      title: 'eSIM',
      description: 'Kết nối internet tức thì tại 200+ quốc gia',
      color: 'orange'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Dịch vụ toàn diện cho chuyến đi
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Không chỉ vé máy bay, Skyo cung cấp đầy đủ dịch vụ cho chuyến đi hoàn hảo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group border border-slate-100">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-3 text-${feature.color}-600`}>
                {feature.title}
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <button className={`bg-${feature.color}-600 text-white px-4 py-2 rounded-lg hover:bg-${feature.color}-700 transition-colors text-sm font-medium`}>
                Khám phá ngay
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
