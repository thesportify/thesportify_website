"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/ui/buttons";
import { Card, CardContent } from "@/ui/card";
import { CheckCircle, XCircle, Loader2, Download, Share2, ShieldCheck, ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import logo from "@/assets/sportify_logo1.png";

export default function CertificateResultPage() {
    const { id } = useParams();
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const router = useRouter();

    const certId = decodeURIComponent(id);

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const docRef = doc(db, "certificates", certId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCertificate({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Error fetching certificate:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (certId) {
            fetchCertificate();
        }
    }, [certId]);

    const handleDownload = () => {
        window.print();
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center px-4 py-24 relative overflow-hidden">
                {/* Ambient Background Glow */}
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                {error ? (
                    <div className="text-center max-w-md animate-in fade-in zoom-in duration-500 relative z-10">
                        <div className="inline-flex items-center justify-center p-6 bg-red-500/10 rounded-full mb-6 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                            <XCircle className="h-16 w-16 text-red-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-3">Certificate Not Found</h1>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            We couldn't find a certificate with ID <span className="text-white font-mono bg-gray-800 px-2 py-1 rounded mx-1">{certId}</span>.
                            Please check the ID and try again.
                        </p>
                        <Button
                            onClick={() => router.push("/verify")}
                            className="bg-white text-black hover:bg-gray-200 px-8 py-3 font-semibold rounded-full transition-all"
                        >
                            Verify Another ID
                        </Button>
                    </div>
                ) : (
                    <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
                        {/* Success Badge & Header */}
                        <div className="flex flex-col items-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium mb-6 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                                <CheckCircle className="h-4 w-4" />
                                Verified Authentic
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-2">
                                Certificate of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Achievement</span>
                            </h1>
                            <p className="text-gray-400 text-center">Issued by The Sportify Society</p>
                        </div>

                        {/* Certificate Card Container */}
                        <div className="relative group perspective-1000">
                            {/* Outer Glow/Border */}
                            <div className="absolute -inset-[2px] bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 rounded-xl opacity-70 blur-sm group-hover:opacity-100 transition duration-1000"></div>

                            <Card className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                                {/* Inner Texture/Pattern */}
                                <div className="absolute inset-0 opacity-[0.03]"
                                    style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}>
                                </div>

                                <CardContent className="p-8 md:p-16 text-center relative z-10 flex flex-col items-center">
                                    {/* Watermark */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none grayscale">
                                        <Image src={logo} alt="Watermark" width={500} height={500} />
                                    </div>

                                    {/* Header Logos */}
                                    <div className="w-full flex justify-between items-start mb-12 opacity-80">
                                        <div className="text-left">
                                            <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">Certificate ID</p>
                                            <p className="text-orange-500 font-mono text-sm font-bold">{certificate.certId || certificate.id}</p>
                                        </div>
                                        <Image src={logo} alt="Sportify Logo" width={60} height={60} className="opacity-90" />
                                    </div>

                                    {/* Main Content */}
                                    <div className="space-y-8 max-w-2xl mx-auto">
                                        <div>
                                            <p className="text-gray-400 uppercase tracking-[0.3em] text-xs mb-4">This Certificate is proudly presented to</p>
                                            <h2 className="text-3xl md:text-5xl font-bold text-white font-serif tracking-wide leading-tight">
                                                {certificate.studentName}
                                            </h2>
                                        </div>

                                        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"></div>

                                        <div>
                                            <p className="text-gray-300 text-lg mb-2 font-light">for their valuable contribution as</p>
                                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">{certificate.position}</p>
                                        </div>

                                        <div>
                                            <p className="text-gray-300 text-lg mb-2 font-light">in </p>
                                            <h3 className="text-2xl md:text-3xl font-bold text-white">{certificate.event}</h3>
                                        </div>
                                    </div>

                                    {/* Footer Details */}
                                    <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-8 mt-16 pt-8 border-t border-gray-800">
                                        <div className="text-center">
                                            <p className="text-white font-medium text-lg">{certificate.date}</p>
                                            <p className="text-gray-500 uppercase text-[10px] tracking-widest mt-1">Date Issued</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-white font-medium text-lg">{certificate.issuedBy}</p>
                                            <p className="text-gray-500 uppercase text-[10px] tracking-widest mt-1">Authorized Signature</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Actions */}
                        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 print:hidden">
                            <Button
                                onClick={() => router.push("/verify")}
                                variant="outline"
                                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-6 rounded-lg font-semibold flex items-center gap-2 transition-all"
                            >
                                <ArrowLeft className="h-5 w-5" /> Verify Another
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
