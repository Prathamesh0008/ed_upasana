'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiCheck, 
  FiUsers, 
  FiStar, 
  FiShield, 
  FiTruck, 
  FiHeadphones, 
  FiCalendar, 
  FiChevronRight,
  FiPhone,
  FiMail,
  FiMapPin,
  FiActivity,
  FiPackage,
  FiClipboard,
  FiAlertCircle,
  FiCreditCard,
  FiX,
  FiClock,
  FiDollarSign,
  FiHeart,
  FiTarget,
  FiGlobe,
  FiLock
} from 'react-icons/fi';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredService, setHoveredService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  // Using the same color palette as contact page
  const colors = {
    primary: '#2596be',
    secondary: '#122E34',
    dark: '#0E1D21',
    light: '#ABAFB5',
    accent: '#677E8A',
    white: '#FFFFFF'
  };

  const services = [
    {
      id: 1,
      title: 'Online Pharmacy Consultation',
      description: 'Get expert medical advice and prescription services from licensed pharmacists online.',
      icon: <FiClipboard className="h-10 w-10" />,
      bgColor: 'bg-gradient-to-br from-[#2596be] to-[#122E34]',
      iconColor: 'text-white',
      borderColor: 'border-[#2596be]/30',
      hoverBorderColor: 'hover:border-[#2596be]',
      features: ['24/7 Availability', 'Prescription Management', 'Medication Counseling'],
      category: 'consultation',
      detailedInfo: {
        description: 'Our Online Pharmacy Consultation service connects you with licensed pharmacists for virtual consultations. Get personalized medication advice, prescription reviews, and healthcare guidance from the comfort of your home.',
        benefits: [
          'Virtual consultations with licensed pharmacists',
          'Prescription review and management',
          'Medication therapy management',
          'Drug interaction checks',
          'Personalized dosage recommendations',
          'Chronic disease management guidance'
        ],
        process: [
          'Schedule an appointment online',
          'Complete health assessment form',
          'Video consultation with pharmacist',
          'Receive personalized care plan',
          'Follow-up consultations available'
        ],
        pricing: 'Starting from $49 per consultation',
        duration: '30-45 minutes per session',
        requirements: 'Valid ID and medication list'
      }
    },
    {
      id: 2,
      title: 'Medication Delivery',
      description: 'Fast and discreet delivery of your medications right to your doorstep.',
      icon: <FiPackage className="h-10 w-10" />,
      bgColor: 'bg-gradient-to-br from-[#ABAFB5] to-[#677E8A]',
      iconColor: 'text-[#0E1D21]',
      borderColor: 'border-[#ABAFB5]/30',
      hoverBorderColor: 'hover:border-[#677E8A]',
      features: ['Same-day Delivery', 'Temperature-controlled', 'Discrete Packaging'],
      category: 'delivery',
      detailedInfo: {
        description: 'Our Medication Delivery service ensures your prescriptions reach you safely and on time. We handle everything from packaging to delivery with temperature-controlled containers for sensitive medications.',
        benefits: [
          'Same-day delivery in metro areas',
          'Temperature-controlled packaging',
          'Real-time tracking',
          'Contactless delivery option',
          'Refill reminders',
          'Insurance coordination'
        ],
        process: [
          'Submit prescription',
          'Insurance verification',
          'Pharmacy preparation',
          'Quality check',
          'Secure packaging',
          'Trackable delivery'
        ],
        pricing: 'Free delivery on orders over $50',
        duration: '2-4 hours for same-day delivery',
        requirements: 'Valid prescription and address'
      }
    },
    {
      id: 3,
      title: 'Health Monitoring',
      description: 'Regular health check-ups and medication monitoring services.',
      icon: <FiActivity className="h-10 w-10" />,
      bgColor: 'bg-gradient-to-br from-[#122E34] to-[#0E1D21]',
      iconColor: 'text-white',
      borderColor: 'border-[#122E34]/30',
      hoverBorderColor: 'hover:border-[#0E1D21]',
      features: ['Blood Pressure Checks', 'Cholesterol Monitoring', 'Diabetes Management'],
      category: 'health',
      detailedInfo: {
        description: 'Comprehensive health monitoring services to track and manage chronic conditions. We provide regular check-ups, lab tests, and medication monitoring to ensure optimal health outcomes.',
        benefits: [
          'Regular vital signs monitoring',
          'Chronic disease management',
          'Medication adherence tracking',
          'Lab test coordination',
          'Progress reports',
          'Emergency alert system'
        ],
        process: [
          'Initial health assessment',
          'Personalized monitoring plan',
          'Regular check-up schedule',
          'Data analysis and reporting',
          'Physician coordination',
          'Treatment adjustments'
        ],
        pricing: 'Starting from $79/month',
        duration: 'Ongoing with regular check-ins',
        requirements: 'Medical history and physician referral'
      }
    },
    {
      id: 4,
      title: 'Compounding Services',
      description: 'Custom medication compounding for unique patient needs.',
      icon: <FiClipboard className="h-10 w-10" />,
      bgColor: 'bg-gradient-to-br from-[#2596be] to-[#0E1D21]',
      iconColor: 'text-white',
      borderColor: 'border-[#2596be]/30',
      hoverBorderColor: 'hover:border-[#0E1D21]',
      features: ['Custom Dosages', 'Allergy-free Options', 'Flavoring Available'],
      category: 'specialty',
      detailedInfo: {
        description: 'Personalized medication compounding services for patients with unique needs. We create custom medications in various forms, dosages, and flavors to meet specific requirements.',
        benefits: [
          'Custom dosage forms',
          'Allergen-free preparations',
          'Pediatric flavoring options',
          'Veterinary compounding',
          'Hormone replacement therapy',
          'Pain management compounds'
        ],
        process: [
          'Physician prescription review',
          'Formulation development',
          'Quality assurance testing',
          'Sterile/non-sterile compounding',
          'Stability testing',
          'Patient education'
        ],
        pricing: 'Varies based on formulation',
        duration: '2-3 business days',
        requirements: 'Specialized prescription'
      }
    },
    {
      id: 5,
      title: 'Insurance Processing',
      description: 'We handle all insurance claims and paperwork for you.',
      icon: <FiCreditCard className="h-10 w-10" />,
      bgColor: 'bg-gradient-to-br from-[#2596be] via-[#122E34] to-[#0E1D21]',
      iconColor: 'text-white',
      borderColor: 'border-[#677E8A]/30',
      hoverBorderColor: 'hover:border-[#2596be]',
      features: ['Direct Billing', 'Claim Submission', 'Coverage Verification'],
      category: 'support',
      detailedInfo: {
        description: 'Streamlined insurance processing to handle all your healthcare claims and paperwork. We work directly with insurance providers to maximize your benefits and minimize out-of-pocket expenses.',
        benefits: [
          'Direct billing to insurance',
          'Claim submission and tracking',
          'Coverage verification',
          'Prior authorization assistance',
          'Appeal submissions',
          'Benefits explanation'
        ],
        process: [
          'Insurance information collection',
          'Coverage verification',
          'Claim submission',
          'Follow-up on pending claims',
          'Patient billing',
          'Appeal process if needed'
        ],
        pricing: 'Free service for all patients',
        duration: 'Immediate processing',
        requirements: 'Insurance information and prescription'
      }
    },
    {
      id: 6,
      title: 'Emergency Services',
      description: '24/7 emergency prescription refills and medical advice.',
      icon: <FiAlertCircle className="h-10 w-10" />,
      bgColor: 'bg-gradient-to-br from-[#2596be] via-[#122E34] to-[#0E1D21]',
      iconColor: 'text-white',
      borderColor: 'border-[#2596be]/30',
      hoverBorderColor: 'hover:border-[#122E34]',
      features: ['Emergency Refills', 'On-call Pharmacist', 'Urgent Delivery'],
      category: 'emergency',
      detailedInfo: {
        description: '24/7 emergency pharmaceutical services for urgent medication needs. Our on-call pharmacists are always available to assist with emergency refills, acute medication needs, and urgent consultations.',
        benefits: [
          '24/7 pharmacist availability',
          'Emergency prescription refills',
          'Urgent medication delivery',
          'Poison control information',
          'Emergency contraception',
          'After-hours physician coordination'
        ],
        process: [
          'Emergency contact',
          'Urgent assessment',
          'Pharmacist consultation',
          'Prescription verification',
          'Immediate dispensing',
          'Emergency delivery if needed'
        ],
        pricing: 'Emergency fee may apply',
        duration: 'Immediate response',
        requirements: 'Patient verification and medical need'
      }
    },
  ];

  const stats = [
    { 
      number: '10,000+', 
      label: 'Happy Customers', 
      icon: <FiUsers className="h-10 w-10" />, 
      color: 'text-[#2596be]',
      bgColor: 'bg-gradient-to-br from-[#2596be]/10 to-white',
      borderColor: 'border-[#2596be]/20'
    },
    { 
      number: '4.9/5', 
      label: 'Average Rating', 
      icon: <FiStar className="h-10 w-10" />, 
      color: 'text-[#122E34]',
      bgColor: 'bg-gradient-to-br from-[#122E34]/10 to-white',
      borderColor: 'border-[#122E34]/20'
    },
    { 
      number: '24/7', 
      label: 'Support Available', 
      icon: <FiHeadphones className="h-10 w-10" />, 
      color: 'text-[#0E1D21]',
      bgColor: 'bg-gradient-to-br from-[#0E1D21]/10 to-white',
      borderColor: 'border-[#0E1D21]/20'
    },
    { 
      number: '30-min', 
      label: 'Avg. Delivery Time', 
      icon: <FiTruck className="h-10 w-10" />, 
      color: 'text-[#677E8A]',
      bgColor: 'bg-gradient-to-br from-[#677E8A]/10 to-white',
      borderColor: 'border-[#677E8A]/20'
    },
  ];

  const filteredServices = services.filter(service => 
    activeTab === 'all' || service.category === activeTab
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
            {/* Modal Header */}
            <div className={`sticky top-0 z-10 p-8 ${selectedService.bgColor} rounded-t-2xl`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className={`mr-6 ${selectedService.iconColor}`}>
                    {selectedService.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-white">{selectedService.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <FiX className="h-6 w-6 text-white" />
                </button>
              </div>
              <p className="text-white/90 text-lg">{selectedService.description}</p>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Service Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-[#0E1D21] mb-6 flex items-center">
                    <FiTarget className="h-6 w-6 mr-3 text-[#2596be]" />
                    Service Overview
                  </h3>
                  <p className="text-[#677E8A] leading-relaxed mb-8">
                    {selectedService.detailedInfo.description}
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <FiClock className="h-5 w-5 mr-3 mt-1 text-[#2596be]" />
                      <div>
                        <h4 className="font-semibold text-[#0E1D21]">Duration</h4>
                        <p className="text-[#677E8A]">{selectedService.detailedInfo.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiDollarSign className="h-5 w-5 mr-3 mt-1 text-[#2596be]" />
                      <div>
                        <h4 className="font-semibold text-[#0E1D21]">Pricing</h4>
                        <p className="text-[#677E8A]">{selectedService.detailedInfo.pricing}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiClipboard className="h-5 w-5 mr-3 mt-1 text-[#2596be]" />
                      <div>
                        <h4 className="font-semibold text-[#0E1D21]">Requirements</h4>
                        <p className="text-[#677E8A]">{selectedService.detailedInfo.requirements}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#0E1D21] mb-6 flex items-center">
                    <FiHeart className="h-6 w-6 mr-3 text-[#2596be]" />
                    Key Benefits
                  </h3>
                  <div className="space-y-4 mb-8">
                    {selectedService.detailedInfo.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start p-4 rounded-xl bg-gradient-to-r from-[#2596be]/5 to-transparent border border-[#2596be]/10">
                        <FiCheck className="h-5 w-5 mr-3 mt-0.5 text-[#2596be]" />
                        <span className="text-[#0E1D21]">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Process Steps */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[#0E1D21] mb-8 flex items-center">
                  <FiGlobe className="h-6 w-6 mr-3 text-[#2596be]" />
                  How It Works
                </h3>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2596be] to-[#122E34]"></div>
                  
                  <div className="space-y-8">
                    {selectedService.detailedInfo.process.map((step, index) => (
                      <div key={index} className="relative flex items-start">
                        <div className="absolute left-4 -translate-x-1/2">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedService.bgColor} text-white font-bold text-lg`}>
                            {index + 1}
                          </div>
                        </div>
                        <div className="ml-16 p-6 rounded-xl bg-gradient-to-r from-[#122E34]/5 to-transparent border border-[#122E34]/10">
                          <h4 className="text-lg font-semibold text-[#0E1D21] mb-2">Step {index + 1}</h4>
                          <p className="text-[#677E8A]">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[#0E1D21] mb-8 flex items-center">
                  <FiShield className="h-6 w-6 mr-3 text-[#2596be]" />
                  Features Included
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedService.features.map((feature, index) => (
                    <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-[#ABAFB5] shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg ${selectedService.bgColor} mr-4`}>
                          <FiCheck className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-[#0E1D21]">{feature}</h4>
                      </div>
                      <p className="text-[#677E8A] text-sm">
                        {feature === '24/7 Availability' ? 'Round-the-clock access to our services' :
                         feature === 'Prescription Management' ? 'Complete handling of your medication needs' :
                         feature === 'Medication Counseling' ? 'Expert advice on medication usage' :
                         feature === 'Same-day Delivery' ? 'Quick delivery within hours' :
                         feature === 'Temperature-controlled' ? 'Special packaging for sensitive meds' :
                         feature === 'Discrete Packaging' ? 'Private and confidential packaging' :
                         feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-[#ABAFB5]">
                <Link
                  href="/consultation"
                  className="flex-1 group px-8 py-4 bg-gradient-to-r from-[#2596be] to-[#122E34] hover:from-[#122E34] hover:to-[#0E1D21] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                >
                  <FiCalendar className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  Book This Service
                  <FiChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 group px-8 py-4 bg-white border-2 border-[#2596be] hover:bg-gradient-to-r hover:from-[#2596be] hover:to-[#122E34] hover:text-white text-[#2596be] rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  Close Details
                  <FiX className="h-5 w-5 ml-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be]">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-block mb-8 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-white text-base font-medium tracking-wide">Premium Healthcare Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Exceptional
              <span className="block text-white/90 mt-4">Pharmaceutical Care</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Experience comprehensive healthcare services with our expert team of pharmacists and medical professionals dedicated to your well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/consultation"
                className="group px-10 py-4 bg-gradient-to-r from-[#2596be] to-[#122E34] hover:from-[#122E34] hover:to-[#0E1D21] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1"
              >
                <FiCalendar className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                Book Consultation
                <FiChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="group px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1"
              >
                Browse Products
                <FiChevronRight className="h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center p-8 rounded-2xl ${stat.bgColor} border ${stat.borderColor} hover:border-opacity-50 transition-all duration-300 hover:transform hover:-translate-y-1 group shadow-sm hover:shadow-md backdrop-blur-sm`}
              >
                <div className={`${stat.color} flex justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-[#0E1D21] mb-2 group-hover:text-[#122E34] transition-colors">
                  {stat.number}
                </div>
                <div className="text-[#677E8A] text-sm font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E1D21] mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Comprehensive</span> Services
            </h2>
            <p className="text-[#677E8A] text-lg max-w-3xl mx-auto leading-relaxed">
              From consultation to delivery, we provide end-to-end pharmaceutical care with excellence and compassion.
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {['all', 'consultation', 'delivery', 'health', 'specialty', 'support', 'emergency'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                onMouseEnter={() => setHoveredService(null)}
                className={`px-7 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-[#2596be] to-[#122E34] text-white shadow-lg'
                    : 'bg-white text-[#677E8A] hover:bg-gradient-to-r hover:from-[#2596be]/10 hover:to-[#122E34]/10 hover:text-[#0E1D21] border border-[#ABAFB5]'
                }`}
              >
                {tab === 'all' ? 'All Services' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[#ABAFB5]/30 hover:border-opacity-100 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 shadow-sm"
              >
                {/* Service Header */}
                <div className={`relative p-8 ${service.bgColor} flex items-center justify-between transition-all duration-300 group-hover:scale-[1.02]`}>
                  <div className={`transform group-hover:scale-110 transition-transform duration-300 ${service.iconColor}`}>
                    {service.icon}
                  </div>
                  <div className={`text-sm font-semibold px-4 py-2 rounded-full ${service.iconColor.includes('white') ? 'bg-white/20' : 'bg-black/10'} backdrop-blur-sm`}>
                    Service
                  </div>
                </div>

                {/* Service Content */}
                <div className="relative p-8">
                  <h3 className="text-2xl font-bold text-[#0E1D21] mb-4 group-hover:text-[#122E34] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#677E8A] mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center group/feature">
                        <div className={`p-2 rounded-lg ${service.bgColor} mr-4 transform group-hover/feature:scale-110 transition-transform duration-300`}>
                          <FiCheck className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-[#0E1D21] font-medium group-hover/feature:text-[#122E34] transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => setSelectedService(service)}
                    className={`w-full py-4 bg-gradient-to-r from-[#2596be] to-[#122E34] hover:from-[#122E34] hover:to-[#0E1D21] text-white rounded-xl font-semibold transition-all duration-300 border border-[#ABAFB5] hover:border-transparent group/btn transform hover:-translate-y-0.5`}
                  >
                    <span className="flex items-center justify-center">
                      Learn More
                      <FiChevronRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6 text-[#ABAFB5]">🔍</div>
              <h3 className="text-2xl font-bold text-[#0E1D21] mb-3">No services found</h3>
              <p className="text-[#677E8A] mb-8 max-w-md mx-auto">
                Try selecting a different category or check back soon for new services.
              </p>
              <button
                onClick={() => setActiveTab('all')}
                className="px-8 py-3 bg-gradient-to-r from-[#2596be] to-[#122E34] text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Show All Services
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div>
              <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 rounded-full border border-[#2596be]/20">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] text-sm font-medium">Why Choose Us</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0E1D21] mb-8 leading-tight">
                Excellence in Every
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Pharmaceutical Service</span>
              </h2>
              <p className="text-[#677E8A] text-lg mb-12 leading-relaxed">
                We combine decades of pharmaceutical expertise with cutting-edge technology to deliver exceptional healthcare services you can trust.
              </p>
              
              <div className="space-y-8">
                {[
                  {
                    title: 'Expert Pharmacists',
                    description: 'Our team consists of highly qualified and experienced pharmacists with specialized training.',
                    icon: <FiUsers className="h-6 w-6" />,
                    gradient: 'from-[#2596be] to-[#122E34]'
                  },
                  {
                    title: 'Secure & Private',
                    description: 'Your health information is protected with enterprise-grade security and HIPAA compliance.',
                    icon: <FiShield className="h-6 w-6" />,
                    gradient: 'from-[#122E34] to-[#0E1D21]'
                  },
                  {
                    title: 'Convenient Access',
                    description: 'Access services anytime, anywhere through our user-friendly digital platform.',
                    icon: <FiHeadphones className="h-6 w-6" />,
                    gradient: 'from-[#2596be] to-[#0E1D21]'
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-6 rounded-2xl bg-white border border-[#ABAFB5] hover:border-[#2596be]/50 transition-all duration-300 group shadow-sm hover:shadow-md">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${item.gradient} mr-6 transform group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#0E1D21] font-bold text-xl mb-2 group-hover:text-[#122E34] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[#677E8A]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Testimonials */}
            <div className="bg-white rounded-3xl p-10 border border-[#ABAFB5] shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-bold text-[#0E1D21]">Customer Stories</h3>
                <div className="flex items-center">
                  <FiStar className="h-6 w-6 text-[#2596be] mr-1" />
                  <span className="text-2xl font-bold text-[#0E1D21]">4.9</span>
                  <span className="text-[#677E8A] ml-1">/5</span>
                </div>
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    name: 'John D.',
                    service: 'Medication Delivery',
                    review: 'The delivery service is exceptional! Always on time and discreet packaging.',
                    rating: 5,
                    gradient: 'from-[#2596be] to-[#122E34]'
                  },
                  {
                    name: 'Sarah M.',
                    service: 'Online Consultation',
                    review: 'The pharmacists were incredibly helpful and knowledgeable. Saved me a trip to the clinic!',
                    rating: 5,
                    gradient: 'from-[#122E34] to-[#0E1D21]'
                  },
                  {
                    name: 'Robert K.',
                    service: 'Health Monitoring',
                    review: 'Regular monitoring helped me manage my diabetes better. Highly recommended!',
                    rating: 5,
                    gradient: 'from-[#2596be] to-[#0E1D21]'
                  },
                ].map((testimonial, index) => (
                  <div key={index} className="relative pl-10 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-[#2596be] before:to-[#122E34]">
                    <div className="flex items-center mb-5">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold mr-4 bg-gradient-to-br ${testimonial.gradient}`}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-[#0E1D21] text-lg">{testimonial.name}</div>
                        <div className="text-sm text-[#677E8A]">{testimonial.service}</div>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`h-5 w-5 ${i < testimonial.rating ? 'text-[#2596be]' : 'text-[#ABAFB5]'}`}
                        />
                      ))}
                    </div>
                    <p className="text-[#677E8A] leading-relaxed">"{testimonial.review}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="absolute inset-0 bg-grid-gray-100/[0.05]"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-8 px-6 py-3 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 backdrop-blur-sm rounded-full border border-[#ABAFB5]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] font-medium">Ready to Get Started?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0E1D21] mb-8">
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Premium Care</span> Today
          </h2>
          <p className="text-[#677E8A] text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust us with their healthcare needs. Your health journey starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/consultation"
              className="group px-10 py-5 bg-gradient-to-r from-[#2596be] via-[#122E34] to-[#0E1D21] hover:from-[#122E34] hover:via-[#0E1D21] hover:to-[#2596be] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1"
            >
              <FiCalendar className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
              Schedule Service Now
              <FiChevronRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="group px-10 py-5 bg-white border-2 border-[#2596be] hover:bg-gradient-to-r hover:from-[#2596be] hover:to-[#122E34] hover:text-white text-[#2596be] rounded-2xl font-bold transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1"
            >
              Contact Support Team
              <FiChevronRight className="h-6 w-6 ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </Link>
          </div>
          
          {/* Features Grid */}
          <div className="mt-16 pt-10 border-t border-[#ABAFB5]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <FiShield className="h-8 w-8" />, 
                  text: 'HIPAA Compliant', 
                  gradient: 'from-[#2596be] to-[#122E34]' 
                },
                { 
                  icon: <FiTruck className="h-8 w-8" />, 
                  text: 'Free Delivery*', 
                  gradient: 'from-[#122E34] to-[#0E1D21]' 
                },
                { 
                  icon: <FiHeadphones className="h-8 w-8" />, 
                  text: '24/7 Support', 
                  gradient: 'from-[#2596be] to-[#0E1D21]' 
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center p-8 rounded-2xl bg-white border border-[#ABAFB5] shadow-sm group hover:shadow-md transition-all duration-300">
                  <div className={`mb-5 p-4 rounded-xl bg-gradient-to-br ${item.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <div className="text-[#0E1D21] font-semibold text-lg group-hover:text-[#122E34] transition-colors">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[#677E8A] text-sm italic">*Free delivery on orders above $50</p>
          </div>
        </div>
      </div>
    </div>
  );
}