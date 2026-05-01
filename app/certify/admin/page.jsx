"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { Button } from "@/ui/buttons";
import { Card, CardContent } from "@/ui/card";
import { Trash2, Plus, LogOut, ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export default function AdminPanel() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    // Certificate Form State
    const [certId, setCertId] = useState("");
    const [studentName, setStudentName] = useState("");
    const [event, setEvent] = useState("");
    const [position, setPosition] = useState("");
    const [date, setDate] = useState("");
    const [issuedBy, setIssuedBy] = useState("The Sportify Society");

    // Data Lists
    const [certificates, setCertificates] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
            if (currentUser) {
                fetchCertificates();
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    const fetchCertificates = async () => {
        setFetchLoading(true);
        try {
            const q = query(collection(db, "certificates"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const certs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCertificates(certs);
        } catch (err) {
            console.error("Error fetching certificates:", err);
        } finally {
            setFetchLoading(false);
        }
    };

    const handleAddCertificate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await setDoc(doc(db, "certificates", certId), {
                certId,
                studentName,
                event,
                position,
                date,
                issuedBy,
                createdAt: serverTimestamp(),
            });

            setCertId("");
            setStudentName("");
            setEvent("");
            setPosition("");
            setDate("");
            fetchCertificates();
            alert("Certificate added successfully!");
        } catch (err) {
            console.error("Error adding certificate:", err);
            alert("Failed to add certificate. ID might already exist.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCertificate = async (id) => {
        if (!confirm("Are you sure you want to delete this certificate?")) return;
        try {
            await deleteDoc(doc(db, "certificates", id));
            fetchCertificates();
        } catch (err) {
            console.error("Error deleting certificate:", err);
            alert("Failed to delete certificate.");
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <Card className="w-full max-w-md !bg-black border border-gray-800 text-white shadow-2xl">
                    <CardContent className="p-8">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-orange-500/10 rounded-full border border-orange-500/20">
                                <ShieldCheck className="h-12 w-12 text-orange-500" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center mb-6 text-white">Admin Access</h2>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black font-bold py-3 transition-all" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Login"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-24">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Dashboard</span>
                        </h1>
                        <p className="text-gray-400">Manage certificates.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400 hidden md:inline">{user.email}</span>
                        <Button onClick={handleLogout} variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500 transition-all">
                            <LogOut className="h-4 w-4 mr-2" /> Logout
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Certificate Form */}
                    <div className="lg:col-span-1">
                        <Card className="!bg-black border border-gray-800 sticky top-24 shadow-xl">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
                                    <Plus className="h-5 w-5 mr-2 text-orange-500" /> Issue New Certificate
                                </h2>
                                <form onSubmit={handleAddCertificate} className="space-y-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Certificate ID</label>
                                        <input
                                            type="text"
                                            value={certId}
                                            onChange={(e) => setCertId(e.target.value)}
                                            placeholder="e.g. SPT-2025-001"
                                            className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Student Name</label>
                                        <input
                                            type="text"
                                            value={studentName}
                                            onChange={(e) => setStudentName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Event Name</label>
                                        <input
                                            type="text"
                                            value={event}
                                            onChange={(e) => setEvent(e.target.value)}
                                            placeholder="Cricket Tournament 2025"
                                            className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Position/Role</label>
                                            <input
                                                type="text"
                                                value={position}
                                                onChange={(e) => setPosition(e.target.value)}
                                                placeholder="Winner"
                                                className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Date</label>
                                            <input
                                                type="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Issued By</label>
                                        <input
                                            type="text"
                                            value={issuedBy}
                                            onChange={(e) => setIssuedBy(e.target.value)}
                                            className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black font-bold py-3 mt-2 transition-all" disabled={loading}>
                                        {loading ? <span className="flex items-center"><Loader2 className="animate-spin mr-2 h-4 w-4" /> Processing...</span> : "Issue Certificate"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Certificates List */}
                    <div className="lg:col-span-2">
                        <Card className="!bg-black border border-gray-800 shadow-xl h-full">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-6 text-white">Recent Certificates</h2>
                                {fetchLoading ? (
                                    <div className="flex justify-center py-10">
                                        <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
                                    </div>
                                ) : certificates.length === 0 ? (
                                    <div className="text-center py-10 text-gray-500 bg-[#111] rounded-lg border border-gray-800 border-dashed">
                                        <p>No certificates found. Issue one to get started.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
                                                    <th className="p-4 font-medium">ID</th>
                                                    <th className="p-4 font-medium">Name</th>
                                                    <th className="p-4 font-medium">Event</th>
                                                    <th className="p-4 font-medium">Position</th>
                                                    <th className="p-4 font-medium">Date</th>
                                                    <th className="p-4 text-right font-medium">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {certificates.map((cert) => (
                                                    <tr key={cert.id} className="border-b border-gray-800/50 hover:bg-white/5 transition group">
                                                        <td className="p-4 font-mono text-orange-400 text-sm">{cert.id}</td>
                                                        <td className="p-4 font-medium text-white">{cert.studentName}</td>
                                                        <td className="p-4 text-gray-300 text-sm">{cert.event}</td>
                                                        <td className="p-4 text-gray-300 text-sm">
                                                            <span className="px-2 py-1 rounded-full bg-gray-800 text-xs border border-gray-700">
                                                                {cert.position}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-gray-400 text-sm">{cert.date}</td>
                                                        <td className="p-4 text-right">
                                                            <button
                                                                onClick={() => handleDeleteCertificate(cert.id)}
                                                                className="text-gray-600 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-500/10"
                                                                title="Delete"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
