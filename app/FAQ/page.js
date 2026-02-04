'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle, MessageCircle, Phone, Mail, Clock,
  Truck, Shield, CreditCard, Pill, User,
  Clipboard, Calendar, Lock, Globe,
  Package, RefreshCw, AlertCircle, CheckCircle2,
  ChevronDown, ChevronUp, Search, FileText,
  Stethoscope, Activity, Users, Heart
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

function FAQCategoryCard({ title, description, icon: Icon, count, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-6 transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-[#122E34] to-[#2596be] text-white'
          : 'border border-[#2596be]/20 bg-white hover:border-[#2596be]/40'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isActive ? 'bg-white/20' : 'bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10'
        }`}>
          <Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-[#122E34]'}`} />
        </div>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
          isActive ? 'bg-white/20' : 'bg-[#122E34]/10 text-[#122E34]'
        }`}>
          {count} questions
        </span>
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${isActive ? 'text-white' : 'text-[#0E1D21]'}`}>
        {title}
      </h3>
      <p className={`text-sm ${isActive ? 'text-white/90' : 'text-[#677E8A]'}`}>
        {description}
      </p>
    </button>
  );
}

function FAQItem({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[#2596be]/20 rounded-2xl overflow-hidden mb-4 hover:border-[#2596be]/40 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center flex-shrink-0">
            <HelpCircle className="h-5 w-5 text-[#122E34]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#0E1D21] mb-2">{question}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                isOpen ? 'bg-[#2596be]/10 text-[#2596be]' : 'bg-[#122E34]/10 text-[#122E34]'
              }`}>
                {isOpen ? 'Hide Answer' : 'Show Answer'}
              </span>
            </div>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-[#2596be]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#677E8A]" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="p-6 pt-0 border-t border-[#2596be]/10">
          <div className="pl-14">
            <div className="bg-gradient-to-r from-[#122E34]/5 to-[#2596be]/5 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#2596be] flex-shrink-0 mt-0.5" />
                <div className="text-[#677E8A] leading-relaxed">
                  {answer}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactCard({ title, description, icon: Icon, actionText, actionLink, actionIcon: ActionIcon }) {
  return (
    <div className="rounded-2xl border border-[#2596be]/20 bg-gradient-to-br from-white to-[#2596be]/5 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center mb-6">
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-[#0E1D21] mb-3">{title}</h3>
      <p className="text-[#677E8A] leading-relaxed mb-6">{description}</p>
      <Link
        href={actionLink}
        className="inline-flex items-center gap-2 text-[#122E34] font-semibold hover:text-[#2596be] group"
      >
        {actionText}
        <ActionIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 'general',
      title: 'General Questions',
      description: 'Basic information about EdPharma and our services',
      icon: HelpCircle,
      count: 8
    },
    {
      id: 'prescriptions',
      title: 'Prescriptions',
      description: 'Questions about medication orders and refills',
      icon: Clipboard,
      count: 7
    },
    {
      id: 'delivery',
      title: 'Delivery & Shipping',
      description: 'Information about shipping options and timelines',
      icon: Truck,
      count: 6
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      description: 'How we protect your health information',
      icon: Shield,
      count: 5
    },
    {
      id: 'billing',
      title: 'Billing & Insurance',
      description: 'Payment methods and insurance coverage',
      icon: CreditCard,
      count: 6
    },
    {
      id: 'telehealth',
      title: 'Telehealth Services',
      description: 'Virtual consultations and online prescriptions',
      icon: Stethoscope,
      count: 4
    }
  ];

  const faqs = {
    general: [
      {
        question: 'What is EdPharma and how does it work?',
        answer: 'EdPharma is a licensed online pharmacy that provides prescription medications directly to your door. We partner with licensed healthcare providers to offer telehealth consultations, process prescriptions, and deliver medications nationwide. Our platform makes it easy to manage your prescriptions, get refills, and access 24/7 pharmacist support.'
      },
      {
        question: 'Is EdPharma a licensed pharmacy?',
        answer: 'Yes, EdPharma is fully licensed in all 50 states. We are registered with state pharmacy boards and comply with all federal regulations. Our pharmacists are licensed in the states they serve, and we maintain all necessary certifications including HIPAA compliance and DEA registration where applicable.'
      },
      {
        question: 'What states do you serve?',
        answer: 'We currently serve all 50 states in the US. However, certain medications may have state-specific restrictions. During the ordering process, our system will automatically verify eligibility based on your shipping address and the medication requested.'
      },
      {
        question: 'Do I need a prescription to order medications?',
        answer: 'Yes, we require a valid prescription from a licensed healthcare provider for all prescription medications. If you already have a prescription, you can upload it to your account. If you need a new prescription, we offer telehealth consultations with licensed providers who can evaluate your condition and prescribe appropriate medications when medically necessary.'
      },
      {
        question: 'How do I contact customer support?',
        answer: 'You can reach our customer support team 24/7 through multiple channels: Phone: 1-800-EDPHARMA (1-800-337-4276), Email: support@edpharma.com, Live Chat: Available on our website, In-App Messaging: Through our mobile app. For urgent medical issues, please call 911 or go to the nearest emergency room.'
      },
      {
        question: 'What are your operating hours?',
        answer: 'Our pharmacy operations are available 24/7 for prescription processing and delivery. Customer support is available 24/7 via phone and chat. Telehealth consultations are available from 7 AM to 11 PM EST, 7 days a week. Prescription transfers and refills can be submitted at any time.'
      },
      {
        question: 'Do you offer discounts or assistance programs?',
        answer: 'Yes, we offer several assistance programs: 1) Manufacturer coupons for eligible medications, 2) Patient assistance programs for qualifying individuals, 3) Senior citizen discounts (10% off for customers 65+), 4) Auto-refill discounts (5% off recurring orders), and 5) Referral program ($25 credit for you and your friend).'
      },
      {
        question: 'Can I use EdPharma for my pet\'s medications?',
        answer: 'Yes, we fill pet prescriptions from licensed veterinarians. You\'ll need to upload the veterinary prescription, and our pharmacists will verify it. We carry many common pet medications and can often compound medications to make them easier for pets to take. Please note that pet medications require separate prescriptions from human medications.'
      }
    ],
    prescriptions: [
      {
        question: 'How do I transfer my prescription to EdPharma?',
        answer: 'Transferring your prescription is easy: 1) Create an EdPharma account, 2) Go to "Transfer Prescriptions" in your account dashboard, 3) Enter your current pharmacy information and medication details, 4) We\'ll contact your pharmacy to transfer the prescription, or 5) You can also upload a photo of your prescription bottle. Most transfers are completed within 24 hours.'
      },
      {
        question: 'How do I request a refill?',
        answer: 'You can request refills through: 1) Your online account dashboard, 2) Our mobile app (iOS/Android), 3) Calling our automated refill line, 4) Texting "REFILL" to our pharmacy number. We\'ll notify your prescriber for authorization if needed and ship your medication once approved. You can also set up auto-refill for automatic delivery.'
      },
      {
        question: 'What medications do you carry?',
        answer: 'We carry a wide range of FDA-approved medications including: chronic condition medications (diabetes, hypertension, cholesterol), acute care medications (antibiotics, pain relief), mental health medications, specialty medications, compounded medications, and over-the-counter products. If you don\'t see your medication, contact us as we may be able to special order it.'
      },
      {
        question: 'Can you compound medications?',
        answer: 'Yes, we have a licensed compounding pharmacy that can prepare customized medications. We offer: flavor compounding for children, dosage form changes (capsules to liquids), allergy-friendly formulations (gluten-free, dye-free), and strength adjustments. All compounding is done by licensed pharmacists in our sterile compounding facility.'
      },
      {
        question: 'How do I handle expired or unused medications?',
        answer: 'We recommend: 1) Do not flush medications unless specifically instructed, 2) Use drug take-back programs (we can help locate one), 3) If no take-back program is available, mix medications with unpalatable substance (like coffee grounds) in sealed bag before disposal, 4) Remove personal information from prescription bottles before recycling. We offer free medication disposal envelopes with every order.'
      },
      {
        question: 'What if I have a question about my medication?',
        answer: 'Our pharmacists are available 24/7 to answer medication questions. You can: 1) Call our pharmacist hotline, 2) Use the chat feature in our app, 3) Schedule a medication review consultation. We provide detailed information about side effects, interactions, proper usage, and storage. We also offer medication synchronization to align refill dates.'
      },
      {
        question: 'Can I get a 90-day supply of my medication?',
        answer: 'Yes, we offer 90-day supplies for most maintenance medications. This can save you time and money. Your prescriber must authorize a 90-day supply. We can contact them on your behalf. Some insurance plans also offer better coverage for 90-day supplies. Check with your insurance provider for specific details.'
      }
    ],
    delivery: [
      {
        question: 'How much does shipping cost?',
        answer: 'We offer several shipping options: 1) Standard Shipping (3-5 business days): Free on all prescription orders over $35, $4.99 for orders under $35, 2) Express Shipping (1-2 business days): $9.99, 3) Same-Day Delivery: Available in select metropolitan areas for $12.99. Shipping is always free for auto-refill program members.'
      },
      {
        question: 'How do I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email and SMS. You can also track your order in your account dashboard. We provide real-time tracking updates and estimated delivery windows. For temperature-sensitive medications, we include temperature monitoring data in the tracking information.'
      },
      {
        question: 'What if I\'m not home when my package arrives?',
        answer: 'Most medications don\'t require signature delivery unless specified. If no one is home: 1) Standard shipping: Package will be left in a secure location, 2) Signature required: Carrier will leave a notice for pickup, 3) You can request specific delivery instructions in your account, 4) You can reroute packages through carrier apps. Temperature-sensitive medications have special handling instructions.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Currently, we only ship within the United States, including Puerto Rico and US territories. We cannot ship prescription medications internationally due to regulatory restrictions. We can ship over-the-counter products to select countries. Contact our international shipping department for specific inquiries.'
      },
      {
        question: 'How are temperature-sensitive medications shipped?',
        answer: 'Temperature-sensitive medications are shipped in special insulated packaging with ice packs or phase change materials. We use: 1) Temperature monitors in every package, 2) Overnight shipping for most temperature-sensitive items, 3) Special handling instructions for carriers, 4) Text alerts if temperature exceeds safe range. These medications require prompt retrieval upon delivery.'
      },
      {
        question: 'What is your return policy for medications?',
        answer: 'Due to safety regulations, we cannot accept returns of prescription medications once they leave our pharmacy. Exceptions include: 1) Pharmacy error on our part, 2) Damaged during shipping, 3) Incorrect medication received. In these cases, we\'ll replace the medication at no cost. Unopened over-the-counter products can be returned within 30 days.'
      }
    ],
    security: [
      {
        question: 'How do you protect my health information?',
        answer: 'We use multiple layers of security: 1) HIPAA-compliant encrypted data storage, 2) Two-factor authentication for all accounts, 3) Regular security audits and penetration testing, 4) Secure prescription transmission systems, 5) Limited employee access to health information, 6) Annual HIPAA training for all staff, 7) Secure data centers with 24/7 monitoring.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes, we use bank-level security for all transactions: 1) PCI DSS compliant payment processing, 2) Tokenization of credit card information, 3) No storage of full credit card numbers on our servers, 4) Encrypted transmission of all payment data, 5) Regular security certification audits, 6) Fraud monitoring systems. You can also use HSA/FSA cards for eligible purchases.'
      },
      {
        question: 'How do you verify prescriptions are legitimate?',
        answer: 'We have a multi-step verification process: 1) Licensed pharmacist review of every prescription, 2) Verification with prescribing provider when needed, 3) State prescription drug monitoring program checks, 4) Patient identity verification, 5) Drug interaction screening, 6) Appropriate dosage verification. Our pharmacists are trained to identify potential prescription fraud.'
      },
      {
        question: 'Who has access to my medical information?',
        answer: 'Only authorized personnel directly involved in your care can access your medical information. This includes: 1) Your assigned pharmacist, 2) Pharmacy technicians filling your order, 3) Customer service representatives (limited access), 4) Healthcare providers you authorize. We never sell or share your health information for marketing purposes.'
      },
      {
        question: 'Can I access my health records?',
        answer: 'Yes, you can access your complete health records through your patient portal. This includes: prescription history, medication instructions, lab results (when available), consultation notes, and immunization records. You can download your records or share them with other healthcare providers. All access is logged for security purposes.'
      }
    ],
    billing: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept: 1) All major credit/debit cards (Visa, Mastercard, American Express, Discover), 2) HSA/FSA cards for eligible items, 3) PayPal, 4) Apple Pay and Google Pay, 5) CareCredit, 6) Insurance co-payments. We don\'t accept cash, checks, or money orders. All payments are processed securely through encrypted channels.'
      },
      {
        question: 'Do you accept insurance?',
        answer: 'Yes, we accept most major insurance plans including Medicare Part D, Medicaid (in participating states), and commercial plans. We\'re in-network with most major PBMs. During checkout, we\'ll run your insurance to determine coverage and co-pay. You can also submit receipts to your insurance for reimbursement if we\'re out-of-network.'
      },
      {
        question: 'How do I use my HSA/FSA card?',
        answer: 'You can use your HSA/FSA card just like a regular credit card at checkout. Eligible items include: prescription medications (with valid prescription), over-the-counter medications (with prescription for some items), medical supplies, and certain health products. We provide detailed receipts for tax purposes. Check with your plan administrator for specific eligible items.'
      },
      {
        question: 'Can I get a price estimate before ordering?',
        answer: 'Yes, you can get a price estimate through: 1) Our online price checker tool, 2) Calling our pharmacy with medication details, 3) Using our mobile app. We\'ll provide cash prices and insurance estimates. Prices may vary based on insurance coverage, dosage, and quantity. We also offer a price match guarantee for cash prices.'
      },
      {
        question: 'What if I can\'t afford my medication?',
        answer: 'We offer several assistance options: 1) Manufacturer patient assistance programs, 2) Our affordability program for uninsured patients, 3) Payment plans for larger orders, 4) Discount cards and coupons, 5) Referral to charitable organizations. Contact our patient assistance team to explore options. We believe everyone deserves access to affordable medication.'
      },
      {
        question: 'How do I update my billing information?',
        answer: 'You can update billing information in your account settings under "Payment Methods." Changes take effect immediately for future orders. For security, you may need to verify your identity when updating payment methods. Saved payment methods are encrypted and tokenized. You can have multiple payment methods saved for different purposes.'
      }
    ],
    telehealth: [
      {
        question: 'How do telehealth consultations work?',
        answer: 'Our telehealth process: 1) Complete health questionnaire online, 2) Schedule video consultation with licensed provider, 3) Virtual visit via secure video platform, 4) Provider evaluates and prescribes if appropriate, 5) Prescription sent directly to our pharmacy, 6) Medication shipped to your door. Consultations typically last 15-30 minutes.'
      },
      {
        question: 'What conditions can be treated via telehealth?',
        answer: 'We treat many common conditions including: allergies, cold & flu, skin conditions, birth control, mental health (anxiety, depression), hair loss, erectile dysfunction, UTI, acid reflux, and chronic condition management. Some conditions requiring physical examination or lab tests may need in-person visit. Providers will refer you if needed.'
      },
      {
        question: 'How much do telehealth consultations cost?',
        answer: 'Consultation fees vary: 1) Standard consultation: $49, 2) Follow-up consultations: $29, 3) Annual wellness visits: $79, 4) Some insurance plans cover telehealth visits (check with your provider), 5) Members get 2 free consultations per year. Consultation fee is separate from medication cost. No charge if provider determines treatment isn\'t appropriate.'
      },
      {
        question: 'Are telehealth prescriptions valid in my state?',
        answer: 'Yes, our providers are licensed in multiple states and can prescribe medications in states where they hold active licenses. Our system automatically matches you with a provider licensed in your state. Some states have additional requirements for controlled substances. We comply with all state telehealth regulations and prescribing laws.'
      }
    ]
  };

  const popularQuestions = [
    'How long does shipping take?',
    'Do you accept my insurance?',
    'How do I transfer prescriptions?',
    'Are your pharmacists available 24/7?',
    'What is your return policy?',
    'How do telehealth consultations work?'
  ];

  const filteredFAQs = faqs[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <HelpCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Frequently Asked Questions</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              How can we help you?
            </h1>
            <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
              Find answers to common questions about prescriptions, delivery, billing, and our telehealth services.
            </p>
            
            {/* Search Bar */}
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#677E8A]" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              {/* Popular Searches */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <span className="text-white/80 text-sm">Popular:</span>
                {popularQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(question.split('?')[0])}
                    className="text-sm bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white/90 transition"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Categories */}
        <section className="mb-12">
          <SectionTitle 
            title="Browse by Category" 
            subtitle="Select a category to find answers to your questions"
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {categories.map((category) => (
              <FAQCategoryCard
                key={category.id}
                title={category.title}
                description={category.description}
                icon={category.icon}
                count={category.count}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>
        </section>

        {/* FAQ List */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0E1D21]">
                {categories.find(c => c.id === activeCategory)?.title}
              </h2>
              <p className="text-[#677E8A] mt-2">
                {searchQuery ? `Search results for "${searchQuery}"` : 'Common questions and answers'}
              </p>
            </div>
            <div className="text-sm text-[#677E8A]">
              {filteredFAQs.length} of {faqs[activeCategory].length} questions
            </div>
          </div>
          
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  defaultOpen={index === 0 && !searchQuery}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#122E34]/10 to-[#2596be]/10 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-[#122E34]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0E1D21] mb-2">No results found</h3>
              <p className="text-[#677E8A] mb-6">
                We couldn't find any questions matching "{searchQuery}". Try a different search term or browse by category.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] px-5 py-2.5 text-white font-medium hover:from-[#122E34]/90 hover:to-[#2596be]/90 transition"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-r from-[#122E34]/5 to-[#2596be]/5 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-[#0E1D21] mb-2">24/7</div>
            <div className="text-[#677E8A] font-medium">Pharmacist Support</div>
          </div>
          <div className="bg-gradient-to-r from-[#122E34]/5 to-[#2596be]/5 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-[#0E1D21] mb-2">99.8%</div>
            <div className="text-[#677E8A] font-medium">Prescription Accuracy</div>
          </div>
          <div className="bg-gradient-to-r from-[#122E34]/5 to-[#2596be]/5 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-[#0E1D21] mb-2">50</div>
            <div className="text-[#677E8A] font-medium">States Served</div>
          </div>
          <div className="bg-gradient-to-r from-[#122E34]/5 to-[#2596be]/5 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-[#0E1D21] mb-2">4.9/5</div>
            <div className="text-[#677E8A] font-medium">Patient Rating</div>
          </div>
        </div>

        {/* Still Have Questions */}
        <section className="mb-16">
          <SectionTitle 
            title="Still Have Questions?" 
            subtitle="Our team is here to help you 24/7"
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContactCard
              icon={MessageCircle}
              title="Live Chat Support"
              description="Chat with our support team in real-time for immediate assistance"
              actionText="Start Chat"
              actionLink="/contact"
              actionIcon={Activity}
            />
            <ContactCard
              icon={Phone}
              title="Call Us Anytime"
              description="Speak directly with our pharmacists or customer service representatives"
              actionText="Call Now"
              actionLink="tel:1-800-EDPHARMA"
              actionIcon={Phone}
            />
            <ContactCard
              icon={Mail}
              title="Email Support"
              description="Send us detailed questions and receive comprehensive responses"
              actionText="Send Email"
              actionLink="mailto:support@edpharma.com"
              actionIcon={Mail}
            />
          </div>
        </section>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be] p-8 sm:p-12 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Need Personalized Assistance?
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed">
              Our dedicated patient care team is ready to help you with any questions about 
              medications, insurance, or your treatment plan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#122E34] hover:bg-white/90 transition"
              >
                <Users className="h-4 w-4" />
                Contact Patient Care
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                <FileText className="h-4 w-4" />
                View All Services
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-white/80">
              Emergency? Call 911. For poison control, call 1-800-222-1222
            </p>
          </div>
        </div>

        {/* Back Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-10">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[#677E8A] hover:text-[#122E34] transition"
          >
            ← Learn more about EdPharma
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
  );
}