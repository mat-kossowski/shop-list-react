import PropTypes from 'prop-types'

const ButtonB = ({ color, text, onClick }) => {
  let px;
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
      borderRadius:'7px',
      }}
      className='btn'
    >
      {text}
    </button>
  )
}

ButtonB.defaultProps = {
  color: 'steelblue',
}

ButtonB.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}
export default ButtonB;
