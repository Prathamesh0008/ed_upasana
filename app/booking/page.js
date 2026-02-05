'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiCalendar,
  FiClock,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiChevronRight,
  FiCheck,
  FiShield,
  FiLock,
  FiCreditCard,
  FiPackage,
  FiActivity,
  FiUsers,
  FiGlobe,
  FiAlertCircle,
  FiMessageSquare,
  FiChevronLeft,
  FiArrowRight,
  FiStar,
  FiX,
  FiCheckCircle,
  FiInfo,
  FiVideo,
  FiHome,
  FiDollarSign,
  FiAward,
  FiTruck,
  FiHeart,
  FiTarget,
  FiBookOpen,
  FiCloud,
  FiSun,
  FiMoon,
  FiWind,
  FiZap,
  FiUmbrella,
  FiThermometer,
  FiDroplet,
  FiWatch,
  FiBell,
  FiSettings,
  FiTool,
  FiBriefcase,
  FiCoffee,
  FiMusic,
  FiCamera,
  FiHeadphones
} from 'react-icons/fi';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    insuranceProvider: '',
    policyNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced gradient colors for all elements
  const gradients = {
    primary: 'bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34]',
    secondary: 'bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#1a3a42]',
    accent: 'bg-gradient-to-r from-[#2596be] to-[#0E1D21]',
    light: 'bg-gradient-to-r from-[#ABAFB5] to-[#677E8A]',
    success: 'bg-gradient-to-r from-[#10b981] via-[#059669] to-[#047857]',
    warning: 'bg-gradient-to-r from-[#f59e0b] via-[#d97706] to-[#b45309]',
    pink: 'bg-gradient-to-r from-[#ec4899] via-[#db2777] to-[#be185d]',
    purple: 'bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9]'
  };

  // Text gradient classes
  const textGradients = {
    primary: 'text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34]',
    secondary: 'text-transparent bg-clip-text bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#1a3a42]',
    accent: 'text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#0E1D21]',
    white: 'text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white',
    success: 'text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#059669]',
    warning: 'text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#d97706]'
  };

  // Button Classes with Enhanced Gradients
  const buttonClasses = {
    primary: 'inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-3 bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34] hover:bg-gradient-to-r hover:from-[#122E34] hover:via-[#0E1D21] hover:to-[#2596be] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-sm md:text-base',
    secondary: 'inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-3 bg-gradient-to-r from-white to-gray-50 border-2 border-transparent bg-origin-border bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34] text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34] hover:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-sm md:text-base',
    outline: 'inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border-2 border-white/30 hover:border-white/60 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-sm md:text-base',
    gradientBorder: 'inline-flex items-center justify-center px-4 py-3 md:px-6 md:py-3 bg-gradient-to-r from-white to-gray-50 border-2 border-transparent bg-origin-border bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34] text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34] hover:text-white hover:bg-gradient-to-r hover:from-[#2596be] hover:via-[#1a7fa3] hover:to-[#122E34] font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-sm md:text-base'
  };

  // Enhanced Services data with more gradients
  const consultationServices = [
    {
      id: 1,
      title: 'General Health Consultation',
      description: 'Comprehensive health assessment and medication review with our licensed pharmacists.',
      icon: <FiUsers className="h-10 w-10 md:h-12 md:w-12" />,
      gradient: 'bg-gradient-to-br from-[#2596be] via-[#1a7fa3] to-[#122E34]',
      iconBg: 'bg-gradient-to-br from-[#2596be]/20 to-[#122E34]/20',
      duration: '30-45 minutes',
      price: '$49',
      priceGradient: 'from-[#2596be] via-[#1a7fa3] to-[#122E34]',
      features: ['Medication Review', 'Health Assessment', 'Lifestyle Advice', 'Follow-up Plan']
    },
    {
      id: 2,
      title: 'Specialized Medication Counseling',
      description: 'Expert guidance on complex medication regimens and specialty medications.',
      icon: <FiActivity className="h-10 w-10 md:h-12 md:w-12" />,
      gradient: 'bg-gradient-to-br from-[#122E34] via-[#1a3a42] to-[#0E1D21]',
      iconBg: 'bg-gradient-to-br from-[#122E34]/20 to-[#0E1D21]/20',
      duration: '45-60 minutes',
      price: '$79',
      priceGradient: 'from-[#122E34] via-[#1a3a42] to-[#0E1D21]',
      features: ['Complex Regimen Review', 'Side Effect Management', 'Dosage Optimization', 'Specialty Medication Guidance']
    },
    {
      id: 3,
      title: 'Chronic Condition Management',
      description: 'Ongoing support and monitoring for chronic health conditions.',
      icon: <FiPackage className="h-10 w-10 md:h-12 md:w-12" />,
      gradient: 'bg-gradient-to-br from-[#2596be] via-[#1a7fa3] via-[#122E34] to-[#0E1D21]',
      iconBg: 'bg-gradient-to-br from-[#2596be]/20 via-[#122E34]/20 to-[#0E1D21]/20',
      duration: '60 minutes',
      price: '$99/month',
      priceGradient: 'from-[#2596be] via-[#122E34] to-[#0E1D21]',
      features: ['Regular Monitoring', 'Progress Tracking', 'Medication Adjustment', 'Emergency Support']
    },
    {
      id: 4,
      title: 'Pediatric Medication Consultation',
      description: 'Specialized consultation for children\'s medication needs and dosing.',
      icon: <FiHeart className="h-10 w-10 md:h-12 md:w-12" />,
      gradient: 'bg-gradient-to-br from-[#ABAFB5] via-[#8a9099] to-[#677E8A]',
      iconBg: 'bg-gradient-to-br from-[#ABAFB5]/20 to-[#677E8A]/20',
      duration: '30-40 minutes',
      price: '$59',
      priceGradient: 'from-[#ABAFB5] via-[#8a9099] to-[#677E8A]',
      features: ['Child-specific Dosing', 'Flavoring Options', 'Administration Techniques', 'Growth Monitoring']
    },
    {
      id: 5,
      title: 'Travel Health Consultation',
      description: 'Pre-travel health assessment and vaccination guidance.',
      icon: <FiGlobe className="h-10 w-10 md:h-12 md:w-12" />,
      gradient: 'bg-gradient-to-br from-[#2596be] via-[#1a7fa3] to-[#0E1D21]',
      iconBg: 'bg-gradient-to-br from-[#2596be]/20 to-[#0E1D21]/20',
      duration: '30 minutes',
      price: '$69',
      priceGradient: 'from-[#2596be] via-[#1a7fa3] to-[#0E1D21]',
      features: ['Destination-specific Advice', 'Vaccination Schedule', 'Medication Kit', 'Emergency Planning']
    },
    {
      id: 6,
      title: 'Emergency Medication Consultation',
      description: '24/7 urgent consultation for medication emergencies and acute issues.',
      icon: <FiAlertCircle className="h-10 w-10 md:h-12 md:w-12" />,
      gradient: 'bg-gradient-to-br from-[#2596be] via-[#122E34] to-[#0E1D21]',
      iconBg: 'bg-gradient-to-br from-[#2596be]/20 via-[#122E34]/20 to-[#0E1D21]/20',
      duration: '15-30 minutes',
      price: '$89',
      priceGradient: 'from-[#2596be] via-[#122E34] to-[#0E1D21]',
      features: ['24/7 Availability', 'Urgent Prescription', 'Emergency Guidance', 'Immediate Support']
    }
  ];

  // Enhanced available dates
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return {
      id: i + 1,
      date: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : days[date.getDay()],
      day: days[date.getDay()],
      dateNumber: date.getDate().toString(),
      month: months[date.getMonth()],
      fullDate: date,
      available: date.getDay() !== 0 && date.getDay() !== 6,
      gradient: i % 3 === 0 ? 'from-[#2596be] to-[#1a7fa3]' : 
                i % 3 === 1 ? 'from-[#1a7fa3] to-[#122E34]' : 
                'from-[#122E34] to-[#0E1D21]'
    };
  });

  // Time slots with gradient availability
  const timeSlots = [
    { time: '09:00 AM', available: true, gradient: 'from-[#2596be] to-[#1a7fa3]' },
    { time: '09:30 AM', available: true, gradient: 'from-[#1a7fa3] to-[#122E34]' },
    { time: '10:00 AM', available: true, gradient: 'from-[#2596be] to-[#1a7fa3]' },
    { time: '10:30 AM', available: true, gradient: 'from-[#1a7fa3] to-[#122E34]' },
    { time: '11:00 AM', available: true, gradient: 'from-[#2596be] to-[#1a7fa3]' },
    { time: '11:30 AM', available: true, gradient: 'from-[#1a7fa3] to-[#122E34]' },
    { time: '01:00 PM', available: true, gradient: 'from-[#2596be] to-[#1a7fa3]' },
    { time: '01:30 PM', available: true, gradient: 'from-[#1a7fa3] to-[#122E34]' },
    { time: '02:00 PM', available: true, gradient: 'from-[#2596be] to-[#1a7fa3]' },
    { time: '02:30 PM', available: true, gradient: 'from-[#1a7fa3] to-[#122E34]' },
    { time: '03:00 PM', available: true, gradient: 'from-[#2596be] to-[#1a7fa3]' },
    { time: '03:30 PM', available: true, gradient: 'from-[#1a7fa3] to-[#122E34]' },
    { time: '04:00 PM', available: true, gradient: 'from-[#2596be] to-[#1a7fa3]' },
    { time: '04:30 PM', available: true, gradient: 'from-[#1a7fa3] to-[#122E34]' },
    { time: '05:00 PM', available: false, gradient: 'from-gray-400 to-gray-500' },
    { time: '05:30 PM', available: false, gradient: 'from-gray-400 to-gray-500' },
    { time: '06:00 PM', available: false, gradient: 'from-gray-400 to-gray-500' },
    { time: '06:30 PM', available: false, gradient: 'from-gray-400 to-gray-500' }
  ];

  const steps = [
    { number: 1, title: 'Select Service', icon: <FiActivity className="h-5 w-5 md:h-6 md:w-6" />, gradient: 'from-[#2596be] via-[#1a7fa3] to-[#122E34]' },
    { number: 2, title: 'Choose Time', icon: <FiClock className="h-5 w-5 md:h-6 md:w-6" />, gradient: 'from-[#122E34] via-[#0E1D21] to-[#1a3a42]' },
    { number: 3, title: 'Your Details', icon: <FiUser className="h-5 w-5 md:h-6 md:w-6" />, gradient: 'from-[#2596be] via-[#1a7fa3] to-[#0E1D21]' },
    { number: 4, title: 'Confirmation', icon: <FiCheck className="h-5 w-5 md:h-6 md:w-6" />, gradient: 'from-[#2596be] via-[#122E34] to-[#0E1D21]' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmitBooking();
    }
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate booking ID
    const newBookingId = 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setBookingId(newBookingId);
    setBookingSuccess(true);
    setIsSubmitting(false);
  };

  const resetBooking = () => {
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingDetails({
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
      insuranceProvider: '',
      policyNumber: ''
    });
    setCurrentStep(1);
    setBookingSuccess(false);
  };

  // Success Modal Component
  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 flex items-center justify-center p-4 md:p-8">
        <div className="max-w-2xl w-full">
          <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Success Header with Enhanced Gradient */}
            <div className="relative p-8 md:p-10 text-center bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34] overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/10"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white/10"></div>
              </div>
              
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-r from-white to-gray-100 flex items-center justify-center shadow-lg">
                    <FiCheckCircle className="h-12 w-12 md:h-16 md:w-16 text-[#2596be]" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white mb-4">Booking Confirmed!</h1>
                <p className="text-white/90 text-lg">Your consultation has been successfully scheduled</p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="p-6 md:p-10">
              <div className="bg-gradient-to-br from-[#2596be]/5 via-[#1a7fa3]/5 to-[#122E34]/5 rounded-2xl p-6 md:p-8 mb-8 border border-[#2596be]/20">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-2">Booking Details</h3>
                    <p className="text-sm text-[#677E8A]">Booking ID: <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">{bookingId}</span></p>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${selectedService?.priceGradient || 'from-[#2596be] to-[#122E34]'}`}>{selectedService?.price}</div>
                    <div className="text-sm text-[#677E8A]">{selectedService?.duration}</div>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-200">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center mr-4">
                      <FiActivity className="h-6 w-6 md:h-7 md:w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] text-base md:text-lg">{selectedService?.title}</div>
                      <div className="text-sm text-[#677E8A]">Service Type</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-200">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-r from-[#122E34] to-[#0E1D21] flex items-center justify-center mr-4">
                        <FiCalendar className="h-6 w-6 md:h-7 md:w-7 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">{selectedDate?.date}</div>
                        <div className="text-sm text-[#677E8A]">Date</div>
                      </div>
                    </div>

                    <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-200">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-r from-[#2596be] to-[#0E1D21] flex items-center justify-center mr-4">
                        <FiClock className="h-6 w-6 md:h-7 md:w-7 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">{selectedTime?.time || selectedTime}</div>
                        <div className="text-sm text-[#677E8A]">Time Slot</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-200">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-r from-[#ABAFB5] to-[#677E8A] flex items-center justify-center mr-4">
                      <FiUser className="h-6 w-6 md:h-7 md:w-7 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">{bookingDetails.name}</div>
                      <div className="text-sm text-[#677E8A]">Patient Name</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-6 flex items-center">
                  <FiZap className="h-6 w-6 mr-3" />
                  Next Steps
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#2596be]/10 via-[#1a7fa3]/10 to-[#122E34]/10 border border-[#2596be]/20">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-[#2596be] to-[#1a7fa3] mr-3">
                        <FiMail className="h-5 w-5 text-white" />
                      </div>
                      <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Confirmation Email</div>
                    </div>
                    <p className="text-sm text-[#677E8A]">Sent to {bookingDetails.email}</p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#122E34]/10 via-[#0E1D21]/10 to-[#1a3a42]/10 border border-[#122E34]/20">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-[#122E34] to-[#0E1D21] mr-3">
                        <FiPhone className="h-5 w-5 text-white" />
                      </div>
                      <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Reminder Call</div>
                    </div>
                    <p className="text-sm text-[#677E8A]">24 hours before appointment</p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#2596be]/10 via-[#1a7fa3]/10 to-[#122E34]/10 border border-[#2596be]/20">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-[#2596be] to-[#122E34] mr-3">
                        <FiVideo className="h-5 w-5 text-white" />
                      </div>
                      <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Virtual Link</div>
                    </div>
                    <p className="text-sm text-[#677E8A]">Sent 1 hour before</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={resetBooking}
                  className={buttonClasses.primary}
                >
                  <FiCalendar className="h-5 w-5 mr-3" />
                  Book Another Appointment
                </button>
                <Link
                  href="/"
                  className={buttonClasses.gradientBorder}
                >
                  <FiHome className="h-5 w-5 mr-3" />
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be] py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-[#2596be] to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-l from-[#122E34] to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <FiCalendar className="h-4 w-4 md:h-5 md:w-5 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white mr-2" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white text-sm md:text-base font-medium tracking-wide">Professional Pharmacy Consultation</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white mb-6 leading-tight">
              Book Your <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34]">Consultation</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Schedule your appointment with our licensed pharmacists in just a few simple steps
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('booking-steps').scrollIntoView({ behavior: 'smooth' })}
                className={buttonClasses.primary}
              >
                <FiCalendar className="h-5 w-5 mr-2" />
                Start Booking Now
              </button>
              <Link
                href="/services"
                className={buttonClasses.outline}
              >
                View Services
                <FiChevronRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="booking-steps" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Steps */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-xl p-6 border border-gray-200 sticky top-6">
              <div className="flex items-center mb-6">
                <FiSettings className="h-6 w-6 text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mr-3" />
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Booking Steps</h2>
              </div>
              
              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`relative flex items-center p-4 rounded-2xl transition-all duration-300 ${
                      currentStep === step.number
                        ? 'bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34] text-white shadow-lg'
                        : currentStep > step.number
                        ? 'bg-gradient-to-r from-[#2596be]/10 via-[#1a7fa3]/10 to-[#122E34]/10 border border-[#2596be]/20'
                        : 'bg-gradient-to-r from-gray-50 to-white border border-gray-200'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      currentStep === step.number
                        ? 'bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]'
                        : currentStep > step.number
                        ? `bg-gradient-to-r ${step.gradient} text-white`
                        : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500'
                    }`}>
                      {currentStep > step.number ? (
                        <FiCheck className="h-5 w-5" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-base">Step {step.number}</div>
                      <div className={`text-sm ${currentStep === step.number ? 'text-white/90' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]'}`}>
                        {step.title}
                      </div>
                    </div>
                    
                    {currentStep === step.number && (
                      <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center animate-pulse">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Booking Summary */}
              {selectedService && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-4 flex items-center">
                    <FiBookOpen className="h-5 w-5 mr-2" />
                    Booking Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#677E8A]">Service:</span>
                      <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] text-right truncate ml-2">{selectedService.title}</span>
                    </div>
                    {selectedDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#677E8A]">Date:</span>
                        <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">{selectedDate.date}</span>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#677E8A]">Time:</span>
                        <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">{selectedTime.time || selectedTime}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-[#677E8A]">Total:</span>
                        <span className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${selectedService.priceGradient || 'from-[#2596be] to-[#122E34]'}`}>{selectedService.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Support Info */}
              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[#2596be]/10 via-[#1a7fa3]/10 to-[#122E34]/10 border border-[#2596be]/20">
                <div className="flex items-center mb-2">
                  <FiInfo className="h-5 w-5 text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mr-2" />
                  <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Need Help?</span>
                </div>
                <p className="text-sm text-[#677E8A] mb-2">
                  Call us at <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">1-800-PHARMACY</span>
                </p>
                <p className="text-xs text-[#677E8A] flex items-center">
                  <FiClock className="h-3 w-3 mr-1" />
                  24/7 support available
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-200">
              {/* Step 1: Select Service */}
              {currentStep === 1 && (
                <div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-2">Select Consultation Type</h2>
                      <p className="text-[#677E8A]">Choose the service that best fits your needs</p>
                    </div>
                    <div className="text-sm px-3 py-2 rounded-full bg-gradient-to-r from-[#2596be]/10 via-[#1a7fa3]/10 to-[#122E34]/10 text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] font-semibold">
                      Step 1 of 4
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {consultationServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        className={`group text-left p-6 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 ${
                          selectedService?.id === service.id
                            ? 'border-transparent bg-gradient-to-br from-[#2596be]/5 via-[#1a7fa3]/5 to-[#122E34]/5 shadow-xl'
                            : 'border-gray-200 hover:border-transparent hover:bg-gradient-to-br hover:from-[#2596be]/5 hover:via-[#1a7fa3]/5 hover:to-[#122E34]/5 hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-start mb-4">
                          <div className={`p-4 rounded-xl ${service.iconBg} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                            <div className={`${service.gradient.replace('bg-', 'text-')}`}>
                              {service.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-2 group-hover:from-[#122E34] group-hover:to-[#2596be] transition-all duration-300">
                              {service.title}
                            </h3>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#1a7fa3]">
                                <FiClock className="h-4 w-4 mr-1" />
                                {service.duration}
                              </div>
                              <div className="flex items-center text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34]">
                                <FiDollarSign className="h-4 w-4 mr-1" />
                                {service.price}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-[#677E8A] text-sm mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.features.map((feature, index) => (
                            <span key={index} className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] group-hover:from-[#122E34] group-hover:to-[#2596be] font-medium transition-all duration-300">
                            Select Service
                          </div>
                          <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] group-hover:from-[#122E34] group-hover:to-[#2596be]">
                            <FiChevronRight className="h-5 w-5 transform group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Choose Date & Time */}
              {currentStep === 2 && (
                <div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-2">Select Date & Time</h2>
                      <p className="text-[#677E8A]">Choose a convenient time for your consultation</p>
                    </div>
                    <div className="text-sm px-3 py-2 rounded-full bg-gradient-to-r from-[#2596be]/10 via-[#1a7fa3]/10 to-[#122E34]/10 text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] font-semibold">
                      Step 2 of 4
                    </div>
                  </div>

                  {/* Selected Service Preview */}
                  {selectedService && (
                    <div className="mb-8 p-5 rounded-xl bg-gradient-to-r from-[#2596be]/5 via-[#1a7fa3]/5 to-[#122E34]/5 border border-[#2596be]/20">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-xl ${selectedService.gradient} mr-4`}>
                          <div className="text-white">
                            {selectedService.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] text-lg">{selectedService.title}</h4>
                          <div className="flex flex-wrap items-center text-sm text-[#677E8A] space-x-4">
                            <span className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#1a7fa3]">
                              <FiClock className="h-4 w-4 mr-1" />
                              {selectedService.duration}
                            </span>
                            <span className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34]">
                              <FiDollarSign className="h-4 w-4 mr-1" />
                              {selectedService.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Date Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-6 flex items-center">
                      <FiCalendar className="h-6 w-6 mr-3" />
                      Select Date
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      {availableDates.map((date) => (
                        <button
                          key={date.id}
                          onClick={() => date.available && handleDateSelect(date)}
                          disabled={!date.available}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${
                            selectedDate?.id === date.id
                              ? `border-transparent bg-gradient-to-r ${date.gradient} text-white shadow-lg`
                              : date.available
                              ? 'border-gray-200 hover:border-transparent hover:bg-gradient-to-r hover:from-[#2596be]/10 hover:to-[#122E34]/10 hover:shadow-md'
                              : 'border-gray-200 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="text-center">
                            <div className={`text-xs ${selectedDate?.id === date.id ? 'text-white/90' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]'} mb-1`}>{date.day}</div>
                            <div className={`text-2xl font-bold mb-2 ${
                              selectedDate?.id === date.id ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]'
                            }`}>
                              {date.dateNumber}
                            </div>
                            <div className={`text-xs ${selectedDate?.id === date.id ? 'text-white/90' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]'}`}>{date.month}</div>
                            <div className={`text-xs mt-1 px-2 py-1 rounded-full ${
                              date.available 
                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600' 
                                : 'bg-gradient-to-r from-red-100 to-rose-100 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600'
                            }`}>
                              {date.available ? 'Available' : 'Booked'}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div>
                      <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-6 flex items-center">
                        <FiClock className="h-6 w-6 mr-3" />
                        Select Time Slot
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {timeSlots.map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => slot.available && handleTimeSelect(slot)}
                            disabled={!slot.available}
                            className={`py-4 px-3 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${
                              selectedTime?.time === slot.time
                                ? `border-transparent bg-gradient-to-r ${slot.gradient} text-white shadow-lg`
                                : slot.available
                                ? 'border-gray-200 hover:border-transparent hover:bg-gradient-to-r hover:from-[#2596be]/10 hover:to-[#122E34]/10 hover:shadow-md'
                                : 'border-gray-200 opacity-50 cursor-not-allowed'
                            }`}
                          >
                            <div className="font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">{slot.time}</div>
                            <div className={`text-xs mt-2 px-2 py-1 rounded-full ${
                              slot.available 
                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600' 
                                : 'bg-gradient-to-r from-red-100 to-rose-100 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600'
                            }`}>
                              {slot.available ? 'Available' : 'Booked'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Personal Details */}
              {currentStep === 3 && (
                <div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-2">Your Information</h2>
                      <p className="text-[#677E8A]">Please provide your details for the consultation</p>
                    </div>
                    <div className="text-sm px-3 py-2 rounded-full bg-gradient-to-r from-[#2596be]/10 via-[#1a7fa3]/10 to-[#122E34]/10 text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] font-semibold">
                      Step 3 of 4
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-3">
                          Full Name *
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#677E8A]">
                            <FiUser className="h-5 w-5" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={bookingDetails.name}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20 outline-none transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-3">
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#677E8A]">
                            <FiMail className="h-5 w-5" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={bookingDetails.email}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20 outline-none transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-3">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#677E8A]">
                            <FiPhone className="h-5 w-5" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={bookingDetails.phone}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20 outline-none transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                            placeholder="+1 (555) 123-4567"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-3">
                          Insurance Provider
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#677E8A]">
                            <FiShield className="h-5 w-5" />
                          </div>
                          <input
                            type="text"
                            name="insuranceProvider"
                            value={bookingDetails.insuranceProvider}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20 outline-none transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                            placeholder="e.g., Blue Cross"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-3">
                        Consultation Notes
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-4 text-[#677E8A]">
                          <FiMessageSquare className="h-5 w-5" />
                        </div>
                        <textarea
                          name="notes"
                          value={bookingDetails.notes}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20 outline-none transition-all duration-300 bg-gradient-to-r from-white to-gray-50 resize-none"
                          placeholder="Please share any specific concerns or questions you'd like to discuss during the consultation..."
                        />
                      </div>
                    </div>

                    {/* Privacy Note with Enhanced Gradient */}
                    <div className="p-5 rounded-xl bg-gradient-to-r from-[#2596be]/10 via-[#1a7fa3]/10 to-[#122E34]/10 border border-[#2596be]/20">
                      <div className="flex items-start">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-[#2596be] to-[#122E34] mr-4">
                          <FiLock className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-2">Your Privacy is Protected</h4>
                          <p className="text-sm text-[#677E8A]">
                            All information provided is confidential and protected under HIPAA regulations. 
                            We use bank-level encryption to secure your data.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-2">Confirm Booking</h2>
                      <p className="text-[#677E8A]">Review and confirm your appointment details</p>
                    </div>
                    <div className="text-sm px-3 py-2 rounded-full bg-gradient-to-r from-[#2596be]/10 via-[#1a7fa3]/10 to-[#122E34]/10 text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] font-semibold">
                      Step 4 of 4
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Appointment Summary */}
                    <div className="bg-gradient-to-br from-[#2596be]/5 via-[#1a7fa3]/5 to-[#122E34]/5 rounded-2xl p-6 md:p-8 border border-[#2596be]/20">
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-8 flex items-center">
                        <FiTarget className="h-6 w-6 mr-3" />
                        Appointment Summary
                      </h3>
                      
                      <div className="space-y-8">
                        {/* Service */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-200">
                          <div className={`p-4 rounded-xl ${selectedService?.gradient}`}>
                            <div className="text-white">
                              {selectedService?.icon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] text-lg md:text-xl mb-2">{selectedService?.title}</div>
                            <p className="text-sm text-[#677E8A] mb-4">{selectedService?.description}</p>
                            <div className="flex flex-wrap gap-4">
                              <div className="flex items-center text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#1a7fa3]">
                                <FiClock className="h-4 w-4 mr-2" />
                                {selectedService?.duration}
                              </div>
                              <div className="flex items-center text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34]">
                                <FiDollarSign className="h-4 w-4 mr-2" />
                                {selectedService?.price}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Date & Time Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-6 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-200">
                            <div className="flex items-center mb-4">
                              <div className="p-3 rounded-lg bg-gradient-to-r from-[#2596be] to-[#1a7fa3] mr-4">
                                <FiCalendar className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Date</div>
                                <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">{selectedDate?.date}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-6 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-200">
                            <div className="flex items-center mb-4">
                              <div className="p-3 rounded-lg bg-gradient-to-r from-[#122E34] to-[#0E1D21] mr-4">
                                <FiClock className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Time</div>
                                <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">{selectedTime?.time || selectedTime}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Personal Details */}
                        <div className="p-6 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-200">
                          <h4 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-6 flex items-center">
                            <FiUser className="h-5 w-5 mr-3" />
                            Personal Information
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#1a7fa3] mb-2">Name</div>
                              <div className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">{bookingDetails.name}</div>
                            </div>
                            <div>
                              <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#1a7fa3] mb-2">Email</div>
                              <div className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">{bookingDetails.email}</div>
                            </div>
                            <div>
                              <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#1a7fa3] mb-2">Phone</div>
                              <div className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">{bookingDetails.phone}</div>
                            </div>
                            {bookingDetails.insuranceProvider && (
                              <div>
                                <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#1a7fa3] mb-2">Insurance</div>
                                <div className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">{bookingDetails.insuranceProvider}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-[#122E34]/10 via-[#0E1D21]/10 to-[#1a3a42]/10 border border-[#122E34]/20">
                      <div className="flex items-start mb-6">
                        <FiCheck className="h-6 w-6 text-transparent bg-clip-text bg-gradient-to-r from-[#122E34] to-[#0E1D21] mr-4 mt-1" />
                        <div>
                          <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#122E34] to-[#0E1D21] mb-4">Terms & Conditions</h4>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <FiStar className="h-4 w-4 text-transparent bg-clip-text bg-gradient-to-r from-[#122E34] to-[#0E1D21] mr-3 mt-1 flex-shrink-0" />
                              <span className="text-[#677E8A]">Cancellation must be made 24 hours prior to appointment</span>
                            </li>
                            <li className="flex items-start">
                              <FiStar className="h-4 w-4 text-transparent bg-clip-text bg-gradient-to-r from-[#122E34] to-[#0E1D21] mr-3 mt-1 flex-shrink-0" />
                              <span className="text-[#677E8A]">Late arrivals may result in shortened consultation time</span>
                            </li>
                            <li className="flex items-start">
                              <FiStar className="h-4 w-4 text-transparent bg-clip-text bg-gradient-to-r from-[#122E34] to-[#0E1D21] mr-3 mt-1 flex-shrink-0" />
                              <span className="text-[#677E8A]">Emergency consultations may have additional charges</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-12 pt-8 border-t border-gray-200">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className={buttonClasses.secondary}
                  >
                    <FiChevronLeft className="h-5 w-5 mr-2" />
                    Back
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !selectedService) ||
                    (currentStep === 2 && (!selectedDate || !selectedTime)) ||
                    (currentStep === 3 && (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone)) ||
                    isSubmitting
                  }
                  className={`flex-1 px-6 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1 ${
                    isSubmitting
                      ? 'bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34] hover:from-[#122E34] hover:via-[#0E1D21] hover:to-[#2596be] text-white shadow-lg hover:shadow-xl'
                  } ${currentStep === 1 ? 'sm:ml-auto' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Processing...
                    </>
                  ) : currentStep === 4 ? (
                    <>
                      <FiCheck className="h-5 w-5 mr-2" />
                      Confirm & Book Appointment
                    </>
                  ) : (
                    <>
                      Next Step
                      <FiChevronRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced FAQ Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-[#2596be]/10 via-[#1a7fa3]/10 to-[#122E34]/10 rounded-full border border-[#2596be]/20">
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34]">
              Common Questions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34] mb-6">
            Booking FAQ
          </h2>
          <p className="text-[#677E8A] text-lg max-w-2xl mx-auto">
            Common questions about our booking process
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              question: 'Can I reschedule my appointment?',
              answer: 'Yes, you can reschedule up to 24 hours before your appointment through your account dashboard or by contacting our support team.',
              icon: <FiCalendar className="h-5 w-5" />,
              gradient: 'from-[#2596be] via-[#1a7fa3] to-[#122E34]'
            },
            {
              question: 'What happens if I miss my appointment?',
              answer: 'Missed appointments may incur a fee. We recommend contacting us as soon as possible if you cannot make your scheduled time.',
              icon: <FiClock className="h-5 w-5" />,
              gradient: 'from-[#122E34] via-[#0E1D21] to-[#1a3a42]'
            },
            {
              question: 'Do I need to prepare anything for my consultation?',
              answer: 'It helps to have your medication list, medical history, and any questions you want to discuss ready for the consultation.',
              icon: <FiBookOpen className="h-5 w-5" />,
              gradient: 'from-[#2596be] via-[#1a7fa3] to-[#0E1D21]'
            },
            {
              question: 'Can I book for a family member?',
              answer: 'Yes, you can book appointments for family members. Please provide their information during the booking process.',
              icon: <FiUsers className="h-5 w-5" />,
              gradient: 'from-[#2596be] via-[#122E34] to-[#0E1D21]'
            },
            {
              question: 'What payment methods do you accept?',
              answer: 'We accept all major credit cards, insurance, and some health savings accounts. Payment is collected after your consultation.',
              icon: <FiCreditCard className="h-5 w-5" />,
              gradient: 'from-[#2596be] via-[#1a7fa3] to-[#122E34]'
            },
            {
              question: 'Is my information secure?',
              answer: 'Absolutely! All information is encrypted and protected under HIPAA regulations. Your privacy is our top priority.',
              icon: <FiShield className="h-5 w-5" />,
              gradient: 'from-[#122E34] via-[#0E1D21] to-[#1a3a42]'
            }
          ].map((faq, index) => (
            <div key={index} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-transparent hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:via-[#1a7fa3]/5 hover:to-[#122E34]/5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start">
                <div className={`p-3 rounded-xl mr-4 bg-gradient-to-r ${faq.gradient}`}>
                  <div className="text-white">
                    {faq.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-3 group-hover:from-[#122E34] group-hover:to-[#2596be] transition-all duration-300">
                    {faq.question}
                  </h3>
                  <p className="text-[#677E8A] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2596be]/5 via-[#1a7fa3]/5 to-[#122E34]/5"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-white to-gray-50 backdrop-blur-sm rounded-full border border-gray-300">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34] font-semibold">
              Need Immediate Assistance?
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] via-[#1a7fa3] to-[#122E34] mb-8">
            Contact Our Support Team
          </h2>
          
          <p className="text-[#677E8A] text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Our dedicated support team is available 24/7 to assist you with any questions or concerns.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { 
                icon: <FiPhone className="h-8 w-8" />, 
                title: 'Phone Support',
                info: '1-800-PHARMACY',
                description: '24/7 Emergency Line',
                gradient: 'from-[#2596be] via-[#1a7fa3] to-[#122E34]' 
              },
              { 
                icon: <FiMail className="h-8 w-8" />, 
                title: 'Email',
                info: 'support@edpharma.com',
                description: 'Response within 2 hours',
                gradient: 'from-[#122E34] via-[#0E1D21] to-[#1a3a42]' 
              },
              { 
                icon: <FiMessageSquare className="h-8 w-8" />, 
                title: 'Live Chat',
                info: 'Available Now',
                description: 'Instant Support',
                gradient: 'from-[#2596be] via-[#1a7fa3] to-[#0E1D21]' 
              },
            ].map((item, index) => (
              <div key={index} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-transparent hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:via-[#1a7fa3]/5 hover:to-[#122E34]/5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`mb-6 p-4 rounded-xl bg-gradient-to-br ${item.gradient} w-fit group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] font-bold text-lg mb-2 group-hover:from-[#122E34] group-hover:to-[#2596be] transition-all duration-300">
                  {item.title}
                </div>
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-2">
                  {item.info}
                </div>
                <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#1a7fa3]">{item.description}</div>
              </div>
            ))}
          </div>

          {/* Final CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                setCurrentStep(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={buttonClasses.primary}
            >
              <FiCalendar className="h-5 w-5 mr-2" />
              Start New Booking
            </button>
            
            <Link
              href="/contact"
              className={buttonClasses.gradientBorder}
            >
              <FiMessageSquare className="h-5 w-5 mr-2" />
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white/80 text-sm">
            <div className="flex items-center">
              <FiShield className="h-4 w-4 mr-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">HIPAA Compliant</span>
            </div>
            <div className="hidden md:block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">•</div>
            <div className="flex items-center">
              <FiLock className="h-4 w-4 mr-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">256-bit Encryption</span>
            </div>
            <div className="hidden md:block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">•</div>
            <div className="flex items-center">
              <FiCheckCircle className="h-4 w-4 mr-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">Certified Pharmacists</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}