import styles from './TimezoneCard.module.css'

interface Props {
  name: string,
  date: string,
  time: string
  onClose: Function
}

function TimezoneCard({name, date, time, onClose}: Props) {
  return (
    <div className={styles.card}>
      <span className={styles['close-icon']} onClick={() => onClose()}>X</span>
      <h2 className={styles['card_title']}>{name}</h2>
      <p className={styles.date}>{date}</p>
      <p className={styles.time}>{time}</p>
    </div>
  )
}

export default TimezoneCard

