import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Shield, Users, FileText, Clock, Lock, BarChart3 } from "lucide-react";
import { useEffect } from "react";

export default function Grievance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-br from-black via-[#1a1a1a] to-black min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 pt-16 md:pt-24 pb-6 scroll-reveal">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white relative">
            Grievance{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400">
              Portal
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
            We are committed to addressing your concerns fairly and confidentially. Use the forms below to submit your grievances.
          </p>
        </div>

        {/* Grievance Redressal Policy */}
        <div className="max-w-6xl mx-auto scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Introduction */}
            <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white">
              <CardContent className="py-6 px-4 md:px-6">
                <div className="flex items-center mb-4">
                  <Shield className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">1. Introduction</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  At The Sportify, we believe in creating a safe, inclusive, and transparent environment for every member of the IITM BS sports community.
                  Our Grievance Redressal System is designed to make sure that any concern big or small is heard, addressed, and resolved fairly.
                  Whether it’s about event management, communication, or behavior, every voice matters.
                  We’re here to listen, support, and act - so that The Sportify remains a space of respect, equality, and enthusiasm for all.
                </p>
              </CardContent>
            </Card>

            {/* Why This System Exists */}
            <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white">
              <CardContent className="py-6 px-4 md:px-6">
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">2. Why This System Exists</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">The purpose of this policy is to:</p>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Offer a clear channel for reporting issues or complaints.</li>
                  <li>Ensure grievances are handled confidentially and promptly.</li>
                  <li>Promote fairness and accountability within all teams and activities.</li>
                  <li>Uphold The Sportify’s values of mutual respect, inclusivity, and teamwork.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Committees */}
            <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white lg:col-span-2">
              <CardContent className="py-6 px-4 md:px-6">
                <div className="flex items-center mb-4">
                  <FileText className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">3. Committees That Handle Complaints</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  To make sure every concern is addressed properly, The Sportify operates two dedicated grievance committees, each suited to different needs:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-600 text-xs">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-600 px-3 py-2 text-left">Committee Name</th>
                        <th className="border border-gray-600 px-3 py-2 text-left">Who It’s For</th>
                        <th className="border border-gray-600 px-3 py-2 text-left">Who Oversees It</th>
                        <th className="border border-gray-600 px-3 py-2 text-left">Who’s In It</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 px-3 py-2">General Grievance Redressal Committee (GGRC)</td>
                        <td className="border border-gray-600 px-3 py-2">Open to all members, regardless of gender.</td>
                        <td className="border border-gray-600 px-3 py-2">Chaired by Deputy Secretary & Secretary</td>
                        <td className="border border-gray-600 px-3 py-2">A mixed team of 3–5 members from different departments.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-3 py-2">Women’s Grievance Redressal Committee (WGRC)</td>
                        <td className="border border-gray-600 px-3 py-2">Exclusively for female members, focusing on gender sensitivity and safety issues.</td>
                        <td className="border border-gray-600 px-3 py-2">Chaired by Deputy Secretary & Secretary</td>
                        <td className="border border-gray-600 px-3 py-2">A female-only team (3 members), including the Head of The Sportify HER.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mt-4">
                  Each committee functions independently but reports outcomes to the Secretary for transparency.
                </p>
              </CardContent>
            </Card>

            {/* Grievance Handling Hierarchy (visual tree + procedure map) */}
            <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white lg:col-span-2">
              <CardContent className="py-6 px-4 md:px-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">4. Grievance Handling Hierarchy</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: centered tree with clearer spacing */}
                  <div className="tree flex flex-col items-center justify-start">
                    <div className="node mb-6">
                      <div className="px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg text-center font-medium">Secretary</div>
                    </div>

                    <div className="connector w-px h-6 bg-gray-700"></div>

                    <div className="node mb-6 mt-2">
                      <div className="px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg text-center font-medium">Deputy Secretary</div>
                    </div>

                    <div className="connector w-px h-6 bg-gray-700"></div>

                    <div className="flex flex-col items-center gap-4 mt-3 w-full">
                      <div className="w-full flex flex-col sm:flex-row sm:justify-center sm:gap-6 items-stretch">
                        <div className="flex-1 flex justify-center">
                          <div className="px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg text-center">General Grievance Redressal Committee (GGRC)</div>
                        </div>
                        <div className="flex-1 flex justify-center mt-3 sm:mt-0">
                          <div className="px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg text-center">Women’s Grievance Redressal Committee (WGRC)</div>
                        </div>
                      </div>

                      <div className="w-full flex justify-center mt-4">
                        <div className="px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg text-center">Committee Members & Documentation Team</div>
                      </div>
                    </div>
                  </div>

                  {/* Right: responsibilities & improved horizontal stepper */}
                  <div className="flex flex-col justify-start">
                    <h4 className="text-white font-semibold mb-3">Roles & Responsibilities</h4>
                    <dl className="grid grid-cols-1 gap-3 text-gray-300 text-sm">
                      <div className="flex gap-3">
                        <dt className="w-36 text-white font-medium">Secretary</dt>
                        <dd>Ensures fair final decisions and confidentiality.</dd>
                      </div>
                      <div className="flex gap-3">
                        <dt className="w-36 text-white font-medium">Deputy Secretary</dt>
                        <dd>Manages complaint intake and coordination.</dd>
                      </div>
                      <div className="flex gap-3">
                        <dt className="w-36 text-white font-medium">Committee Members</dt>
                        <dd>Review, investigate, and recommend actions.</dd>
                      </div>
                      <div className="flex gap-3">
                        <dt className="w-36 text-white font-medium">Documentation Lead</dt>
                        <dd>Keeps confidential records for accountability.</dd>
                      </div>
                    </dl>

                    <div className="mt-6">
                      <h4 className="text-white font-semibold mb-3">Procedure Map</h4>
                      <div className="stepper flex items-center justify-between bg-transparent rounded px-2 py-3">
                        <div className="step flex-1 text-center px-2">
                          <div className="mx-auto w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-orange-400 flex items-center justify-center font-semibold text-black">1</div>
                          <div className="mt-2 text-sm text-gray-200">Submit Grievance</div>
                        </div>
                        <div className="arrow text-gray-400 hidden sm:block">→</div>
                        <div className="step flex-1 text-center px-2">
                          <div className="mx-auto w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-semibold text-white">2</div>
                          <div className="mt-2 text-sm text-gray-200">Acknowledgment<br/>(Deputy Secretary)</div>
                        </div>
                        <div className="arrow text-gray-400 hidden sm:block">→</div>
                        <div className="step flex-1 text-center px-2">
                          <div className="mx-auto w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-semibold text-white">3</div>
                          <div className="mt-2 text-sm text-gray-200">Committee Review<br/>(GGRC / WGRC)</div>
                        </div>
                        <div className="arrow text-gray-400 hidden sm:block">→</div>
                        <div className="step flex-1 text-center px-2">
                          <div className="mx-auto w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-green-300 flex items-center justify-center font-semibold text-black">4</div>
                          <div className="mt-2 text-sm text-gray-200">Decision & Resolution</div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mt-3">Typical turnaround: acknowledgment within 48 hours; committee review within 5 days; final resolution within 14 days.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What Issues You Can Report */}
            <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white lg:col-span-2">
              <CardContent className="py-6 px-4 md:px-6">
                <div className="flex items-center mb-4">
                  <FileText className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">5. What Issues You Can Report</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">You may raise a grievance about:</p>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Mismanagement or unfair treatment during any event by The Sportify.</li>
                  <li>Misconduct, harassment, or inappropriate behavior.</li>
                  <li>Violation of The Sportify’s code of conduct.</li>
                  <li>Communication issues or bias within the team.</li>
                  <li>Problems related to recognition, participation, or workload.</li>
                  <li>Any matter that makes you feel uncomfortable or unfairly treated.</li>
                </ul>
                <p className="text-gray-300 text-sm leading-relaxed mt-3 italic">
                  No concern is too small - if something doesn’t feel right, please let us know.
                </p>
              </CardContent>
            </Card>

            {/* What Happens After You Submit */}
            <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white lg:col-span-2">
              <CardContent className="py-6 px-4 md:px-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">6. What Happens After You Submit</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-600 text-xs">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-600 px-3 py-2 text-left">Step</th>
                        <th className="border border-gray-600 px-3 py-2 text-left">What Happens</th>
                        <th className="border border-gray-600 px-3 py-2 text-left">Who Handles It</th>
                        <th className="border border-gray-600 px-3 py-2 text-left">Time Frame</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 px-3 py-2">Step 1: Submission</td>
                        <td className="border border-gray-600 px-3 py-2">You submit your grievance through the official form.</td>
                        <td className="border border-gray-600 px-3 py-2">—</td>
                        <td className="border border-gray-600 px-3 py-2">—</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-3 py-2">Step 2: Acknowledgment</td>
                        <td className="border border-gray-600 px-3 py-2">You’ll receive an acknowledgment within 48 hours.</td>
                        <td className="border border-gray-600 px-3 py-2">Deputy Secretary</td>
                        <td className="border border-gray-600 px-3 py-2">48 hrs</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-3 py-2">Step 3: Committee Review</td>
                        <td className="border border-gray-600 px-3 py-2">The concern is reviewed by the appropriate committee (GGRC or WGRC).</td>
                        <td className="border border-gray-600 px-3 py-2">Committee</td>
                        <td className="border border-gray-600 px-3 py-2">5 days</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-3 py-2">Step 4: Investigation</td>
                        <td className="border border-gray-600 px-3 py-2">Committee may reach out for clarification or statements.</td>
                        <td className="border border-gray-600 px-3 py-2">Committee</td>
                        <td className="border border-gray-600 px-3 py-2">—</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-3 py-2">Step 5: Decision & Resolution</td>
                        <td className="border border-gray-600 px-3 py-2">Appropriate action or mediation is taken.</td>
                        <td className="border border-gray-600 px-3 py-2">Secretary & Deputy Secretary</td>
                        <td className="border border-gray-600 px-3 py-2">10 days</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-3 py-2">Step 6: Closure</td>
                        <td className="border border-gray-600 px-3 py-2">You’re informed of the outcome; the case is recorded confidentially.</td>
                        <td className="border border-gray-600 px-3 py-2">Secretary & Deputy Secretary</td>
                        <td className="border border-gray-600 px-3 py-2">14 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mt-4">
                  <strong>Total resolution time:</strong> Within 14 days (extendable up to 21 days for complex cases).
                </p>
              </CardContent>
            </Card>

            {/* Additional Sections in Grid */}
            <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white">
              <CardContent className="py-6 px-4 md:px-6">
                <div className="flex items-center mb-4">
                  <Shield className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">7. If Your Complaint Is About a Core Team Member</h3>
                </div>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>The accused member will not be part of the investigation process.</li>
                  <li>The case will be handled directly by:</li>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Deputy Secretary (if the accused is not the Deputy), or</li>
                    <li>Secretary, with a 3-member impartial review panel.</li>
                  </ul>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white">
              <CardContent className="py-6 px-4 md:px-6">
                <div className="flex items-center mb-4">
                  <Lock className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">8. Confidentiality & Protection</h3>
                </div>
                <div className="text-gray-300 text-sm leading-relaxed space-y-2">
                  <p>Your identity will remain confidential unless disclosure is essential for fair resolution.</p>
                  <p>Any form of retaliation, bullying, or victimization against a complainant will lead to strict disciplinary action.</p>
                  <p>Anonymous complaints are welcome, but specific details make it easier to act effectively.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white">
              <CardContent className="py-6 px-4 md:px-6">
                <div className="flex items-center mb-4">
                  <FileText className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">9. Data Security & Recordkeeping</h3>
                </div>
                <div className="text-gray-300 text-sm leading-relaxed space-y-2">
                  <p>All grievance data will be stored securely in a private drive accessible only to the Secretary and Deputy Secretary.</p>
                  <p>No personal details will ever be made public.</p>
                  <p>Summarized, anonymous statistics may be included in the annual society report.</p>
                  <p>Records are maintained for one year for accountability.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white">
              <CardContent className="py-6 px-4 md:px-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">10. Time-Off & Conflict of Interest Rules</h3>
                </div>
                <div className="text-gray-300 text-sm leading-relaxed space-y-2">
                  <p>If a committee member is involved in a grievance, they must step away from that specific case.</p>
                  <p>A replacement member will be appointed temporarily to maintain fairness and timelines.</p>
                  <p>Members on official leave will not handle grievance cases during that period.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white">
              <CardContent className="py-6 px-4 md:px-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">11. Review & Transparency</h3>
                </div>
                <div className="text-gray-300 text-sm leading-relaxed space-y-2">
                  <p>A term wise report (no names, just numbers) will summarize how many grievances were received, their nature, and whether they were resolved.</p>
                  <p>A year-end review will be conducted by the Secretary and Deputy Secretary to strengthen the system and ensure continuous improvement.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white">
              <CardContent className="py-6 px-4 md:px-6">
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">12. For Queries or Support</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Official Email: <a href="mailto:thesportify.society@study.iitm.ac.in" className="text-orange-400 hover:underline">thesportify.society@study.iitm.ac.in</a>
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white lg:col-span-2">
              <CardContent className="py-6 px-4 md:px-6">
                <div className="flex items-center mb-4">
                  <Shield className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">13. Our Commitment</h3>
                </div>
                <div className="text-gray-300 text-sm leading-relaxed space-y-2">
                  <p>We want every member of The Sportify to feel valued, heard, and respected.</p>
                  <p>If you ever face a problem, please don’t stay silent - reach out, and we’ll ensure it’s handled fairly and professionally.</p>
                  <p>This system isn’t just about resolving complaints - it’s about upholding the spirit of unity, fairness, and respect that defines The Sportify.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 pt-16 md:pt-20 pb-8 flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/grievance/general"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:opacity-95 transition transform hover:scale-105"
            >
              <FileText className="w-5 h-5" />
              Submit General Grievance
            </Link>
            <Link
              to="/grievance/women"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:opacity-95 transition transform hover:scale-105"
            >
              <FileText className="w-5 h-5" />
              Submit Women’s Grievance
            </Link>
          </div>
        </div>
      </div>

      {/* CSS for gradient border, tree connectors and stepper */}
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

        /* Tree simplified for centered layout */
        .tree .connector { width: 2px; }
        .tree .node > div { min-width: 220px; }

        /* Stepper */
        .stepper .step { min-width: 0; }
        .stepper .arrow { font-size: 1.25rem; margin: 0 8px; }

        @media (max-width: 640px) {
          .stepper { display: block; }
          .stepper .arrow { display: none; }
          .stepper .step { margin-bottom: 12px; }
        }
      `}</style>
    </section>
  );
}