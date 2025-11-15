"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/ui/card";
import Link from "next/link";

export default function WomenGrievance() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [verification, setVerification] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [message, setMessage] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [confidential, setConfidential] = useState("");
  const [ack, setAck] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid student email ID.");
      return;
    }
    if (!verification) {
      setError("Please confirm that you are a female member of The Sportify society.");
      return;
    }
    if (!issueType) {
      setError("Please select a type of issue.");
      return;
    }
    if (!message.trim()) {
      setError("Please describe your concern in detail.");
      return;
    }
    if (!driveLink.trim()) {
      setError("Please provide the Google Drive link for your supporting evidence.");
      return;
    }
    if (!confidential) {
      setError("Please choose whether you wish your identity to remain confidential.");
      return;
    }
    if (!ack) {
      setError("Please confirm the acknowledgement.");
      return;
    }

    try {
      setStatus("sending");
      if (formRef.current) formRef.current.submit();
    } catch (err) {
      setStatus("error");
      setError("Failed to submit. Please try again.");
    }
  };

  return (
    <section className="pt-24 pb-12 bg-gradient-to-br from-black via-[#1a1a1a] to-black min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 scroll-reveal">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white relative">
            Women’s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400">
              Grievance Form
            </span>
            <div className="absolute -bottom-4 left-0 right-0 flex justify-center w-full">
              <div className="relative h-[2px] w-4/5 sm:w-2/5">
                <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5a00] to-transparent rounded-full"></div>
                <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 rounded-full blur-sm"></div>
                <div className="absolute inset-0 h-[1px] top-[3px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-[0.5px]"></div>
              </div>
            </div>
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            For female members to report gender-specific concerns. Please provide detailed information.
          </p>
        </div>

        {/* Form */}
        <div className="scroll-reveal">
          <Card className="overflow-hidden border border-gray-800 rounded-lg shadow-2xl bg-gradient-to-br from-black to-[#151515] text-white">
            <CardContent className="py-8 px-6 md:px-8">
              <h2 className="text-2xl font-bold text-white mb-2">The Sportify | Women’s Grievance Redressal Form</h2>
              <p className="text-gray-300 mb-4">This form is exclusively for female members of The Sportify, as part of our initiative to ensure a safe, inclusive, and empowering environment.</p>
              <p className="text-gray-300 mb-4">Complaints submitted here will be handled confidentially by the Women’s Grievance Redressal Committee, chaired by the Secretary and Deputy Secretary, with all other committee members being women.</p>
              <p className="text-gray-300 mb-6">Your concern will be acknowledged within 48 hours and resolved within 7 working days.</p>
              
              <iframe name="women_iframe" title="women-submission" style={{ display: "none" }} onLoad={() => {
                if (status === "sending") {
                  setStatus("sent");
                  setName("");
                  setEmail("");
                  setVerification(false);
                  setIssueType("");
                  setMessage("");
                  setDriveLink("");
                  setConfidential("");
                  setAck(false);
                }
              }} />

              <form
                ref={formRef}
                action="https://docs.google.com/forms/d/e/1FAIpQLSed6C2ekECYmnnqAZhbzayFkVj1RpeCLmJG-xrn-4Qd6w26WA/formResponse"
                method="POST"
                acceptCharset="UTF-8"
                target="women_iframe"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      name="entry.1307349062"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Student Email ID <span className="text-red-400">*</span></label>
                    <input
                      type="email"
                      name="entry.1084362591"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Student Email ID"
                      className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="inline-flex items-start gap-3">
                    <input type="checkbox" name="entry.777436624" value="I confirm that I am a female member of The Sportify society." className="mt-1 accent-orange-500" checked={verification} onChange={(e) => setVerification(e.target.checked)} />
                    <span className="text-gray-300 text-sm">Verification Confirmation: I confirm that I am a female member of The Sportify society. <span className="text-red-400">*</span></span>
                  </label>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-300 mb-2">Type of Issue <span className="text-red-400">*</span></label>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3">
                      <input type="radio" name="entry.532682953" value="Harassment / Misconduct" checked={issueType === 'Harassment / Misconduct'} onChange={() => setIssueType('Harassment / Misconduct')} className="mt-1 accent-orange-500" />
                      <span className="text-gray-300">Harassment / Misconduct</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="radio" name="entry.532682953" value="Gender Bias or Discrimination" checked={issueType === 'Gender Bias or Discrimination'} onChange={() => setIssueType('Gender Bias or Discrimination')} className="mt-1 accent-orange-500" />
                      <span className="text-gray-300">Gender Bias or Discrimination</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="radio" name="entry.532682953" value="Event or Communication-Related Concern" checked={issueType === 'Event or Communication-Related Concern'} onChange={() => setIssueType('Event or Communication-Related Concern')} className="mt-1 accent-orange-500" />
                      <span className="text-gray-300">Event or Communication-Related Concern</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="radio" name="entry.532682953" value="Core Team Misconduct" checked={issueType === 'Core Team Misconduct'} onChange={() => setIssueType('Core Team Misconduct')} className="mt-1 accent-orange-500" />
                      <span className="text-gray-300">Core Team Misconduct</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="radio" name="entry.532682953" value="Suggestion for Women-Centric Events" checked={issueType === 'Suggestion for Women-Centric Events'} onChange={() => setIssueType('Suggestion for Women-Centric Events')} className="mt-1 accent-orange-500" />
                      <span className="text-gray-300">Suggestion for Women-Centric Events</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="radio" name="entry.532682953" value="Other" checked={issueType === 'Other'} onChange={() => setIssueType('Other')} className="mt-1 accent-orange-500" />
                      <span className="text-gray-300">Other</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-300 mb-2">Describe your concern in detail <span className="text-red-400">*</span></label>
                  <textarea
                    name="entry.1953897096"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your concern in detail"
                    className="w-full px-4 py-3 h-36 resize-y bg-[#0f0f0f] border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-300 mb-2">Attach any supporting evidence <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    name="entry.1187907615"
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    placeholder="Drive link"
                    className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-gray-400 text-sm mt-2">Please upload your supporting evidence to your Google Drive, grant access to <span className="text-orange-400">thesportify.society@study.iitm.ac.in</span>, and share the drive link above.</p>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-300 mb-2">Do you wish your identity to remain confidential? <span className="text-red-400">*</span></label>
                  <div className="flex items-center gap-6">
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" name="entry.1235169879" value="Yes" className="accent-orange-500" checked={confidential === 'Yes'} onChange={(e) => setConfidential(e.target.value)} />
                      <span className="text-gray-300">Yes</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" name="entry.1235169879" value="No" className="accent-orange-500" checked={confidential === 'No'} onChange={(e) => setConfidential(e.target.value)} />
                      <span className="text-gray-300">No</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="inline-flex items-start gap-3">
                    <input type="checkbox" name="entry.1542833979" value="I confirm that all information provided is accurate to the best of my knowledge and agree to the committee’s process." className="mt-1 accent-orange-500" checked={ack} onChange={(e) => setAck(e.target.checked)} />
                    <span className="text-gray-300 text-sm">Acknowledgement: I confirm that all information provided is accurate to the best of my knowledge and agree to the committee’s process. <span className="text-red-400">*</span></span>
                  </label>
                </div>

                {error && <div className="text-sm text-red-400 mb-4">{error}</div>}

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black font-semibold rounded-md shadow-lg hover:opacity-95"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Submitting..." : "Submit Grievance"}
                  </button>
                  <Link href="/grievance" className="text-gray-300 hover:text-white">Back to Grievance Portal</Link>
                </div>

                {status === "sent" && <div className="text-green-400 font-medium mt-6">Grievance submitted successfully. We will review it shortly.</div>}
                <p className="text-gray-400 text-sm mt-6">* Indicates required question</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}