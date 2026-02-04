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
  FiVideo,
  FiMessageSquare,
  FiFileText,
  FiClock,
  FiDollarSign,
  FiUserCheck,
  FiPackage,
  FiActivity,
  FiCreditCard,
  FiAlertCircle,
  FiX,
  FiHeart,
  FiTarget,
  FiGlobe,
  FiLock,
  FiBookOpen,
  FiPhone,  // Added this
  FiMail     // Added this
} from 'react-icons/fi';

export default function ConsultationServicesPage() {
  const [activeConsultationType, setActiveConsultationType] = useState('general');
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  // Using the same color palette as services page
  const colors = {
    primary: '#2596be',
    secondary: '#122E34',
    dark: '#0E1D21',
    light: '#ABAFB5',
    accent: '#677E8A',
    white: '#FFFFFF'
  };

  const consultationTypes = [
    {
      id: 1,
      title: 'General Health Consultation',
      description: 'Comprehensive health assessment and medication review with our licensed pharmacists.',
      icon: <FiUserCheck className="h-12 w-12" />,
      bgColor: 'bg-gradient-to-br from-[#2596be] to-[#122E34]',
      iconColor: 'text-white',
      type: 'general',
      duration: '30-45 minutes',
      price: '$49',
      features: ['Medication Review', 'Health Assessment', 'Lifestyle Advice', 'Follow-up Plan'],
      detailedInfo: {
        overview: 'A comprehensive consultation focusing on your overall health, current medications, and wellness goals. Our pharmacists will review your medications for interactions and provide personalized health recommendations.',
        benefits: [
          'Complete medication review and reconciliation',
          'Identification of potential drug interactions',
          'Personalized health and wellness plan',
          'Chronic disease management guidance',
          'Nutrition and lifestyle recommendations',
          'Referral to specialists if needed'
        ],
        idealFor: [
          'Patients on multiple medications',
          'New medication management',
          'General health check-ups',
          'Preventive healthcare planning',
          'Chronic condition management'
        ],
        process: [
          'Pre-consultation health questionnaire',
          'Virtual meeting with licensed pharmacist',
          'Medication review and analysis',
          'Personalized recommendations',
          'Follow-up plan and resources'
        ],
        preparation: 'Please have your medication list, medical history, and any recent lab results ready.'
      }
    },
    {
      id: 2,
      title: 'Specialized Medication Counseling',
      description: 'Expert guidance on complex medication regimens and specialty medications.',
      icon: <FiFileText className="h-12 w-12" />,
      bgColor: 'bg-gradient-to-br from-[#122E34] to-[#0E1D21]',
      iconColor: 'text-white',
      type: 'specialized',
      duration: '45-60 minutes',
      price: '$79',
      features: ['Complex Regimen Review', 'Side Effect Management', 'Dosage Optimization', 'Specialty Medication Guidance'],
      detailedInfo: {
        overview: 'Advanced consultation for patients with complex medication regimens, specialty medications, or challenging treatment plans. Our specialists provide in-depth guidance on medication management.',
        benefits: [
          'Expert review of complex medication regimens',
          'Specialty medication education',
          'Side effect management strategies',
          'Dosage optimization recommendations',
          'Treatment adherence support',
          'Coordination with healthcare team'
        ],
        idealFor: [
          'Patients on specialty medications',
          'Complex chronic conditions',
          'Post-hospitalization medication management',
          'Cancer treatment medications',
          'Autoimmune disease treatments'
        ],
        process: [
          'Detailed medication history review',
          'Consultation with specialist pharmacist',
          'Regimen optimization plan',
          'Education on proper administration',
          'Monitoring and follow-up schedule'
        ],
        preparation: 'Bring all current medications, treatment history, and any specialist reports.'
      }
    },
    {
      id: 3,
      title: 'Chronic Condition Management',
      description: 'Ongoing support and monitoring for chronic health conditions.',
      icon: <FiActivity className="h-12 w-12" />,
      bgColor: 'bg-gradient-to-br from-[#2596be] via-[#122E34] to-[#0E1D21]',
      iconColor: 'text-white',
      type: 'chronic',
      duration: '60 minutes',
      price: '$99/month',
      features: ['Regular Monitoring', 'Progress Tracking', 'Medication Adjustment', 'Emergency Support'],
      detailedInfo: {
        overview: 'Comprehensive ongoing management program for chronic conditions like diabetes, hypertension, and heart disease. Includes regular check-ins and progress monitoring.',
        benefits: [
          'Regular vital signs monitoring',
          'Medication adherence tracking',
          'Progress reports to physicians',
          'Emergency consultation access',
          'Lifestyle modification support',
          'Lab test coordination'
        ],
        idealFor: [
          'Diabetes management',
          'Hypertension control',
          'Heart disease patients',
          'Asthma/COPD management',
          'Mental health conditions'
        ],
        process: [
          'Initial comprehensive assessment',
          'Monthly virtual consultations',
          'Regular progress monitoring',
          'Treatment plan adjustments',
          'Physician coordination'
        ],
        preparation: 'Initial assessment requires medical records and recent lab results.'
      }
    },
    {
      id: 4,
      title: 'Pediatric Medication Consultation',
      description: 'Specialized consultation for children\'s medication needs and dosing.',
      icon: <FiUsers className="h-12 w-12" />,
      bgColor: 'bg-gradient-to-br from-[#ABAFB5] to-[#677E8A]',
      iconColor: 'text-[#0E1D21]',
      type: 'pediatric',
      duration: '30-40 minutes',
      price: '$59',
      features: ['Child-specific Dosing', 'Flavoring Options', 'Administration Techniques', 'Growth Monitoring'],
      detailedInfo: {
        overview: 'Specialized consultation focusing on pediatric medication needs, proper dosing, administration techniques, and child-friendly medication options.',
        benefits: [
          'Age-appropriate dosing calculations',
          'Child-friendly medication options',
          'Administration technique guidance',
          'Growth and development monitoring',
          'Parent education and support',
          'Flavoring and compounding options'
        ],
        idealFor: [
          'Infants and toddlers',
          'School-aged children',
          'Adolescents',
          'First-time parents',
          'Children with chronic conditions'
        ],
        process: [
          'Child\'s health history review',
          'Weight-based dosing calculation',
          'Administration demonstration',
          'Parent education session',
          'Follow-up growth monitoring'
        ],
        preparation: 'Bring child\'s weight, age, and any previous medication history.'
      }
    },
    {
      id: 5,
      title: 'Travel Health Consultation',
      description: 'Pre-travel health assessment and vaccination guidance.',
      icon: <FiGlobe className="h-12 w-12" />,
      bgColor: 'bg-gradient-to-br from-[#2596be] to-[#0E1D21]',
      iconColor: 'text-white',
      type: 'travel',
      duration: '30 minutes',
      price: '$69',
      features: ['Destination-specific Advice', 'Vaccination Schedule', 'Medication Kit', 'Emergency Planning'],
      detailedInfo: {
        overview: 'Comprehensive pre-travel health consultation including destination-specific recommendations, vaccination schedules, and travel medication kits.',
        benefits: [
          'Destination-specific health risks assessment',
          'Vaccination requirements and scheduling',
          'Travel medication kit preparation',
          'Emergency medical planning',
          'Altitude sickness prevention',
          'Food and water safety tips'
        ],
        idealFor: [
          'International travelers',
          'Business travelers',
          'Adventure travelers',
          'Students studying abroad',
          'Family vacations'
        ],
        process: [
          'Travel itinerary review',
          'Destination risk assessment',
          'Vaccination recommendations',
          'Travel kit preparation',
          'Emergency contact setup'
        ],
        preparation: 'Bring travel itinerary, vaccination history, and any pre-existing conditions information.'
      }
    },
    {
      id: 6,
      title: 'Emergency Medication Consultation',
      description: '24/7 urgent consultation for medication emergencies and acute issues.',
      icon: <FiAlertCircle className="h-12 w-12" />,
      bgColor: 'bg-gradient-to-br from-[#2596be] via-[#122E34] to-[#0E1D21]',
      iconColor: 'text-white',
      type: 'emergency',
      duration: '15-30 minutes',
      price: '$89',
      features: ['24/7 Availability', 'Urgent Prescription', 'Emergency Guidance', 'Immediate Support'],
      detailedInfo: {
        overview: 'Immediate access to licensed pharmacists for medication emergencies, acute issues, and urgent prescription needs outside regular hours.',
        benefits: [
          '24/7 pharmacist availability',
          'Emergency prescription refills',
          'Acute symptom management',
          'Poison control guidance',
          'After-hours physician coordination',
          'Urgent delivery arrangements'
        ],
        idealFor: [
          'Medication emergencies',
          'Acute symptom management',
          'After-hours prescription needs',
          'Travel medication issues',
          'Urgent health concerns'
        ],
        process: [
          'Immediate connection with pharmacist',
          'Urgent assessment',
          'Emergency prescription if needed',
          'Follow-up recommendations',
          'Referral to emergency services if required'
        ],
        preparation: 'Have your medication list and symptoms description ready.'
      }
    },
  ];

  const consultationBenefits = [
    {
      title: 'Convenient Access',
      description: 'Consult from anywhere at any time through our secure platform',
      icon: <FiVideo className="h-8 w-8" />,
      gradient: 'from-[#2596be] to-[#122E34]'
    },
    {
      title: 'Expert Pharmacists',
      description: 'Board-certified pharmacists with specialized training',
      icon: <FiUserCheck className="h-8 w-8" />,
      gradient: 'from-[#122E34] to-[#0E1D21]'
    },
    {
      title: 'HIPAA Compliant',
      description: 'Your health information is secure and private',
      icon: <FiShield className="h-8 w-8" />,
      gradient: 'from-[#2596be] to-[#0E1D21]'
    },
    {
      title: 'Insurance Support',
      description: 'We help with insurance claims and medication coverage',
      icon: <FiCreditCard className="h-8 w-8" />,
      gradient: 'from-[#ABAFB5] to-[#677E8A]'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Book Appointment',
      description: 'Choose your preferred consultation type and schedule',
      icon: <FiCalendar className="h-6 w-6" />
    },
    {
      step: 2,
      title: 'Complete Assessment',
      description: 'Fill out our secure health assessment form',
      icon: <FiFileText className="h-6 w-6" />
    },
    {
      step: 3,
      title: 'Virtual Consultation',
      description: 'Meet with your pharmacist via secure video call',
      icon: <FiVideo className="h-6 w-6" />
    },
    {
      step: 4,
      title: 'Receive Plan',
      description: 'Get personalized recommendations and follow-up plan',
      icon: <FiCheck className="h-6 w-6" />
    }
  ];

  const filteredConsultations = consultationTypes.filter(consultation => 
    activeConsultationType === 'all' || consultation.type === activeConsultationType
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Consultation Details Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
            {/* Modal Header */}
            <div className={`sticky top-0 z-10 p-8 ${selectedConsultation.bgColor} rounded-t-2xl`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className={`mr-6 ${selectedConsultation.iconColor}`}>
                    {selectedConsultation.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-white">{selectedConsultation.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedConsultation(null)}
                  className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <FiX className="h-6 w-6 text-white" />
                </button>
              </div>
              <p className="text-white/90 text-lg">{selectedConsultation.description}</p>
              <div className="flex items-center mt-6 space-x-6">
                <div className="flex items-center">
                  <FiClock className="h-5 w-5 text-white/80 mr-2" />
                  <span className="text-white">{selectedConsultation.duration}</span>
                </div>
                <div className="flex items-center">
                  <FiDollarSign className="h-5 w-5 text-white/80 mr-2" />
                  <span className="text-white">{selectedConsultation.price}</span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Overview */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[#0E1D21] mb-6 flex items-center">
                  <FiTarget className="h-6 w-6 mr-3 text-[#2596be]" />
                  Consultation Overview
                </h3>
                <p className="text-[#677E8A] leading-relaxed">
                  {selectedConsultation.detailedInfo.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Benefits */}
                <div>
                  <h3 className="text-2xl font-bold text-[#0E1D21] mb-6 flex items-center">
                    <FiHeart className="h-6 w-6 mr-3 text-[#2596be]" />
                    Key Benefits
                  </h3>
                  <div className="space-y-4">
                    {selectedConsultation.detailedInfo.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start p-4 rounded-xl bg-gradient-to-r from-[#2596be]/5 to-transparent border border-[#2596be]/10">
                        <FiCheck className="h-5 w-5 mr-3 mt-0.5 text-[#2596be]" />
                        <span className="text-[#0E1D21]">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal For */}
                <div>
                  <h3 className="text-2xl font-bold text-[#0E1D21] mb-6 flex items-center">
                    <FiUserCheck className="h-6 w-6 mr-3 text-[#2596be]" />
                    Ideal For
                  </h3>
                  <div className="space-y-4">
                    {selectedConsultation.detailedInfo.idealFor.map((item, index) => (
                      <div key={index} className="flex items-center p-4 rounded-xl bg-gradient-to-r from-[#122E34]/5 to-transparent border border-[#122E34]/10">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center mr-4">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="text-[#0E1D21]">{item}</span>
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
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2596be] to-[#122E34]"></div>
                  
                  <div className="space-y-8">
                    {selectedConsultation.detailedInfo.process.map((step, index) => (
                      <div key={index} className="relative flex items-start">
                        <div className="absolute left-4 -translate-x-1/2">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedConsultation.bgColor} text-white font-bold text-lg`}>
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

              {/* Preparation */}
              <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 border border-[#2596be]/20">
                <h3 className="text-2xl font-bold text-[#0E1D21] mb-4 flex items-center">
                  <FiBookOpen className="h-6 w-6 mr-3 text-[#2596be]" />
                  Preparation Required
                </h3>
                <p className="text-[#677E8A]">{selectedConsultation.detailedInfo.preparation}</p>
              </div>

              {/* Features Grid */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[#0E1D21] mb-8 flex items-center">
                  <FiShield className="h-6 w-6 mr-3 text-[#2596be]" />
                  Features Included
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedConsultation.features.map((feature, index) => (
                    <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-[#ABAFB5] shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg ${selectedConsultation.bgColor} mr-4`}>
                          <FiCheck className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-[#0E1D21]">{feature}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-[#ABAFB5]">
                <Link
                  href="/booking"
                  className="flex-1 group px-8 py-4 bg-gradient-to-r from-[#2596be] to-[#122E34] hover:from-[#122E34] hover:to-[#0E1D21] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                >
                  <FiCalendar className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  Book This Consultation
                  <FiChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
                <button
                  onClick={() => setSelectedConsultation(null)}
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
              <span className="text-white text-base font-medium tracking-wide">Professional Pharmacy Consultation</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Expert Medical
              <span className="block text-white/90 mt-4">Consultation Services</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Connect with licensed pharmacists for personalized medication advice, health assessments, and chronic condition management from the comfort of your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/booking"
                className="group px-10 py-4 bg-gradient-to-r from-[#2596be] to-[#122E34] hover:from-[#122E34] hover:to-[#0E1D21] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1"
              >
                <FiCalendar className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                Book Consultation Now
                <FiChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('consultation-types').scrollIntoView({ behavior: 'smooth' })}
                className="group px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1"
              >
                View Services
                <FiChevronRight className="h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E1D21] mb-6">
              Why Choose Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Consultation Services</span>
            </h2>
            <p className="text-[#677E8A] text-lg max-w-3xl mx-auto leading-relaxed">
              Experience professional healthcare guidance with the convenience of virtual access and expert pharmaceutical knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {consultationBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-[#ABAFB5] hover:border-[#2596be]/50 transition-all duration-300 group shadow-sm hover:shadow-md">
                <div className={`mb-6 p-4 rounded-xl bg-gradient-to-br ${benefit.gradient} w-fit group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0E1D21] mb-3 group-hover:text-[#122E34] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-[#677E8A]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E1D21] mb-6">
              Simple & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Streamlined</span> Process
            </h2>
            <p className="text-[#677E8A] text-lg max-w-3xl mx-auto leading-relaxed">
              Getting professional pharmaceutical advice has never been easier with our four-step consultation process.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line for desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2596be] to-[#122E34] transform -translate-x-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={step.step} className="relative">
                  <div className="bg-white rounded-2xl p-8 border border-[#ABAFB5] hover:border-[#2596be]/50 transition-all duration-300 group shadow-sm hover:shadow-md h-full">
                    {/* Step number */}
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${index % 2 === 0 ? 'bg-gradient-to-r from-[#2596be] to-[#122E34]' : 'bg-gradient-to-r from-[#122E34] to-[#0E1D21]'} text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300`}>
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <div className={`mb-6 p-4 rounded-xl ${index % 2 === 0 ? 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10' : 'bg-gradient-to-r from-[#122E34]/10 to-[#0E1D21]/10'} w-fit`}>
                        <div className={`${index % 2 === 0 ? 'text-[#2596be]' : 'text-[#122E34]'}`}>
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-[#0E1D21] mb-3 group-hover:text-[#122E34] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[#677E8A]">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Types Section */}
      <div id="consultation-types" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E1D21] mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Consultation</span> Services
            </h2>
            <p className="text-[#677E8A] text-lg max-w-3xl mx-auto leading-relaxed">
              Choose from our range of specialized consultation services tailored to meet your specific healthcare needs.
            </p>
          </div>

          {/* Consultation Type Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {['all', 'general', 'specialized', 'chronic', 'pediatric', 'travel', 'emergency'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveConsultationType(type)}
                className={`px-7 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                  activeConsultationType === type
                    ? 'bg-gradient-to-r from-[#2596be] to-[#122E34] text-white shadow-lg'
                    : 'bg-white text-[#677E8A] hover:bg-gradient-to-r hover:from-[#2596be]/10 hover:to-[#122E34]/10 hover:text-[#0E1D21] border border-[#ABAFB5]'
                }`}
              >
                {type === 'all' ? 'All Consultations' : 
                 type === 'general' ? 'General Health' :
                 type === 'specialized' ? 'Specialized' :
                 type === 'chronic' ? 'Chronic Care' :
                 type === 'pediatric' ? 'Pediatric' :
                 type === 'travel' ? 'Travel Health' :
                 'Emergency'}
              </button>
            ))}
          </div>

          {/* Consultation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredConsultations.map((consultation) => (
              <div
                key={consultation.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[#ABAFB5]/30 hover:border-opacity-100 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 shadow-sm"
              >
                {/* Consultation Header */}
                <div className={`relative p-8 ${consultation.bgColor} flex items-center justify-between transition-all duration-300 group-hover:scale-[1.02]`}>
                  <div className={`transform group-hover:scale-110 transition-transform duration-300 ${consultation.iconColor}`}>
                    {consultation.icon}
                  </div>
                  <div className={`text-sm font-semibold px-4 py-2 rounded-full ${consultation.iconColor.includes('white') ? 'bg-white/20' : 'bg-black/10'} backdrop-blur-sm`}>
                    {consultation.type.charAt(0).toUpperCase() + consultation.type.slice(1)}
                  </div>
                </div>

                {/* Consultation Content */}
                <div className="relative p-8">
                  <h3 className="text-2xl font-bold text-[#0E1D21] mb-4 group-hover:text-[#122E34] transition-colors">
                    {consultation.title}
                  </h3>
                  <p className="text-[#677E8A] mb-8 leading-relaxed">
                    {consultation.description}
                  </p>

                  {/* Duration & Price */}
                  <div className="flex items-center justify-between mb-8 p-4 rounded-xl bg-gradient-to-r from-[#2596be]/5 to-transparent border border-[#2596be]/10">
                    <div className="flex items-center">
                      <FiClock className="h-5 w-5 text-[#2596be] mr-2" />
                      <span className="font-medium text-[#0E1D21]">{consultation.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <FiDollarSign className="h-5 w-5 text-[#2596be] mr-2" />
                      <span className="font-bold text-[#0E1D21]">{consultation.price}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {consultation.features.map((feature, index) => (
                      <div key={index} className="flex items-center group/feature">
                        <div className={`p-2 rounded-lg ${consultation.bgColor} mr-3 transform group-hover/feature:scale-110 transition-transform duration-300`}>
                          <FiCheck className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-[#0E1D21] text-sm font-medium group-hover/feature:text-[#122E34] transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => setSelectedConsultation(consultation)}
                    className={`w-full py-4 bg-gradient-to-r from-[#2596be] to-[#122E34] hover:from-[#122E34] hover:to-[#0E1D21] text-white rounded-xl font-semibold transition-all duration-300 border border-[#ABAFB5] hover:border-transparent group/btn transform hover:-translate-y-0.5`}
                  >
                    <span className="flex items-center justify-center">
                      View Details
                      <FiChevronRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E1D21] mb-6">
              Frequently Asked
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Questions</span>
            </h2>
            <p className="text-[#677E8A] text-lg max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about our consultation services.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'How do I book a consultation?',
                answer: 'You can book a consultation directly through our website by clicking the "Book Consultation" button, calling our hotline, or using our mobile app. You\'ll receive a confirmation email with your appointment details.'
              },
              {
                question: 'What technology do I need for a virtual consultation?',
                answer: 'You\'ll need a device with a camera and microphone (computer, tablet, or smartphone), stable internet connection, and a private space for the consultation. We support all major browsers and have a user-friendly platform.'
              },
              {
                question: 'Can you prescribe medications during the consultation?',
                answer: 'Yes, our licensed pharmacists can prescribe medications when appropriate after a thorough assessment. All prescriptions are electronically sent to your preferred pharmacy for convenient pickup or delivery.'
              },
              {
                question: 'Do you accept insurance for consultations?',
                answer: 'Yes, we accept most major insurance plans. We handle all insurance paperwork and can verify your coverage before your appointment. Some plans may require a copay.'
              },
              {
                question: 'What if I need to cancel or reschedule?',
                answer: 'You can cancel or reschedule your appointment up to 24 hours before your scheduled time through your account dashboard, email, or by calling our support team. Late cancellations may incur a fee.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-[#ABAFB5] hover:border-[#2596be]/50 transition-all duration-300 overflow-hidden group">
                <div className="p-6 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#0E1D21] group-hover:text-[#122E34] transition-colors">
                      {faq.question}
                    </h3>
                    <FiChevronRight className="h-5 w-5 text-[#2596be] transform group-hover:rotate-90 transition-transform" />
                  </div>
                  <div className="mt-4">
                    <p className="text-[#677E8A] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
            Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Consultation</span> Today
          </h2>
          <p className="text-[#677E8A] text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Take the first step towards better health management with our expert pharmaceutical consultation services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/booking"
              className="group px-10 py-5 bg-gradient-to-r from-[#2596be] via-[#122E34] to-[#0E1D21] hover:from-[#122E34] hover:via-[#0E1D21] hover:to-[#2596be] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1"
            >
              <FiCalendar className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
              Schedule Consultation Now
              <FiChevronRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="group px-10 py-5 bg-white border-2 border-[#2596be] hover:bg-gradient-to-r hover:from-[#2596be] hover:to-[#122E34] hover:text-white text-[#2596be] rounded-2xl font-bold transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1"
            >
              Contact Our Team
              <FiChevronRight className="h-6 w-6 ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </Link>
          </div>
          
          {/* Contact Info */}
          <div className="mt-16 pt-10 border-t border-[#ABAFB5]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <FiPhone className="h-8 w-8" />, 
                  title: 'Phone Support',
                  info: '1-800-PHARMACY',
                  gradient: 'from-[#2596be] to-[#122E34]' 
                },
                { 
                  icon: <FiMail className="h-8 w-8" />, 
                  title: 'Email',
                  info: 'consult@edpharma.com',
                  gradient: 'from-[#122E34] to-[#0E1D21]' 
                },
                { 
                  icon: <FiClock className="h-8 w-8" />, 
                  title: 'Hours',
                  info: '24/7 Availability',
                  gradient: 'from-[#2596be] to-[#0E1D21]' 
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center p-8 rounded-2xl bg-white border border-[#ABAFB5] shadow-sm group hover:shadow-md transition-all duration-300">
                  <div className={`mb-5 p-4 rounded-xl bg-gradient-to-br ${item.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <div className="text-[#0E1D21] font-semibold text-lg mb-2 group-hover:text-[#122E34] transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[#677E8A]">{item.info}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}