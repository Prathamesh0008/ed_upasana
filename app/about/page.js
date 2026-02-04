'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield, Heart, Target, Users, Award, Clock, Truck,
  CheckCircle2, Star, Globe, Leaf, FileText, ArrowRight,
  ChevronRight, Pill, Stethoscope, Activity
} from 'lucide-react';

function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h2 className="text-3xl sm:text-4xl font-semibold text-[#0E1D21]">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-[#677E8A] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function StatCard({ number, label, icon: Icon }) {
  return (
    <div className="text-center p-6">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-[#122E34]" />
      </div>
      <div className="text-4xl sm:text-5xl font-bold text-[#0E1D21] mb-2">{number}</div>
      <p className="text-[#677E8A] font-medium">{label}</p>
    </div>
  );
}

function ValueCard({ title, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-[#2596be]/20 bg-gradient-to-br from-white to-[#2596be]/5 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center mb-6">
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-[#0E1D21] mb-3">{title}</h3>
      <p className="text-[#677E8A] leading-relaxed">{description}</p>
    </div>
  );
}

function TimelineItem({ year, title, description, isLast }) {
  return (
    <div className="relative flex gap-6">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-[#2596be] to-[#122E34]/20" />
      )}
      
      <div className="relative z-10 flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center">
          <span className="text-white font-semibold">{year}</span>
        </div>
      </div>
      
      <div className="flex-1 pb-8">
        <h3 className="text-lg font-semibold text-[#0E1D21] mb-2">{title}</h3>
        <p className="text-[#677E8A]">{description}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [activeTeam, setActiveTeam] = useState(0);

  const values = [
    {
      icon: Shield,
      title: "Quality & Safety",
      description: "All medications are sourced from FDA-approved manufacturers and stored in temperature-controlled facilities."
    },
    {
      icon: Heart,
      title: "Patient Care",
      description: "We prioritize patient wellbeing with personalized care plans and 24/7 pharmacist support."
    },
    {
      icon: Target,
      title: "Accessibility",
      description: "Making healthcare affordable and accessible through our network of partner pharmacies."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our team includes licensed pharmacists, doctors, and healthcare professionals."
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "Leveraging technology to streamline prescription management and delivery."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Eco-friendly packaging and responsible disposal programs for medications."
    }
  ];

  const timeline = [
    {
      year: "2015",
      title: "Founding of EdPharma",
      description: "Started with a single pharmacy focusing on personalized patient care."
    },
    {
      year: "2017",
      title: "Digital Platform Launch",
      description: "Introduced our online prescription management system and mobile app."
    },
    {
      year: "2019",
      title: "National Expansion",
      description: "Expanded operations to cover all 50 states with same-day delivery."
    },
    {
      year: "2021",
      title: "AI Integration",
      description: "Implemented AI-powered drug interaction checking and dosage optimization."
    },
    {
      year: "2023",
      title: "Telehealth Integration",
      description: "Launched integrated telehealth services with licensed physicians."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      bio: "Board-certified pharmacist with 15+ years of clinical experience.",
      imageColor: "from-[#122E34] to-[#2596be]"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Operations",
      bio: "Former hospital administrator specializing in pharmaceutical logistics.",
      imageColor: "from-[#2596be] to-[#122E34]"
    },
    {
      name: "Dr. James Wilson",
      role: "Clinical Director",
      bio: "Specialist in geriatric care and chronic disease management.",
      imageColor: "from-[#0E1D21] to-[#2596be]"
    },
    {
      name: "Lisa Thompson",
      role: "Patient Care Director",
      bio: "Over a decade of experience in patient advocacy and support services.",
      imageColor: "from-[#2596be] to-[#0E1D21]"
    }
  ];

  const certifications = [
    { name: "FDA Registered", icon: Award },
    { name: "HIPAA Compliant", icon: Shield },
    { name: "ISO 9001 Certified", icon: FileText },
    { name: "NABP Accredited", icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              About EdPharma
            </h1>
            <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
              Your trusted partner in healthcare since 2015. We're revolutionizing pharmacy services
              through innovation, compassion, and excellence.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <cert.icon className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard number="500K+" label="Patients Served" icon={Users} />
          <StatCard number="24/7" label="Support Available" icon={Clock} />
          <StatCard number="50+" label="States Covered" icon={Truck} />
          <StatCard number="99.8%" label="Accuracy Rate" icon={CheckCircle2} />
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Our Story */}
        <section className="mb-16 sm:mb-24">
          <SectionTitle 
            title="Our Story" 
            subtitle="From a single neighborhood pharmacy to a nationwide healthcare partner"
          />
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
                {/* Placeholder for image - using gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#122E34] via-[#0E1D21] to-[#2596be] flex items-center justify-center">
                  <Pill className="h-24 w-24 text-white/30" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                  <p className="text-white font-medium">Our first pharmacy location in 2015</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#0E1D21]">
                Building the Future of Pharmacy
              </h3>
              <p className="text-[#677E8A] leading-relaxed">
                EdPharma was founded with a simple mission: to make healthcare accessible, affordable, 
                and personalized for everyone. What started as a single pharmacy has grown into a 
                comprehensive healthcare platform serving hundreds of thousands of patients nationwide.
              </p>
              <p className="text-[#677E8A] leading-relaxed">
                Our journey has been guided by innovation and patient-first values. We were among the 
                first to implement AI-driven prescription management and real-time drug interaction 
                checking, setting new standards for pharmacy safety and efficiency.
              </p>
              <div className="pt-4">
                <Link 
                  href="/services" 
                  className="inline-flex items-center gap-2 text-[#122E34] font-semibold hover:text-[#2596be] group"
                >
                  Explore our services
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16 sm:mb-24">
          <SectionTitle 
            title="Our Values" 
            subtitle="The principles that guide every decision we make"
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16 sm:mb-24">
          <SectionTitle 
            title="Our Journey" 
            subtitle="Milestones in our commitment to better healthcare"
          />
          
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <TimelineItem
                key={index}
                year={item.year}
                title={item.title}
                description={item.description}
                isLast={index === timeline.length - 1}
              />
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section className="mb-16 sm:mb-24">
          <SectionTitle 
            title="Meet Our Leadership" 
            subtitle="Expertise and compassion in healthcare leadership"
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {teamMembers.map((member, index) => (
              <button
                key={index}
                onClick={() => setActiveTeam(index)}
                className={`text-left rounded-2xl p-6 transition-all duration-300 ${
                  activeTeam === index 
                    ? 'bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 border-2 border-[#2596be]/30 shadow-lg'
                    : 'border border-[#ABAFB5]/30 hover:border-[#2596be]/30'
                }`}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${member.imageColor} mb-4`} />
                <h3 className="text-lg font-semibold text-[#0E1D21]">{member.name}</h3>
                <p className="text-[#122E34] font-medium">{member.role}</p>
                <div className="mt-3 flex items-center">
                  <ChevronRight className={`h-4 w-4 transition-transform ${
                    activeTeam === index ? 'text-[#2596be] rotate-90' : 'text-[#677E8A]'
                  }`} />
                  <span className={`text-sm ml-1 ${
                    activeTeam === index ? 'text-[#2596be] font-semibold' : 'text-[#677E8A]'
                  }`}>
                    {activeTeam === index ? 'View Bio' : 'View Bio'}
                  </span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-[#122E34]/5 via-[#0E1D21]/5 to-[#2596be]/5 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#0E1D21] mb-2">
                  {teamMembers[activeTeam].name}
                </h3>
                <p className="text-[#122E34] font-medium mb-4">{teamMembers[activeTeam].role}</p>
                <p className="text-[#677E8A] leading-relaxed">
                  {teamMembers[activeTeam].bio}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Commitment */}
        <section className="mb-16 sm:mb-24">
          <div className="rounded-2xl bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be] p-8 sm:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Quality Commitment</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                  Uncompromising Standards in Pharmaceutical Care
                </h2>
                <p className="text-white/90 leading-relaxed mb-6">
                  Every medication in our care undergoes rigorous quality checks. Our 
                  state-of-the-art facilities maintain perfect storage conditions, and 
                  our pharmacists perform multiple verification steps before any 
                  prescription leaves our pharmacy.
                </p>
                <div className="space-y-3">
                  {[
                    "Triple-check verification system",
                    "Temperature-controlled storage",
                    "Real-time inventory tracking",
                    "Continuous staff training"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                      <span className="text-white/95">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">4.9/5</div>
                      <div className="text-white/80">Patient Satisfaction Rating</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Prescription Accuracy</span>
                        <span>99.8%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: '99.8%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>On-time Delivery</span>
                        <span>98.5%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: '98.5%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Patient Support Response</span>
                        <span>100%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be] p-8 sm:p-12 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Ready to Experience Better Healthcare?
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed">
              Join thousands of satisfied patients who trust EdPharma with their 
              healthcare needs. Get started with a free consultation today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#122E34] hover:bg-white/90 transition"
              >
                <Stethoscope className="h-4 w-4" />
                Free Consultation
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                <Activity className="h-4 w-4" />
                Browse Medications
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-white/80">
              Need immediate assistance? Call us 24/7 at <strong>1-800-EDPHARMA</strong>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] px-6 py-3 text-white font-semibold shadow-lg hover:from-[#122E34]/90 hover:to-[#2596be]/90 transition"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}