import { Howl } from "howler";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Start.module.css";

export default function Start() {
    const navigate = useNavigate();

    const videoRef = useRef(null);
    const [clicked, setClicked] = useState(false);

    const glitter = new Howl({ src: "/audio/glitter.mp3", preload: true });

    function click() {
        if (clicked) return; setClicked(true);

        const video = videoRef.current;

        const audioContext = new AudioContext();
        const source = audioContext.createMediaElementSource(video);
        const gainNode = audioContext.createGain();

        gainNode.gain.value = 5; 

        source.connect(gainNode);
        gainNode.connect(audioContext.destination);

        glitter.play();
        video.play();

        video.addEventListener("ended", () => navigate("/home"));
    }

    return (
        <div>
            <video
                ref={videoRef}
                className={styles.video} 
                src="/video/wassup.mp4"
            />

            <motion.div 
                className={styles.container}
                animate={clicked ? { opacity: 0 } : { opacity: 1 }}
            >
                <motion.h1
                    className={styles.name}
                    onClick={click}

                    initial={{ scale: 0 }}
                    animate={clicked ? { scale: 0 } : { scale: 1 }}
                    whileHover={!clicked && { scale: 1.1, cursor: "pointer" }}
                    whileTap={!clicked && { scale: 0.9 }}
                >Zoink</motion.h1>

                {!clicked && (
                    <p className={styles.watermark}>
                        made by <a href="https://mochamaple.cafe" target="_blank">mochamap1e</a> :3
                    </p>
                )}
            </motion.div>
        </div>
    );
}