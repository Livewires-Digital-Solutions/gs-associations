import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Building2, TrendingUp, CheckCircle2 } from 'lucide-react';

const team = [
  {
    name: 'Rajesh Gupta', role: 'Founder & CEO', bio: 'With 20 years in Hyderabad real estate, Rajesh founded GS Associations with a mission to make property buying transparent and trustworthy.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh',
  },
  {
    name: 'Priya Nair', role: 'Head of Sales', bio: 'Priya has closed over ₹500 Crore in residential transactions and is renowned for her deep knowledge of Hyderabad\'s premium markets.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
  },
  {
    name: 'Suresh Reddy', role: 'Head of Investments', bio: 'Suresh specializes in commercial and investment properties. His data-driven approach has helped 300+ investors build profitable portfolios.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suresh',
  },
  {
    name: 'Ravi Shankar', role: 'Head of Operations', bio: 'Ravi ensures every client experience is seamless — from first enquiry to property registration. His process obsession sets GS apart.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ravi',
  },
  {
    name: 'Meena Krishnamurthy', role: 'Legal Head', bio: 'Meena leads our in-house legal team ensuring every property transaction is watertight. RERA compliance expert.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meena',
  },
  {
    name: 'Arun Sharma', role: 'Loan Advisory Head', bio: 'Arun\'s team has helped secure home loans for 5,000+ families at rates 0.5-1% below market average through bank partnerships.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arun',
  },
];

const milestones = [
  { year: '2012', event: 'GS Associations founded in Hyderabad with a team of 5 advisors' },
  { year: '2015', event: 'Expanded to 3 offices across Hyderabad. Crossed ₹100 Crore in transactions' },
  { year: '2018', event: 'Launched GS Loan Advisory — partnered with 10 leading banks' },
  { year: '2020', event: 'Digital transformation. First real estate portal in Hyderabad with live tracking' },
  { year: '2022', event: 'Crossed 1,000 successfully closed transactions. Team grew to 80+ professionals' },
  { year: '2024', event: 'Launched GS Associations 2.0 — AI-powered property matching and lead tracking' },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="gradient-hero py-20 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(245,158,11,0.5), transparent 60%)',
        }} />
        <div className="container-app relative z-10 text-center">
          <p className="section-label text-gold-400 mb-4">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Hyderabad's Most Trusted<br />Real Estate Partner
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Since 2012, GS Associations has helped over 15,000 families and investors navigate Hyderabad's dynamic property market with honesty, data, and expertise.
          </p>
        </div>
      </div>

      <div className="container-app">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: <Building2 className="w-6 h-6" />, value: '1,200+', label: 'Properties Sold' },
            { icon: <Users className="w-6 h-6" />, value: '15,000+', label: 'Happy Families' },
            { icon: <TrendingUp className="w-6 h-6" />, value: '₹2,400 Cr', label: 'Worth Transacted' },
            { icon: <Award className="w-6 h-6" />, value: '12+ Years', label: 'of Excellence' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center mx-auto mb-4 text-navy-700">
                {stat.icon}
              </div>
              <div className="text-2xl font-display font-bold text-navy-800 mb-1">{stat.value}</div>
              <div className="text-sm text-surface-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="section-label mb-3">Our Mission</p>
            <h2 className="font-display text-3xl font-bold text-surface-900 mb-5">
              Making Real Estate Buying Honest, Simple, and Rewarding
            </h2>
            <p className="text-surface-600 leading-relaxed mb-5 text-sm">
              In a market often plagued by opacity, GS Associations was built on a radical idea: what if real estate advisors truly worked for buyers, not just commissions? That principle drives everything we do.
            </p>
            <p className="text-surface-600 leading-relaxed mb-6 text-sm">
              We invest in technology, training, and data to ensure every client gets accurate information, fair pricing, and a partner who's with them long after the keys are handed over.
            </p>
            {['RERA compliance expertise', 'In-house legal verification', 'Zero hidden charges', 'Lifetime advisory support', 'Bank-approved properties only'].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-surface-700 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt="GS Associations Office"
              className="rounded-2xl w-full h-80 object-cover shadow-card-hover"
            />
            <div className="absolute -bottom-6 -left-6 card p-4 shadow-card-hover">
              <p className="text-2xl font-display font-bold text-navy-800">98%</p>
              <p className="text-xs text-surface-500">Client Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="section-label">Our Team</p>
            <h2 className="section-heading">Meet the Experts Behind GS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center group hover:border-navy-200"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full bg-surface-200 mx-auto mb-4"
                />
                <h3 className="font-display font-semibold text-surface-900 mb-0.5">{member.name}</h3>
                <p className="text-xs text-gold-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-surface-500 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="section-label">Our Journey</p>
            <h2 className="section-heading">12 Years of Building Trust</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 mb-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-navy-800 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-surface-200 mt-2" />}
                </div>
                <div className="pb-8">
                  <p className="text-sm font-bold text-navy-700 mb-1">{m.year}</p>
                  <p className="text-sm text-surface-600 leading-relaxed">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-navy-800 p-10 text-center text-white">
          <h2 className="font-display text-3xl font-bold mb-3">Ready to Work with Hyderabad's Best?</h2>
          <p className="text-white/70 mb-6">Join 15,000+ families who've found their dream property with GS Associations.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties" className="btn-gold">Browse Properties <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/contact" className="btn-ghost text-white hover:bg-white/10 border border-white/20">Get in Touch</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
