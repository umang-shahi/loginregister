import "./login.scss";


function Login(){


  
    return(
      <div className="login">
        <h1>Login</h1>
        <form>
            <input type="text" placeholder="Enter your Email"/>
            <input type="text" placeholder="Enter your Password"/>
            <button>Login</button>
            
        </form>
      </div>
    )
}

export default Login;