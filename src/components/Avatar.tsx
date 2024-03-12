import { ImgHTMLAttributes } from 'react'
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean
    // src: string - não precisa porque ja existe em "HTMLImageElement"
}

export function Avatar({hasBorder = true, ...props}: AvatarProps) {

    return(
        <img
            className={hasBorder ? styles.avatar : styles.avatarWithBorder}
            {...props} /* guarda todas as propriedades passadas como "src", "alt", "title" etc. */
        />
    )
}