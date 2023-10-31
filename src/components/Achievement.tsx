import * as React from 'react';
import { AchievementsBus, type Achivement } from "../lib/achievements";

interface AchievementProps {
    achievement: Achievement;
}

export const Achievement: React.FC<AchievementProps> = ({achievement, children}) => {
    return <div onClick={() => {
        AchievementsBus.sendAchievement(achievement);
    }}>{children}</div>
}