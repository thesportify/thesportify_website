"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { Button } from "@/ui/buttons";
import { Card, CardContent } from "@/ui/card";
import { Trash2, Plus, LogOut, ShieldCheck, Loader2, Calendar, Award, Link as LinkIcon, Pencil, X, Upload, FileSpreadsheet, Save, RefreshCw, History, RotateCcw } from "lucide-react";
import Navbar from "@/components/navbar";

export default function VaultAdmin() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("certificates"); // 'certificates' or 'events'

    // Certificate Form State
    const [certId, setCertId] = useState("");
    const [studentName, setStudentName] = useState("");
    const [event, setEvent] = useState("");
    const [position, setPosition] = useState("");
    const [date, setDate] = useState("");
    const [issuedBy, setIssuedBy] = useState("");

    // Event Form State
    const [eventTitle, setEventTitle] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventCategory, setEventCategory] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventTags, setEventTags] = useState("");
    const [eventLink, setEventLink] = useState("");
    const [eventImageUrl, setEventImageUrl] = useState(""); // Changed to URL string
    const [eventType, setEventType] = useState("featured"); // 'featured' or 'past'

    // Data Lists
    const [certificates, setCertificates] = useState([]);
    const [events, setEvents] = useState([]);
    const [batches, setBatches] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(false);

    // Bulk Operations State
    const [isInlineEditing, setIsInlineEditing] = useState(false);
    const [editedRows, setEditedRows] = useState({}); // { id: { field: value } }

    // Batch Generator State
    const [batchPrefix, setBatchPrefix] = useState("SPT-2025-");
    const [batchStart, setBatchStart] = useState(1);
    const [batchCount, setBatchCount] = useState(10);
    const [batchEvent, setBatchEvent] = useState("");
    const [batchDate, setBatchDate] = useState("");

    // CSV Upload State
    const [csvFile, setCsvFile] = useState(null);

    // Editing State
    const [editingCertId, setEditingCertId] = useState(null);
    const [editingEventId, setEditingEventId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
            if (currentUser) {
                fetchCertificates();
                fetchEvents();
                fetchBatches();
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
            setError("Invalid email or password. Ensure Email/Password provider is enabled in Firebase Console.");
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

    const fetchEvents = async () => {
        try {
            const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const evts = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEvents(evts);
        } catch (err) {
            console.error("Error fetching events:", err);
        }
    };

    const fetchBatches = async () => {
        try {
            const q = query(collection(db, "batches"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const b = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBatches(b);
        } catch (err) {
            console.error("Error fetching batches:", err);
        }
    };

    const handleAddCertificate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingCertId) {
                // Update existing
                await updateDoc(doc(db, "certificates", editingCertId), {
                    certId,
                    studentName,
                    event,
                    position,
                    date,
                    issuedBy,
                    updatedAt: serverTimestamp(),
                });
                alert("Certificate updated successfully!");
                setEditingCertId(null);
            } else {
                // Create new
                await setDoc(doc(db, "certificates", certId), {
                    certId,
                    studentName,
                    event,
                    position,
                    date,
                    issuedBy,
                    createdAt: serverTimestamp(),
                });
                alert("Certificate added successfully!");
            }

            setCertId("");
            setStudentName("");
            setEvent("");
            setPosition("");
            setDate("");
            setIssuedBy("");
            fetchCertificates();
        } catch (err) {
            console.error("Error saving certificate:", err);
            alert("Failed to save certificate.");
        } finally {
            setLoading(false);
        }
    };

    // Bulk Operations Logic

    const handleBatchGenerate = async (e) => {
        e.preventDefault();
        if (!confirm(`Are you sure you want to generate ${batchCount} certificates?`)) return;

        setLoading(true);
        try {
            const batchId = doc(collection(db, "batches")).id;
            const batchPromises = [];

            // Attempt to create batch record, but don't fail if it fails (e.g. permissions)
            const batchRecordPromise = setDoc(doc(db, "batches", batchId), {
                id: batchId,
                type: "batch_generate",
                count: parseInt(batchCount),
                description: `Batch: ${batchPrefix}${batchStart}... (${batchCount} items)`,
                createdAt: serverTimestamp()
            }).catch(err => {
                console.warn("Failed to create batch record (check Firestore rules):", err);
                return null;
            });

            for (let i = 0; i < batchCount; i++) {
                const num = parseInt(batchStart) + i;
                const id = `${batchPrefix}${num.toString().padStart(3, '0')}`;

                batchPromises.push(setDoc(doc(db, "certificates", id), {
                    certId: id,
                    studentName: "TBD", // Placeholder
                    event: batchEvent,
                    position: "Participant",
                    date: batchDate,
                    issuedBy: "The Sportify Society",
                    createdAt: serverTimestamp(),
                    isPlaceholder: true,
                    batchId: batchId
                }));
            }

            // Wait for certificates AND the batch record (if it works)
            await Promise.all([batchRecordPromise, ...batchPromises]);
            alert(`Successfully generated ${batchCount} certificates!`);
            fetchCertificates();
            fetchBatches();
        } catch (err) {
            console.error("Error generating batch:", err);
            alert("Failed to generate batch.");
        } finally {
            setLoading(false);
        }
    };

    const parseCSV = (text) => {
        const lines = text.split(/\r?\n/);
        if (lines.length < 2) return [];

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const obj = {};
            // Handle commas inside quotes roughly or just split by comma for now
            const currentline = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                const val = currentline[j] ? currentline[j].trim() : "";
                obj[headers[j]] = val;
            }
            result.push(obj);
        }
        return result;
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (evt) => {
            setLoading(true);
            try {
                const text = evt.target.result;
                const data = parseCSV(text);

                console.log("Parsed CSV Data:", data);

                if (data.length === 0) {
                    alert("No data found in CSV or invalid format.");
                    setLoading(false);
                    return;
                }

                const batchId = doc(collection(db, "batches")).id;

                // Attempt to create batch record, but don't fail the upload if it fails (e.g. permissions)
                const batchPromise = setDoc(doc(db, "batches", batchId), {
                    id: batchId,
                    type: "csv_upload",
                    count: data.length,
                    description: `CSV Upload: ${file.name} (${data.length} items)`,
                    createdAt: serverTimestamp()
                }).catch(err => {
                    console.warn("Failed to create batch record (check Firestore rules):", err);
                    return null; // Resolve so Promise.all doesn't fail
                });

                const certPromises = data.map(row => {
                    // Expects headers: id, name, event, position, date, issued by
                    // Map from lowercase headers to our schema
                    const id = row.id || row['certificate id'];
                    const name = row.name || row['student name'];

                    if (!id || !name) {
                        console.warn("Skipping invalid row:", row);
                        return null;
                    }

                    return setDoc(doc(db, "certificates", id), {
                        certId: id,
                        studentName: name,
                        event: row.event || "",
                        position: row.position || "Participant",
                        date: row.date || new Date().toISOString().split('T')[0],
                        issuedBy: row['issued by'] || row.issuedby || "The Sportify Society",
                        createdAt: serverTimestamp(),
                        batchId: batchId
                    });
                }).filter(p => p !== null);

                if (certPromises.length === 0) {
                    alert("No valid rows found. Check column headers (ID, Name, etc).");
                } else {
                    // Wait for certificates AND the batch record (if it works)
                    await Promise.all([batchPromise, ...certPromises]);
                    alert(`Successfully uploaded ${certPromises.length} certificates from CSV!`);
                    fetchCertificates();
                    fetchBatches();
                }
            } catch (err) {
                console.error("Error uploading CSV:", err);
                alert("Failed to upload CSV. Check console for details.");
            } finally {
                setLoading(false);
                e.target.value = null; // Reset input
            }
        };
        reader.readAsText(file);
    };

    const handleDeleteBatch = async (batch) => {
        if (!confirm(`Are you sure you want to UNDO this batch? This will delete ${batch.count} certificates.`)) return;
        setLoading(true);
        try {
            // 1. Find all certificates with this batchId
            const q = query(collection(db, "certificates"), where("batchId", "==", batch.id));
            const querySnapshot = await getDocs(q);

            // 2. Delete them
            const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));

            // 3. Delete the batch record
            deletePromises.push(deleteDoc(doc(db, "batches", batch.id)));

            await Promise.all(deletePromises);
            alert("Batch undone successfully!");
            fetchCertificates();
            fetchBatches();
        } catch (err) {
            console.error("Error deleting batch:", err);
            alert("Failed to undo batch.");
        } finally {
            setLoading(false);
        }
    };

    const toggleInlineEdit = () => {
        setIsInlineEditing(!isInlineEditing);
        setEditedRows({});
    };

    const handleInlineChange = (id, field, value) => {
        setEditedRows(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

    const saveInlineChanges = async () => {
        setLoading(true);
        try {
            const updates = Object.keys(editedRows).map(id => {
                return updateDoc(doc(db, "certificates", id), {
                    ...editedRows[id],
                    updatedAt: serverTimestamp()
                });
            });

            await Promise.all(updates);
            alert("All changes saved successfully!");
            setIsInlineEditing(false);
            setEditedRows({});
            fetchCertificates();
        } catch (err) {
            console.error("Error saving inline changes:", err);
            alert("Failed to save changes.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditCertificate = (cert) => {
        setEditingCertId(cert.id);
        setCertId(cert.certId || cert.id);
        setStudentName(cert.studentName);
        setEvent(cert.event);
        setPosition(cert.position);
        setDate(cert.date);
        setIssuedBy(cert.issuedBy || "The Sportify Society");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEditCertificate = () => {
        setEditingCertId(null);
        setCertId("");
        setStudentName("");
        setEvent("");
        setPosition("");
        setDate("");
        setIssuedBy("");
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const eventData = {
                title: eventTitle,
                date: eventDate,
                location: eventLocation,
                category: eventCategory,
                description: eventDescription,
                tags: eventTags.split(",").map(tag => tag.trim()),
                link: eventLink,
                image: eventImageUrl,
                eventType: eventType,
                updatedAt: serverTimestamp(),
            };

            if (editingEventId) {
                await updateDoc(doc(db, "events", editingEventId), eventData);
                alert("Event updated successfully!");
                setEditingEventId(null);
            } else {
                eventData.createdAt = serverTimestamp();
                await addDoc(collection(db, "events"), eventData);
                alert("Event added successfully!");
            }

            setEventTitle("");
            setEventDate("");
            setEventLocation("");
            setEventCategory("");
            setEventDescription("");
            setEventTags("");
            setEventLink("");
            setEventImageUrl("");
            setEventType("featured");
            fetchEvents();
        } catch (err) {
            console.error("Error saving event:", err);
            alert("Failed to save event.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditEvent = (evt) => {
        setEditingEventId(evt.id);
        setEventTitle(evt.title);
        setEventDate(evt.date);
        setEventLocation(evt.location);
        setEventCategory(evt.category);
        setEventDescription(evt.description);
        setEventTags(evt.tags ? evt.tags.join(", ") : "");
        setEventLink(evt.link || "");
        setEventImageUrl(evt.image || "");
        setEventType(evt.eventType || "featured");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEditEvent = () => {
        setEditingEventId(null);
        setEventTitle("");
        setEventDate("");
        setEventLocation("");
        setEventCategory("");
        setEventDescription("");
        setEventTags("");
        setEventLink("");
        setEventImageUrl("");
        setEventType("featured");
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

    const handleDeleteEvent = async (id) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        try {
            await deleteDoc(doc(db, "events", id));
            fetchEvents();
        } catch (err) {
            console.error("Error deleting event:", err);
            alert("Failed to delete event.");
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
                        <h2 className="text-2xl font-bold text-center mb-6 text-white">Vault Access</h2>
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
                            Vault <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Admin</span>
                        </h1>
                        <p className="text-gray-400">Centralized control for certificates and events.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400 hidden md:inline">{user.email}</span>
                        <Button onClick={handleLogout} variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500 transition-all">
                            <LogOut className="h-4 w-4 mr-2" /> Logout
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-800 pb-4">
                    <button
                        onClick={() => setActiveTab("certificates")}
                        className={`flex items-center px-4 py-2 rounded-lg transition-all ${activeTab === "certificates" ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" : "text-gray-400 hover:text-white"}`}
                    >
                        <Award className="h-4 w-4 mr-2" /> Certificates
                    </button>
                    <button
                        onClick={() => setActiveTab("events")}
                        className={`flex items-center px-4 py-2 rounded-lg transition-all ${activeTab === "events" ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" : "text-gray-400 hover:text-white"}`}
                    >
                        <Calendar className="h-4 w-4 mr-2" /> Events
                    </button>
                </div>

                {activeTab === "certificates" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Bulk Actions & Add Certificate */}
                        <div className="lg:col-span-1 space-y-8">
                            <Card className="!bg-black border border-gray-800 shadow-xl">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
                                        <FileSpreadsheet className="h-5 w-5 mr-2 text-orange-500" /> Bulk Actions
                                    </h2>

                                    {/* CSV Upload */}
                                    <div className="mb-8">
                                        <h3 className="text-sm font-medium text-gray-300 mb-2">Upload CSV</h3>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept=".csv"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                                id="csv-upload"
                                            />
                                            <label
                                                htmlFor="csv-upload"
                                                className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-gray-900 transition-all"
                                            >
                                                <div className="text-center">
                                                    <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                                                    <span className="text-xs text-gray-500">Click to upload CSV</span>
                                                </div>
                                            </label>
                                        </div>
                                        <p className="text-[10px] text-gray-500 mt-2">
                                            Format: ID, Name, Event, Position, Date, Issued By
                                        </p>
                                    </div>

                                    {/* Batch Generator */}
                                    <div className="mb-8">
                                        <h3 className="text-sm font-medium text-gray-300 mb-2">Batch Generator</h3>
                                        <form onSubmit={handleBatchGenerate} className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={batchPrefix}
                                                    onChange={(e) => setBatchPrefix(e.target.value)}
                                                    placeholder="Prefix (SPT-)"
                                                    className="w-full p-2 bg-[#111] border border-gray-800 rounded text-white text-xs"
                                                    required
                                                />
                                                <input
                                                    type="number"
                                                    value={batchStart}
                                                    onChange={(e) => setBatchStart(e.target.value)}
                                                    placeholder="Start #"
                                                    className="w-full p-2 bg-[#111] border border-gray-800 rounded text-white text-xs"
                                                    required
                                                />
                                            </div>
                                            <input
                                                type="number"
                                                value={batchCount}
                                                onChange={(e) => setBatchCount(e.target.value)}
                                                placeholder="Count"
                                                className="w-full p-2 bg-[#111] border border-gray-800 rounded text-white text-xs"
                                                required
                                            />
                                            <input
                                                type="text"
                                                value={batchEvent}
                                                onChange={(e) => setBatchEvent(e.target.value)}
                                                placeholder="Event Name"
                                                className="w-full p-2 bg-[#111] border border-gray-800 rounded text-white text-xs"
                                                required
                                            />
                                            <input
                                                type="date"
                                                value={batchDate}
                                                onChange={(e) => setBatchDate(e.target.value)}
                                                className="w-full p-2 bg-[#111] border border-gray-800 rounded text-white text-xs"
                                                required
                                            />
                                            <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white text-xs py-2" disabled={loading}>
                                                <RefreshCw className="h-3 w-3 mr-1" /> Generate Batch
                                            </Button>
                                        </form>
                                    </div>

                                    {/* Recent Batches (Undo) */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                                            <History className="h-3 w-3 mr-1" /> Recent Batches
                                        </h3>
                                        {batches.length === 0 ? (
                                            <p className="text-xs text-gray-500 italic">No recent batch operations.</p>
                                        ) : (
                                            <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                                                {batches.map(batch => (
                                                    <div key={batch.id} className="flex items-center justify-between p-2 bg-gray-900 rounded border border-gray-800 text-xs">
                                                        <div className="overflow-hidden">
                                                            <p className="font-medium text-gray-300 truncate">{batch.description}</p>
                                                            <p className="text-[10px] text-gray-500">
                                                                {batch.createdAt?.toDate ? batch.createdAt.toDate().toLocaleDateString() : 'Just now'} • {batch.count} items
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDeleteBatch(batch)}
                                                            className="text-red-500 hover:bg-red-500/10 p-1.5 rounded transition-colors"
                                                            title="Undo Batch"
                                                        >
                                                            <RotateCcw className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="!bg-black border border-gray-800 sticky top-24 shadow-xl">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
                                        {editingCertId ? (
                                            <>
                                                <Pencil className="h-5 w-5 mr-2 text-orange-500" /> Edit Certificate
                                                <Button onClick={handleCancelEditCertificate} variant="ghost" className="ml-auto text-xs text-gray-400 hover:text-white">
                                                    <X className="h-4 w-4 mr-1" /> Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="h-5 w-5 mr-2 text-orange-500" /> Issue New Certificate
                                            </>
                                        )}
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
                                            {loading ? <span className="flex items-center"><Loader2 className="animate-spin mr-2 h-4 w-4" /> Processing...</span> : (editingCertId ? "Update Certificate" : "Issue Certificate")}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Certificates List */}
                        <div className="lg:col-span-2">
                            <Card className="!bg-black border border-gray-800 shadow-xl h-full">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-white">Recent Certificates</h2>
                                        <div className="flex gap-2">
                                            {isInlineEditing ? (
                                                <Button onClick={saveInlineChanges} className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 h-8">
                                                    <Save className="h-3 w-3 mr-1" /> Save Changes
                                                </Button>
                                            ) : null}
                                            <Button
                                                onClick={toggleInlineEdit}
                                                variant="outline"
                                                className={`text-xs px-3 py-1 h-8 ${isInlineEditing ? "border-red-500 text-red-500 hover:bg-red-500/10" : "border-gray-700 text-gray-400 hover:text-white"}`}
                                            >
                                                {isInlineEditing ? <><X className="h-3 w-3 mr-1" /> Cancel Edit</> : <><Pencil className="h-3 w-3 mr-1" /> Quick Edit</>}
                                            </Button>
                                        </div>
                                    </div>
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
                                                            <td className="p-4 font-medium text-white">
                                                                {isInlineEditing ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editedRows[cert.id]?.studentName ?? cert.studentName}
                                                                        onChange={(e) => handleInlineChange(cert.id, 'studentName', e.target.value)}
                                                                        className="bg-[#111] border border-gray-700 rounded px-2 py-1 text-white w-full text-sm focus:border-orange-500 outline-none"
                                                                    />
                                                                ) : cert.studentName}
                                                            </td>
                                                            <td className="p-4 text-gray-300 text-sm">
                                                                {isInlineEditing ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editedRows[cert.id]?.event ?? cert.event}
                                                                        onChange={(e) => handleInlineChange(cert.id, 'event', e.target.value)}
                                                                        className="bg-[#111] border border-gray-700 rounded px-2 py-1 text-white w-full text-sm focus:border-orange-500 outline-none"
                                                                    />
                                                                ) : cert.event}
                                                            </td>
                                                            <td className="p-4 text-gray-300 text-sm">
                                                                {isInlineEditing ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editedRows[cert.id]?.position ?? cert.position}
                                                                        onChange={(e) => handleInlineChange(cert.id, 'position', e.target.value)}
                                                                        className="bg-[#111] border border-gray-700 rounded px-2 py-1 text-white w-full text-sm focus:border-orange-500 outline-none"
                                                                    />
                                                                ) : (
                                                                    <span className="px-2 py-1 rounded-full bg-gray-800 text-xs border border-gray-700">
                                                                        {cert.position}
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="p-4 text-gray-400 text-sm">{cert.date}</td>
                                                            <td className="p-4 text-right flex justify-end gap-2">
                                                                <button
                                                                    onClick={() => handleEditCertificate(cert)}
                                                                    className="text-gray-600 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-500/10"
                                                                    title="Edit"
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                </button>
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
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Add Event Form */}
                        <div className="lg:col-span-1">
                            <Card className="!bg-black border border-gray-800 sticky top-24 shadow-xl">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
                                        {editingEventId ? (
                                            <>
                                                <Pencil className="h-5 w-5 mr-2 text-orange-500" /> Edit Event
                                                <Button onClick={handleCancelEditEvent} variant="ghost" className="ml-auto text-xs text-gray-400 hover:text-white">
                                                    <X className="h-4 w-4 mr-1" /> Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="h-5 w-5 mr-2 text-orange-500" /> Add New Event
                                            </>
                                        )}
                                    </h2>
                                    <form onSubmit={handleAddEvent} className="space-y-4">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Event Type</label>
                                            <select
                                                value={eventType}
                                                onChange={(e) => setEventType(e.target.value)}
                                                className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                                            >
                                                <option value="featured">Featured (Homepage)</option>
                                                <option value="past">Past (Archive)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Event Title</label>
                                            <input
                                                type="text"
                                                value={eventTitle}
                                                onChange={(e) => setEventTitle(e.target.value)}
                                                placeholder="e.g. MindMuse"
                                                className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Date Range</label>
                                            <input
                                                type="text"
                                                value={eventDate}
                                                onChange={(e) => setEventDate(e.target.value)}
                                                placeholder="e.g. 1 Dec - 8 Dec, 2025"
                                                className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Location</label>
                                            <input
                                                type="text"
                                                value={eventLocation}
                                                onChange={(e) => setEventLocation(e.target.value)}
                                                placeholder="e.g. Online (Unstop)"
                                                className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Category</label>
                                            <input
                                                type="text"
                                                value={eventCategory}
                                                onChange={(e) => setEventCategory(e.target.value)}
                                                placeholder="e.g. Quiz Competition"
                                                className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Description</label>
                                            <textarea
                                                value={eventDescription}
                                                onChange={(e) => setEventDescription(e.target.value)}
                                                placeholder="Event details..."
                                                className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600 h-24"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Tags (comma separated)</label>
                                            <input
                                                type="text"
                                                value={eventTags}
                                                onChange={(e) => setEventTags(e.target.value)}
                                                placeholder="e.g. Sports, Quiz, Fun"
                                                className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Registration Link</label>
                                            <input
                                                type="url"
                                                value={eventLink}
                                                onChange={(e) => setEventLink(e.target.value)}
                                                placeholder="https://..."
                                                className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Event Image URL</label>
                                            <div className="relative">
                                                <input
                                                    type="url"
                                                    value={eventImageUrl}
                                                    onChange={(e) => setEventImageUrl(e.target.value)}
                                                    placeholder="https://example.com/image.jpg"
                                                    className="w-full p-3 bg-[#111] border border-gray-800 rounded-md text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder-gray-600"
                                                    required
                                                />
                                                <LinkIcon className="absolute right-3 top-3 text-gray-500 h-5 w-5 pointer-events-none" />
                                            </div>
                                            <p className="text-[10px] text-gray-500 mt-1">Paste a direct link to an image.</p>
                                        </div>
                                        <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black font-bold py-3 mt-2 transition-all" disabled={loading}>
                                            {loading ? <span className="flex items-center"><Loader2 className="animate-spin mr-2 h-4 w-4" /> Processing...</span> : (editingEventId ? "Update Event" : "Add Event")}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Events List */}
                        <div className="lg:col-span-2">
                            <Card className="!bg-black border border-gray-800 shadow-xl h-full">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-6 text-white">Managed Events</h2>
                                    {events.length === 0 ? (
                                        <div className="text-center py-10 text-gray-500 bg-[#111] rounded-lg border border-gray-800 border-dashed">
                                            <p>No events found. Add one to get started.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {events.map((evt) => (
                                                <div key={evt.id} className="bg-[#111] border border-gray-800 rounded-lg overflow-hidden flex flex-col">
                                                    <div className="h-32 bg-gray-800 relative">
                                                        {evt.image ? (
                                                            <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                                                        )}
                                                        <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 rounded text-[10px] text-white uppercase font-bold border border-gray-700">
                                                            {evt.eventType || "featured"}
                                                        </div>
                                                        <div className="absolute top-2 right-2 flex gap-1">
                                                            <button
                                                                onClick={() => handleEditEvent(evt)}
                                                                className="bg-black/50 hover:bg-blue-500 text-white p-2 rounded-full transition-all"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteEvent(evt.id)}
                                                                className="bg-black/50 hover:bg-red-500 text-white p-2 rounded-full transition-all"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 flex-1 flex flex-col">
                                                        <h3 className="font-bold text-white mb-1">{evt.title}</h3>
                                                        <p className="text-xs text-orange-500 mb-2">{evt.date}</p>
                                                        <p className="text-gray-400 text-xs line-clamp-2 mb-3 flex-1">{evt.description}</p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {evt.tags?.map(tag => (
                                                                <span key={tag} className="text-[10px] px-2 py-1 bg-gray-800 rounded-full text-gray-300">{tag}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
