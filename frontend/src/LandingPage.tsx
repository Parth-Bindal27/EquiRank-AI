import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToId = (e, id) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="font-sans text-slate-600 bg-slate-50 antialiased selection:bg-brand-accent selection:text-white" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
            
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                            <i className="fa-solid fa-scale-balanced text-brand-accent text-2xl"></i>
                            <span className="font-bold text-2xl text-brand-slateDark tracking-tight">Equi<span className="text-brand-accent">Rank</span></span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" onClick={(e) => scrollToId(e, 'features')} className="text-slate-500 hover:text-brand-accent font-medium transition-colors">Features</a>
                            <a href="#comparison" onClick={(e) => scrollToId(e, 'comparison')} className="text-slate-500 hover:text-brand-accent font-medium transition-colors">Why Us</a>
                            <a href="#compliance" onClick={(e) => scrollToId(e, 'compliance')} className="text-slate-500 hover:text-brand-accent font-medium transition-colors">Compliance</a>
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:flex items-center">
                            <button 
                                onClick={() => navigate('/dashboard')}
                                className="bg-brand-accent hover:bg-brand-accentHover text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-sm"
                            >
                                Enter Enterprise Dashboard
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-500 hover:text-brand-slateDark focus:outline-none">
                                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
                        <a href="#features" onClick={(e) => scrollToId(e, 'features')} className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-brand-accent hover:bg-slate-50 rounded-md">Features</a>
                        <a href="#comparison" onClick={(e) => scrollToId(e, 'comparison')} className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-brand-accent hover:bg-slate-50 rounded-md">Why Us</a>
                        <a href="#compliance" onClick={(e) => scrollToId(e, 'compliance')} className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-brand-accent hover:bg-slate-50 rounded-md">Compliance</a>
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className="w-full text-left mt-4 block px-3 py-2 text-base font-medium text-brand-accent hover:text-brand-accentHover hover:bg-slate-50 rounded-md"
                        >
                            Enter Dashboard &rarr;
                        </button>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white subtle-grid">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
                        {/* Hero Content */}
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-brand-accent text-sm font-medium mb-6">
                                <i className="fa-solid fa-shield-halved"></i> Enterprise ATS Integration Ready
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-slateDark tracking-tight leading-[1.1] mb-6">
                                Hiring Middleware: <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-slate-400">True Skill, Zero Bias.</span>
                            </h1>
                            <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                EquiRank evaluates candidates on verified skill density while actively stress-testing its own decisions for hidden proxy bias. An objective counterweight to human prejudice.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button 
                                    onClick={() => navigate('/dashboard')}
                                    className="bg-brand-slateDark hover:bg-slate-700 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-all shadow-sm flex items-center justify-center gap-2"
                                >
                                    Deploy EquiRank <i className="fa-solid fa-arrow-right text-sm"></i>
                                </button>
                                <button 
                                    onClick={() => navigate('/dashboard/trust-report')}
                                    className="bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 px-8 py-3.5 rounded-full font-medium text-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <i className="fa-solid fa-play text-brand-accent"></i> Watch System Audit
                                </button>
                            </div>
                        </div>

                        {/* Hero Graphic (Abstract Representation) */}
                        <div className="relative hidden lg:block">
                            {/* Abstract Dashboard UI Mockup */}
                            <div className="glass-panel-light rounded-2xl p-7 shadow-soft-lg relative transform rotate-y-[-5deg] rotate-x-[2deg] perspective-1000 border border-slate-100" style={{ transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)' }}>
                                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-brand-accent">
                                            <i className="fa-solid fa-user-check"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-slate-800 font-semibold">Candidate Assessment</h3>
                                            <p className="text-slate-400 text-xs">Live processing</p>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 rounded bg-indigo-50 text-brand-accent text-sm font-semibold border border-indigo-100">Score: 94</div>
                                </div>
                                
                                <div className="space-y-5">
                                    {/* Skill Matrix Bar */}
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
                                            <span>Skill Density Matrix</span>
                                            <span className="text-slate-400">Verified</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2">
                                            <div className="bg-brand-accent h-2 rounded-full" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                    
                                    {/* Bias Check Bar */}
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
                                            <span>Proxy Bias Detected</span>
                                            <span className="text-emerald-500">0.0% (Neutralized)</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2">
                                            <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                                        </div>
                                    </div>

                                    {/* Mock Code/Data snippet */}
                                    <div className="mt-6 bg-slate-800 rounded-lg p-4 border border-slate-700 text-xs font-mono text-slate-300 shadow-inner">
                                        <span className="text-brand-accent">&gt;</span> Executing FairRank Engine...<br/>
                                        <span className="text-brand-accent">&gt;</span> Optimizing FairVIC loss function...<br/>
                                        <span className="text-brand-accent">&gt;</span> Flattening demographic proxies...<br/>
                                        <span className="text-brand-accent">&gt;</span> Status: <span className="text-emerald-400">COUNTERFACTUAL SECURE</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Decorative Background Blurs */}
                            <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-100/50 rounded-full blur-3xl -z-10"></div>
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-slate-200/50 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Pillars Section */}
            <section id="features" className="py-24 bg-white relative border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3">Platform Architecture</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-brand-slateDark mb-4 tracking-tight">The Three Pillars of Verifiable Fairness</h3>
                        <p className="text-lg text-slate-500">Bridging advanced machine learning research with practical HR utility to eliminate the "black box" of AI hiring.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Pillar 1 */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 group">
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-brand-accent text-xl mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
                                <i className="fa-solid fa-network-wired"></i>
                            </div>
                            <h4 className="text-xl font-semibold text-slate-800 mb-3 tracking-tight">EvidenceGraph &amp; PoS</h4>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                Instead of penalizing gaps or relying on public GitHubs, we extract technical claims directly from resumes. Our Proof-of-Skill (PoS) gateway generates hyper-personalized, context-aware LLM micro-assessments to verify domain knowledge.
                            </p>
                        </div>

                        {/* Pillar 2 */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 group">
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-brand-accent text-xl mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
                                <i className="fa-solid fa-brain"></i>
                            </div>
                            <h4 className="text-xl font-semibold text-slate-800 mb-3 tracking-tight">FairRank Engine</h4>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                Powered by DistilRoBERTa + FairVIC. The core scoring model utilizes Optimal Transport to calculate the Fair Wasserstein distance, mathematically flattening demographic, regional, and institutional proxies within the latent embedding space.
                            </p>
                        </div>

                        {/* Pillar 3 */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 group">
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-brand-accent text-xl mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
                                <i className="fa-solid fa-bolt"></i>
                            </div>
                            <h4 className="text-xl font-semibold text-slate-800 mb-3 tracking-tight">The Fairness Attack</h4>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                Empowers recruiters to actively challenge AI recommendations. Inject synthetic counterfactuals (e.g., swapping universities or adding gaps). High causal entropy freezes the decision for human review, ensuring strict EU AI Act compliance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section id="comparison" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-slateDark mb-4 tracking-tight">Outclassing the Competition</h2>
                        <p className="text-lg text-slate-500">See how EquiRank solves the exact flaws introduced by traditional AI hiring models.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-slate-200">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-800 text-sm border-b border-slate-200">
                                        <th className="p-6 font-semibold w-1/4 border-r border-slate-200">Evaluation Dimension</th>
                                        <th className="p-6 font-semibold w-[37.5%] border-r border-slate-200 text-slate-500">Competitor Approaches</th>
                                        <th className="p-6 font-semibold w-[37.5%] text-brand-accent">The EquiRank Standard</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-600 text-sm">
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-6 font-medium text-slate-800 align-top border-r border-slate-100">Skill Verification</td>
                                        <td className="p-6 align-top border-r border-slate-100">
                                            <div className="flex items-start gap-3">
                                                <i className="fa-solid fa-xmark text-slate-300 mt-1"></i>
                                                <p className="text-slate-500">Scraping public GitHub commits (introduces severe socio-economic privilege bias against corporate/NDA developers).</p>
                                            </div>
                                        </td>
                                        <td className="p-6 align-top bg-indigo-50/30">
                                            <div className="flex items-start gap-3">
                                                <i className="fa-solid fa-check text-brand-accent mt-1"></i>
                                                <p><strong className="text-slate-800 font-medium">EvidenceGraph &amp; PoS:</strong> Evaluates internal resume context and issues dynamic, targeted technical micro-assessments.</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-6 font-medium text-slate-800 align-top border-r border-slate-100">Debiasing Engine</td>
                                        <td className="p-6 align-top border-r border-slate-100">
                                            <div className="flex items-start gap-3">
                                                <i className="fa-solid fa-xmark text-slate-300 mt-1"></i>
                                                <p className="text-slate-500">Adversarial networks (notoriously unstable, frequently fail to converge, and heavily degrade matching accuracy).</p>
                                            </div>
                                        </td>
                                        <td className="p-6 align-top bg-indigo-50/30">
                                            <div className="flex items-start gap-3">
                                                <i className="fa-solid fa-check text-brand-accent mt-1"></i>
                                                <p><strong className="text-slate-800 font-medium">FairVIC &amp; Optimal Transport:</strong> A stable, single-pass optimization that neutralizes proxies directly in the embedding space.</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-6 font-medium text-slate-800 align-top border-r border-slate-100">System Auditing</td>
                                        <td className="p-6 align-top border-r border-slate-100">
                                            <div className="flex items-start gap-3">
                                                <i className="fa-solid fa-xmark text-slate-300 mt-1"></i>
                                                <p className="text-slate-500">Static annual reviews or slow post-deployment retraining loops.</p>
                                            </div>
                                        </td>
                                        <td className="p-6 align-top bg-indigo-50/30">
                                            <div className="flex items-start gap-3">
                                                <i className="fa-solid fa-check text-brand-accent mt-1"></i>
                                                <p><strong className="text-slate-800 font-medium">Interactive Fairness Attack:</strong> Live, per-candidate counterfactual stress tests executing in real-time on the recruiter dashboard.</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-6 font-medium text-slate-800 align-top border-r border-slate-100">Bias Scope</td>
                                        <td className="p-6 align-top border-r border-slate-100">
                                            <div className="flex items-start gap-3">
                                                <i className="fa-solid fa-xmark text-slate-300 mt-1"></i>
                                                <p className="text-slate-500">Optimized almost exclusively for Western gender and racial bias vectors.</p>
                                            </div>
                                        </td>
                                        <td className="p-6 align-top bg-indigo-50/30">
                                            <div className="flex items-start gap-3">
                                                <i className="fa-solid fa-check text-brand-accent mt-1"></i>
                                                <p><strong className="text-slate-800 font-medium">Global &amp; Intersection Scope:</strong> Actively neutralizes Algorithmic Casteism (dialects, pin codes) and neurodivergent career gaps to comply with India's DPDP Act.</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compliance Banner */}
            <section className="bg-white py-16 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div id="compliance" className="text-center md:text-left text-slate-800 max-w-2xl">
                            <h3 className="text-2xl font-bold mb-3 tracking-tight">Compliance-by-Design</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                EquiRank utilizes the energy-efficient DistilRoBERTa architecture for Green AI sustainability alongside cryptographic traceability logs. Protect your enterprise from regulatory fines.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4 shadow-sm w-56">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-accent shadow-sm">
                                    <i className="fa-solid fa-scale-unbalanced text-lg"></i>
                                </div>
                                <div className="text-left">
                                    <div className="text-slate-800 font-semibold text-sm">EU AI Act</div>
                                    <div className="text-slate-400 text-xs">Article 14 Compliant</div>
                                </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4 shadow-sm w-56">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-accent shadow-sm">
                                    <i className="fa-solid fa-shield-halved text-lg"></i>
                                </div>
                                <div className="text-left">
                                    <div className="text-slate-800 font-semibold text-sm">India DPDP Act</div>
                                    <div className="text-slate-400 text-xs">Data Protection Ready</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-50 text-slate-500 py-12 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <i className="fa-solid fa-scale-balanced text-brand-accent text-xl"></i>
                                <span className="font-bold text-xl text-brand-slateDark tracking-tight">Equi<span className="text-brand-accent">Rank</span></span>
                            </div>
                            <p className="text-sm leading-relaxed pr-4">Merit, not momentum. The objective counterweight to human prejudice in enterprise hiring.</p>
                        </div>
                        <div>
                            <h4 className="text-slate-800 font-semibold mb-4 text-sm">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }} className="hover:text-brand-accent transition-colors">EvidenceGraph</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard/fairness-lab'); }} className="hover:text-brand-accent transition-colors">FairRank Engine</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard/fairness-lab'); }} className="hover:text-brand-accent transition-colors">Fairness Attack Simulator</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard/api'); }} className="hover:text-brand-accent transition-colors">ATS Integrations</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-slate-800 font-semibold mb-4 text-sm">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-accent transition-colors">About Us</a></li>
                                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-accent transition-colors">Research Papers</a></li>
                                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-accent transition-colors">Careers</a></li>
                                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-accent transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-slate-800 font-semibold mb-4 text-sm">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-accent transition-colors">Privacy Policy</a></li>
                                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-accent transition-colors">Terms of Service</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard/trust-report'); }} className="hover:text-brand-accent transition-colors">Compliance Certifications</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p>&copy; 2026 EquiRank AI Systems. All rights reserved.</p>
                        <div className="flex space-x-5">
                            <a href="#" className="text-slate-400 hover:text-brand-accent transition-colors"><i className="fa-brands fa-linkedin text-lg"></i></a>
                            <a href="#" className="text-slate-400 hover:text-brand-accent transition-colors"><i className="fa-brands fa-twitter text-lg"></i></a>
                            <a href="#" className="text-slate-400 hover:text-brand-accent transition-colors"><i className="fa-brands fa-github text-lg"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
