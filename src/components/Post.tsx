/* 
Ordem de criação:
    1 html
    2 esticização
    3 funcionamento
*/
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { format, formatDistanceToNow } from 'date-fns';

import styles from './Post.module.css'

import { Comment } from './Comment'
import { Avatar } from './Avatar'
import { ptBR } from 'date-fns/locale/pt-BR';

interface Author {
    name: string
    role: string
    avatarUrl: string
}

interface Content {
    type: 'paragraph' | 'link'
    content: string
}

interface PostProps {
    author: Author
    publishedAt: Date
    content: Content[]
}

export function Post({ author, publishedAt, content }: PostProps) {

    /* 
    ao inves de "Post(props)" para usar "props.author.avatarUrl"
    vamos fazer a desestruturação de Post({ author }) para usar "author.avatarUrl"
    
    */

    //Formatação em Java Script
    //Intl.DateTimeFormat - Formatos de data JavaScript
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
    /* const publishedDateFormatted = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit', // Usar o dia com 2 dígitos
        month: 'long', // Usar para aparecer o nome do mês completo
        hour: '2-digit', // Usar a hora com 2 dígitos
        minute: '2-digit', // Usar o minuto com 2 dígitos
    }).format(publishedAt) */

    const [comments, setComments] = useState([
        'Gostei das dicas'
    ])

    const [newCommentText, setNewCommentText] = useState('')

    //Formatação em da lib 'date-fns'
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()

        //const newComment = event.target.comment.value
        // Pegando o valor digitado no <textarea>
        //console.log(event.target.comment.value)
        //setComments([...comments, newComment])
        // Limpar o <textarea> apos publicar 
        //event.target.comment.value = ''


        // Modo Correto
        setComments([...comments, newCommentText])

        // Voltando para o valor padrão
        setNewCommentText('')

    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('') // Resetar mensagem de erro de preenchimento obrigatório
        setNewCommentText(event.target.value)
        //console.log(event.target.value)

    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Preencha este campo camarada!')
    }

    function deletComment(commentToDelete: string) {

        /* Listar todos os comentarios, exceto do botão clicado */
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment !== commentToDelete
        })

        // Setando uma nova lista de comentários sem o comentário que foi clicado
        setComments(commentsWithoutDeleteOne)

        //console.log(`Deletar comentário: ${comment}`)
    }

    const isNewCommentEmpty = newCommentText.length === 0


    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>
            <div className={styles.content}>
                {
                    content.map(line => {
                        if (line.type == 'paragraph') {
                            return <p key={line.content}>{line.content}</p>
                        } else if (line.type == 'link') {
                            return <p key={line.content}>
                                <a href='#'>{line.content}</a>
                            </p>
                        }
                    })
                }
            </div>
            <form onSubmit={handleCreateNewComment} className={styles.commentform}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    name='comment'
                    placeholder="Deixe um comentário"
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer className={styles.commentformFooter}>
                    <button 
                        disabled={isNewCommentEmpty}
                        type="submit">
                            Publicar
                    </button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment}
                            content={comment}
                            OnDeleteComment={deletComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}