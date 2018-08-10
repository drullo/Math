import { FlashCardConfig } from '@model/flash-card-config';

export interface User {
    name: string;
    lastLetterGrade?: string;
    lastPercentageGrade?: number;
    flashCardConfig?: FlashCardConfig;
}
