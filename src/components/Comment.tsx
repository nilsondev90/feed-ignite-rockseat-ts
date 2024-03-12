import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

/* 
Tudo que é clicável será usado a nomenclatura "handle"
*/

interface CommentProps {
    content: string,
    OnDeleteComment: (comment: string) => void /* void = não retorna nada */
}

export function Comment({ content, OnDeleteComment }: CommentProps) {

    const [likeCount, setLikeCount] = useState(0)

    function haldleDeleteComment() {
        OnDeleteComment(content)
    }

    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1
        })
    }

    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://images.unsplash.com/photo-1707343846292-56e4c6abf291?q=60&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Nilson Lopes</strong>
                            <time title="11 de maio às 08:13H" dateTime="2022-05-11 08:13:30">Cerca de 1h atrás</time>
                        </div>
                        <button onClick={haldleDeleteComment} title='Deletar Comentário'>
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>{content}</p>
                </div>
                <footer className={styles.footerComment}>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Apludir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}