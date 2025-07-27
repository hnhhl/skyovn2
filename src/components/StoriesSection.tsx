
export function StoriesSection() {
  const stories = [
    {
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      title: "Vietnam Airlines đạt giải thưởng quốc tế"
    },
    {
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      title: "VietJet mở rộng đường bay quốc tế"
    },
    {
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      title: "Ưu đãi du lịch tốt nhất Việt Nam"
    },
    {
      image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      title: "Hỗ trợ khách hàng 24/7"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Tin tức & Cập nhật</h2>
          <a href="#" className="text-emerald-600 hover:underline font-medium">
            Xem tất cả tin tức →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stories.map((story, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                {story.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
