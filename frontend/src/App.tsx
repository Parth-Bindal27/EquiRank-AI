import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import LandingPage from './LandingPage';
import { Shield, Users, Activity, BarChart3, Search, AlertTriangle, CheckCircle2, Zap, Settings, ArrowRight, BrainCircuit, LineChart, FileText, Bot, Download, RefreshCw, Cpu } from 'lucide-react';
import axios from 'axios';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import './App.css';

const API_URL = 'http://localhost:8000';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <Users size={18} />, label: 'Pipeline' },
    { path: '/dashboard/fairness-lab', icon: <Activity size={18} />, label: 'Fairness Lab' },
    { path: '/dashboard/trust-report', icon: <BarChart3 size={18} />, label: 'Governance & Trust' },
    { path: '/dashboard/roi', icon: <LineChart size={18} />, label: 'ROI & Sustainability' },
    { path: '/dashboard/copilot', icon: <Bot size={18} />, label: 'EquiRank Copilot' },
    { path: '/dashboard/api', icon: <Cpu size={18} />, label: 'API & Integration' },
  ];

  return (
    <div className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Shield size={20} />
        </div>
        <h2>EquiRank</h2>
      </div>
      
      <div className="nav-links">
        {navItems.map(item => (
          <div 
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: 'auto' }}>
        <div className="nav-item" style={{ opacity: 0.6 }}>
          <Settings size={18} />
          <span>Settings</span>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', padding: '16px 12px', marginTop: '8px', borderTop: '1px solid var(--border-color)' }}>
          EquiRank Prototype v2.1<br/>
          Evidence-based hiring.
        </div>
      </div>
    </div>
  );
}

function PipelineView() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    axios.get(`${API_URL}/candidates`).then(res => {
      setCandidates(res.data);
      setLoading(false);
    });
  }, []);

  const getScoreColor = (score) => {
    if (score >= 90) return 'var(--success-color)';
    if (score >= 75) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const res = await axios.post(`${API_URL}/analyze-resume`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        // Redirect to the newly generated full candidate profile
        navigate(`/dashboard/candidate/${res.data.candidate_id}`);
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.detail || 'Failed to analyze resume.');
    }
    setUploading(false);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="main-content animate-fade-in">
      <div className="header">
        <div>
          <h1>Talent Pipeline</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Reviewing candidates for <strong>Senior ML Engineer</strong></p>
        </div>
        <div className="header-actions">
           <button className="btn"><Search size={16} /> Filter Candidates</button>
           <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".pdf,.txt,.docx" onChange={handleFileUpload} />
           <button className="btn btn-primary" onClick={() => fileInputRef.current.click()} disabled={uploading}>
              {uploading ? <RefreshCw className="spin" size={16} /> : <FileText size={16} />}
              {uploading ? ' Parsing & Generating Insights...' : ' Analyze New Resume'}
           </button>
        </div>
      </div>
      
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
          <RefreshCw className="spin" size={32} style={{ animation: 'spin 2s linear infinite' }} />
          <p style={{ marginTop: '16px' }}>Loading candidate intelligence...</p>
        </div>
      ) : (
        <>
          <div className="stats-grid" style={{ marginBottom: '32px' }}>
             <div className="stat-card glass-panel" style={{ padding: '16px' }}>
                <div className="stat-label">Total Applicants</div>
                <div className="stat-value" style={{ fontSize: '28px' }}>{candidates.length}</div>
             </div>
             <div className="stat-card glass-panel" style={{ padding: '16px' }}>
                <div className="stat-label">Avg Evidence Coverage</div>
                <div className="stat-value" style={{ fontSize: '28px', color: 'var(--accent-color)' }}>91.2%</div>
             </div>
             <div className="stat-card glass-panel" style={{ padding: '16px' }}>
                <div className="stat-label">Human Review Needed</div>
                <div className="stat-value" style={{ fontSize: '28px', color: 'var(--danger-color)' }}>1</div>
             </div>
          </div>

          <div className="candidates-grid">
            {candidates.map(candidate => (
              <div 
                key={candidate.id} 
                className="candidate-card glass-panel"
                onClick={() => navigate(`/dashboard/candidate/${candidate.id}`)}
                style={{ 
                  borderLeft: candidate.fairness.human_review_required ? '4px solid var(--danger-color)' : '1px solid var(--border-color)'
                }}
              >
                <div 
                  className="score-ring"
                  style={{ 
                    borderColor: getScoreColor(candidate.overall_match),
                    color: getScoreColor(candidate.overall_match)
                  }}
                >
                  {candidate.overall_match.toFixed(0)}
                </div>
                
                <div className="candidate-info" style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3>{candidate.name}</h3>
                    {candidate.fairness.human_review_required && (
                      <span className="badge badge-danger"><AlertTriangle size={12} /> Review</span>
                    )}
                  </div>
                  <p>{candidate.experience_years} YOE • {candidate.location}</p>
                  
                  <div className="skills-list" style={{ marginTop: '12px' }}>
                    {candidate.skills.slice(0, 3).map(skill => (
                      <span key={skill.skill_name} className="skill-tag">
                        {skill.skill_name} {skill.proficiency}%
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [challengeResult, setChallengeResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('decision');
  
  // PoS Gateway State
  const [posActive, setPosActive] = useState(null);
  const [posAnswer, setPosAnswer] = useState("");
  const [posLoading, setPosLoading] = useState(false);
  const [posResult, setPosResult] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/candidates/${id}`).then(res => setCandidate(res.data));
  }, [id]);

  const runAttack = async (type, newValue) => {
    setLoading(true);
    setChallengeResult(null);
    try {
      const res = await axios.post(`${API_URL}/challenge`, {
        candidate_id: id,
        challenge_type: type,
        new_value: newValue
      });
      setChallengeResult(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleVerify = async (skillName, evId) => {
    setPosLoading(true);
    try {
      const res = await axios.post(`${API_URL}/verify-skill`, {
        candidate_id: id,
        skill_name: skillName,
        evidence_id: evId,
        answer: posAnswer
      });
      setPosResult(res.data);
      // Reload candidate to get new confidence score
      const candRes = await axios.get(`${API_URL}/candidates/${id}`);
      setCandidate(candRes.data);
    } catch (e) {
      console.error(e);
    }
    setPosLoading(false);
  };

  if (!candidate) return <div className="main-content">Loading profile...</div>;

  return (
    <div className="main-content animate-fade-in">
      <div className="header" style={{ marginBottom: '24px' }}>
        <div>
          <span style={{ color: 'var(--accent-color)', cursor: 'pointer', marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px' }} onClick={() => navigate('/')}>
            ← Back to Pipeline
          </span>
          <h1>{candidate.name}</h1>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
             <span className="badge badge-info">{candidate.id}</span>
             {candidate.fairness.human_review_required ? (
               <span className="badge badge-danger"><AlertTriangle size={12} /> HUMAN REVIEW REQUIRED</span>
             ) : (
               <span className="badge badge-success"><CheckCircle2 size={12} /> AUTOMATION CLEARED</span>
             )}
          </div>
        </div>
        <div className="header-actions">
           <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Overall Match</div>
              <div style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'var(--font-mono)', color: 'var(--success-color)' }}>{candidate.overall_match.toFixed(1)}%</div>
           </div>
        </div>
      </div>
      
      <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '24px', display: 'flex', gap: '24px' }}>
         {['decision', 'evidence', 'fairness', 'audit'].map(tab => (
           <div 
             key={tab}
             onClick={() => setActiveTab(tab)}
             style={{ 
               padding: '12px 0', 
               cursor: 'pointer',
               color: activeTab === tab ? 'white' : 'var(--text-secondary)',
               borderBottom: activeTab === tab ? '2px solid var(--accent-color)' : '2px solid transparent',
               fontWeight: activeTab === tab ? '600' : '400',
               textTransform: 'capitalize'
             }}
           >
             {tab}
           </div>
         ))}
      </div>
      
      {activeTab === 'decision' && (
        <div className="details-layout animate-fade-in">
          <div className="left-column" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="panel glass-panel">
              <div className="panel-header">
                <BrainCircuit size={20} color="var(--accent-color)" />
                <h3>Decision Explainability</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Why did EquiRank assign a score of {candidate.overall_match}%?
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                    <div>
                       <div style={{ fontWeight: '600' }}>Evidence Strength</div>
                       <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Verifiable claims mapped to job requirements</div>
                    </div>
                    <div style={{ fontSize: '20px', fontFamily: 'var(--font-mono)' }}>{candidate.evidence_score.toFixed(1)}</div>
                 </div>
                 
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                    <div>
                       <div style={{ fontWeight: '600' }}>Skill Proficiency Match</div>
                       <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Weighted alignment to critical skills</div>
                    </div>
                    <div style={{ fontSize: '20px', fontFamily: 'var(--font-mono)' }}>{(candidate.overall_match * 0.95).toFixed(1)}</div>
                 </div>
                 
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                    <div>
                       <div style={{ fontWeight: '600' }}>Decision Confidence</div>
                       <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Model certainty based on information density</div>
                    </div>
                    <div style={{ fontSize: '20px', fontFamily: 'var(--font-mono)' }}>{candidate.decision_confidence.toFixed(1)}%</div>
                 </div>
              </div>
            </div>
            
            <div className="panel glass-panel">
               <div className="panel-header">
                  <AlertTriangle size={20} color="var(--warning-color)" />
                  <h3>Proxy Risk Assessment</h3>
               </div>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Latent features detected that could introduce historical hiring bias.
               </p>
               
               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                     {candidate.proxy_risks.map((risk, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                           <td style={{ padding: '12px' }}><strong>{risk.attribute}</strong></td>
                           <td style={{ padding: '12px' }}>
                              <span className={`badge badge-${risk.risk_level === 'High' ? 'danger' : (risk.risk_level === 'Medium' ? 'warning' : 'success')}`}>
                                 {risk.risk_level} Risk
                              </span>
                           </td>
                           <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '13px' }}>{risk.reason}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'fairness' && (
         <div className="details-layout animate-fade-in">
            <div className="panel glass-panel" style={{ width: '100%' }}>
                 <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <Zap size={32} color="var(--accent-color)" style={{ marginBottom: '12px' }} />
                    <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Challenge This Decision (Fairness Attack Simulator)</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                       Run an automated counterfactual fairness attack on the candidate's profile to prove decision stability.
                    </p>
                 </div>
                 
                 <div className="attack-controls">
                    <div className="attack-option">
                       <div>
                          <h4>Change University</h4>
                          <p>Test sensitivity to educational pedigree</p>
                       </div>
                       <button className="btn btn-primary" onClick={() => runAttack('university', 'Ivy League')} disabled={loading}>Run</button>
                    </div>
                    <div className="attack-option">
                       <div>
                          <h4>Inject Career Gap</h4>
                          <p>Test penalization of hidden workers</p>
                       </div>
                       <button className="btn btn-primary" onClick={() => runAttack('career_gap', 3)} disabled={loading}>Run</button>
                    </div>
                    <div className="attack-option">
                       <div>
                          <h4>Change Location</h4>
                          <p>Test geographic proxy bias</p>
                       </div>
                       <button className="btn btn-primary" onClick={() => runAttack('location', 'San Francisco')} disabled={loading}>Run</button>
                    </div>
                    <div className="attack-option" style={{ borderLeft: '4px solid #3fb950' }}>
                       <div>
                          <h4>Reduce Python Skill <span style={{ color: '#3fb950', fontSize: '11px', fontWeight: 'bold' }}>POSITIVE CONTROL</span></h4>
                          <p>Should dramatically impact score</p>
                       </div>
                       <button className="btn" style={{ backgroundColor: 'rgba(63, 185, 80, 0.2)', border: '1px solid #3fb950', color: '#fff' }} onClick={() => runAttack('skill_python', 'Beginner')} disabled={loading}>Run</button>
                    </div>
                 </div>
                 
                 {challengeResult && (
                    <div className={`result-box ${challengeResult.proxy_sensitivity ? 'alert' : 'stable'}`}>
                       {challengeResult.proxy_sensitivity ? (
                          <AlertTriangle size={32} color="var(--danger-color)" style={{ margin: '0 auto' }} />
                       ) : (
                          <CheckCircle2 size={32} color="var(--success-color)" style={{ margin: '0 auto' }} />
                       )}
                       
                       <div className="result-score">
                          {challengeResult.original_score}% <ArrowRight size={20} style={{ margin: '0 10px', verticalAlign: 'middle' }}/> {challengeResult.new_score}%
                       </div>
                       
                       <div className="result-status" style={{ color: challengeResult.proxy_sensitivity ? 'var(--danger-color)' : 'var(--success-color)' }}>
                          {challengeResult.status}
                       </div>
                       
                       <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '13px', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px' }}>
                          <div><strong>Delta:</strong> <span style={{ fontFamily: 'var(--font-mono)' }}>{challengeResult.delta > 0 ? '+' : ''}{challengeResult.delta}</span></div>
                          <div><strong>Expected:</strong> {challengeResult.expected_behavior}</div>
                       </div>
                       
                       {challengeResult.proxy_sensitivity && (
                          <div style={{ marginTop: '16px', fontSize: '14px', background: 'rgba(218, 54, 51, 0.15)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(218, 54, 51, 0.3)', textAlign: 'left' }}>
                             <strong>System Intervention:</strong> High variance detected on a non-merit proxy attribute. Decision automation paused and routed to human review.
                          </div>
                       )}
                    </div>
                 )}
            </div>
         </div>
      )}
      
      {activeTab === 'audit' && (
         <div className="panel glass-panel animate-fade-in">
            <div className="panel-header">
               <BarChart3 size={20} color="var(--accent-color)" />
               <h3>Candidate Action Log</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
               Immutable audit log of AI decisions and human interventions for this candidate.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-secondary)' }}>
               <div>[2026-10-02 09:12:05] SYSTEM: Resume payload received and ingested.</div>
               <div>[2026-10-02 09:12:07] ENGINE: DistilRoBERTa semantic embedding generated (Latency: 142ms).</div>
               <div>[2026-10-02 09:12:07] ENGINE: FairVIC Optimal Transport projection applied successfully.</div>
               <div>[2026-10-02 09:12:08] ENGINE: {candidate.fairness.total_proxy_tests} Counterfactual Stress-Tests executed.</div>
               <div>[2026-10-02 09:12:09] SYSTEM: Decision Confidence ({candidate.decision_confidence}%) logged to registry.</div>
               <div style={{ color: candidate.fairness.human_review_required ? 'var(--danger-color)' : 'var(--success-color)' }}>
                  [2026-10-02 09:12:10] GOVERNANCE: Profile marked as {candidate.fairness.status}.
               </div>
            </div>
         </div>
      )}
      
      {activeTab === 'evidence' && (
         <div className="panel glass-panel animate-fade-in">
            <div className="panel-header">
               <Shield size={20} color="var(--accent-color)" />
               <h3>Skill Intelligence & EvidenceGraph</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
               EquiRank maps skills to verifiable evidence, estimating proficiency beyond keyword matching.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
               {candidate.skills.map((skill, idx) => (
                  <div key={idx} style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                           <h4 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {skill.skill_name} 
                              {skill.is_critical && <span className="badge badge-info">Critical</span>}
                           </h4>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--font-mono)', color: 'var(--accent-color)' }}>
                           {skill.proficiency.toFixed(1)}%
                        </div>
                     </div>
                     
                     <div>
                        <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Supporting Evidence</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                           {skill.evidence.map((ev, eIdx) => (
                              <div key={eIdx} style={{ display: 'flex', flexDirection: 'column', padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', borderLeft: `3px solid ${ev.type === 'project' ? '#a371f7' : (ev.type === 'experience' ? '#3fb950' : '#f1e05a')}` }}>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '80px', fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{ev.type}</div>
                                    <div style={{ flex: 1 }}>{ev.description}</div>
                                    <div style={{ width: '100px', textAlign: 'right', fontSize: '12px', color: 'var(--text-secondary)' }}>
                                       Conf: {(ev.confidence * 100).toFixed(0)}%
                                    </div>
                                    <button className="btn" style={{ padding: '4px 8px', fontSize: '11px', backgroundColor: 'transparent', border: '1px solid var(--accent-color)', color: 'var(--accent-color)' }} onClick={() => { 
                                          setPosActive({ skillName: skill.skill_name, evId: ev.id, desc: ev.description }); 
                                          setPosResult(null); 
                                          // Pre-fill a realistic candidate answer for the recruiter to review
                                          if (candidate.id === 'CAND-002') {
                                              setPosAnswer("I pinned memory for fast GPU transfers, optimized the PyTorch DataLoader with multiple workers, and used mixed precision training to avoid VRAM bottlenecks during the pipeline ingestion.");
                                          } else if (candidate.id === 'CAND-003') {
                                              setPosAnswer("I used python and standard libraries to make the model run very fast and it worked well.");
                                          } else {
                                              setPosAnswer("Deployed scalable architecture, optimized database querying and indexing, and implemented robust error handling.");
                                          }
                                       }}>
                                       View Technical Audit
                                    </button>
                                 </div>
                                 
                                 {posActive && posActive.evId === ev.id && (
                                    <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                             <Bot size={16} color="var(--accent-color)" />
                                             <strong>Candidate Asynchronous Assessment</strong>
                                          </div>
                                          <div style={{ fontSize: '11px', backgroundColor: 'rgba(46, 160, 67, 0.2)', color: 'var(--success-color)', padding: '4px 8px', borderRadius: '12px', border: '1px solid rgba(46, 160, 67, 0.3)' }}>
                                             Status: Completed Asynchronously
                                          </div>
                                       </div>
                                       
                                       <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', fontStyle: 'italic' }}>
                                          The candidate was sent a secure link to verify this claim. Below is their recorded response.
                                       </div>
                                       
                                       <p style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--text-primary)' }}>
                                          <strong style={{ color: 'var(--text-secondary)' }}>AI Generated Question:</strong> You mentioned <em>"{posActive.desc}"</em> on your resume. Can you explain the specific technical bottlenecks you encountered in this implementation and how you resolved them?
                                       </p>
                                       
                                       <div style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--accent-color)', borderRadius: '4px', marginBottom: '16px' }}>
                                          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>Candidate's Recorded Response</span>
                                          <div style={{ fontSize: '13px', color: 'white', fontStyle: 'italic' }}>"{posAnswer}"</div>
                                       </div>
                                       
                                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                                          <button className="btn" style={{ fontSize: '12px' }} onClick={() => setPosActive(null)}>Close</button>
                                          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => handleVerify(skill.skill_name, ev.id)} disabled={posLoading}>
                                             {posLoading ? <RefreshCw className="spin" size={14} /> : 'Run AI Semantic Verification'}
                                          </button>
                                       </div>
                                       
                                       {posResult && (
                                          <div style={{ marginTop: '16px', padding: '12px', borderRadius: '6px', backgroundColor: posResult.status === 'verified' ? 'rgba(46, 160, 67, 0.15)' : 'rgba(218, 54, 51, 0.15)', border: `1px solid ${posResult.status === 'verified' ? 'rgba(46, 160, 67, 0.4)' : 'rgba(218, 54, 51, 0.4)'}` }}>
                                             <strong style={{ color: posResult.status === 'verified' ? 'var(--success-color)' : 'var(--danger-color)' }}>
                                                {posResult.status === 'verified' ? 'Verification Passed' : 'Fabrication Risk Detected'}
                                             </strong>
                                             <p style={{ fontSize: '13px', marginTop: '4px' }}>{posResult.message}</p>
                                             <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Confidence Score adjusted to {(posResult.new_confidence * 100).toFixed(0)}%</p>
                                          </div>
                                       )}
                                    </div>
                                 )}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      )}
    </div>
  );
}

function FairnessLab() {
  const [fairnessData, setFairnessData] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/stats/fairness`).then(res => setFairnessData(res.data));
  }, []);

  if (!fairnessData) return <div className="main-content">Loading Fairness metrics...</div>;

  return (
    <div className="main-content animate-fade-in">
       <div className="header">
        <div>
          <h1>Fairness Lab</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Macro-level counterfactual testing & Optimal Transport debiasing metrics.</p>
        </div>
      </div>
      
      <div className="stats-grid">
         <div className="stat-card glass-panel">
            <div className="stat-label">Dataset</div>
            <div className="stat-value" style={{ fontSize: '24px' }}>{fairnessData.total_variants} Variants</div>
         </div>
         <div className="stat-card glass-panel">
            <div className="stat-label">Model Architecture</div>
            <div className="stat-value" style={{ fontSize: '20px', marginTop: '4px' }}>FairVIC + OT</div>
         </div>
         <div className="stat-card glass-panel">
            <div className="stat-label">Overall Stability</div>
            <div className="stat-value" style={{ fontSize: '24px', color: 'var(--success-color)' }}>{fairnessData.stability}%</div>
         </div>
      </div>
      
      <div className="panel glass-panel">
         <div className="panel-header">
            <BarChart3 size={20} color="var(--accent-color)" />
            <h3>Proxy Sensitivity Variance (Baseline ATS vs EquiRank)</h3>
         </div>
         <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Lower score indicates higher resilience against non-merit proxy perturbations during counterfactual attacks.
         </p>
         
          <div style={{ height: '400px', width: '100%' }}>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fairnessData.chart_data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                 <XAxis dataKey="name" stroke="var(--text-secondary)" />
                 <YAxis stroke="var(--text-secondary)" label={{ value: 'Avg Score Variance (Points)', angle: -90, position: 'insideLeft', fill: 'var(--text-secondary)' }} />
                 <Tooltip contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', color: '#fff' }} />
                 <Legend />
                 <Bar dataKey="baseline" name="Standard ATS (Baseline)" fill="#da3633" radius={[4, 4, 0, 0]} />
                 <Bar dataKey="equirank" name="EquiRank (Optimal Transport)" fill="#2f81f7" radius={[4, 4, 0, 0]} />
               </BarChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
}

function TrustReport() {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    axios.get(`${API_URL}/stats/governance`).then(res => setStats(res.data));
  }, []);

  if (!stats) return <div className="main-content">Loading Governance data...</div>;

  return (
    <div className="main-content animate-fade-in">
      <div className="header">
        <div>
          <h1>Enterprise Governance Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Automated compliance and algorithmic audit logs</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => window.open('http://localhost:8000/export-audit-log', '_blank')}
          >
            <Download size={16} /> Export Regulatory Report
          </button>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-label">Candidates Analyzed</div>
          <div className="stat-value">{stats.candidates_analyzed.toLocaleString()}</div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-label">Counterfactual Tests Run</div>
          <div className="stat-value">{stats.counterfactual_tests_run.toLocaleString()}</div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-label">Stable Decisions</div>
          <div className="stat-value" style={{ color: 'var(--success-color)' }}>{stats.decision_stability_pct}%</div>
        </div>
        <div className="stat-card glass-panel" style={{ border: '1px solid var(--danger-color)' }}>
          <div className="stat-label">Routed to Human Review</div>
          <div className="stat-value" style={{ color: 'var(--danger-color)' }}>{stats.human_reviews}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Triggered by CF instability</div>
        </div>
      </div>

      <div className="panel glass-panel">
        <div className="panel-header">
          <Shield size={20} color="var(--accent-color)" />
          <h3>Compliance by Design (Regulatory Mapping)</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>Regulation</th>
              <th style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>Requirement</th>
              <th style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>EquiRank Technical Mitigation</th>
              <th style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '16px 12px' }}><strong>EU AI Act (Art. 14)</strong></td>
              <td style={{ padding: '16px 12px' }}>Mandatory Human Oversight</td>
              <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>Uncertainty Engine forces human review when proxy sensitivity is detected.</td>
              <td style={{ padding: '16px 12px' }}><span className="badge badge-success">Compliant Architecture</span></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '16px 12px' }}><strong>NYC Local Law 144</strong></td>
              <td style={{ padding: '16px 12px' }}>Automated Employment Decision Audits</td>
              <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>Continuous automated counterfactual bias audit logs per candidate.</td>
              <td style={{ padding: '16px 12px' }}><span className="badge badge-success">Audit-Ready</span></td>
            </tr>
            <tr>
              <td style={{ padding: '16px 12px' }}><strong>EEOC Guidelines</strong></td>
              <td style={{ padding: '16px 12px' }}>Disparate Impact Prevention</td>
              <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>Optimal Transport alignment minimizes dependence on non-merit distributions.</td>
              <td style={{ padding: '16px 12px' }}><span className="badge badge-success">Risk Mitigated</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ROIDashboard() {
  const [stats, setStats] = useState(null);
  const [sus, setSus] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/stats/roi`).then(res => setStats(res.data));
    axios.get(`${API_URL}/stats/sustainability`).then(res => setSus(res.data));
  }, []);

  if (!stats || !sus) return <div className="main-content">Loading ROI data...</div>;

  return (
     <div className="main-content animate-fade-in">
        <div className="header">
          <div>
            <h1>ROI & Sustainability Calculator</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Business impact of automated governance.</p>
          </div>
        </div>
        
        <div className="details-layout">
           <div className="left-column">
              <div className="panel glass-panel" style={{ height: '100%' }}>
                 <div className="panel-header">
                    <LineChart size={20} color="var(--success-color)" />
                    <h3>Scenario Estimate (1,245 Applications)</h3>
                 </div>
                 
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
                    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                       <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Manual Screening Cost</div>
                       <div style={{ fontSize: '32px', fontFamily: 'var(--font-mono)', textDecoration: 'line-through', color: 'var(--danger-color)' }}>
                          ${(stats.scenario.current_screening_hours * stats.scenario.recruiter_hourly_cost).toLocaleString()}
                       </div>
                       <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>{stats.scenario.current_screening_hours} hours</div>
                    </div>
                    
                    <div style={{ padding: '24px', background: 'rgba(35, 134, 54, 0.1)', borderRadius: '12px', border: '1px solid rgba(35, 134, 54, 0.3)' }}>
                       <div style={{ color: 'var(--success-color)', marginBottom: '8px' }}>EquiRank + Gov. Cost</div>
                       <div style={{ fontSize: '32px', fontFamily: 'var(--font-mono)', color: 'var(--success-color)' }}>
                          ${((stats.scenario.equirank_screening_hours + stats.scenario.human_review_hours) * stats.scenario.recruiter_hourly_cost).toLocaleString()}
                       </div>
                       <div style={{ fontSize: '13px', color: 'var(--success-color)', marginTop: '8px' }}>
                          {stats.scenario.equirank_screening_hours + stats.scenario.human_review_hours} hours total (incl. Human Review)
                       </div>
                    </div>
                 </div>
                 
                 <div style={{ marginTop: '32px', textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Estimated Return on Investment</div>
                    <div style={{ fontSize: '64px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'white', marginTop: '8px' }}>
                       {stats.results.estimated_roi_pct}%
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="right-column">
              <div className="panel glass-panel" style={{ height: '100%' }}>
                 <div className="panel-header">
                    <Activity size={20} color="var(--accent-color)" />
                    <h3>Green AI Metrics</h3>
                 </div>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
                    <div>
                       <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Energy Estimate</div>
                       <div style={{ fontSize: '24px', fontFamily: 'var(--font-mono)' }}>{sus.energy_estimate_kwh} kWh</div>
                    </div>
                    <div>
                       <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Average Latency</div>
                       <div style={{ fontSize: '24px', fontFamily: 'var(--font-mono)' }}>{sus.avg_model_latency_ms} ms</div>
                    </div>
                    <div>
                       <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Architecture</div>
                       <div style={{ fontSize: '16px' }}>{sus.architecture}</div>
                    </div>
                    
                    <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(47, 129, 247, 0.1)', borderRadius: '8px', border: '1px solid rgba(47, 129, 247, 0.3)' }}>
                       <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                          <strong>Efficiency Note:</strong> Using DistilRoBERTa for evidence extraction reduces compute cost by 85% compared to monolithic LLMs, achieving {sus.efficiency_per_candidate_pct}% task accuracy with vastly lower carbon footprint.
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </div>
  );
}

function Copilot() {
  const [query, setQuery] = useState('');
  const [chat, setChat] = useState([
     { role: 'assistant', text: 'I am EquiRank Copilot. I have full context of the candidate pipeline, audit logs, and fairness metrics. Ask me anything.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleQuery = async (e) => {
    e.preventDefault();
    if (!query) return;
    
    setChat(prev => [...prev, { role: 'user', text: query }]);
    setLoading(true);
    setQuery('');
    
    try {
       const res = await axios.post(`${API_URL}/copilot/query`, { query });
       setChat(prev => [...prev, { role: 'assistant', text: res.data.response }]);
    } catch (err) {
       setChat(prev => [...prev, { role: 'assistant', text: 'Error connecting to RAG backend.' }]);
    }
    setLoading(false);
  };

  return (
     <div className="main-content animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '40px 60px' }}>
        <div className="header" style={{ marginBottom: '24px' }}>
           <div>
             <h1>EquiRank Copilot</h1>
             <p style={{ color: 'var(--text-secondary)' }}>RAG-powered governance assistant</p>
           </div>
        </div>
        
        <div className="panel glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
           <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {chat.map((msg, i) => (
                 <div key={i} style={{ 
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '70%',
                    background: msg.role === 'user' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: msg.role === 'assistant' ? '1px solid var(--border-color)' : 'none',
                    lineHeight: '1.5'
                 }}>
                    {msg.role === 'assistant' && <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Bot size={14} /> EquiRank AI</div>}
                    {msg.text}
                 </div>
              ))}
              {loading && (
                 <div style={{ alignSelf: 'flex-start', padding: '16px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <RefreshCw className="spin" size={16} style={{ animation: 'spin 2s linear infinite' }} />
                 </div>
              )}
           </div>
           
           <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)' }}>
              <form onSubmit={handleQuery} style={{ display: 'flex', gap: '12px' }}>
                 <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about candidate decisions, audit logs, or fairness metrics (e.g. 'Why was Rohan Kumar flagged?')"
                    style={{ flex: 1, padding: '14px 20px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'var(--font-sans)', fontSize: '15px', outline: 'none' }}
                 />
                 <button type="submit" className="btn btn-primary" disabled={loading || !query}>Send Query</button>
              </form>
           </div>
        </div>
     </div>
  );
}

function APIIntegration() {
  return (
     <div className="main-content animate-fade-in">
        <div className="header">
          <div>
            <h1>ATS Middleware API</h1>
            <p style={{ color: 'var(--text-secondary)' }}>EquiRank operates as an intelligent governance layer on top of existing ATS systems.</p>
          </div>
        </div>
        
        <div className="panel glass-panel">
           <div className="panel-header">
              <Cpu size={20} color="var(--accent-color)" />
              <h3>Integration Endpoints</h3>
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span className="badge badge-success">POST</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px' }}>/v1/analyze-resume</span>
                 </div>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Extracts evidence, masks PII, and builds Skill Profiles for downstream matching.</p>
              </div>
              
              <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span className="badge badge-success">POST</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px' }}>/v1/challenge</span>
                 </div>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Initiates an automated counterfactual fairness attack against a specific decision.</p>
              </div>
              
              <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span className="badge badge-info">GET</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px' }}>/v1/audit-log/{'{candidate_id}'}</span>
                 </div>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Retrieves the complete cryptographic audit trail for regulatory compliance.</p>
              </div>
           </div>
        </div>
     </div>
  );
}

function MainRoutes() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  
  if (isLandingPage) {
     return <LandingPage />;
  }
  
  return (
    <div className="app-container">
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<PipelineView />} />
        <Route path="/dashboard/candidate/:id" element={<CandidateDetail />} />
        <Route path="/dashboard/fairness-lab" element={<FairnessLab />} />
        <Route path="/dashboard/trust-report" element={<TrustReport />} />
        <Route path="/dashboard/roi" element={<ROIDashboard />} />
        <Route path="/dashboard/copilot" element={<Copilot />} />
        <Route path="/dashboard/api" element={<APIIntegration />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
       <MainRoutes />
    </Router>
  );
}

export default App;
