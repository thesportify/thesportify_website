"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/buttons";
import { Card, CardContent } from "@/ui/card";
import { Search, ShieldCheck } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function VerifyPage() {
    const [certId, setCertId] = useState("");
    const router = useRouter();

    const handleVerify = (e) => {
        e.preventDefault();
        if (certId.trim()) {
            router.push(`/verify/${certId.trim()}`);
        }
    };

    return (
        <main className="min-h-screen bg-black flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center px-4 py-20 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>

                <div className="w-full max-w-lg relative z-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full mb-6 border border-orange-500/30">
                            <ShieldCheck className="h-10 w-10 text-orange-500" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Verify <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Certificate</span>
                        </h1>
                        <p className="text-gray-400">
                            Enter the unique certificate ID found on your certificate to verify its authenticity.
                        </p>
                    </div>

                    <Card className="!bg-[#0a0a0a] border border-gray-800 shadow-2xl">
                        <CardContent className="p-8">
                            <form onSubmit={handleVerify} className="space-y-6">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                                    <input
                                        type="text"
                                        value={certId}
                                        onChange={(e) => setCertId(e.target.value)}
                                        placeholder="Enter Certificate ID (e.g. SPT-2025-001)"
                                        className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full py-6 text-lg font-bold bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center"
                                >
                                    Verify Now
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Having trouble? Contact <a href="mailto:support@sportify.org" className="text-orange-400 hover:underline">support@sportify.org</a>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
