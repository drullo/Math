export interface Question {
    operation: string;
    operands: number[];
    answer?: number;
    correctAnswer?: boolean;

    description?: string;
    seconds?: number;
}
