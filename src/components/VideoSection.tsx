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
        <section className="w-full bg-zinc-50 dark:bg-black py-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Caption */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        In the gym. In the zone.
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800"
                >
                    {/* Video Element */}
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        // Using a reliable placeholder video for now (Mixkit/Pexels)
                        // In production this would be the gym shaker video
                        src="/gym1.mp4"
                    />

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

                </motion.div>
            </div>
        </section>
    );
}
