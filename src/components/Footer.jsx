import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Facebook, 
  Twitter, 
  Linkedin,
  Shield,
  FileText,
  Users,
  Building
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'NGO Registration', href: '#' },
    { name: 'Application Status', href: '#' },
    { name: 'Download Forms', href: '#' },
    { name: 'Guidelines', href: '#' },
    { name: 'FAQ', href: '#' }
  ];

  const departments = [
    { name: 'Water Resources Department', href: '#' },
    { name: 'Agriculture Department', href: '#' },
    { name: 'Rural Development', href: '#' },
    { name: 'Forest Department', href: '#' },
    { name: 'Environment Department', href: '#' }
  ];

  const resources = [
    { name: 'User Manual', href: '#' },
    { name: 'Technical Support', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'RTI Information', href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Government Branding & Contact */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-3 rounded-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Tamil Nadu</h3>
                <p className="text-sky-200 text-sm">Government Portal</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Official NOC Application System for Tank Renovation and Water Conservation Projects. 
              Empowering NGOs to contribute to sustainable water management across Tamil Nadu.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="text-gray-300">
                  Secretariat, Fort St. George,<br />Chennai - 600009, Tamil Nadu
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="text-gray-300">+91-44-2567-0004</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="text-gray-300">noc.support@tn.gov.in</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="text-gray-300">www.tn.gov.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors text-sm block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Building className="w-5 h-5 text-sky-400" />
              Departments
            </h4>
            <ul className="space-y-3">
              {departments.map((dept, index) => (
                <li key={index}>
                  <a 
                    href={dept.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors text-sm block py-1"
                  >
                    {dept.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-400" />
              Resources
            </h4>
            <ul className="space-y-3 mb-8">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors text-sm block py-1"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Media Links */}
            <div>
              <h5 className="text-sm font-semibold text-white mb-3">Follow Us</h5>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="bg-slate-700 p-2 rounded-lg hover:bg-sky-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="bg-slate-700 p-2 rounded-lg hover:bg-sky-600 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="bg-slate-700 p-2 rounded-lg hover:bg-sky-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Helpline Section */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">24/7 Helpline</p>
                <p className="text-sky-100 text-sm">Call: 1800-425-0000 (Toll Free)</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">Email Support</p>
                <p className="text-sky-100 text-sm">helpdesk@tnnoc.gov.in</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} Government of Tamil Nadu. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Developed by Tamil Nadu e-Governance Agency
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-xs text-gray-400">
              <a href="#" className="hover:text-sky-400 transition-colors">
                Accessibility
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors">
                Site Map
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors">
                Archive
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
          
          {/* Digital India & NIC Logo Section */}
          <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-slate-700">
            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-4 py-2 rounded-lg text-xs font-semibold mb-2">
                DIGITAL INDIA
              </div>
              <p className="text-gray-500 text-xs">An Initiative of Government of India</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold mb-2">
                NIC POWERED
              </div>
              <p className="text-gray-500 text-xs">National Informatics Centre</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;