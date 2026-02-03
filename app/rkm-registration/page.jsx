'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Shield, Calendar, User, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function RKMRegistration() {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const updated = { ...prev };
      
      // Handle sport checkboxes
      if (name === 'sportCheckbox') {
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
    
    if (isSubmitting) return;
    
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
      return;
    }
    
    if (!formData.mediaConsent) {
      alert('Please provide media consent to proceed');
      return;
    }
    
    setIsSubmitting(true);
    
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
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

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
        // Wait a bit to ensure form processes
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message only after successful submission
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        
        // Show success message only after iframe loads
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Form submission failed. Please try again or contact support if the issue persists.');
    } finally {
      setIsSubmitting(false);
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
      <div className="min-h-screen bg-background py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500/30 rounded-3xl p-8 md:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <div className="inline-block p-4 bg-green-500/20 rounded-full mb-6">
                <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-green-500" />
              </div>
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Registration Successful!</h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Thank you for registering for Sportify Rashtriya Khel Mahotsav 2026.
            </p>
            <div className="bg-[hsl(var(--flame))]/10 border border-[hsl(var(--flame))]/30 rounded-2xl p-6 mb-6 text-left max-w-2xl mx-auto">
              <p className="text-sm md:text-base text-foreground mb-4">
                Further details regarding match schedules, reporting time, and venue will be shared via official WhatsApp / email communication.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Join the WhatsApp group for updates:</p>
                  <a 
                    href="https://chat.whatsapp.com/KjAjRB5bCvvG7COgttB3Xk" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Join WhatsApp Group
                  </a>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-sm font-semibold text-foreground mb-2">For queries or issues:</p>
                  <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                    <p>
                      Grievance Portal: <a href="https://sportify.iitmbs.org/grievance" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--flame))] hover:underline">sportify.iitmbs.org/grievance</a>
                    </p>
                    <p>
                      Email: <a href="mailto:thesportify.society@study.iitm.ac.in" className="text-[hsl(var(--flame))] hover:underline">thesportify.society@study.iitm.ac.in</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/">
              <motion.button 
                className="px-10 py-4 bg-gradient-to-r from-[hsl(var(--flame))] to-[hsl(var(--flame-light))] text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(255,140,0,0.5)] transition-all"
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
        {/* Back Button - Separated with spacing */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[hsl(var(--flame))] hover:text-[hsl(var(--flame-light))] transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </div>

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

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
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
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-background/50 border-2 border-border rounded-xl focus:border-[hsl(var(--flame))] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--flame))]/10 text-foreground transition-all"
                  placeholder="your.email@ds.study.iitm.ac.in"
                />
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
            <motion.button
              type="submit"
              className="w-full md:w-auto px-12 md:px-16 py-4 md:py-5 bg-gradient-to-r from-[hsl(var(--flame))] via-[hsl(var(--flame-light))] to-[hsl(var(--flame))] text-black font-bold rounded-full text-base md:text-xl shadow-xl hover:shadow-[0_0_40px_rgba(255,140,0,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!formData.declaration || !formData.mediaConsent || formData.sports.length === 0 || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </motion.button>
            <p className="text-xs md:text-sm text-muted-foreground text-center">
              By submitting, you agree to all terms and conditions stated above
            </p>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}
