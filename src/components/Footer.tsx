'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Plane, Hotel, Building2, FileText, Users, HelpCircle, Calendar, Shield, CreditCard, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Về Skyo',
      links: [
        { name: 'Giới thiệu', href: '/about' },
        { name: 'Liên hệ', href: '/lien-he' },
        { name: 'Blog du lịch', href: '/blog' }
      ]
    },
    {
      title: 'Dịch vụ',
      links: [
        { name: 'Vé máy bay', href: '/search?tripType=oneway' },
        { name: 'Khách sạn', href: '/hotels' },
        { name: 'Đại lý vé máy bay', href: '/dai-ly-ve-may-bay' },
        { name: 'Đại lý khách sạn', href: '/dai-ly-khach-san' }
      ]
    },
    {
      title: 'Hỗ trợ',
      links: [
        { name: 'Trung tâm trợ giúp', href: '/help' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Chính sách hủy vé', href: '/chinh-sach-huy-ve' }
      ]
    },
    {
      title: 'Pháp lý',
      links: [
        { name: 'Điều khoản sử dụng', href: '/dieu-khoan-su-dung' },
        { name: 'Chính sách bảo mật', href: '/chinh-sach-bao-mat' }
      ]
    }
  ]

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/skyo.vietnam', icon: Facebook },
    { name: 'Instagram', href: 'https://instagram.com/skyo.vietnam', icon: Instagram },
    { name: 'Youtube', href: 'https://youtube.com/@skyo-vietnam', icon: Youtube }
  ]

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-bold text-lg text-blue-400">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Company Info & Social */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-slate-800 pt-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-blue-400">skyo</span>
              <span className="text-slate-500 text-sm">′</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nền tảng thông minh không mã giảm giá - giá rẻ từ đầu
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">Hotline: 1900 6420</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">support@skyo.vn</span>
              </div>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-blue-400">Kết nối với chúng tôi</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-200 text-slate-400"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-6 mt-8 text-center">
          <p className="text-slate-500 text-sm">
            © {currentYear} Skyo Vietnam. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}
