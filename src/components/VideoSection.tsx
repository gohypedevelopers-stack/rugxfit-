"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <section className="relative z-20 w-full bg-zinc-50 dark:bg-black pt-12 border-t border-zinc-100 dark:border-zinc-800">
            {/* Caption - Kept constrained */}
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        In the gym. In the zone.
                    </h2>
                </div>
            </div>

            {/* Video Element - With slight spacing */}
            <div className="relative w-full px-4 md:px-12">
                <div className="relative w-full aspect-video bg-white dark:bg-zinc-900 shadow-2xl rounded-3xl overflow-hidden">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                    >
                        <source src="/gym1.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Overlays / Controls */}
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors flex items-center justify-center group pointer-events-none">
                        {/* Center Play Button (Visible on Hover/Pause) */}
                        <button
                            onClick={togglePlay}
                            className={`w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-300 pointer-events-auto hover:bg-white/20 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                        >
                            {isPlaying ? <Pause className="w-8 h-8 text-white" fill="white" /> : <Play className="w-8 h-8 text-white ml-1" fill="white" />}
                        </button>
                    </div>

                    {/* Bottom Controls */}
                    <div className="absolute bottom-6 right-6 flex gap-4">
                        <button
                            onClick={toggleMute}
                            className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
