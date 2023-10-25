import React from "react";
import { AchievementsBus, type Achievement } from "../lib/achievements";
import styles from './Achievements.module.css'
import { defineStyleVars } from "astro/compiler-runtime";

class AchievementsStore {
    constructor() {}
}
console.log("Achievements loaded");

interface AchievementProps {
    achievement: Achievement;
}
const Achievement = ({achievement}: AchievementProps) => {
    const [className, setClassName] = React.useState<string>(styles.in);
    React.useEffect(() => {
        setTimeout(() => {
            setClassName(styles.out);
        }, 10000);
    }, [])
    return (
        <div className={`${styles.achievement} ${className}`}>
            <div className={styles.icon}>{achievement.icon}</div>
            <div>
                <div><b>Achievement Unlocked!</b></div>
                <div>{achievement.description}</div>
            </div>
        </div>
    );
}

let sfx = new Audio('/achieve.mp3');
sfx.volume = .3;

export const Achievements = () => {
    const [achievements, setAchievements] = React.useState<Achievement[]>([]);
    React.useEffect(() => {
        const unsubscribe = AchievementsBus.onAchievement((achievement) => {
            setAchievements([...achievements, achievement]);
            sfx.play();
            console.log("Achievement unlocked: " + achievement.name);
        });
        return unsubscribe;
    }, [achievements])
    console.log(achievements)

    return <div className={styles.achievements}>
        {achievements.map((achievement) => {
            return <Achievement key={achievement.key} achievement={achievement} />
        })}
    </div>
}