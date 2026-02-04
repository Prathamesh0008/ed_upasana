'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import {
  Mail, User, Phone, MessageSquare, ClipboardList, CheckCircle2,
  MapPin, Clock, ArrowRight, ChevronDown
} from 'lucide-react';

function Field({ label, id, icon: Icon, children, hint }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-[#0E1D21]">
        {label}
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
          <Icon className="h-5 w-5" />
        </div>

        {children}
      </div>

      {hint ? (
        <p className="text-xs text-[#677E8A]" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const baseControl =
  "w-full rounded-xl border border-[#ABAFB5] bg-white px-4 py-3 pl-10 text-[#0E1D21] " +
  "placeholder:text-[#677E8A] shadow-sm outline-none transition " +
  "focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export default function ContactPage() {
  const uid = useId();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    phone: `${uid}-phone`,
    subject: `${uid}-subject`,
    message: `${uid}-message`,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Contact Us</h1>
            <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto text-white/90">
              Get in touch with our healthcare experts. We're here to help you.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[#ABAFB5]/30">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-[#0E1D21]">Send us a message</h2>
                <p className="text-[#677E8A]">We'll respond within 24 hours.</p>
              </div>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-[#2596be]/20 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 p-6 sm:p-8 text-center">
                <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0E1D21]">
                  Message sent successfully
                </h3>
                <p className="mt-2 text-[#122E34]">
                  Thank you for contacting us. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] px-6 py-3 text-white font-semibold shadow-sm hover:from-[#2596be]/90 hover:to-[#122E34]/90 transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Your name" id={ids.name} icon={User}>
                    <input
                      id={ids.name}
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={baseControl}
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                  </Field>

                  <Field label="Email address" id={ids.email} icon={Mail}>
                    <input
                      id={ids.email}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={baseControl}
                      placeholder="john@example.com"
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Phone number" id={ids.phone} icon={Phone} hint="Optional">
                    <input
                      id={ids.phone}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={baseControl}
                      placeholder="+1 (555) 123-4567"
                      autoComplete="tel"
                      aria-describedby={`${ids.phone}-hint`}
                    />
                  </Field>

                  <div className="space-y-2">
                    <label htmlFor={ids.subject} className="block text-sm font-medium text-[#0E1D21]">
                      Subject
                    </label>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                        <ClipboardList className="h-5 w-5" />
                      </div>

                      <select
                        id={ids.subject}
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={`${baseControl} appearance-none pr-10`}
                      >
                        <option value="" disabled>Select a subject</option>
                        <option value="general">General inquiry</option>
                        <option value="order">Order related</option>
                        <option value="medical">Medical consultation</option>
                        <option value="prescription">Prescription refill</option>
                        <option value="support">Technical support</option>
                      </select>

                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#677E8A]">
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>

                <Field label="Message" id={ids.message} icon={MessageSquare}>
                  <textarea
                    id={ids.message}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={baseControl}
                    placeholder="Tell us how we can help you..."
                  />
                </Field>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be] px-6 py-4 text-white font-semibold shadow-lg hover:from-[#122E34]/90 hover:via-[#0E1D21]/90 hover:to-[#2596be]/90 transition"
                >
                  Send message
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#0E1D21]">Get in touch</h2>
              <p className="mt-3 text-[#677E8A] leading-relaxed">
                Our team of licensed pharmacists and healthcare professionals is ready to assist you with any questions or concerns.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-2xl border border-[#2596be]/30 bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0E1D21]">Phone</h3>
                    <p className="mt-1 text-xl font-semibold text-[#122E34]">+1 (555) 123-4567</p>
                    <p className="text-[#677E8A]">Mon–Fri 9am–6pm EST</p>
                    <p className="mt-2 text-sm text-[#677E8A]">After-hours: +1 (555) 987-6543</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#2596be]/30 bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0E1D21]">Email</h3>
                    <p className="mt-1 font-semibold text-[#122E34]">support@edpharma.com</p>
                    <p className="text-[#677E8A]">General inquiries and support</p>
                    <p className="mt-2 font-semibold text-[#122E34]">orders@edpharma.com</p>
                    <p className="text-[#677E8A]">Order-related questions</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#2596be]/30 bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0E1D21]">Location</h3>
                    <p className="mt-1 text-[#0E1D21] font-medium">EdPharma Headquarters</p>
                    <p className="text-[#677E8A]">123 Health Street, Suite 500</p>
                    <p className="text-[#677E8A]">Medical City, MC 12345</p>
                    <p className="mt-2 text-sm text-[#677E8A]">By appointment only</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#ABAFB5]/30">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-[#677E8A]" />
                  <h3 className="text-lg font-semibold text-[#0E1D21]">Business hours</h3>
                </div>

                <div className="space-y-3 text-sm">
                  {[
                    { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM EST' },
                    { day: 'Saturday', hours: '10:00 AM – 4:00 PM EST' },
                    { day: 'Sunday', hours: 'Emergency services only' },
                    { day: '24/7 Pharmacy', hours: 'Online orders & consultations' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-[#ABAFB5]/20 py-2 last:border-0">
                      <span className="text-[#0E1D21] font-medium">{s.day}</span>
                      <span className="text-[#122E34] font-semibold">{s.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#2596be]/30 bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 p-6">
                <h3 className="text-lg font-semibold text-[#0E1D21]">Frequently asked questions</h3>
                <div className="mt-4 space-y-3">
                  {[
                    { q: 'How fast is medicine delivery?', a: 'Most deliveries are completed within 24 hours in metro areas. Express delivery available.' },
                    { q: 'Are your medicines authentic?', a: 'Yes, all products are sourced from licensed suppliers and FDA approved.' },
                    { q: 'Can I consult with a doctor online?', a: 'Yes, we offer 24/7 online consultation with licensed doctors.' },
                  ].map((f, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-[#ABAFB5]/20">
                      <p className="font-semibold text-[#122E34]">{f.q}</p>
                      <p className="mt-1 text-sm text-[#677E8A]">{f.a}</p>
                    </div>
                  ))}
                </div>

                <Link href="/services" className="inline-flex items-center gap-2 mt-4 text-[#122E34] font-semibold hover:text-[#2596be]">
                  View all FAQs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 rounded-2xl bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be] p-7 sm:p-8 text-center text-white">
          <h2 className="text-xl sm:text-2xl font-semibold">Need immediate assistance?</h2>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
            For urgent medical concerns, please contact emergency services or visit your nearest hospital.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:911"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[#122E34] hover:bg-[#2596be]/10 transition"
            >
              Emergency: 911
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Browse products
            </Link>
          </div>
        </div>

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