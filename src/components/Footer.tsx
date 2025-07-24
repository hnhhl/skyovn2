export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-green-400">CÔNG TY</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/about" className="hover:text-white transition-colors duration-200">Về Skyo</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
              <li><a href="/dai-ly-ve-may-bay" className="hover:text-white transition-colors duration-200">Đại lý vé máy bay</a></li>
              <li><a href="/dai-ly-khach-san" className="hover:text-white transition-colors duration-200">Đại lý khách sạn</a></li>
              <li><a href="/about#careers" className="hover:text-white transition-colors duration-200">Tuyển dụng</a></li>
              <li><a href="/about#contact" className="hover:text-white transition-colors duration-200">Liên hệ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-green-400">DỊCH VỤ</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors duration-200">Đặt vé trên Skyo</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Skyo Business</a></li>
              <li><a href="#" className="hover:text-white">Affiliates</a></li>
              <li><a href="#" className="hover:text-white">Advertise</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-green-400">KHÁM PHÁ</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Danh sách sân bay</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Các hãng hàng không</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Lịch chuyến bay</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Khách sạn</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-green-400">TẢI APP</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Skyo iOS</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Skyo Android</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              Copyright ©2025 Skyo Travel Technology. All Rights Reserved
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">📘</a>
              <a href="#" className="text-gray-400 hover:text-white">🐦</a>
              <a href="#" className="text-gray-400 hover:text-white">📷</a>
              <a href="#" className="text-gray-400 hover:text-white">💼</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
