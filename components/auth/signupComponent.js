import React, {useState, useEffect }from 'react';
import Router from 'next/router'
import {signup, isAuth} from '../../actions/auth'

const SignupComponent = () => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        loading:false,
        message: '',
        showForm:true
    })

    const {name, email, password, error, loading, message, showForm} = values ;

    useEffect(()=>{
        isAuth() && Router.push('/blogs');
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault()
        // console.table({name, email, password, error, loading, message, showForm});
        setValues({...values, loading: true, error: false});
        const user = {name, email, password}
        signup(user).then(data=>{
                if(data.error){
                    setValues({...values, error: data.error, loading: false})
                }else{
                    setValues({...values,
                        name: '',
                        email: '',
                        password: '', 
                        error: '', 
                        loading: false, 
                        message: data.message, 
                        showForm:false})
                }
            })
    }
    const handleChange = name => e =>{
        setValues({...values, error:false, [name]: e.target.value})
    }
    const showLoading = () => loading ? <div className="alert alert-info">Loading...</div> : '';
    const showError = () => error ? <div className="alert alert-danger">{error}</div> : '';
    const showMessage = () => message ? <div className="alert alert-info">{message}</div> : '';
    const signupForm = ()=>{
        return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input 
                value={name}
                onChange={handleChange('name')} 
                type="text" 
                className="form-control" 
                placeholder="Type Your Name"/>
            </div>
            <div className="form-group">
                <input 
                value={email}
                onChange={handleChange('email')} 
                type="email" 
                className="form-control" 
                placeholder="Type Your email"/>
            </div>
            <div className="form-group">
                <input 
                value={password}
                onChange={handleChange('password')}
                type="password" 
                className="form-control" 
                placeholder="Type Your password"/>
            </div>
            <div>
                <button className="button buttom-primary">SignUp</button>
            </div>
            
        </form>
        )
    }
    return (    
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
        </React.Fragment>
    )
};

export default SignupComponent;