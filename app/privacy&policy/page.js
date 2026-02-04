'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Shield, Lock, Eye, FileText, Globe, Users,
  CheckCircle2, AlertCircle, Mail, Phone, Clock,
  ChevronDown, ChevronUp, ShieldCheck, Database,
  Cookie, Key, Upload, Download, Trash2
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

function PrivacyCard({ title, description, icon: Icon, color = "from-[#122E34] to-[#2596be]" }) {
  return (
    <div className="rounded-2xl border border-[#2596be]/20 bg-gradient-to-br from-white to-[#2596be]/5 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300 h-full">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-6`}>
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-[#0E1D21] mb-3">{title}</h3>
      <p className="text-[#677E8A] leading-relaxed">{description}</p>
    </div>
  );
}

function ExpandableSection({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[#2596be]/20 rounded-2xl overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-[#122E34]/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center">
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-[#122E34]" />
            ) : (
              <ChevronDown className="h-5 w-5 text-[#122E34]" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-[#0E1D21]">{title}</h3>
        </div>
        <span className="text-sm font-medium text-[#2596be]">
          {isOpen ? 'Show Less' : 'Show More'}
        </span>
      </button>
      
      {isOpen && (
        <div className="p-6 pt-0 border-t border-[#2596be]/10">
          <div className="pl-14">{children}</div>
        </div>
      )}
    </div>
  );
}

function DataTypeCard({ title, examples, icon: Icon }) {
  return (
    <div className="bg-white border border-[#2596be]/20 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center flex-shrink-0">
          <Icon className="h-5 w-5 text-[#122E34]" />
        </div>
        <div>
          <h4 className="font-semibold text-[#0E1D21] mb-2">{title}</h4>
          <ul className="space-y-1">
            {examples.map((example, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-[#677E8A]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2596be]" />
                {example}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const privacyPrinciples = [
    {
      icon: Lock,
      title: "Data Encryption",
      description: "All sensitive data is encrypted using AES-256 encryption both in transit and at rest.",
      color: "from-[#122E34] to-[#2596be]"
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We clearly explain what data we collect and how it's used in plain language.",
      color: "from-[#2596be] to-[#0E1D21]"
    },
    {
      icon: Users,
      title: "Minimal Collection",
      description: "We only collect data necessary for providing and improving our services.",
      color: "from-[#0E1D21] to-[#2596be]"
    },
    {
      icon: ShieldCheck,
      title: "Your Control",
      description: "You have full control over your data and can delete it at any time.",
      color: "from-[#2596be] to-[#122E34]"
    }
  ];

  const dataTypes = [
    {
      title: "Personal Information",
      examples: ["Full name", "Date of birth", "Contact information", "Insurance details"],
      icon: Users
    },
    {
      title: "Health Information",
      examples: ["Medical history", "Prescription data", "Allergy information", "Doctor details"],
      icon: FileText
    },
    {
      title: "Technical Data",
      examples: ["IP address", "Device information", "Browser type", "Usage patterns"],
      icon: Database
    },
    {
      title: "Cookies & Tracking",
      examples: ["Session cookies", "Analytics cookies", "Preference cookies", "Security cookies"],
      icon: Cookie
    }
  ];

  const rights = [
    {
      title: "Right to Access",
      description: "Request a copy of your personal data",
      icon: Download
    },
    {
      title: "Right to Rectification",
      description: "Correct inaccurate or incomplete data",
      icon: CheckCircle2
    },
    {
      title: "Right to Erasure",
      description: "Request deletion of your personal data",
      icon: Trash2
    },
    {
      title: "Right to Portability",
      description: "Receive your data in a structured format",
      icon: Upload
    },
    {
      title: "Right to Object",
      description: "Object to certain types of processing",
      icon: AlertCircle
    },
    {
      title: "Right to Restrict",
      description: "Limit how we use your personal data",
      icon: Shield
    }
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'collection', label: 'Data Collection', icon: Database },
    { id: 'use', label: 'How We Use Data', icon: Eye },
    { id: 'sharing', label: 'Data Sharing', icon: Users },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'rights', label: 'Your Rights', icon: Key },
    { id: 'contact', label: 'Contact Us', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Privacy & Security</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
              Last updated: December 15, 2023. We are committed to protecting your privacy and 
              being transparent about how we handle your personal and health information.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <ShieldCheck className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircle2 className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">24/7 Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-to-b from-white to-[#2596be]/5 rounded-2xl border border-[#2596be]/20 p-6">
                <h3 className="text-lg font-semibold text-[#0E1D21] mb-4">Quick Navigation</h3>
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-[#122E34] to-[#2596be] text-white'
                          : 'hover:bg-[#122E34]/5 text-[#677E8A]'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="mt-8 pt-6 border-t border-[#2596be]/20">
                  <div className="flex items-center gap-3 p-3 bg-[#122E34]/5 rounded-xl">
                    <AlertCircle className="h-5 w-5 text-[#122E34]" />
                    <div>
                      <p className="text-sm font-medium text-[#0E1D21]">Need Help?</p>
                      <p className="text-xs text-[#677E8A]">Contact our privacy team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Section */}
            <section id="overview" className="mb-12">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#0E1D21] mb-4">
                  Our Privacy Principles
                </h2>
                <p className="text-[#677E8A] leading-relaxed">
                  At EdPharma, we believe that privacy is a fundamental right. Our approach to 
                  privacy is built on these core principles that guide every aspect of our data 
                  handling practices.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {privacyPrinciples.map((principle, index) => (
                  <PrivacyCard
                    key={index}
                    icon={principle.icon}
                    title={principle.title}
                    description={principle.description}
                    color={principle.color}
                  />
                ))}
              </div>
            </section>

            {/* Data Collection Section */}
            <section id="collection" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0E1D21] mb-6">
                What Information We Collect
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {dataTypes.map((dataType, index) => (
                  <DataTypeCard
                    key={index}
                    title={dataType.title}
                    examples={dataType.examples}
                    icon={dataType.icon}
                  />
                ))}
              </div>
              
              <ExpandableSection title="Collection Methods" defaultOpen={true}>
                <div className="space-y-4">
                  <p className="text-[#677E8A]">
                    We collect information through various methods including:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#2596be]" />
                      </div>
                      <span className="text-[#677E8A]">
                        <strong className="text-[#0E1D21]">Direct Input:</strong> Information you provide when creating an account, filling out forms, or communicating with us
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#2596be]" />
                      </div>
                      <span className="text-[#677E8A]">
                        <strong className="text-[#0E1D21]">Automated Collection:</strong> Technical data collected automatically when you use our services
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#2596be]" />
                      </div>
                      <span className="text-[#677E8A]">
                        <strong className="text-[#0E1D21]">Third Parties:</strong> Information from healthcare providers, insurance companies, and partners
                      </span>
                    </li>
                  </ul>
                </div>
              </ExpandableSection>
            </section>

            {/* How We Use Data Section */}
            <section id="use" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0E1D21] mb-6">
                How We Use Your Information
              </h2>
              
              <div className="bg-gradient-to-r from-[#122E34]/5 via-[#0E1D21]/5 to-[#2596be]/5 rounded-2xl p-6 mb-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#2596be] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[#0E1D21] mb-1">Service Delivery</h4>
                      <p className="text-sm text-[#677E8A]">Process prescriptions and provide healthcare services</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#2596be] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[#0E1D21] mb-1">Personalization</h4>
                      <p className="text-sm text-[#677E8A]">Tailor content and recommendations to your needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#2596be] flex-shrink-0 mt=0.5" />
                    <div>
                      <h4 className="font-semibold text-[#0E1D21] mb-1">Communication</h4>
                      <p className="text-sm text-[#677E8A]">Send important updates and health information</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#2596be] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[#0E1D21] mb-1">Security</h4>
                      <p className="text-sm text-[#677E8A]">Protect against fraud and unauthorized access</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Sharing Section */}
            <section id="sharing" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0E1D21] mb-6">
                Data Sharing & Disclosure
              </h2>
              
              <ExpandableSection title="When We Share Your Information">
                <div className="space-y-4">
                  <p className="text-[#677E8A]">
                    We may share your information in the following circumstances:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Users className="h-3 w-3 text-[#2596be]" />
                      </div>
                      <span className="text-[#677E8A]">
                        <strong className="text-[#0E1D21]">Healthcare Providers:</strong> With your consent, to coordinate care with doctors and pharmacies
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="h-3 w-3 text-[#2596be]" />
                      </div>
                      <span className="text-[#677E8A]">
                        <strong className="text-[#0E1D21]">Legal Requirements:</strong> When required by law or to protect our legal rights
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Globe className="h-3 w-3 text-[#2596be]" />
                      </div>
                      <span className="text-[#677E8A]">
                        <strong className="text-[#0E1D21]">Service Providers:</strong> With trusted partners who help us operate our services
                      </span>
                    </li>
                  </ul>
                </div>
              </ExpandableSection>
            </section>

            {/* Security Section */}
            <section id="security" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0E1D21] mb-6">
                Data Security Measures
              </h2>
              
              <div className="bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be] rounded-2xl p-8 text-white">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Our Security Commitment</h3>
                    <p className="text-white/90 mb-6">
                      We implement robust security measures to protect your personal and health 
                      information from unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <div className="space-y-3">
                      {[
                        "End-to-end encryption for all health data",
                        "Regular security audits and penetration testing",
                        "Multi-factor authentication for all accounts",
                        "Secure data centers with 24/7 monitoring"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-white" />
                          <span className="text-white/95">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Security Certifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">HIPAA Compliance</span>
                        <span className="text-white font-semibold">✓ Certified</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">SOC 2 Type II</span>
                        <span className="text-white font-semibold">✓ Certified</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">GDPR Compliance</span>
                        <span className="text-white font-semibold">✓ Certified</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">ISO 27001</span>
                        <span className="text-white font-semibold">✓ Certified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights Section */}
            <section id="rights" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0E1D21] mb-6">
                Your Data Rights
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {rights.map((right, index) => (
                  <div key={index} className="bg-white border border-[#2596be]/20 rounded-xl p-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center mb-3">
                      <right.icon className="h-6 w-6 text-[#122E34]" />
                    </div>
                    <h4 className="font-semibold text-[#0E1D21] mb-1">{right.title}</h4>
                    <p className="text-sm text-[#677E8A]">{right.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-[#122E34]/5 rounded-2xl p-6">
                <h4 className="font-semibold text-[#0E1D21] mb-3">Exercise Your Rights</h4>
                <p className="text-[#677E8A] mb-4">
                  To exercise any of these rights, please contact our Privacy Team. We will respond 
                  to all legitimate requests within 30 days.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] px-5 py-2.5 text-white font-medium hover:from-[#122E34]/90 hover:to-[#2596be]/90 transition"
                >
                  Contact Privacy Team
                  <Mail className="h-4 w-4" />
                </Link>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="mb-12">
              <div className="bg-gradient-to-r from-[#122E34]/5 via-[#0E1D21]/5 to-[#2596be]/5 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-[#0E1D21] mb-6">Contact Our Privacy Team</h2>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-[#122E34]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0E1D21]">Email</h4>
                        <p className="text-[#677E8A]">privacy@edpharma.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center">
                        <Phone className="h-6 w-6 text-[#122E34]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0E1D21]">Phone</h4>
                        <p className="text-[#677E8A]">1-800-EDPHARMA (ext. 2)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-[#122E34]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0E1D21]">Response Time</h4>
                        <p className="text-[#677E8A]">Within 48 hours for privacy requests</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-[#122E34]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0E1D21]">Data Protection Officer</h4>
                        <p className="text-[#677E8A]">Sarah Chen, Chief Privacy Officer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Policy Updates */}
            <div className="bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-[#122E34] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0E1D21] mb-2">Policy Updates</h3>
                  <p className="text-[#677E8A]">
                    We may update this Privacy Policy from time to time. We will notify you of any 
                    material changes by posting the new Privacy Policy on this page and updating the 
                    "Last Updated" date. We encourage you to review this Privacy Policy periodically 
                    for any changes.
                  </p>
                  <p className="text-sm text-[#677E8A] mt-3">
                    <strong>Last Updated:</strong> December 15, 2023
                  </p>
                </div>
              </div>
            </div>

            {/* Back Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-[#2596be]/20">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#677E8A] hover:text-[#122E34] transition"
              >
                ← Back to About Us
              </Link>
              
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] px-6 py-3 text-white font-semibold shadow-lg hover:from-[#122E34]/90 hover:to-[#2596be]/90 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}