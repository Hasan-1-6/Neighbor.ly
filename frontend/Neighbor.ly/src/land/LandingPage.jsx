import React from 'react'
import { Bell, CreditCard, Users, Calendar, MessageSquare, FileText, CheckCircle, Building2, Mail, Phone, MapPin, Clock, Shield, Smartphone } from 'lucide-react';

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const LandingPage = () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const features = [
        {
            icon: Bell,
            title: 'Smart Notifications',
            description: 'Keep residents informed with instant notifications for important announcements, events, and updates.'
        },
        {
            icon: CreditCard,
            title: 'Automated Billing',
            description: 'Generate and manage maintenance bills, track payments, and send automated reminders effortlessly.'
        },
        {
            icon: Users,
            title: 'Visitor Management',
            description: 'Secure your society with digital visitor logs, pre-approvals, and real-time entry tracking.'
        },
        {
            icon: Shield,
            title: 'Security Alerts',
            description: 'Monitor security incidents, manage gate access, and maintain a safe community environment.'
        },
        {
            icon: Calendar,
            title: 'Facility Booking',
            description: 'Easy booking system for common areas like clubhouse, gym, swimming pool, and party halls.'
        },
        {
            icon: MessageSquare,
            title: 'Community Forum',
            description: 'Foster community engagement with discussion boards, polls, and social features.'
        },
        {
            icon: FileText,
            title: 'Document Management',
            description: 'Store and share important documents, meeting minutes, and society records securely.'
        },

    ];
    const benefits = [
        'Reduce administrative workload by 70%',
        'Improve payment collection rates',
        'Enhance resident satisfaction',
        'Transparent financial management',
        'Paperless and eco-friendly operations',
        'Real-time insights and analytics'
    ];
    return (

        <>
            <header className='fixed z-50 top-0 w-full border-b border-gray-300 bg-white'>
                <div className='max-w-7xl mx-auto px-4 md:px-6'>
                    <div className='flex justify-around items-center py-4'>
                        <div className='flex items-center'>
                            <h1 className='font-semibold text-2xl'><b>Neighbor.ly</b> - Society Management App</h1>
                        </div>
                        <nav className='hidden md:flex'>
                            <ul className='flex items-center justify-center gap-7 font-medium text-xl'>
                                <li><a href='/'></a></li>
                                <li><a href='#features' className="text-gray-700 hover:bg-gray-200 px-2 py-1 rounded">Features</a></li>
                                <li><a href='#benefits' className="text-gray-700 hover:bg-gray-200 px-2 py-1 rounded">Benefits</a></li>
                                <li><a href='#contact' className="text-gray-700 hover:bg-gray-200 px-2 py-1 rounded">Contact</a></li>
                            </ul>
                        </nav>
                        <a href="/login" className="hidden md:inline-block bg-blue-600 font-bold text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                            Login
                        </a>

                        <button onClick={() => { setMobileOpen(!mobileOpen) }} className='relative md:hidden'>{mobileOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}</button>
                    </div>
                    <nav className={`md:hidden w-screen border-t transition-all duration-300 ease-in-out border-gray-300 overflow-hidden ${mobileOpen ? 'max-h-64 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                        <ul className='flex flex-col space-y-4'>
                            <li><a href='#features' className="font-bold text-gray-700 hover:text-gray-900">Features</a></li>
                            <li><a href='#benefits' className="font-bold text-gray-700 hover:text-gray-900">Benefits</a></li>
                            <li><a href='#contact' className="font-bold text-gray-700 hover:text-gray-900">Contact</a></li>
                            <li><a href='/login' className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full'>Login</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className='pt-24'>
                <div className="container mx-auto px-6 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-gray-900 mb-6">
                                Simplify Your Society Management
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Streamline communication, automate billing, manage visitors, and keep your residential society running smoothly with our all-in-one management platform.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    Schedule Demo
                                </button>
                                <a className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors" href='/login'>
                                    Get Started
                                </a>
                            </div>
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-gray-900">Save Time</div>
                                        <div className="text-gray-600">Automate daily tasks</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-gray-900">Secure</div>
                                        <div className="text-gray-600">Bank-grade security</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Smartphone className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-gray-900">Mobile First</div>
                                        <div className="text-gray-600">Access anywhere</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img src='/HeroBuilding.jpeg' className="w-full h-auto"></img>
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600">✓</span>
                                    </div>
                                    <div>
                                        <div className="text-gray-900">Easy Setup</div>
                                        <div className="text-gray-600">Ready in 5 minutes</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section id="features" className="min-h-screen pt-32 px-6">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
                                Features
                            </div>
                            <h2 className="text-gray-900 mb-4">
                                Everything You Need to Manage Your Society
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Powerful features designed to simplify society management and enhance resident experience
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                        <feature.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="benefits" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
                                    Benefits
                                </div>
                                <h2 className="text-gray-900 mb-6">
                                    Transform Your Society Management Experience
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Our platform empowers management committees and residents with tools that make everyday tasks simpler, faster, and more efficient.
                                </p>

                                <div className="space-y-4 mb-8">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                    Learn More
                                </button>
                            </div>

                            <div className="order-1 md:order-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="bg-white p-6 rounded-xl shadow-md">
                                            <div className="text-blue-600 mb-2">100%</div>
                                            <div className="text-gray-700">Papeless Work</div>
                                        </div>
                                        <div className="bg-blue-600 p-6 rounded-xl shadow-md text-white">
                                            <div className="mb-2">30 Mins</div>
                                            <div>Saved Per day/Staff</div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 mt-8">
                                        <div className="bg-white p-6 rounded-xl shadow-md">
                                            <div className="text-blue-600 mb-2">10,000+</div>
                                            <div className="text-gray-700">Happy Residents</div>
                                        </div>
                                        <div className="rounded-xl overflow-hidden shadow-md">
                                            <img src='happysociety.jpeg'></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer id='contact' className="bg-gray-900 text-gray-300 py-12">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-4 gap-8 mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Building2 className="w-6 h-6 text-blue-500" />
                                    <span className="text-white">SocietyHub</span>
                                </div>
                                <p className="text-gray-400 mb-4">
                                    Making society management simple, efficient, and transparent for everyone.
                                </p>
                                <div className="flex gap-4">
                                    <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        f
                                    </a>
                                    <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        t
                                    </a>
                                    <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        in
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white mb-4">Product</h3>
                                <ul className="space-y-2">
                                    <li><a href="#features" className="hover:text-blue-500 transition-colors">Features</a></li>
                                    <li><a href="#benefits" className="hover:text-blue-500 transition-colors">Benefits</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white mb-4">Contact</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span>support@societyhub.com</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span>+91 1234566789</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span>Allahabad, Uttar Pradesh, India</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-center gap-4">
                            <p className="text-gray-400 text-center">© 2025 SocietyHub. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default LandingPage