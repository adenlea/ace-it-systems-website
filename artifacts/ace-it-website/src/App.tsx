import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Menu, 
  X, 
  Shield, 
  Zap, 
  Monitor, 
  Globe, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight,
  Users,
  Target,
  Award,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const queryClient = new QueryClient();

function AnimatedSection({ children, id }: { children: React.ReactNode; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#why-us', label: 'Why Choose Us' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0F172A]/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="flex items-center gap-3" data-testid="link-logo">
            <img src="/logo.png" alt="ACE IT Systems" className="h-12 w-auto" />
            <span className="font-display font-bold text-xl text-white hidden sm:block">
              ACE IT Systems
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors font-medium"
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
            <Button 
              asChild 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold glow"
              data-testid="button-nav-contact"
            >
              <a href="#contact">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-700 py-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-gray-300 hover:text-cyan-400 transition-colors"
                data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
            <Button 
              asChild 
              className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold"
              data-testid="button-mobile-contact"
            >
              <a href="#contact" onClick={() => setIsOpen(false)}>Get Started</a>
            </Button>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/80 to-[#0F172A]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            Technology That Works
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow">
              for Nigeria
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade IT solutions built for the African market. From infrastructure 
            to security, we deliver technology that actually works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-lg px-8 py-6 glow"
              data-testid="button-hero-services"
            >
              <a href="#services" className="flex items-center gap-2">
                Explore Services
                <ChevronRight size={20} />
              </a>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white font-bold text-lg px-8 py-6"
              data-testid="button-hero-contact"
            >
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronRight size={32} className="text-cyan-400 rotate-90" />
      </div>
    </section>
  );
}

function About() {
  return (
    <AnimatedSection id="about">
      <section className="py-24 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Nigeria</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ACE Information Technology Systems is your trusted technology partner, headquartered 
              in Abuja and serving businesses and homes across Nigeria.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="font-display font-bold text-3xl text-white">Who We Are</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                We're a registered Nigerian IT company that delivers enterprise-grade technology 
                solutions designed for the realities of the African market. Whether you need strategic 
                IT consulting, robust security systems, reliable power management, or custom business 
                portals — we bring professional expertise and local knowledge.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our mission is simple: make modern infrastructure accessible. We bridge the gap 
                between cutting-edge technology and real-world deployment in Nigeria.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Users, label: 'Client-Focused', desc: 'Your success is our priority' },
                { icon: Target, label: 'Results-Driven', desc: 'Solutions that deliver' },
                { icon: Award, label: 'Quality First', desc: 'Premium hardware & service' },
                { icon: Clock, label: 'Always Available', desc: 'Fast turnaround & support' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
                  data-testid={`card-value-${index}`}
                >
                  <item.icon className="text-cyan-400 mb-3" size={32} />
                  <h4 className="font-display font-semibold text-white mb-2">{item.label}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

function Services() {
  const services = [
    {
      icon: Monitor,
      title: 'IT Strategy & Operations',
      description: 'Comprehensive IT consulting, infrastructure planning, network setup, managed IT services, and cybersecurity solutions tailored for your business.',
      features: ['IT Consulting', 'Network Infrastructure', 'Managed Services', 'Cybersecurity', 'Cloud Solutions'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Home Security Systems',
      description: 'Professional supply and installation of CCTV cameras, alarm systems, access control, and smart home security hardware to protect what matters most.',
      features: ['CCTV Systems', 'Alarm Installation', 'Access Control', 'Smart Security', 'Monitoring'],
      color: 'from-cyan-500 to-teal-500',
    },
    {
      icon: Zap,
      title: 'Power Management & Safety',
      description: 'Reliable power solutions including UPS systems, inverters, solar power installations, surge protection, and backup systems for homes and offices.',
      features: ['UPS Systems', 'Solar Power', 'Inverters', 'Surge Protection', 'Backup Solutions'],
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Globe,
      title: 'Business Solutions',
      description: 'Custom website development, business service portals, e-commerce platforms, and web applications designed to drive growth and efficiency.',
      features: ['Web Development', 'Business Portals', 'E-Commerce', 'Web Apps', 'Digital Strategy'],
      color: 'from-blue-500 to-indigo-500',
    },
  ];

  return (
    <AnimatedSection id="services">
      <section className="py-24 bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              End-to-end technology solutions that work together to power your success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all overflow-hidden"
                data-testid={`card-service-${index}`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${service.color} mb-6`}>
                    <service.icon className="text-white" size={32} />
                  </div>
                  
                  <h3 className="font-display font-bold text-2xl text-white mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm bg-gray-700/50 text-cyan-400 rounded-full border border-cyan-500/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

function WhyChooseUs() {
  const reasons = [
    {
      icon: CheckCircle,
      title: 'Local Expertise',
      description: 'Deep understanding of Nigerian infrastructure, regulations, and market realities.',
    },
    {
      icon: CheckCircle,
      title: 'Quality Hardware',
      description: 'We source and supply premium equipment built to withstand local conditions.',
    },
    {
      icon: CheckCircle,
      title: 'End-to-End Support',
      description: 'From consultation to installation to ongoing maintenance — we handle it all.',
    },
    {
      icon: CheckCircle,
      title: 'Fast Turnaround',
      description: 'Responsive service and quick deployment to minimize downtime and delays.',
    },
    {
      icon: CheckCircle,
      title: 'Proven Track Record',
      description: 'Trusted by businesses and homeowners across Nigeria for reliable solutions.',
    },
    {
      icon: CheckCircle,
      title: 'Scalable Solutions',
      description: 'Technology that grows with you, from startup to enterprise scale.',
    },
  ];

  return (
    <AnimatedSection id="why-us">
      <section className="py-24 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ACE IT Systems</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The technology partner that understands your challenges and delivers solutions that work.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all"
                data-testid={`card-reason-${index}`}
              >
                <reason.icon className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <AnimatedSection id="contact">
      <section className="py-24 bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Touch</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your technology? Reach out and let's discuss your needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-display font-bold text-2xl text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-cyan-400 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="text-white font-semibold mb-1">Location</p>
                      <p className="text-gray-400">Abuja, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="text-cyan-400 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="text-white font-semibold mb-1">Phone</p>
                      <a href="tel:+2341234567890" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        +234 1234567890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="text-cyan-400 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="text-white font-semibold mb-1">Email</p>
                      <a href="mailto:adenlea@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        adenlea@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-xl border border-cyan-500/30">
                <h4 className="font-display font-semibold text-xl text-white mb-4">
                  Business Hours
                </h4>
                <div className="space-y-2 text-gray-300">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-8 rounded-xl border border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-gray-900/50 border-gray-600 text-white"
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-gray-900/50 border-gray-600 text-white"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white font-medium mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-gray-900/50 border-gray-600 text-white"
                    data-testid="input-phone"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-white font-medium mb-2">
                    Service of Interest
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger 
                      id="service"
                      className="bg-gray-900/50 border-gray-600 text-white"
                      data-testid="select-service"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it-strategy">IT Strategy & Operations</SelectItem>
                      <SelectItem value="security">Home Security Systems</SelectItem>
                      <SelectItem value="power">Power Management & Safety</SelectItem>
                      <SelectItem value="business">Business Solutions</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-gray-900/50 border-gray-600 text-white resize-none"
                    data-testid="input-message"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-6 glow"
                  data-testid="button-submit-contact"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

function Footer() {
  const serviceLinks = [
    'IT Strategy & Operations',
    'Home Security Systems',
    'Power Management',
    'Business Solutions',
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#0F172A] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="ACE IT Systems" className="h-12 w-auto" />
              <span className="font-display font-bold text-xl text-white">
                ACE IT Systems
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your trusted technology partner in Nigeria. Delivering enterprise-grade IT solutions 
              built for the African market.
            </p>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-cyan-400" />
                Abuja, Nigeria
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-cyan-400" />
                +234 1234567890
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-cyan-400" />
                adenlea@gmail.com
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a href="#services" className="text-gray-400 hover:text-cyan-400 transition-colors" data-testid={`link-footer-service-${index}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors" data-testid={`link-footer-quick-${index}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ACE Information Technology Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Home />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
