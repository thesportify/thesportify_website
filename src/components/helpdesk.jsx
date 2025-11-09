import { getFAQs } from "../lib/data"; // Fetch FAQs
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/card";

export default function Helpdesk() {
  const faqs = getFAQs(); // Retrieve FAQs from data.js
  const sectionRef = useRef(null);


  // State to track which FAQ is open
  const [openFAQ, setOpenFAQ] = useState(null);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("idle"); // idle | sending | sent | error
  const [contactError, setContactError] = useState("");
  const formRef = useRef(null);

  // Toggle FAQ open/close
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Animation for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-gradient-to-br from-black via-[#1a1a1a] to-black"
      id="helpdesk"
    >
      <div className="container mx-auto px-4">

        {/* Contact form section (centered in first viewport) */}
        <div className="w-full flex items-center justify-center mb-8 scroll-reveal min-h-[70vh]">
          <Card className="w-full max-w-3xl overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white">
            <CardContent className="py-6 px-4 md:px-6">
              <div className="space-y-4">
                <div className="mb-2">
                  <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
                  <p className="text-gray-300 mt-2">Have more questions or need help? Send us a message and we'll get back to you.</p>
                </div>

                {/* Google Forms integration: submit to formResponse via hidden iframe to avoid navigation */}
                <iframe
                  name="hidden_iframe"
                  title="hidden-submission"
                  style={{ display: "none" }}
                  onLoad={() => {
                    // When iframe loads after submission, mark as sent
                    if (contactStatus === "sending") {
                      setContactStatus("sent");
                      setContactName("");
                      setContactEmail("");
                      setContactMessage("");
                    }
                  }}
                />

                <form
                  ref={formRef}
                  action="https://docs.google.com/forms/d/e/1FAIpQLSfWpXu8N-afhgm0qpaTyZoshegByfMdyTjjpZHm26eLU_SK6Q/formResponse"
                  method="POST"
                  target="hidden_iframe"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactError("");

                    // Basic validation
                    if (!contactName.trim()) {
                      setContactError("Please enter your name.");
                      return;
                    }
                    if (!contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
                      setContactError("Please enter a valid email.");
                      return;
                    }
                    if (!contactMessage.trim()) {
                      setContactError("Please enter a message.");
                      return;
                    }

                    // All good — submit the form to Google Forms via the hidden iframe
                    try {
                      setContactStatus("sending");
                      // Use the native form submit so browser posts the form fields (including names)
                      if (formRef.current) formRef.current.submit();
                    } catch (err) {
                      setContactStatus("error");
                      setContactError("Failed to send. Please try again.");
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="entry.891686666"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Name"
                      className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      aria-label="Your name"
                      required
                    />
                    <input
                      type="email"
                      name="entry.841004524"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      aria-label="Your email"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <textarea
                      name="entry.2106658886"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Message"
                      className="w-full px-4 py-3 h-32 resize-none bg-[#0f0f0f] border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      aria-label="Your message"
                      required
                    />
                  </div>

                  {contactError && <div className="text-sm text-red-400 mt-2">{contactError}</div>}

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black font-semibold rounded-md shadow-md hover:opacity-95 transition"
                      disabled={contactStatus === "sending"}
                    >
                      {contactStatus === "sending" ? "Sending..." : "Send Message"}
                    </button>

                    {contactStatus === "sent" && (
                      <div className="text-green-400 font-medium">Message sent — we'll reply soon.</div>
                    )}
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ heading moved below contact form */}
  <div className="text-center mb-8 mt-20 scroll-reveal">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white relative">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400">
              Questions
            </span>
            <div className="absolute -bottom-4 left-0 right-0 flex justify-center w-full">
            <div className="relative h-[2px] w-4/5 sm:w-2/5">
              {/* Main gradient underline */}
              <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5a00] to-transparent rounded-full"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 rounded-full blur-sm"></div>

              {/* Extra subtle reflection */}
              <div className="absolute inset-0 h-[1px] top-[3px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-[0.5px]"></div>
            </div>
          </div>
          </h1>
          <p className="mt-10 text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our events, membership, and more. If you can't find what you're looking for, we are here to help!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white">
            <CardContent className="py-6 px-4 md:px-6">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-800 rounded-md overflow-hidden scroll-reveal hover:shadow-xl transition-shadow duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                    <div 
                      className="flex justify-between items-center p-4 bg-gradient-to-r from-[#111] to-[#222] cursor-pointer"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="font-medium text-gray-100">{faq.question}</h3>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-xl font-bold">
                        {openFAQ === index ? "−" : "+"}
                      </span>
                    </div>
                    {openFAQ === index && (
                      <div className="p-5 bg-gradient-to-br from-[#1a1a1a] to-[#212121] text-gray-300 whitespace-pre-line">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CSS for gradient border */}
      <style jsx>{`
        .border-gradient {
          position: relative;
        }
        .border-gradient::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(to right, #ff4500, #ff6a00, #ffce00);
          border-radius: 0.5rem;
          z-index: -1;
        }
      `}</style>
    </section>
  );
}