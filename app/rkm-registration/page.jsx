'use client';


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Shield, Calendar, User, Trophy, LogIn, Lock, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { rkmAuth, rkmGoogleProvider } from '@/lib/Rkm-firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export default function RKMRegistration() {
  // Authentication State
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    age: '',
    house: '',
    contact: '',
    city: '',
    sports: [], // Changed from sport to sports array
    badmintonType: '',
    cricketRole: '',
    emergencyName: '',
    emergencyContact: '',
    emergencyRelation: '',
    medicalCondition: '',
    medicalDetails: '',
    declaration: false,
    mediaConsent: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Use ref to prevent race conditions on rapid clicks
  const isSubmittingRef = useRef(false);
  const hasSubmittedRef = useRef(false);
  const submissionAttempts = useRef(0);

  /**
   * SESSION TIMEOUT & SECURITY MANAGEMENT
   * 
   * Comprehensive protection against accidental logout during form filling:
   * 
   * 1. INCREASED TIMEOUT: 10 minutes (not 5) to allow slow form filling
   * 2. COMPREHENSIVE ACTIVITY DETECTION:
   *    - All mouse events (click, move, down)
   *    - All keyboard events (keydown, keyup, input)
   *    - All form interactions (change, select, focus, blur)
   *    - All touch events (mobile support)
   *    - Scroll and wheel events
   * 3. TRIPLE-CHECK BEFORE LOGOUT:
   *    - Must exceed timeout (10 min)
   *    - NOT during submission
   *    - NOT after successful submission
   *    - Page must be hidden (user switched tabs)
   * 4. VISIBILITY HANDLING:
   *    - Resets timer when user returns to tab
   *    - Only logs out if tab was hidden
   * 5. SESSION PERSISTENCE:
   *    - Session-only (clears on browser/tab close)
   *    - No visual timer to distract users
   * 
   * Result: Users will NEVER be logged out while actively filling the form
   */
  const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds (increased for form filling)
  const idleTimerRef = useRef(null);
  const lastActivityRef = useRef(Date.now());
  const isUserActiveRef = useRef(false); // Track if user has interacted with form

  // Allowed email domains
  const ALLOWED_DOMAINS = ['ds.study.iitm.ac.in', 'es.study.iitm.ac.in'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(rkmAuth, (currentUser) => {
      if (currentUser) {
        const emailDomain = currentUser.email.split('@')[1];
        if (ALLOWED_DOMAINS.includes(emailDomain)) {
          setUser(currentUser);
          // Pre-fill and lock email field
          setFormData(prev => ({ ...prev, email: currentUser.email }));
          setAuthError('');
          // Start idle timeout when user is authenticated
          resetIdleTimer();
        } else {
          // Domain not allowed - sign out immediately
          signOut(rkmAuth);
          setUser(null);
          setAuthError(`Access restricted. Only ${ALLOWED_DOMAINS.join(' and ')} domains are allowed.`);
        }
      } else {
        setUser(null);
        // Clear idle timer when user logs out
        clearIdleTimer();
      }
      setAuthLoading(false);
    });

    return () => {
      unsubscribe();
      clearIdleTimer();
    };
  }, []);

  // Idle timeout management - Auto logout ONLY after TRUE inactivity
  useEffect(() => {
    if (!user) {
      return;
    }

    const handleActivity = () => {
      lastActivityRef.current = Date.now();
      isUserActiveRef.current = true;
      resetIdleTimer();
    };

    // Comprehensive activity event listeners - captures ALL user interactions
    const events = [
      // Mouse events
      'mousedown', 'mousemove', 'click', 'dblclick',
      // Keyboard events (modern and legacy)
      'keydown', 'keyup', 'input',
      // Touch events (mobile)
      'touchstart', 'touchmove', 'touchend',
      // Scroll events
      'scroll', 'wheel',
      // Form interaction events - CRITICAL for preventing logout during form filling
      'change', 'select', 'focus', 'blur',
      // Drag and drop
      'drag', 'drop'
    ];

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Check for idle timeout - less frequent checks, longer timeout
    const checkIdleInterval = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;

      // Only timeout if:
      // 1. Truly idle (exceeded timeout)
      // 2. NOT currently submitting
      // 3. NOT already submitted
      // 4. Page is not visible (user switched tabs)
      if (timeSinceLastActivity >= IDLE_TIMEOUT &&
        !isSubmitting &&
        !submitted &&
        document.hidden) {
        handleIdleTimeout();
      }
    }, 60000); // Check every 60 seconds (less aggressive)

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearInterval(checkIdleInterval);
    };
  }, [user, isSubmitting, submitted]);

  // Handle page visibility - reset activity timer when user returns to tab
  useEffect(() => {
    if (!user) return;

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // User returned to tab - reset activity timer
        lastActivityRef.current = Date.now();
        resetIdleTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  const resetIdleTimer = () => {
    clearIdleTimer();
    lastActivityRef.current = Date.now();

    idleTimerRef.current = setTimeout(() => {
      handleIdleTimeout();
    }, IDLE_TIMEOUT);
  };

  const clearIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  const handleIdleTimeout = async () => {
    // Triple-check conditions before logging out to prevent accidental logouts
    if (!user) return;
    if (submitted) return; // Never logout after successful submission
    if (isSubmitting) return; // Never logout during submission
    if (isSubmittingRef.current) return; // Check ref as well
    if (!document.hidden) return; // Don't logout if page is visible

    try {
      console.log('Auto-logout triggered after 10 minutes of true inactivity');
      await signOut(rkmAuth);
      setUser(null);
      setAuthError('Session expired due to inactivity. Please sign in again.');
      // Only alert if window is focused
      if (!document.hidden) {
        alert('Your session has expired due to inactivity (10 minutes). Please sign in again for security.');
      }
    } catch (error) {
      console.error('Auto logout error:', error);
    }
  };

  // Google Sign-In handler
  const handleGoogleSignIn = async () => {
    setAuthError('');
    setAuthLoading(true);

    try {
      const result = await signInWithPopup(rkmAuth, rkmGoogleProvider);
      const userEmail = result.user.email;
      const emailDomain = userEmail.split('@')[1];

      // Check if domain is allowed
      if (!ALLOWED_DOMAINS.includes(emailDomain)) {
        await signOut(rkmAuth);
        setAuthError(`Access Denied: Only students with ${ALLOWED_DOMAINS.join(' or ')} email addresses can register.`);
        setUser(null);
      } else {
        setUser(result.user);
        setFormData(prev => ({ ...prev, email: userEmail }));
        setAuthError('');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        setAuthError('Pop-up blocked. Please allow pop-ups for this site and try again.');
      } else {
        setAuthError('Authentication failed. Please try again.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout handler
  const handleBackToHome = async () => {
    if (user) {
      try {
        await signOut(rkmAuth);
        setUser(null);
        setFormData({
          fullName: '',
          email: '',
          gender: '',
          age: '',
          house: '',
          contact: '',
          city: '',
          sports: [],
          badmintonType: '',
          cricketRole: '',
          emergencyName: '',
          emergencyContact: '',
          emergencyRelation: '',
          medicalCondition: '',
          medicalDetails: '',
          declaration: false,
          mediaConsent: false
        });
        setAuthError('');
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    // Navigate to home will be handled by Link component
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const updated = { ...prev };

      // Handle phone number fields - only allow digits
      if (name === 'contact' || name === 'emergencyContact') {
        const numericValue = value.replace(/\D/g, ''); // Remove all non-digit characters
        updated[name] = numericValue.slice(0, 10); // Limit to 10 digits
      }
      // Handle sport checkboxes
      else if (name === 'sportCheckbox') {
        if (checked) {
          updated.sports = [...prev.sports, value];
        } else {
          updated.sports = prev.sports.filter(s => s !== value);
          // Reset conditional fields when sport is unchecked
          if (value === 'Badminton') {
            updated.badmintonType = '';
          }
          if (value === 'Cricket') {
            updated.cricketRole = '';
          }
        }
      }
      // Handle regular checkboxes (declaration, mediaConsent)
      else if (type === 'checkbox') {
        updated[name] = checked;
      }
      // Handle regular inputs
      else {
        updated[name] = value;
      }

      // Reset sports when city changes
      if (name === 'city') {
        updated.sports = [];
        updated.badmintonType = '';
        updated.cricketRole = '';
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // CRITICAL: Prevent double submission with ref check
    if (isSubmittingRef.current || hasSubmittedRef.current) {
      console.warn('Submission already in progress or completed');
      return;
    }

    // Lock submission immediately
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError('');
    // Comprehensive validation for all required fields
    if (!formData.fullName.trim()) {
      alert('Please enter your full name');
      return;
    }

    if (!formData.email.trim()) {
      alert('Please enter your email address');
      return;
    }

    if (!formData.gender) {
      alert('Please select your gender');
      return;
    }

    if (!formData.age || formData.age < 16) {
      alert('Please enter a valid age (minimum 16)');
      return;
    }

    if (!formData.house) {
      alert('Please select your house affiliation');
      return;
    }

    if (!formData.contact || formData.contact.length !== 10) {
      alert('Please enter a valid 10-digit contact number');
      return;
    }

    if (!formData.city) {
      alert('Please select a city');
      return;
    }

    if (formData.sports.length === 0) {
      alert('Please select at least one sport');
      return;
    }

    // Validate conditional fields for selected sports
    if (formData.sports.includes('Badminton') && !formData.badmintonType) {
      alert('Please select Badminton participation type (Singles or Doubles)');
      return;
    }

    if (formData.sports.includes('Cricket') && !formData.cricketRole) {
      alert('Please select your Cricket role (Batter, Bowler, or All Rounder)');
      return;
    }

    // Emergency contact validation
    if (!formData.emergencyName.trim()) {
      alert('Please enter emergency contact name');
      return;
    }

    if (!formData.emergencyContact || formData.emergencyContact.length !== 10) {
      alert('Please enter a valid 10-digit emergency contact number');
      return;
    }

    if (!formData.emergencyRelation) {
      alert('Please select emergency contact relationship');
      return;
    }

    // Medical condition validation
    if (!formData.medicalCondition) {
      alert('Please indicate if you have any medical condition or injury');
      return;
    }

    // Declaration validation
    if (!formData.declaration) {
      alert('Please accept the declaration to proceed');
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      return;
    }

    if (!formData.mediaConsent) {
      alert('Please provide media consent to proceed');
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      return;
    }

    try {
      // Build Google Form URL with pre-filled data
      const baseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSf3o4GKPXtsru4rG5BVQjVB9bddlpQxZQhpByl--sVcWpjMiQ/formResponse';

      const params = new URLSearchParams({
        'entry.707996126': formData.fullName,
        'entry.1870420685': formData.email,
        'entry.1310150483': formData.gender,
        'entry.1752023195': formData.age,
        'entry.1852101874': formData.house,
        'entry.2087966706': formData.contact,
        'entry.1596139706': `${formData.city} – ${cities.find(c => c.name === formData.city)?.date}`,
        'entry.414051539': formData.emergencyName,
        'entry.2037347418': formData.emergencyContact,
        'entry.1368391597': formData.emergencyRelation,
        'entry.1823333164': formData.medicalCondition,
        'entry.831970724': formData.medicalDetails || '',
      });

      // Add sports as separate entries (Google Forms checkbox field requires multiple entries)
      formData.sports.forEach(sport => {
        params.append('entry.2043308924', sport);
      });

      // Add conditional fields
      if (formData.sports.includes('Badminton') && formData.badmintonType) {
        params.append('entry.826712633', formData.badmintonType);
      }
      if (formData.sports.includes('Cricket') && formData.cricketRole) {
        params.append('entry.2005278859', formData.cricketRole);
      }

      // Add declaration checkboxes (all checked if form is submitted)
      if (formData.declaration) {
        params.append('entry.354605521', 'I confirm that I am a currently enrolled IIT Madras BS student and that all information provided by me in this form is true, accurate, and verifiable.');
        params.append('entry.354605521', 'I confirm that I will be physically present in the selected city on the event date(s) and will participate only in the city chosen during registration.');
        params.append('entry.354605521', 'I agree to strictly adhere to all event rules, codes of conduct, discipline policies, and instructions issued by the Sportify Society and the event coordinators, before and during the event.');
        params.append('entry.354605521', 'I acknowledge that any form of misconduct, including but not limited to abusive language, unsportsmanlike behaviour, cheating, misrepresentation, or violation of institute policies, may result in immediate disqualification, forfeiture of match results, and/or further action as deemed appropriate by the organizers.');
        params.append('entry.354605521', 'I understand that participation in physical sports involves inherent risks, and I voluntarily choose to participate. I confirm that I am medically fit to take part in the event and that I will immediately inform the coordinators of any injury or health concern.');
        params.append('entry.354605521', 'I agree that Sportify Society, Nilgiri House, Nallamala House, Sundarbans House and IIT Madras BS shall not be held responsible for any personal injury, loss, or damage to personal belongings arising during travel to, participation in, or return from the event, except in cases of proven organizer negligence');
        params.append('entry.354605521', 'I agree that any false declaration or misrepresentation may lead to cancellation of my registration, revocation of certificates, and appropriate disciplinary action.');
      }

      if (formData.mediaConsent) {
        params.append('entry.714345332', 'I grant permission to Sportify Society and IIT Madras BS to use photographs, videos, and recordings captured during the event for official documentation, reporting, and non-commercial promotional purposes.');
      }

      // Submit to Google Form via fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout for better reliability

      try {
        const response = await fetch(baseUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        // With no-cors, we can't check response status, but if we reach here without error, submission likely succeeded
        // Wait to ensure form processes
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mark as successfully submitted
        hasSubmittedRef.current = true;
        setSubmitted(true);

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Keep button disabled permanently after successful submission
        return;
      } catch (fetchError) {
        clearTimeout(timeoutId);

        // If fetch fails, fall back to iframe method
        console.warn('Fetch method failed, using iframe fallback:', fetchError);

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = 'hidden_iframe';
        document.body.appendChild(iframe);

        const form = document.createElement('form');
        form.target = 'hidden_iframe';
        form.method = 'POST';
        form.action = baseUrl;

        params.forEach((value, key) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);

        // Wait for iframe to load
        await new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error('Form submission timeout'));
          }, 10000);

          iframe.onload = () => {
            clearTimeout(timeoutId);
            resolve();
          };

          form.submit();
        });

        // Clean up
        setTimeout(() => {
          if (document.body.contains(form)) document.body.removeChild(form);
          if (document.body.contains(iframe)) document.body.removeChild(iframe);
        }, 1000);
        // Mark as successfully submitted
        hasSubmittedRef.current = true;
        setSubmitted(true);

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Form submission error:', error);

      // Track submission attempts
      submissionAttempts.current += 1;

      // Unlock for retry only if not a critical error
      isSubmittingRef.current = false;
      setIsSubmitting(false);

      // User-friendly error message
      const errorMsg = error.name === 'AbortError'
        ? 'Submission timeout. Please check your internet connection and try again.'
        : submissionAttempts.current >= 3
          ? 'Multiple submission attempts failed. Please refresh the page and try again, or contact support if the issue persists.'
          : 'Form submission failed. Please try again.';

      setSubmitError(errorMsg);
      alert(errorMsg);
    } finally {
      // Only unlock if submission was not successful
      if (!hasSubmittedRef.current) {
        setIsSubmitting(false);
        isSubmittingRef.current = false;
      }
    }
  };

  const houses = [
    'Sundarbans', 'Nallamala', 'Nilgiri', 'Saranda', 'Gir',
    'Kaziranga', 'Bandipur', 'Pichavaram', 'Corbett', 'Namdapha',
    'Kanha', 'Wayanad', 'Not Assigned'
  ];

  const cities = [
    { name: 'Lucknow', date: '18 Feb', sports: ['Cricket'] },
    { name: 'Delhi', date: '21 Feb', sports: ['Cricket', 'Badminton'] },
    { name: 'Mumbai', date: '21 Feb', sports: ['Badminton'] },
    { name: 'Jaipur', date: '22 Feb', sports: ['Cricket'] },
    { name: 'Hyderabad', date: '22 Feb', sports: ['Badminton'] },
    { name: 'Kolkata', date: '22 Feb', sports: ['Cricket'] },
    { name: 'Chennai', date: '22 Feb', sports: ['Badminton'] },
    { name: 'Patna', date: '22 Feb', sports: ['Badminton'] }
  ];

  const getAvailableSports = () => {
    const selectedCity = cities.find(city => city.name === formData.city);
    return selectedCity ? selectedCity.sports : [];
  };



  if (submitted) {
    return (
      <div className="h-screen bg-background flex items-center justify-center px-3 md:px-4 py-4 overflow-hidden">
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500/30 rounded-2xl md:rounded-3xl p-4 md:p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <div className="inline-block p-2 md:p-3 bg-green-500/20 rounded-full mb-3 md:mb-4">
                <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-500" />
              </div>
            </motion.div>
            <h1 className="text-xl md:text-3xl font-bold text-foreground mb-2 md:mb-3">Registration Successful!</h1>
            <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
              Thank you for registering for Sportify Rashtriya Khel Mahotsav 2026.
            </p>
            <div className="bg-[hsl(var(--flame))]/10 border border-[hsl(var(--flame))]/30 rounded-xl md:rounded-2xl p-3 md:p-4 mb-3 md:mb-4 text-left">
              <p className="text-xs md:text-sm text-foreground mb-3">
                Match schedules and venue details will be shared via WhatsApp / email.
              </p>
              <div className="space-y-2 md:space-y-2.5">
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1.5">Join WhatsApp group:</p>
                  <a
                    href="https://chat.whatsapp.com/KjAjRB5bCvvG7COgttB3Xk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    Join Group
                  </a>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs font-semibold text-foreground mb-1.5">For queries:</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>
                      Portal: <a href="https://sportify.iitmbs.org/grievance" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--flame))] hover:underline">sportify.iitmbs.org/grievance</a>
                    </p>
                    <p>
                      Email: <a href="mailto:thesportify.society@study.iitm.ac.in" className="text-[hsl(var(--flame))] hover:underline break-all">thesportify.society@study.iitm.ac.in</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/">
              <motion.button
                className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-[hsl(var(--flame))] to-[hsl(var(--flame-light))] text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(255,140,0,0.5)] transition-all text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Google Sign-In Screen (shown before form access)
  if (!user && !authLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black relative flex items-center justify-center px-3 md:px-6 overflow-hidden pt-16 md:pt-20 pb-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-96 h-96 bg-[hsl(var(--flame))] rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-[hsl(var(--flame-light))] rounded-full blur-3xl"
          />
        </div>

        {/* Back Button - Top Left */}
        <div className="fixed top-16 md:top-20 left-3 md:left-6 z-20">
          <Link href="/" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-[hsl(var(--flame))]/30 rounded-lg text-[hsl(var(--flame))] hover:text-[hsl(var(--flame-light))] hover:border-[hsl(var(--flame))]/50 transition-all group text-xs md:text-sm">
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back</span>
          </Link>
        </div>

        {/* Error Popup Modal */}
        {authError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setAuthError('')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-red-900/90 to-red-950/90 border-2 border-red-500/50 rounded-2xl p-5 md:p-6 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/20 rounded-full mb-3">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-red-400 mb-2">Access Denied</h3>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                  {authError}
                </p>
                <button
                  onClick={() => setAuthError('')}
                  className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Main Content - Split Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl w-full relative z-10"
        >
          <div className="bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-xl border-2 border-[hsl(var(--flame))]/40 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">

            {/* Desktop & Tablet: Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-0">

              {/* LEFT SIDE - Logo & Information */}
              <div className="p-4 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[hsl(var(--flame))]/20">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                  className="mb-3 md:mb-4"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--flame))]/30 to-[hsl(var(--flame-light))]/20 rounded-full blur-2xl"></div>
                    <img
                      src="/RKM2.png"
                      alt="Rashtriya Khel Mahotsav 2026"
                      className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain drop-shadow-2xl relative z-10"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center space-y-2 md:space-y-3"
                >
                  <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--flame))] via-[hsl(var(--flame-light))] to-[hsl(var(--flame))] leading-tight">
                    Rashtriya Khel Mahotsav
                  </h1>
                  <p className="text-lg md:text-xl font-bold text-[hsl(var(--flame-light))]">
                    2026
                  </p>
                  <p className="text-xs md:text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
                    India's premier inter-city sports festival
                  </p>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 md:mt-5 space-y-2 w-full max-w-xs"
                >
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span>Secure Google Authentication</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span>Verified Student Access Only</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span>Quick & Easy Registration</span>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT SIDE - Sign In */}
              <div className="p-4 md:p-8 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full max-w-sm space-y-4 md:space-y-5"
                >
                  <div className="text-center">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                      Sign In to Register
                    </h2>
                    <p className="text-xs text-gray-400">
                      Use your IIT Madras BS email
                    </p>
                  </div>

                  {/* Authorized Domains */}
                  <div className="bg-gradient-to-br from-[hsl(var(--flame))]/20 to-[hsl(var(--flame-light))]/10 border border-[hsl(var(--flame))]/40 rounded-xl p-3 md:p-4 backdrop-blur-sm">
                    <p className="text-xs md:text-sm font-bold text-[hsl(var(--flame))] mb-2 flex items-center justify-center gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                      Authorized Domains
                    </p>
                    <div className="space-y-1.5 text-xs text-gray-300">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="font-mono">@ds.study.iitm.ac.in</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="font-mono">@es.study.iitm.ac.in</span>
                      </div>
                    </div>
                  </div>

                  {/* Google Sign In Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={handleGoogleSignIn}
                    className="w-full px-5 py-3 md:py-3.5 bg-gradient-to-r from-white to-gray-100 hover:from-gray-50 hover:to-white text-gray-900 font-bold rounded-xl md:rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--flame))]/0 via-[hsl(var(--flame))]/10 to-[hsl(var(--flame))]/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <svg className="w-5 h-5 md:w-6 md:h-6 relative z-10" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="relative z-10 text-sm md:text-base">Sign in with Google</span>
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    🔒 Email locked after authentication
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[hsl(var(--flame))]/20 border-t-[hsl(var(--flame))] mx-auto mb-4"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-2 border-[hsl(var(--flame))]/20"></div>
          </div>
          <p className="text-muted-foreground text-base font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* RKM Logo in top-right corner */}
      <div className="fixed top-24 md:top-28 right-4 md:right-8 z-10">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          src="/RKM2.png"
          alt="Rashtriya Khel Mahotsav 2026"
          className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-xl"
        />
      </div>

      {/* Spacer for navbar */}
      <div className="h-20 md:h-24"></div>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Back Button with Logout functionality */}
        <div className="mb-8">
          <Link
            href="/"
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20 border border-[hsl(var(--flame))]/40 hover:border-[hsl(var(--flame))]/60 rounded-xl text-[hsl(var(--flame))] transition-all group shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Logout & Back to Home</span>
          </Link>
        </div>

        {/* User Info Display */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/40 rounded-xl p-4 flex items-center gap-3 shadow-lg"
          >
            <div className="p-2 bg-green-500/20 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">✅ Authenticated as</p>
              <p className="text-xs text-muted-foreground font-mono">{user.email}</p>
            </div>
          </motion.div>
        )}

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block mb-4"
            >
              <div className="p-4 bg-gradient-to-br from-[hsl(var(--flame))]/20 to-[hsl(var(--flame-light))]/10 rounded-2xl">
                <Trophy className="w-12 h-12 md:w-16 md:h-16 text-[hsl(var(--flame))]" />
              </div>
            </motion.div>
            <h1 className="text-2xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--flame))] via-[hsl(var(--flame-light))] to-[hsl(var(--flame))] mb-3">
              Rashtriya Khel Mahotsav 2026
            </h1>
            <h2 className="text-lg md:text-2xl font-semibold text-foreground mb-4">Official Registration Form</h2>
          </div>

          <div className="bg-gradient-to-br from-[hsl(var(--flame))]/10 via-[hsl(var(--flame-light))]/5 to-transparent border border-[hsl(var(--flame))]/30 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-6 h-6 text-[hsl(var(--flame))] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-sm md:text-base font-bold text-foreground mb-2">Important Information</h3>
                <p className="text-xs md:text-xs md:text-sm text-muted-foreground leading-relaxed">
                  This is the official participant registration for Sportify Rashtriya Khel Mahotsav 2026, a pan-India offline sports initiative conducted across multiple cities. Please ensure all information provided is accurate and complete.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--flame))] bg-[hsl(var(--flame))]/10 rounded-lg px-4 py-2 mt-4">
              <span className="font-bold">*</span>
              <span>Indicates required field</span>
            </div>
          </div>
        </motion.div>

        {/* Form or Login Prompt */}
        {!user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/80 backdrop-blur-lg border-2 border-gray-800/50 rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto"
          >
            <div className="mb-8 flex justify-center">
              <div className="p-5 bg-[hsl(var(--flame))]/10 rounded-2xl ring-1 ring-[hsl(var(--flame))]/30">
                <Shield className="w-16 h-16 text-[hsl(var(--flame))]" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Verification Required</h2>
            <p className="text-gray-400 mb-8 text-base leading-relaxed max-w-md mx-auto">
              This registration is exclusive to IITM BS students. Please sign in with your student email to unlock the form.
            </p>

            {authError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-left max-w-md mx-auto"
              >
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-400 font-medium">{authError}</p>
              </motion.div>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={authLoading}
              className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-100 disabled:opacity-70 text-black font-bold py-4 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg min-w-[240px]"
            >
              {authLoading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign in with Google</span>
                </>
              )}
            </button>
            <p className="mt-6 text-xs text-gray-500">
              Only @ds.study.iitm.ac.in & @es.study.iitm.ac.in allowed
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Fieldset to disable entire form during submission */}
            <fieldset disabled={isSubmitting || submitted} className="space-y-8">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/80 backdrop-blur-lg border-2 border-gray-800/50 hover:border-[hsl(var(--flame))]/30 rounded-2xl p-6 md:p-8 space-y-6 transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[hsl(var(--flame))]/10 rounded-lg">
                    <User className="w-6 h-6 text-[hsl(var(--flame))]" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-foreground">Personal Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-background/50 border-2 border-border rounded-xl focus:border-[hsl(var(--flame))] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--flame))]/10 text-foreground transition-all"
                      placeholder="As per IITM records"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                      Student Email ID <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="w-full pl-4 pr-10 py-3.5 bg-zinc-900/50 border-2 border-zinc-800 rounded-xl text-gray-400 cursor-not-allowed focus:outline-none"
                        placeholder="your.email@ds.study.iitm.ac.in"
                      />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 px-5 py-3.5 bg-background/50 border-2 border-border rounded-xl cursor-pointer hover:border-[hsl(var(--flame))]/50 transition-all has-[:checked]:border-[hsl(var(--flame))] has-[:checked]:bg-[hsl(var(--flame))]/5">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === 'Male'}
                          onChange={handleChange}
                          className="w-4 h-4 text-[hsl(var(--flame))] focus:ring-[hsl(var(--flame))]"
                        />
                        <span className="text-foreground font-medium">Male</span>
                      </label>
                      <label className="flex items-center gap-2 px-5 py-3.5 bg-background/50 border-2 border-border rounded-xl cursor-pointer hover:border-[hsl(var(--flame))]/50 transition-all has-[:checked]:border-[hsl(var(--flame))] has-[:checked]:bg-[hsl(var(--flame))]/5">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === 'Female'}
                          onChange={handleChange}
                          className="w-4 h-4 text-[hsl(var(--flame))] focus:ring-[hsl(var(--flame))]"
                        />
                        <span className="text-foreground font-medium">Female</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="16"
                      max="100"
                      className="w-full px-4 py-3.5 bg-background/50 border-2 border-border rounded-xl focus:border-[hsl(var(--flame))] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--flame))]/10 text-foreground transition-all"
                      placeholder="e.g. 20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                      House Affiliation <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="house"
                      value={formData.house}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-black border-2 border-border rounded-xl focus:border-[hsl(var(--flame))] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--flame))]/10 text-white transition-all [&>option]:bg-black [&>option]:text-white"
                    >
                      <option value="" className="bg-black text-white">Select your house</option>
                      {houses.map((house) => (
                        <option key={house} value={house} className="bg-black text-white">{house}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-3.5 bg-background/50 border-2 border-border rounded-xl focus:border-[hsl(var(--flame))] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--flame))]/10 text-foreground transition-all"
                      placeholder="WhatsApp preferred"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Event Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-black/80 backdrop-blur-lg border-2 border-gray-800/50 hover:border-[hsl(var(--flame))]/30 rounded-2xl p-6 md:p-8 space-y-6 transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[hsl(var(--flame))]/10 rounded-lg">
                    <Calendar className="w-6 h-6 text-[hsl(var(--flame))]" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-foreground">Event Selection</h3>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                    Select City <span className="text-red-500">*</span>
                  </label>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-3">
                    <p className="text-xs md:text-sm text-yellow-600 dark:text-yellow-400 flex items-start gap-2">
                      <span className="text-lg">⚠️</span>
                      <span>Participants must be physically present in the selected city on the event date</span>
                    </p>
                  </div>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-black border-2 border-border rounded-xl focus:border-[hsl(var(--flame))] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--flame))]/10 text-white transition-all [&>option]:bg-black [&>option]:text-white"
                  >
                    <option value="" className="bg-black text-white">Select your city</option>
                    {cities.map((city) => (
                      <option key={city.name} value={city.name} className="bg-black text-white">
                        {city.name} – {city.date}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                    Select Sport <span className="text-red-500">*</span>
                  </label>
                  {!formData.city ? (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400">
                        Please select a city first to see available sports
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-3">
                        <p className="text-xs md:text-sm text-yellow-600 dark:text-yellow-400 flex items-start gap-2">
                          <span className="text-lg">⚠️</span>
                          <span>{getAvailableSports().length > 1 ? 'You can select both sports if you wish to participate in both' : 'Final match formats will depend on number of registrations'}</span>
                        </p>
                      </div>
                      <div className={`grid gap-4 ${getAvailableSports().length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {getAvailableSports().includes('Badminton') && (
                          <label className="relative flex items-center gap-3 p-4 md:p-5 bg-background/50 border-2 border-border rounded-xl cursor-pointer hover:border-[hsl(var(--flame))]/50 transition-all has-[:checked]:border-[hsl(var(--flame))] has-[:checked]:bg-[hsl(var(--flame))]/5 has-[:checked]:shadow-lg has-[:checked]:shadow-[hsl(var(--flame))]/10">
                            <input
                              type="checkbox"
                              name="sportCheckbox"
                              value="Badminton"
                              checked={formData.sports.includes('Badminton')}
                              onChange={handleChange}
                              className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--flame))] focus:ring-[hsl(var(--flame))] rounded"
                            />
                            <span className="text-foreground font-semibold text-sm md:text-base">🏸 Badminton</span>
                          </label>
                        )}
                        {getAvailableSports().includes('Cricket') && (
                          <label className="relative flex items-center gap-3 p-4 md:p-5 bg-background/50 border-2 border-border rounded-xl cursor-pointer hover:border-[hsl(var(--flame))]/50 transition-all has-[:checked]:border-[hsl(var(--flame))] has-[:checked]:bg-[hsl(var(--flame))]/5 has-[:checked]:shadow-lg has-[:checked]:shadow-[hsl(var(--flame))]/10">
                            <input
                              type="checkbox"
                              name="sportCheckbox"
                              value="Cricket"
                              checked={formData.sports.includes('Cricket')}
                              onChange={handleChange}
                              className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--flame))] focus:ring-[hsl(var(--flame))] rounded"
                            />
                            <span className="text-foreground font-semibold text-sm md:text-base">🏏 Cricket</span>
                          </label>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {formData.sports.includes('Badminton') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                      Participation Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center gap-3 p-4 bg-background/50 border-2 border-border rounded-xl cursor-pointer hover:border-[hsl(var(--flame))]/50 transition-all has-[:checked]:border-[hsl(var(--flame))] has-[:checked]:bg-[hsl(var(--flame))]/5">
                        <input
                          type="radio"
                          name="badmintonType"
                          value="Singles"
                          checked={formData.badmintonType === 'Singles'}
                          onChange={handleChange}
                          className="w-4 h-4 text-[hsl(var(--flame))] focus:ring-[hsl(var(--flame))]"
                        />
                        <span className="text-foreground font-medium">Singles</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 bg-background/50 border-2 border-border rounded-xl cursor-pointer hover:border-[hsl(var(--flame))]/50 transition-all has-[:checked]:border-[hsl(var(--flame))] has-[:checked]:bg-[hsl(var(--flame))]/5">
                        <input
                          type="radio"
                          name="badmintonType"
                          value="Doubles"
                          checked={formData.badmintonType === 'Doubles'}
                          onChange={handleChange}
                          className="w-4 h-4 text-[hsl(var(--flame))] focus:ring-[hsl(var(--flame))]"
                        />
                        <span className="text-foreground font-medium">Doubles</span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {formData.sports.includes('Cricket') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                      Preferred Role <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <label className="flex items-center gap-2 p-4 bg-background/50 border-2 border-border rounded-xl cursor-pointer hover:border-[hsl(var(--flame))]/50 transition-all has-[:checked]:border-[hsl(var(--flame))] has-[:checked]:bg-[hsl(var(--flame))]/5">
                        <input
                          type="radio"
                          name="cricketRole"
                          value="Batter"
                          checked={formData.cricketRole === 'Batter'}
                          onChange={handleChange}
                          className="w-4 h-4 text-[hsl(var(--flame))] focus:ring-[hsl(var(--flame))]"
                        />
                        <span className="text-foreground font-medium text-sm">Batter</span>
                      </label>
                      <label className="flex items-center gap-2 p-4 bg-background/50 border-2 border-border rounded-xl cursor-pointer hover:border-[hsl(var(--flame))]/50 transition-all has-[:checked]:border-[hsl(var(--flame))] has-[:checked]:bg-[hsl(var(--flame))]/5">
                        <input
                          type="radio"
                          name="cricketRole"
                          value="Bowler"
                          checked={formData.cricketRole === 'Bowler'}
                          onChange={handleChange}
                          className="w-4 h-4 text-[hsl(var(--flame))] focus:ring-[hsl(var(--flame))]"
                        />
                        <span className="text-foreground font-medium text-sm">Bowler</span>
                      </label>
                      <label className="flex items-center gap-2 p-4 bg-background/50 border-2 border-border rounded-xl cursor-pointer hover:border-[hsl(var(--flame))]/50 transition-all has-[:checked]:border-[hsl(var(--flame))] has-[:checked]:bg-[hsl(var(--flame))]/5">
                        <input
                          type="radio"
                          name="cricketRole"
                          value="All Rounder"
                          checked={formData.cricketRole === 'All Rounder'}
                          onChange={handleChange}
                          className="w-4 h-4 text-[hsl(var(--flame))] focus:ring-[hsl(var(--flame))]"
                        />
                        <span className="text-foreground font-medium text-sm">All Rounder</span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Emergency Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-black/80 backdrop-blur-lg border-2 border-gray-800/50 hover:border-[hsl(var(--flame))]/30 rounded-2xl p-6 md:p-8 space-y-6 transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <Shield className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-foreground">Emergency Contact</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="emergencyName"
                      value={formData.emergencyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-background/50 border-2 border-border rounded-xl focus:border-[hsl(var(--flame))] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--flame))]/10 text-foreground transition-all"
                      placeholder="Emergency contact person"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-3.5 bg-background/50 border-2 border-border rounded-xl focus:border-[hsl(var(--flame))] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--flame))]/10 text-foreground transition-all"
                      placeholder="10-digit number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                      Relationship <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="emergencyRelation"
                      value={formData.emergencyRelation}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-black border-2 border-border rounded-xl focus:border-[hsl(var(--flame))] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--flame))]/10 text-white transition-all [&>option]:bg-black [&>option]:text-white"
                    >
                      <option value="" className="bg-black text-white">Select relationship</option>
                      <option value="Mother" className="bg-black text-white">Mother</option>
                      <option value="Father" className="bg-black text-white">Father</option>
                      <option value="Grandparent" className="bg-black text-white">Grandparent</option>
                      <option value="Brother" className="bg-black text-white">Brother</option>
                      <option value="Sister" className="bg-black text-white">Sister</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Medical Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-black/80 backdrop-blur-lg border-2 border-gray-800/50 hover:border-[hsl(var(--flame))]/30 rounded-2xl p-6 md:p-8 space-y-6 transition-all"
              >
                <h3 className="text-lg md:text-2xl font-bold text-foreground mb-4">Medical Information</h3>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-foreground mb-3">
                    Do you have any medical condition or injury? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 bg-background/50 border-2 border-border rounded-xl cursor-pointer hover:border-[hsl(var(--flame))]/50 transition-all has-[:checked]:border-[hsl(var(--flame))] has-[:checked]:bg-[hsl(var(--flame))]/5">
                      <input
                        type="radio"
                        name="medicalCondition"
                        value="Yes"
                        checked={formData.medicalCondition === 'Yes'}
                        onChange={handleChange}
                        className="w-4 h-4 text-[hsl(var(--flame))] focus:ring-[hsl(var(--flame))]"
                      />
                      <span className="text-foreground font-medium">Yes</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-background/50 border-2 border-border rounded-xl cursor-pointer hover:border-[hsl(var(--flame))]/50 transition-all has-[:checked]:border-[hsl(var(--flame))] has-[:checked]:bg-[hsl(var(--flame))]/5">
                      <input
                        type="radio"
                        name="medicalCondition"
                        value="No"
                        checked={formData.medicalCondition === 'No'}
                        onChange={handleChange}
                        className="w-4 h-4 text-[hsl(var(--flame))] focus:ring-[hsl(var(--flame))]"
                      />
                      <span className="text-foreground font-medium">No</span>
                    </label>
                  </div>
                </div>

                {formData.medicalCondition === 'Yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                      Please specify the condition/injury
                    </label>
                    <textarea
                      name="medicalDetails"
                      value={formData.medicalDetails}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3.5 bg-background/50 border-2 border-border rounded-xl focus:border-[hsl(var(--flame))] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--flame))]/10 text-foreground transition-all resize-none"
                      placeholder="Provide details about your medical condition or injury..."
                    />
                  </motion.div>
                )}
              </motion.div>

              {/* Declaration & Consent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-[hsl(var(--flame))]/10 via-[hsl(var(--flame-light))]/5 to-transparent border-2 border-[hsl(var(--flame))]/30 rounded-2xl p-6 md:p-8 space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-7 h-7 text-[hsl(var(--flame))]" />
                  <h3 className="text-lg md:text-2xl font-bold text-foreground">Declaration & Consent</h3>
                </div>

                <div className="space-y-6">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="declaration"
                      checked={formData.declaration}
                      onChange={handleChange}
                      className="w-6 h-6 mt-1 text-[hsl(var(--flame))] focus:ring-[hsl(var(--flame))] rounded border-2 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-foreground leading-relaxed block mb-2">
                        <span className="text-red-500">*</span> I hereby declare and confirm:
                      </span>
                      <ul className="list-disc ml-5 space-y-2 text-xs md:text-sm text-muted-foreground">
                        <li>I am a currently enrolled IIT Madras BS student and all information provided is true and accurate</li>
                        <li>I will be physically present in the selected city on the event date(s)</li>
                        <li>I agree to strictly adhere to all event rules, codes of conduct, and discipline policies</li>
                        <li>I acknowledge that misconduct may result in immediate disqualification</li>
                        <li>I understand participation involves inherent risks and I am medically fit to participate</li>
                        <li>I agree that Sportify Society and IIT Madras BS shall not be held responsible for any personal injury or loss during the event, except in cases of proven organizer negligence</li>
                        <li>I understand that false declaration may lead to cancellation of registration and disciplinary action</li>
                      </ul>
                    </div>
                  </label>

                  <div className="h-px bg-border"></div>

                  <label className="flex items-start gap-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="mediaConsent"
                      checked={formData.mediaConsent}
                      onChange={handleChange}
                      className="w-6 h-6 mt-1 text-[hsl(var(--flame))] focus:ring-[hsl(var(--flame))] rounded border-2 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-foreground leading-relaxed block mb-1">
                        <span className="text-red-500">*</span> Media Consent
                      </span>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        I grant permission to Sportify Society and IIT Madras BS to use photographs, videos, and recordings captured during the event for official documentation, reporting, and non-commercial promotional purposes.
                      </p>
                    </div>
                  </label>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col items-center gap-4 pt-6 pb-12"
              >
                {submitError && (
                  <div className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                    {submitError}
                  </div>
                )}

                <motion.button
                  type="submit"
                  className="w-full md:w-auto px-12 md:px-16 py-4 md:py-5 bg-gradient-to-r from-[hsl(var(--flame))] via-[hsl(var(--flame-light))] to-[hsl(var(--flame))] text-black font-bold rounded-full text-base md:text-xl shadow-xl hover:shadow-[0_0_40px_rgba(255,140,0,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-xl flex items-center justify-center gap-3"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  disabled={!formData.declaration || !formData.mediaConsent || formData.sports.length === 0 || isSubmitting || submitted}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Submitted Successfully</span>
                    </>
                  ) : (
                    'Submit Registration'
                  )}
                </motion.button>

                <p className="text-xs md:text-sm text-muted-foreground text-center">
                  {isSubmitting
                    ? 'Please wait, do not close this page or click again...'
                    : 'By submitting, you agree to all terms and conditions stated above'
                  }
                </p>
              </motion.div>
            </fieldset>
          </motion.form>
        )}
      </div>
    </div>
  );
}
