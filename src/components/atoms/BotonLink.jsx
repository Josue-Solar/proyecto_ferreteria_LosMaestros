import { Link } from 'react-router-dom'

function BotonLink({ to, children }) {
  return <Link to={to} className="btn-ver">{children}</Link>
}
export default BotonLink