import axios from "axios";
import { Howl } from "howler";
import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";

import styles from "./Home.module.css";

export default function Home() {
    // ---------- MUSIC ---------- //

    const musicRef = useRef(null);

    const [musicPlaying, setMusicPlaying] = useState(false);

    useEffect(() => {
        musicRef.current = new Howl({
            src: "/audio/music.mp3",
            volume: 0.5,
            loop: true,
            preload: true
        });

        return () => {
            musicRef.current.stop();
            musicRef.current.unload();
        };
    }, []);

    useEffect(() => {
        const events = ["click", "keydown", "touchstart"];

        function onInteract() { setMusicPlaying(true); }

        events.forEach(event => window.addEventListener(event, onInteract));

        if (navigator.userActivation.hasBeenActive) setMusicPlaying(true);

        return () => {
            setMusicPlaying(false);
            events.forEach(event => window.removeEventListener(event, onInteract));
        }
    }, []);

    useEffect(() => {
        const music = musicRef.current; if (!music) return;
        // musicPlaying ? music.play() : music.pause()
    }, [musicPlaying]);

    // ---------- stuff. ---------- //

    const [zoinkData, setZoinkData] = useState(null);

    async function getZoink() {
        try {
            const playerResponse = await axios.get("https://pointercrate.com/api/v1/players/53408/");

            const playerData = playerResponse.data.data;
            const completions = playerData.records;
            const verifications = playerData.verified;

            console.log("Fetched", playerData);
            console.log("Completions", completions);
            console.log("verifications", verifications);
        } catch(error) {
            console.error("Failed to fetch from Pointercrate:", error);
        }
    }

    return (
        <div className={`container ${styles.container}`}>
            <img className={styles.pfp} src="/zoink.jpg" />

            <motion.div
                className={styles.flash}
                animate={{ opacity: 0, transition: { duration: 1 } }}
            />
        </div>
    );
}