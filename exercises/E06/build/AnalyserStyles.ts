namespace E06 {
    export interface AnalyserStyle {
        maxAmplitudeHeight: number;
        shadowHeight: number;
        shadowColorFrom: RGBA;
        shadowColorTo: RGBA;
        amplitudeColorLow: RGBA;
        amplitudeColorHigh: RGBA;
    }

    export interface RadialAnalyserStyle extends AnalyserStyle {
        innerRadius: number;
    }
}