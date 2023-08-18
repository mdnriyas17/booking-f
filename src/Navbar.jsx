
import { useNavigate } from "react-router-dom";
function Navbar(props) {
    let navigate = useNavigate()
    let doLogout = () => {
        localStorage.removeItem('react_app_token');
        navigate('/')
        
      }
  return (
    <nav className="navbar navbar-expand-lg bg-danger">
  <div className="container-fluid">
    <a className="navbar-brand text-light" href="#" ><img style={{width:"200px", height:"50px"}} src="https://www.pngitem.com/pimgs/m/193-1936701_transparent-bookmyshow-logo-hd-png-download.png" /></a>

    
      <div className='d-flex flex-wrap'>
      <h4 className=" navbar-text text-light">
        {props.data}
      </h4>
      <button className='m-2 btn btn-secondary ' onClick={doLogout}>Logout</button>
      </div>
  </div>
</nav>
  )
}

export default Navbar