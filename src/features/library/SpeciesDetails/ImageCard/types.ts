export interface ImageCardProps {
    image: any;
    tags: string[];
    expanded: boolean;
    onToggle: () => void;
}