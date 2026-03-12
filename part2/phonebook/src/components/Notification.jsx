const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={isSuccess ? 'success' : 'failure'}>
      {message}
    </div>
  )
}

export default Notification