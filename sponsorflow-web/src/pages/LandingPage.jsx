import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Bolt, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full text-center space-y-8">
                <div className="flex justify-center gap-4 mb-4">
                    <Rocket className="w-16 h-16 text-primary animate-pulse" />
                    <Bolt className="w-16 h-16 text-purple-500 animate-pulse delay-100" />
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">SponsorFlow</span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    The premier marketplace connecting world-class brands with influential creators. Scale your marketing or monetize your audience today.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                    <Button
                        size="lg"
                        onClick={() => navigate('/register')}
                        className="w-full sm:w-auto px-8 py-4 text-lg"
                    >
                        Get Started <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => navigate('/login')}
                        className="w-full sm:w-auto px-8 py-4 text-lg"
                    >
                        Login
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-8 text-center w-full text-slate-400 dark:text-slate-600 text-sm">
                &copy; {new Date().getFullYear()} SponsorFlow. All rights reserved.
            </div>
        </div>
    );
};

export default LandingPage;
