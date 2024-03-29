export interface AchievementInput {
    key: string;
    name: string;
    description: string;
    icon?: string;
}

export interface Achievement extends AchievementInput {
    date: Date;
}

class AchievementsStore {
    static getAchievements() {
        return JSON.parse(localStorage.getItem('achievements') ?? '{}');
    }

    static hasAchievement(key: string) {
        return this.getAchievements()[key] !== undefined;
    }

    static setAchievement(key: string) {
        const achievements = this.getAchievements();
        achievements[key] = true;
        localStorage.setItem('achievements', JSON.stringify(achievements));
    }

    static clearAchievements() {
        localStorage.removeItem('achievements');
    }
}

export class AchievementsBus {
    EVENT_TYPE = 'achievement';
    static sendAchievement(achievement: AchievementInput) {
        if (AchievementsStore.hasAchievement(achievement.key)) {
            return;
        }
        AchievementsStore.setAchievement(achievement.key);
        const event = new CustomEvent(this.EVENT_TYPE, { detail: { ...achievement, date: new Date(), icon: achievement.icon ?? '🏆' } });
        document.dispatchEvent(event);
    }

    static clearAchievements() {
        AchievementsStore.clearAchievements();
    }

    static onAchievement(cb: (achievement: Achievement) => void) {
        const listenerFn = (e: Event) => {
            cb((e as CustomEvent).detail)
        }
        document.addEventListener(this.EVENT_TYPE, listenerFn);
        return () => {
            document.removeEventListener(this.EVENT_TYPE, listenerFn)
        }
    }
}