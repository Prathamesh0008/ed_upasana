'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileText, Shield, Lock, AlertCircle, CheckCircle2,
  BookOpen, Scale, Eye, Printer, Download, ArrowRight,
  ChevronDown, ChevronUp, Mail, Phone, MapPin
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

function ExpandableSection({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[#ABAFB5]/30 rounded-2xl overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 bg-gradient-to-r from-white to-[#2596be]/5 hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#0E1D21]">{title}</h3>
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-[#2596be]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#677E8A]" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="p-6 pt-0">
          <div className="pl-13 space-y-4 text-[#677E8A] leading-relaxed">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function ImportantNote({ children }) {
  return (
    <div className="rounded-2xl border border-[#2596be]/30 bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 p-6 my-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shrink-0">
          <AlertCircle className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-[#0E1D21] mb-2">Important Note</h4>
          <div className="text-[#677E8A] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function TermItem({ title, content }) {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-[#0E1D21] mb-3 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center">
          <CheckCircle2 className="h-3 w-3 text-white" />
        </div>
        {title}
      </h4>
      <div className="text-[#677E8A] leading-relaxed pl-8">
        {content}
      </div>
    </div>
  );
}

export default function TermsPage() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'definitions', title: 'Key Definitions' },
    { id: 'eligibility', title: 'Eligibility' },
    { id: 'account', title: 'User Accounts' },
    { id: 'prescriptions', title: 'Prescription Services' },
    { id: 'products', title: 'Products & Pricing' },
    { id: 'payments', title: 'Payments & Billing' },
    { id: 'privacy', title: 'Privacy & Data' },
    { id: 'liability', title: 'Limitation of Liability' },
    { id: 'intellectual', title: 'Intellectual Property' },
    { id: 'termination', title: 'Termination' },
    { id: 'governing', title: 'Governing Law' },
    { id: 'changes', title: 'Changes to Terms' },
    { id: 'contact', title: 'Contact Information' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const text = document.querySelector('.terms-content')?.innerText || '';
    const blob = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(blob);
    element.download = "edpharma-terms-and-conditions.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Scale className="h-5 w-5" />
              <span className="text-sm font-medium">Legal Documentation</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              Terms & Conditions
            </h1>
            <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
              Please read these terms carefully before using our services. Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full px-4 py-2 transition"
              >
                <Printer className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">Print Terms</span>
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full px-4 py-2 transition"
              >
                <Download className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">Download PDF</span>
              </button>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Eye className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">10 min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-[#ABAFB5]/30 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-5 w-5 text-[#122E34]" />
                <h3 className="text-lg font-semibold text-[#0E1D21]">Table of Contents</h3>
              </div>
              
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection(item.id);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-[#122E34] to-[#2596be] text-white'
                        : 'text-[#677E8A] hover:bg-gradient-to-r hover:from-[#122E34]/5 hover:to-[#2596be]/5'
                    }`}
                  >
                    <span className="text-sm font-medium">{item.title}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-[#ABAFB5]/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#677E8A]">Version</span>
                  <span className="font-semibold text-[#122E34]">2.1.0</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-[#677E8A]">Effective Date</span>
                  <span className="font-semibold text-[#122E34]">Jan 1, 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Content */}
          <div className="lg:col-span-3 terms-content">
            {/* Acceptance Banner */}
            <div className="mb-8 rounded-2xl border-2 border-[#2596be] bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shrink-0">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#0E1D21] mb-2">
                    By using our services, you agree to these terms
                  </h3>
                  <p className="text-[#677E8A] mb-4">
                    These Terms & Conditions constitute a legally binding agreement between you and EdPharma.
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="accept-terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="h-5 w-5 rounded border-[#ABAFB5] text-[#2596be] focus:ring-[#2596be]"
                    />
                    <label htmlFor="accept-terms" className="text-sm text-[#677E8A]">
                      I have read and agree to the Terms & Conditions
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <section id="introduction" className="scroll-mt-24 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#0E1D21]">1. Introduction</h2>
              </div>
              
              <div className="space-y-4 text-[#677E8A] leading-relaxed">
                <p>
                  Welcome to EdPharma ("we," "our," or "us"). These Terms & Conditions govern your access to and use of 
                  our website, mobile application, and pharmacy services (collectively, the "Services").
                </p>
                <p>
                  By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part 
                  of these Terms, you may not access or use our Services.
                </p>
                
                <ImportantNote>
                  <p>
                    <strong>Medical Disclaimer:</strong> Our Services are not intended to provide medical advice, diagnosis, 
                    or treatment. Always seek the advice of your physician or other qualified health provider with any 
                    questions you may have regarding a medical condition.
                  </p>
                </ImportantNote>
              </div>
            </section>

            {/* Key Definitions */}
            <section id="definitions" className="scroll-mt-24 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#0E1D21]">2. Key Definitions</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                {[
                  { term: "Services", definition: "Our website, mobile app, pharmacy, and related healthcare services" },
                  { term: "User", definition: "Any individual accessing or using our Services" },
                  { term: "Prescription", definition: "A lawful medication order from a licensed healthcare provider" },
                  { term: "Protected Health Information", definition: "Health information protected under HIPAA regulations" }
                ].map((item, index) => (
                  <div key={index} className="rounded-xl border border-[#ABAFB5]/30 p-4">
                    <h4 className="font-semibold text-[#122E34] mb-2">{item.term}</h4>
                    <p className="text-sm text-[#677E8A]">{item.definition}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Eligibility */}
            <section id="eligibility" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0E1D21] mb-6">3. Eligibility Requirements</h2>
              
              <div className="space-y-6">
                <TermItem 
                  title="Age Requirement" 
                  content="You must be at least 18 years old to use our Services. If you are under 18, you may use our Services only with involvement of a parent or guardian."
                />
                
                <TermItem 
                  title="Geographic Restrictions" 
                  content="Our Services are available only to residents of the United States and its territories. We do not ship medications internationally."
                />
                
                <TermItem 
                  title="Medical Eligibility" 
                  content="You must have a valid prescription from a licensed healthcare provider for all prescription medications. We reserve the right to verify prescriptions and healthcare provider credentials."
                />
              </div>
            </section>

            {/* Expandable Sections */}
            <div className="space-y-4">
              <ExpandableSection title="4. User Accounts & Registration" defaultOpen={true}>
                <div className="space-y-4">
                  <p>
                    To access certain features, you must create an account. You agree to provide accurate, current, 
                    and complete information during registration and to update such information to keep it accurate.
                  </p>
                  <p>
                    You are responsible for maintaining the confidentiality of your account credentials and for all 
                    activities that occur under your account.
                  </p>
                  <p className="font-semibold text-[#0E1D21]">
                    You must notify us immediately of any unauthorized use of your account or any other security breach.
                  </p>
                </div>
              </ExpandableSection>

              <ExpandableSection title="5. Prescription Services">
                <div className="space-y-4">
                  <p>
                    We fill prescriptions in accordance with state and federal laws. All prescriptions require:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Valid prescription from a licensed healthcare provider</li>
                    <li>Patient identification and verification</li>
                    <li>Pharmacist review and consultation</li>
                    <li>Payment for services and medications</li>
                  </ul>
                  <p>
                    We reserve the right to refuse to fill any prescription if we believe it would be unsafe, 
                    unlawful, or against professional standards.
                  </p>
                </div>
              </ExpandableSection>

              <ExpandableSection title="6. Products & Pricing">
                <div className="space-y-4">
                  <p>
                    All prices are subject to change without notice. We make every effort to display accurate 
                    pricing, but errors may occur. We reserve the right to correct any errors and cancel orders 
                    arising from such errors.
                  </p>
                  <p>
                    Product availability may vary. Some medications may require special ordering or may be subject 
                    to supply chain limitations.
                  </p>
                </div>
              </ExpandableSection>

              <ExpandableSection title="7. Payments & Billing">
                <div className="space-y-4">
                  <p>
                    We accept various payment methods including credit cards, insurance, and flexible spending accounts.
                  </p>
                  <p>
                    By providing payment information, you authorize us to charge the specified amounts. You are 
                    responsible for all charges incurred under your account.
                  </p>
                </div>
              </ExpandableSection>

              <ExpandableSection title="8. Privacy & Data Protection">
                <div className="space-y-4">
                  <p>
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
                    your information. By using our Services, you consent to our collection and use of information 
                    as described in our Privacy Policy.
                  </p>
                  <p>
                    We comply with HIPAA regulations and maintain appropriate safeguards to protect your Protected 
                    Health Information.
                  </p>
                </div>
              </ExpandableSection>

              <ExpandableSection title="9. Limitation of Liability">
                <div className="space-y-4">
                  <ImportantNote>
                    <p>
                      To the maximum extent permitted by law, EdPharma shall not be liable for any indirect, 
                      incidental, special, consequential, or punitive damages arising from your use of our Services.
                    </p>
                  </ImportantNote>
                  <p>
                    Our total liability for any claims related to our Services shall not exceed the amount you 
                    paid for the specific service giving rise to the claim.
                  </p>
                </div>
              </ExpandableSection>

              <ExpandableSection title="10. Intellectual Property">
                <div className="space-y-4">
                  <p>
                    All content on our Services, including text, graphics, logos, and software, is the property 
                    of EdPharma or its licensors and is protected by copyright and other intellectual property laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, or create derivative works without our express written 
                    permission.
                  </p>
                </div>
              </ExpandableSection>
            </div>

            {/* Additional Sections */}
            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[#2596be]/30 bg-gradient-to-br from-white to-[#2596be]/5 p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#0E1D21] mb-3">Termination</h3>
                <p className="text-[#677E8A] text-sm">
                  We may terminate or suspend your account and access to our Services at our sole discretion, 
                  without notice, for conduct that we believe violates these Terms or is harmful to other users.
                </p>
              </div>

              <div className="rounded-2xl border border-[#2596be]/30 bg-gradient-to-br from-white to-[#122E34]/5 p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#0E1D21] mb-3">Governing Law</h3>
                <p className="text-[#677E8A] text-sm">
                  These Terms shall be governed by the laws of the State of Delaware, without regard to its 
                  conflict of law provisions. Any disputes shall be resolved in the state or federal courts 
                  located in Delaware.
                </p>
              </div>
            </div>

            {/* Changes to Terms */}
            <section id="changes" className="scroll-mt-24 mt-12 mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0E1D21] mb-6">11. Changes to Terms</h2>
              
              <div className="rounded-2xl border border-[#2596be]/30 bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 p-6">
                <p className="text-[#677E8A] leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will provide notice of material changes 
                  by posting the updated Terms on our website and updating the "Last Updated" date. Your continued 
                  use of our Services after such changes constitutes acceptance of the new Terms.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section id="contact" className="scroll-mt-24 mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0E1D21] mb-6">12. Contact Information</h2>
              
              <div className="rounded-2xl border border-[#2596be]/30 bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 p-6 sm:p-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Mail className="h-5 w-5 text-[#122E34]" />
                      <h3 className="font-semibold text-[#0E1D21]">Email</h3>
                    </div>
                    <a href="mailto:legal@edpharma.com" className="text-[#677E8A] hover:text-[#2596be]">
                      legal@edpharma.com
                    </a>
                    <p className="text-sm text-[#677E8A] mt-1">For legal inquiries only</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Phone className="h-5 w-5 text-[#122E34]" />
                      <h3 className="font-semibold text-[#0E1D21]">Phone</h3>
                    </div>
                    <a href="tel:+15551234567" className="text-[#677E8A] hover:text-[#2596be]">
                      +1 (555) 123-4567
                    </a>
                    <p className="text-sm text-[#677E8A] mt-1">Mon-Fri, 9am-5pm EST</p>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="h-5 w-5 text-[#122E34]" />
                      <h3 className="font-semibold text-[#0E1D21]">Mailing Address</h3>
                    </div>
                    <p className="text-[#677E8A]">
                      EdPharma Legal Department<br />
                      123 Health Street, Suite 500<br />
                      Medical City, MC 12345<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Acknowledgment */}
            <div className="rounded-2xl border-2 border-[#2596be] bg-white p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#0E1D21] mb-3">
                Thank you for reviewing our Terms & Conditions
              </h3>
              <p className="text-[#677E8A] mb-6 max-w-2xl mx-auto">
                If you have any questions about these Terms, please contact our legal department before using our Services.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] px-6 py-3 text-white font-semibold hover:from-[#122E34]/90 hover:to-[#2596be]/90 transition"
                >
                  Back to Top
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-[#2596be] px-6 py-3 text-[#122E34] font-semibold hover:bg-[#2596be]/10 transition"
                >
                  Contact Legal Department
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#122E34]/5 via-[#0E1D21]/5 to-[#2596be]/5 p-8">
          <h3 className="text-xl font-semibold text-[#0E1D21] mb-6 text-center">Related Legal Documents</h3>
          
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Privacy Policy', description: 'How we protect your data', href: '/privacy' },
              { title: 'HIPAA Compliance', description: 'Health information practices', href: '/hipaa' },
              { title: 'Return Policy', description: 'Medication returns & refunds', href: '/returns' }
            ].map((doc, index) => (
              <Link
                key={index}
                href={doc.href}
                className="rounded-xl border border-[#ABAFB5]/30 bg-white p-4 hover:border-[#2596be] hover:shadow-lg transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <FileText className="h-5 w-5 text-[#677E8A] group-hover:text-[#2596be]" />
                  <ArrowRight className="h-4 w-4 text-[#677E8A] group-hover:text-[#2596be] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="font-semibold text-[#0E1D21] mb-1">{doc.title}</h4>
                <p className="text-sm text-[#677E8A]">{doc.description}</p>
              </Link>
            ))}
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