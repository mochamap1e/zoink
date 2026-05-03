import styles from "./Home.module.css";

export default function Home() {
    return (
        <div>
            <img className={styles.pfp} src="/zoink.jpg" />
        </div>
    );
}