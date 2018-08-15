import { GridConfig } from '@model/grid-config';
import { FlashCardConfig } from '@model/flash-card-config';

export interface User {
    name: string;
    lastLetterGrade?: string;
    lastPercentageGrade?: number;
    flashCardConfig?: FlashCardConfig;
    gridConfig?: GridConfig;
}
