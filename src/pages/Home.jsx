import { Howl } from "howler";
import { useRef, useState, useEffect } from "react";

import styles from "./Home.module.css";

export default function Home() {
    const musicRef = useRef(null);
    const [musicPlaying, setMusicPlaying] = useState(false);

    // create music
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

    // play music on interact
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

    // music state hook
    useEffect(() => {
        const music = musicRef.current; if (!music) return;
        musicPlaying ? music.play() : music.pause()
    }, [musicPlaying]);

    async function getZoink() {

    }

    return (
        <div>
            <img className={styles.pfp} src="/zoink.jpg" />
        </div>
    );
}