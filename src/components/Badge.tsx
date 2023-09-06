import { ReactNode } from "react"

export enum BadgeType {
    CIRCULAR = 'circular',
    RECTANGULAR = 'rectangular'
}

type BadgeProps = {
    classes?: string, // Allow custom classes to be passed
    type: BadgeType,
    children: ReactNode
}

const Badge: React.FC<BadgeProps> = ({ children, type, classes }) => {
    // Define CSS classes based on the badge type
    let badgeClassName = '';

    if (type === BadgeType.CIRCULAR) {
        badgeClassName = 'w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white';
    } else if (type === BadgeType.RECTANGULAR) {
        badgeClassName = 'px-2 py-1 rounded-lg bg-primary text-white';
    }

    return (
        <div 
            className={`${badgeClassName} ${classes}`} // Combine the badge and custom classes
        >
            { children }
        </div>
    )
}

export default Badge
