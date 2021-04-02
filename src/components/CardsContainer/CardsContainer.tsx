import styles from './CardsContainer.module.css'

interface Props {
  children: React.ReactNode
}

export default function CardsContainer({ children }: Props) {
  return (
    <div className={styles.container} data-testid="container">
      {children}
    </div>
  )
}
