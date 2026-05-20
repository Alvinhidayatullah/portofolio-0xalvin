import React, { useState, useEffect, useCallback, useRef } from 'react'

// Import icons
import { Shield, Code, Award, Github, Linkedin, Mail, Terminal, Cpu, Lock, ChevronRight, Star, Sparkles, ExternalLink, Zap, Brain, Network, Rocket, Gem, Crown, Trophy, Eye, Globe, Heart, Activity, Folder, Command, Server, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react'

// Import gambar sertifikat dari folder Certification
import eheCert from './Certification/eheCert.jpg'
import kpiCert from './Certification/kpiCert.jpg'
import tniCert from './Certification/tniCert.jpg'
import sciCert from './Certification/sciCert.jpg'
import ubCert from './Certification/ubCert.jpg'
import kemkesCert from './Certification/kemkesCert.jpg'
import cilacapCert from './Certification/cilacapCert.jpg'
import jktCert from './Certification/jktCert.jpg'
import itbCert from './Certification/itbCert.jpeg'
import kukarCert from './Certification/kukarCert.jpg'
import riauCert from './Certification/riauCert.jpg'
import jaksaCert from './Certification/jaksaCert.jpg'
import jogjaCert from './Certification/jogjaCert.jpg'
import sidoCert from './Certification/sidoCert.jpg'

// Security: Sanitize input function
const sanitizeInput = (input) => {
  if (!input) return ''
  return String(input)
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Security: Rate limiting untuk events
const rateLimit = (fn, delay = 500) => {
  let lastCall = 0
  return (...args) => {
    const now = Date.now()
    if (now - lastCall < delay) return
    lastCall = now
    return fn(...args)
  }
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedCert, setSelectedCert] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [visibleSections, setVisibleSections] = useState({})
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [terminalLines, setTerminalLines] = useState([])
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  
  // State untuk carousel sertifikat
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const carouselRef = useRef(null)
  
  const timersRef = useRef([])
  const observerRef = useRef(null)
  
  const addTimer = (timer) => {
    timersRef.current.push(timer)
    return timer
  }
  
  const titles = [
    "ALVIN HIDAYATULLOH",
    "WEB3 DEVELOPER",
    "CYBERSECURITY RESEARCHER",
    "BUG HUNTER"
  ]
  const [titleIndex, setTitleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const MAX_TYPED_LENGTH = 50

  useEffect(() => {
    const currentTitle = titles[titleIndex]
    const safeTitle = sanitizeInput(currentTitle)
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < safeTitle.length && typedText.length < MAX_TYPED_LENGTH) {
          setTypedText(safeTitle.slice(0, typedText.length + 1))
        } else {
          addTimer(setTimeout(() => setIsDeleting(true), 2000))
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(typedText.slice(0, typedText.length - 1))
        } else {
          setIsDeleting(false)
          setTitleIndex((prev) => (prev + 1) % titles.length)
        }
      }
    }, 120)
    
    addTimer(timer)
    return () => clearTimeout(timer)
  }, [typedText, isDeleting, titleIndex])

  const safeCommands = [
    { cmd: 'whoami', output: 'alvinhidayatulloh' },
    { cmd: 'uname -a', output: 'Linux web3-portfolio 18.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux' },
    { cmd: 'cat aboutMe.txt', output: 'Full Stack Developer • Bug Hunter' },
    { cmd: 'cat skill.txt', output: 'Javascript • Python • Penetration Testing' },
    	
  ]
  
  const isValidCommand = (cmd) => {
    return safeCommands.some(c => c.cmd === cmd)
  }

  useEffect(() => {
    let lineIndex = 0
    let charIndex = 0
    let isTypingCommand = true
    let intervalId = null
    
    const startInterval = () => {
      intervalId = setInterval(() => {
        if (lineIndex >= safeCommands.length) {
          setIsTypingComplete(true)
          if (intervalId) clearInterval(intervalId)
          return
        }
        
        const currentCmd = safeCommands[lineIndex].cmd
        const currentCmdOutput = safeCommands[lineIndex].output
        
        if (isTypingCommand) {
          if (charIndex <= currentCmd.length) {
            setTerminalLines(prev => {
              const newLines = [...prev]
              if (newLines[lineIndex]) {
                newLines[lineIndex] = { 
                  ...newLines[lineIndex], 
                  cmdText: currentCmd.slice(0, charIndex), 
                  output: currentCmdOutput, 
                  showOutput: false 
                }
              } else {
                newLines[lineIndex] = { 
                  cmdText: currentCmd.slice(0, charIndex), 
                  output: currentCmdOutput, 
                  showOutput: false 
                }
              }
              return newLines
            })
            charIndex++
          } else {
            isTypingCommand = false
            charIndex = 0
          }
        } else {
          if (charIndex <= currentCmdOutput.length) {
            setTerminalLines(prev => {
              const newLines = [...prev]
              newLines[lineIndex] = { 
                ...newLines[lineIndex], 
                cmdText: currentCmd,
                output: currentCmdOutput.slice(0, charIndex),
                showOutput: true
              }
              return newLines
            })
            charIndex++
          } else {
            lineIndex++
            charIndex = 0
            isTypingCommand = true
          }
        }
      }, 70)
    }
    
    startInterval()
    addTimer(intervalId)
    
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  // Data sertifikat
  const certificates = [
    { 
      id: 1,
      name: 'ETHICAL HACKING ESSENTIALS (EHE)', 
      issuer: 'EC-Council', 
      date: '2025', 
      icon: Shield,
      color: '#ff3366',
      description: 'Mastering ethical hacking techniques and methodologies to identify and fix security vulnerabilities.',
      credentialId: 'd7e2d07f8a4c4e6a8d27830107670055',
      imageUrl: eheCert
    },
    { 
      id: 2,
      name: 'SERTIFIKAT APRESIASI KPI', 
      issuer: 'KPI PUSAT', 
      date: '2025', 
      icon: Award,
      color: '#00ff88',
      description: 'Deteksi Kerentanan Keamanan pada Layanan Aplikasi KPI Pusat',
      credentialId: 'KPI 11-06-2025',
      imageUrl: kpiCert,
    },
    { 
      id: 3,
      name: 'SERTIFIKAT APRESIASI TNI-AD', 
      issuer: 'TNI ANGKATAN DARAT', 
      date: '2025', 
      icon: Award,
      color: '#00ff88',
      description: 'Deteksi Kerentanan Keamanan pada Subdomain *.tni-ad.mil.id',
      credentialId: 'TNI-AD 09-06-2025',
      imageUrl: tniCert,
    },
    { 
      id: 4,
      name: 'SERTIFIKAT APRESIASI POLTEK SCI', 
      issuer: 'POLTEK SCI', 
      date: '2025', 
      icon: Award,
      color: '#00ff88',
      description: 'Deteksi Kerentanan Keamanan pada Subdomain *.polteksci.ac.id',
      credentialId: '010/CSIRT/-Poltek-SCI/X/2025',
      imageUrl: sciCert,
    },
    { 
      id: 5,
      name: 'SERTIFIKAT APRESIASI UNBRAW', 
      issuer: 'UNIVERSITAS BRAWIJAYA', 
      date: '2025', 
      icon: Award,
      color: '#00ff88',
      description: 'Deteksi Kerentanan Keamanan pada Subdomain *.ub.ac.id',
      credentialId: '00017/UN10.A0410/B/DL.07.05/2025',
      imageUrl: ubCert,
    },
    { 
      id: 6,
      name: 'SERTIFIKAT APRESIASI KEMENKES', 
      issuer: 'KEMENTERIAN KESEHATAN', 
      date: '2025', 
      icon: Award,
      color: '#00ff88',
      description: 'Deteksi Kerentanan Keamanan pada Subdomain *.kemkes.go.id',
      credentialId: 'IR.02.03/A.VIII/2663/2025',
      imageUrl: kemkesCert,
    },
    { 
      id: 7,
      name: 'SERTIFIKAT APRESIASI CILACAP', 
      issuer: 'KABUPATEN CILACAP', 
      date: '2025', 
      icon: Award,
      color: '#00ff88',
      description: 'Deteksi Kerentanan Keamanan pada Subdomain *.cilacapkab.go.id',
      credentialId: '500.12.10.1/223/33',
      imageUrl: cilacapCert,
    },
    { 
      id: 8,
      name: 'SERTIFIKAT APRESIASI JAKARTA', 
      issuer: 'PROVINSI JAKARTA', 
      date: '2025', 
      icon: Award,
      color: '#00ff88',
      description: 'Deteksi Kerentanan Keamanan pada Subdomain *.jakartaprov.go.id',
      credentialId: 'JAKARTA 16-05-2025',
      imageUrl: jktCert,
    },
    { 
      id: 9,
      name: 'SERTIFIKAT APRESIASI ITB', 
      issuer: 'INSTITUT TEKNOLOGI BANDUNG', 
      date: '2025', 
      icon: Award,
      color: '#00ff88',
      description: 'Deteksi Kerentanan Keamanan pada Subdomain *.itb.ac.id',
      credentialId: '5303/IT1.B05.2/SI.11/2025',
      imageUrl: itbCert,
    },
    { 
      id: 10,
      name: 'SERTIFIKAT APRESIASI KUKARKAB', 
      issuer: 'KABUPATEN KUTAI KARTANEGARA', 
      date: '2025', 
      icon: Award,
      color: '#00ff88',
      description: 'Deteksi Kerentanan Keamanan pada Subdomain *.kukarkab.go.id',
      credentialId: 'P299/DISKOMINFO/000.6/06/2025',
      imageUrl: kukarCert,
    },
    { 
      id: 11,
      name: 'SERTIFIKAT APRESIASI RIAU', 
      issuer: 'PROVINSI RIAU', 
      date: '2025', 
      icon: Award,
      color: '#00ff88',
      description: 'Deteksi Kerentanan Keamanan pada Subdomain *.riau.go.id',
      credentialId: '044/SERT/DISKOMMINFOTIK/BIDSAN/06/2025',
      imageUrl: riauCert,
    },
    { 
      id: 12,
      name: 'SERTIFIKAT APRESIASI KEJAKSAAN', 
      issuer: 'KEJAKSAAN NEGERI REJANG LEBONG', 
      date: '2025', 
      icon: Award,
      color: '#00ff88',
      description: 'Deteksi Kerentanan Keamanan pada Subdomain *.kejaksaan.go.id',
      credentialId: 'KEJAKSAAN 25-02-2025',
      imageUrl: jaksaCert,
    },
    { 
      id: 13,
      name: 'SERTIFIKAT APRESIASI YOGYAKARTA', 
      issuer: 'PROVINSI YOGYAKARTA', 
      date: '2025', 
      icon: Award,
      color: '#00ff88',
      description: 'Deteksi Kerentanan Keamanan pada Subdomain *.jogjaprov.go.id',
      credentialId: 'JOGJAPROV 17-02-2025',
      imageUrl: jogjaCert,
    },
    { 
      id: 14,
      name: 'SERTIFIKAT APRESIASI SIDOARJO', 
      issuer: 'KABUPATEN SIDOARJO', 
      date: '2025', 
      icon: Award,
      color: '#00ff88',
      description: 'Deteksi Kerentanan Keamanan pada Subdomain *.sidoarjokab.go.id',
      credentialId: '500.12.10/1094/438.5.14/2025',
      imageUrl: sidoCert,
    }
  ]

  // Fungsi untuk scroll carousel
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const cardWidth = 380
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Update scroll position dan max scroll
  const updateScrollInfo = useCallback(() => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft
      const maxScrollValue = carouselRef.current.scrollWidth - carouselRef.current.clientWidth
      setScrollPosition(scrollLeft)
      setMaxScroll(maxScrollValue)
    }
  }, [])

  // Handle scroll event
  const handleCarouselScroll = useCallback(() => {
    updateScrollInfo()
  }, [updateScrollInfo])

  // Handle resize untuk update max scroll
  useEffect(() => {
    updateScrollInfo()
    window.addEventListener('resize', updateScrollInfo)
    return () => window.removeEventListener('resize', updateScrollInfo)
  }, [updateScrollInfo])

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', handleCarouselScroll)
      return () => carousel.removeEventListener('scroll', handleCarouselScroll)
    }
  }, [handleCarouselScroll])

  // Hitung progress scroll
  const scrollProgress = maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0
  const canScrollLeft = scrollPosition > 10
  const canScrollRight = scrollPosition < maxScroll - 10

  // PERBAIKAN 1: Optimasi scroll handler untuk deteksi section projects
  const handleScroll = useCallback(rateLimit(() => {
    setScrollY(window.scrollY)
    const sections = ['home', 'skills', 'certificates', 'projects']
    const scrollPositionY = window.scrollY + 150 // Increased offset for better detection
    
    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const { offsetTop, offsetHeight } = element
        // Add a small buffer for better accuracy
        if (scrollPositionY >= offsetTop - 50 && scrollPositionY < offsetTop + offsetHeight - 50) {
          setActiveSection(section)
          break
        }
      }
    }
  }, 50), [])

  const handleMouseMove = useCallback(rateLimit((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, 16), [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }))
        }
      })
    }, { threshold: 0.2 })
    
    const elements = ['skills', 'certificates', 'projects'].forEach(id => {
      const el = document.getElementById(id)
      if (el && observerRef.current) observerRef.current.observe(el)
    })
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      if (observerRef.current) observerRef.current.disconnect()
      timersRef.current.forEach(timer => {
        if (timer) clearTimeout(timer)
        if (timer) clearInterval(timer)
      })
    }
  }, [handleScroll, handleMouseMove])

  // PERBAIKAN 2: Ensure active section is set correctly after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      handleScroll()
    }, 100)
    return () => clearTimeout(timer)
  }, [handleScroll])

  const skills = [
    { name: 'REACT.JS', icon: Code, level: 90, color: '#00d4ff', description: 'MODERN UI DEVELOPMENT' },
    { name: 'NODE.JS', icon: Terminal, level: 85, color: '#00ff88', description: 'BACKEND ARCHITECTURE' },
    { name: 'PYTHON', icon: Cpu, level: 88, color: '#ffaa00', description: 'SCRIPTING & AUTOMATION' },
    { name: 'PENETRATION TESTING', icon: Lock, level: 85, color: '#ff3366', description: 'SECURITY ASSESSMENT' },
    { name: 'NETWORK SECURITY', icon: Network, level: 82, color: '#aa00ff', description: 'INFRASTRUCTURE PROTECTION' },
    { name: 'BLOCKCHAIN', icon: Brain, level: 80, color: '#00ffcc', description: 'SMART CONTRACTS' }
  ]

  const projects = [
    { 
      name: 'BLOCKCHAIN SECURITY SCANNER', 
      description: 'Smart contract vulnerability scanner with real-time alerts',
      tech: ['SOLIDITY', 'WEB3.JS', 'PYTHON'],
      icon: Shield,
      color: '#00d4ff'
    },
    { 
      name: 'PENETRATION TESTING SUITE', 
      description: 'Automated security testing framework',
      tech: ['PYTHON', 'BASH', 'DOCKER'],
      icon: Lock,
      color: '#ff3366'
    },
    { 
      name: 'DECENTRALIZED PORTFOLIO', 
      description: 'Web3 portfolio with smart contract integration',
      tech: ['REACT', 'WEB3', 'SOLIDITY'],
      icon: Zap,
      color: '#00ff88'
    }
  ]

  const navItems = ['home', 'skills', 'certificates', 'projects']

  const socialLinks = [
    { href: 'https://github.com/Alvinhidayatullah', icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/alvin-hidayatulloh-b662a1288/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:vvvinz-attacker@proton.me', icon: Mail, label: 'Email' }
  ]

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;" />
      
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-blue-900/20"></div>
        
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-float animation-delay-4000"></div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="hidden md:block fixed w-40 h-40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl pointer-events-none transition-all duration-300 z-[99999]"
        style={{
          left: mousePosition.x - 80,
          top: mousePosition.y - 80,
        }}
      ></div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-500" onClick={() => setSelectedCert(null)}>
          <div className="relative max-w-4xl w-full max-h-[85vh] bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden transition-all duration-500 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            
            <div className="p-6 md:p-8 overflow-y-auto max-h-[85vh] custom-scroll">
              <div className="text-center mb-6">
                <div className="inline-block p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl mb-4">
                  {selectedCert.icon && <selectedCert.icon className="w-10 h-10 md:w-12 md:h-12 text-cyan-400" />}
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {sanitizeInput(selectedCert.name)}
                </h2>
                <p className="text-cyan-400/80 text-sm md:text-base">
                  {sanitizeInput(selectedCert.issuer)} • {sanitizeInput(selectedCert.date)}
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 md:p-6 mb-6 border border-cyan-500/20">
                <div className="flex justify-center">
                  {selectedCert.imageUrl ? (
                    <img 
                      src={selectedCert.imageUrl} 
                      alt={`${selectedCert.name} Certificate`}
                      className="w-full max-h-[50vh] object-contain rounded-lg shadow-xl"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://via.placeholder.com/600x400?text=Certificate+Image'
                      }}
                    />
                  ) : (
                    <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
                      <Award className="w-20 h-20 text-cyan-400/50" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-400 text-xs mb-1">DESCRIPTION</p>
                  <p className="text-gray-300 text-sm">{sanitizeInput(selectedCert.description)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-400 text-xs mb-1">CERTIFICATE ID</p>
                  <p className="text-cyan-400 font-mono text-xs">{sanitizeInput(selectedCert.credentialId)}</p>
                </div>
                
                {selectedCert.fullName && (
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-gray-400 text-xs mb-1">RECIPIENT</p>
                    <p className="text-gray-300 text-sm font-medium">{sanitizeInput(selectedCert.fullName)}</p>
                  </div>
                )}
                
                {selectedCert.location && (
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-gray-400 text-xs mb-1">LOCATION</p>
                    <p className="text-gray-300 text-sm">{sanitizeInput(selectedCert.location)}</p>
                  </div>
                )}
                
                {selectedCert.signatory && (
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10 md:col-span-2">
                    <p className="text-gray-400 text-xs mb-1">SIGNED BY</p>
                    <p className="text-yellow-400/80 text-sm font-medium">{sanitizeInput(selectedCert.signatory)}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 rounded-lg font-medium text-cyan-400 transition-all duration-300 text-sm"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/80 backdrop-blur-xl border-b border-cyan-500/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center py-4 md:py-5">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <Globe className="w-7 h-7 md:w-8 md:h-8 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                0XVINNZ
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8 lg:space-x-10">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`relative capitalize text-base font-semibold transition-all duration-300 hover:text-cyan-400 ${
                    activeSection === item ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                  {activeSection === item && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></span>
                  )}
                </a>
              ))}
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 bg-white/5 rounded-lg border border-white/10"
              aria-label="Menu"
            >
              <Activity className="w-5 h-5 text-cyan-400" />
            </button>

            <div className="hidden md:flex space-x-3">
              {socialLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-xl hover:bg-cyan-500/20 hover:scale-110 transition-all"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 capitalize text-base font-semibold transition-all duration-300 hover:text-cyan-400 ${
                    activeSection === item ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </a>
              ))}
              <div className="flex space-x-4 pt-4 border-t border-white/10 mt-2">
                {socialLinks.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 rounded-lg hover:bg-cyan-500/20 transition-all"
                    aria-label={link.label}
                  >
                    <link.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - PERBAIKAN 3: tambahkan scroll-mt-20 */}
      <section id="home" className="relative min-h-screen flex items-center justify-center z-10 pt-16 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/40">
                <Heart className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-cyan-400 text-xs md:text-sm font-bold tracking-wide">DECENTRALIZED • WEB3 • BLOCKCHAIN</span>
              </div>

              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black mb-4 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  WEB3PORT
                </span>
                <br />
                <span className="text-white text-5xl sm:text-6xl md:text-7xl">KO4Z3R</span>
              </h1>

              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 min-h-[4rem]">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {typedText}
                  <span className="animate-pulse text-cyan-400">|</span>
                </span>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Building the future of decentralized technology while ensuring top-notch security.
                Innovating at the intersection of Web3 and Cybersecurity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold hover:scale-105 transition-all inline-flex items-center gap-2 text-sm md:text-base shadow-lg shadow-cyan-500/25"
                >
                  EXPLORE PROJECTS
                  <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 border-2 border-cyan-500 rounded-lg font-bold hover:bg-cyan-500/20 transition-all inline-flex items-center gap-2 text-sm md:text-base"
                >
                  <Eye className="w-4 h-4" />
                  VIEW SKILLS
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 max-w-[410px] mx-auto lg:mx-0 mt-8">
                <div className="text-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <Crown className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <div className="text-lg font-black text-cyan-400">3+</div>
                  <div className="text-[9px] text-gray-400 font-semibold">YEARS</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <Trophy className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <div className="text-lg font-black text-cyan-400">10+</div>
                  <div className="text-[9px] text-gray-400 font-semibold">PROJECTS</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <Gem className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <div className="text-lg font-black text-cyan-400">15+</div>
                  <div className="text-[9px] text-gray-400 font-semibold">CERTS</div>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <div className="bg-black/90 backdrop-blur-sm rounded-xl border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/20 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 border-b border-cyan-500/40 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-gray-400 font-mono">0xvinnz@kali:~/portfolio $</span>
                  </div>
                </div>
                
                <div className="p-5 font-mono text-sm h-[420px] overflow-y-auto bg-gradient-to-b from-black to-gray-950">
                  <div className="space-y-3">
                    <div className="text-cyan-400 mb-3">
                      <span className="text-green-400 font-bold">┌─[</span>0xvinnz@kali<span className="text-green-400 font-bold">]</span>
                      <br />
                      <span className="text-green-400 font-bold">└──╼ </span><span className="text-white">Welcome to interactive terminal!</span>
                    </div>
                    
                    {terminalLines.map((line, idx) => (
                      <div key={idx} className="mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-green-400 font-bold">$</span>
                          <span className="text-white">{sanitizeInput(line.cmdText)}</span>
                          {!line.showOutput && line.cmdText && line.cmdText.length < 30 && (
                            <span className="w-1.5 h-4 bg-cyan-400 animate-pulse rounded-sm"></span>
                          )}
                        </div>
                        {line.showOutput && line.output && (
                          <div className="ml-5 mt-1 text-gray-300 border-l-2 border-cyan-500/50 pl-3">
                            {sanitizeInput(line.output)}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isTypingComplete && (
                      <div className="mt-4 pt-3 border-t border-cyan-500/30">
                        <div className="flex items-center gap-2 text-yellow-400">
                          <Server className="w-3 h-3" />
                          <span className="text-xs">vvvinz-attacker@proton.me</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-400 mt-2">
                          <Command className="w-3 h-3" />
                          <span className="text-xs">0xvinnz<span className="animate-pulse text-cyan-400">_</span></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 border-t border-cyan-500/40">
                  <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                    <span>🔒 SSH: 616c76696e68696461796174756c6c6168</span>
                    <span>🟢 ONLINE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - PERBAIKAN 3: tambahkan scroll-mt-20 */}
      <section id="skills" className={`relative py-20 z-10 scroll-mt-20 transition-all duration-700 ${visibleSections.skills ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                TECHNICAL SKILLS
              </span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base font-semibold">MASTERING CUTTING-EDGE TECHNOLOGIES</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => {
              const Icon = skill.icon
              return (
                <div
                  key={skill.name}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500 transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2.5 rounded-lg shadow-lg" style={{ background: skill.color }}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-black tracking-wide">{skill.name}</h3>
                      <p className="text-xs text-gray-400 font-bold">{skill.description}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex mb-2 justify-between text-sm font-bold">
                      <span className="text-cyan-400">PROFICIENCY</span>
                      <span className="text-cyan-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 shadow-lg"
                        style={{ 
                          width: `${skill.level}%`,
                          background: skill.color
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certificates Section - PERBAIKAN 3: tambahkan scroll-mt-20 */}
      <section id="certificates" className={`relative py-20 z-10 scroll-mt-20 transition-all duration-700 ${visibleSections.certificates ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                CERTIFICATIONS
              </span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base font-semibold">PROFESSIONAL ACHIEVEMENTS</p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Tombol Scroll Kiri */}
            <button
              onClick={() => scrollCarousel('left')}
              className={`absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-black/90 backdrop-blur-md rounded-full border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/40 hover:scale-110 transition-all duration-300 ${
                canScrollLeft ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Horizontal Scroll Container */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-6 pb-4 scroll-smooth hide-scrollbar"
              style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: '#00d4ff #1a1a1a'
              }}
            >
              {certificates.map((cert) => {
                const Icon = cert.icon
                return (
                  <div
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className="flex-none w-[300px] md:w-[350px] bg-gradient-to-br from-gray-800/90 to-black/90 rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full" style={{ background: `linear-gradient(135deg, ${cert.color}, ${cert.color}80)` }}>
                        <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-sm md:text-base font-black mb-2 tracking-wide text-center line-clamp-2 min-h-[50px] text-white">
                      {cert.name}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm text-center">{cert.issuer}</p>
                    <p className="text-cyan-400 text-xs md:text-sm text-center mt-2 font-semibold">{cert.date}</p>
                    <div className="mt-4 flex items-center justify-center gap-1 text-xs text-cyan-400/60">
                      <span>CLICK TO VIEW</span>
                      <ChevronRightIcon className="w-3 h-3" />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Tombol Scroll Kanan */}
            <button
              onClick={() => scrollCarousel('right')}
              className={`absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-black/90 backdrop-blur-md rounded-full border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/40 hover:scale-110 transition-all duration-300 ${
                canScrollRight ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
              disabled={!canScrollRight}
            >
              <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Indikator Scroll */}
          {certificates.length > 2 && (
            <div className="flex justify-center mt-8">
              <div className="h-1 w-40 md:w-64 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-300"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section - PERBAIKAN 3: tambahkan scroll-mt-20 */}
      <section id="projects" className={`relative py-20 z-10 scroll-mt-20 transition-all duration-700 ${visibleSections.projects ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                FEATURED PROJECTS
              </span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base font-semibold">INNOVATIVE SOLUTIONS FOR THE DECENTRALIZED WORLD</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const Icon = project.icon
              return (
                <div
                  key={project.name}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500 transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl inline-block mb-4 shadow-lg" style={{ background: project.color }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black mb-2 tracking-wide">{project.name}</h3>
                  <p className="text-gray-400 mb-4 text-sm font-medium">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-cyan-500/20 rounded-lg text-xs text-cyan-400 font-bold tracking-wide">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 border-t border-cyan-500/20 z-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            {socialLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-all hover:scale-125 inline-block"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-sm font-mono">©Copyright2026 0XVINNZ | Website Portofolio</p>
          <p className="text-gray-600 text-xs mt-1 font-mono">DECENTRALIZED • SECURE • ANTIHACKER</p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: scale(0.98);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        /* PERBAIKAN 4: CSS untuk scroll-margin pada sections */
        section {
          scroll-margin-top: 80px;
        }
        
        /* Custom scrollbar untuk carousel */
        .hide-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #00d4ff #1a1a1a;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        
        .hide-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 10px;
        }
        
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #00d4ff, #0066ff);
          border-radius: 10px;
        }
        
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #00ffff, #0088ff);
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00d4ff, #0066ff);
          border-radius: 10px;
        }
        
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,212,255,0.3);
          border-radius: 10px;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  )
}

export default App
