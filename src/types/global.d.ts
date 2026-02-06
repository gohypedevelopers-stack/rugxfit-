export { };

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                src?: string;
                poster?: string;
                alt?: string;
                loading?: 'auto' | 'lazy' | 'eager';
                'camera-controls'?: boolean;
                'auto-rotate'?: boolean;
                'camera-orbit'?: string;
                'shadow-intensity'?: string;
                exposure?: string;
                ar?: boolean;
                'ar-modes'?: string;
                'rotation-per-second'?: string;
                'interaction-prompt'?: string;
                'environment-image'?: string;
                onLoad?: () => void;
            }, HTMLElement>;
        }
    }
}
