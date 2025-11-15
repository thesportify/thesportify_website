"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/ui/card";
import Link from "next/link";

export default function GeneralGrievance() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [issueType, setIssueType] = useState("");
  const [desiredAction, setDesiredAction] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [anonymous, setAnonymous] = useState("");
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
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!issueType) {
      setError("Please select an issue type.");
      return;
    }
    if (!message.trim()) {
      setError("Please describe your concern in detail.");
      return;
    }
    if (!desiredAction.trim()) {
      setError("Please specify the action or resolution you seek.");
      return;
    }
    if (!driveLink.trim()) {
      setError("Please provide the Google Drive link for your supporting evidence.");
      return;
    }
    if (!anonymous) {
      setError("Please choose whether you want to remain anonymous.");
      return;
    }
    if (!ack) {
      setError("Please confirm the acknowledgement checkbox.");
      return;
    }

    try {
      setStatus("sending");
      // Use native form submit so the browser encodes the form exactly
      // as it would when the form is filled normally (this matches helpdesk behavior).
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
            General{" "}
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
            For all members to report general concerns. Please provide detailed information.
          </p>
        </div>

        {/* Form */}
        <div className="scroll-reveal">
          <Card className="overflow-hidden border border-gray-800 rounded-lg shadow-2xl bg-gradient-to-br from-black to-[#151515] text-white">
            <CardContent className="py-8 px-6 md:px-8">
              <h2 className="text-2xl font-bold text-white mb-2">The Sportify | General Grievance Redressal Form</h2>
              <p className="text-gray-300 mb-4">At The Sportify, we value transparency, inclusivity, and fairness.</p>
              <p className="text-gray-300 mb-4">This grievance form allows all members to raise concerns, complaints, or feedback regarding any event, activity, or individual associated with the society.</p>
              <p className="text-gray-300 mb-6">All responses will be confidential and handled by the Grievance Redressal Committee (Open), chaired by the Secretary and Deputy Secretary of The Sportify. Each submission will be acknowledged within 48 hours, and a resolution will be provided within 5 working days.</p>
              
              <iframe name="general_iframe" title="general-submission" style={{ display: "none" }} onLoad={() => {
                if (status === "sending") {
                  // mark sent and clear all fields
                  setStatus("sent");
                  setName("");
                  setEmail("");
                  setMessage("");
                  setIssueType("");
                  setDesiredAction("");
                  setDriveLink("");
                  setAnonymous("");
                  setAck(false);
                }
              }} />

              <form
                ref={formRef}
                action="https://docs.google.com/forms/d/e/1FAIpQLSesZfmTCoypQqL_7jp9qXo7UKgWf8UwALBKZ7hTCuDa7Jy4Jg/formResponse"
                method="POST"
                acceptCharset="UTF-8"
                target="general_iframe"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      name="entry.1503122817"
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
                      name="entry.1361777607"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Student Email ID"
                      className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-300 mb-2">Type of Issue <span className="text-red-400">*</span></label>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3">
                      <input type="radio" name="entry.253935686" value="General Concern / Suggestion" checked={issueType === 'General Concern / Suggestion'} onChange={() => setIssueType('General Concern / Suggestion')} className="mt-1 accent-orange-500" />
                      <span className="text-gray-300">General Concern / Suggestion</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="radio" name="entry.253935686" value="Event-Related Issue" checked={issueType === 'Event-Related Issue'} onChange={() => setIssueType('Event-Related Issue')} className="mt-1 accent-orange-500" />
                      <span className="text-gray-300">Event-Related Issue</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="radio" name="entry.253935686" value="Misconduct by Member" checked={issueType === 'Misconduct by Member'} onChange={() => setIssueType('Misconduct by Member')} className="mt-1 accent-orange-500" />
                      <span className="text-gray-300">Misconduct by Member</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="radio" name="entry.253935686" value="Misconduct by Core Team Member" checked={issueType === 'Misconduct by Core Team Member'} onChange={() => setIssueType('Misconduct by Core Team Member')} className="mt-1 accent-orange-500" />
                      <span className="text-gray-300">Misconduct by Core Team Member</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="radio" name="entry.253935686" value="Harassment / Discrimination" checked={issueType === 'Harassment / Discrimination'} onChange={() => setIssueType('Harassment / Discrimination')} className="mt-1 accent-orange-500" />
                      <span className="text-gray-300">Harassment / Discrimination</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="radio" name="entry.253935686" value="Other" checked={issueType === 'Other'} onChange={() => setIssueType('Other')} className="mt-1 accent-orange-500" />
                      <span className="text-gray-300">Other</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-300 mb-2">Please describe your concern in detail <span className="text-red-400">*</span></label>
                  <textarea
                    name="entry.1255016707"
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
                    name="entry.1168840221"
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    placeholder="Drive link"
                    className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-gray-400 text-sm mt-2">Please upload your supporting evidence to your Google Drive, grant access to <span className="text-orange-400">thesportify.society@study.iitm.ac.in</span>, and share the drive link above.</p>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-300 mb-2">What action or resolution do you seek? <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    name="entry.745007289"
                    value={desiredAction}
                    onChange={(e) => setDesiredAction(e.target.value)}
                    placeholder="e.g., apology, investigation, awareness session, policy improvement"
                    className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white focus:outline-none"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-300 mb-2">Do you wish to remain anonymous to the party involved? <span className="text-red-400">*</span></label>
                  <div className="flex items-center gap-6">
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" name="entry.489863788" value="Yes" className="accent-orange-500" checked={anonymous === 'Yes'} onChange={(e) => setAnonymous(e.target.value)} />
                      <span className="text-gray-300">Yes</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" name="entry.489863788" value="No" className="accent-orange-500" checked={anonymous === 'No'} onChange={(e) => setAnonymous(e.target.value)} />
                      <span className="text-gray-300">No</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="inline-flex items-start gap-3">
                    <input type="checkbox" name="entry.1793987830" value="I confirm that the information provided is true to the best of my knowledge and I understand that false reporting may lead to disciplinary action." className="mt-1 accent-orange-500" checked={ack} onChange={(e) => setAck(e.target.checked)} />
                    <span className="text-gray-300 text-sm">Acknowledgement: I confirm that the information provided is true to the best of my knowledge and I understand that false reporting may lead to disciplinary action. <span className="text-red-400">*</span></span>
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
                  <Link href="/grievance" className="text-gray-300 hover:text-white">
                    Back to Grievance Portal
                  </Link>
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