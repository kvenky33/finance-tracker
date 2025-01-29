import React,{useState} from 'react'
import './style.css'
import Input from "../Input"
import Button from "../Button"
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth,db,provider } from '../../firebase'
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom'

  const SignUpSignIn = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [haveAccount,setHaveAccount] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  
  function signupwithEmail(){
    setLoading(true)
    if(name!=="" && email!=="" && password!=="" && confirmPassword!==""){
      if(password === confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            createDoc(user)
            // console.log(user)
            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setLoading(false)
            toast.success('User Created!')
            navigate("/dashboard")
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false)
            // ..
          });   
      }
      
      else{
        setLoading(false)
        // console.log('Confirm Password not match with the Password')
        toast.error('Password and Confirm Password not match');
      }
    }
    else{
      setLoading(false)
      console.log("All Fields are mandatory");
      toast.error('All Fields are Mandatory');
    }
  }
  // function login with Email 
  function loginwithEmail(){
    setLoading(true)
    if(email!=="" && password!=="" ){
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("User Loged In")
        setLoading(false)
        navigate("/dashboard")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        setLoading(false)
      });
    }
    else{
      toast.error("All fields are mandatory")
      setLoading(false)
    }
    
    }



  //  function tocreate doc of the user
   async function createDoc(user){
    setLoading(true)
    if(!user){
      return;
    }
    const userRef = doc(db,"users",user.uid);
    const userData = await getDoc(userRef);
    if(!userData.exists()){
      try{
        await setDoc(doc(db,"users",user.uid),{
          name:user.displayName?user.displayName:name,
          email:user.email,
          photoURL:user.photoURL?user.photoURL:" ",
          createdAt:new Date(),
        })
        setLoading(false)
      }
      catch(e){
        toast.error(e.message);
        setLoading(false)
      }
    }
    else{
      toast.error("User Already exists")
      setLoading(false)
    }

  }
  
    //  singnup/signIn using google

    function googleAuth(){
      setLoading(true)
      try {
        signInWithPopup(auth, provider)
        .then((result) => {
        
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          setLoading(false)
          createDoc(user)
          navigate("/dashboard")
          toast.success("User Authenticated !")
        }).catch((error) => {
          setLoading(false)
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
        });
        
      } catch (error) {
        setLoading(false)
        toast.error(error.message)
      }
  }
   

  return (
    <>
    { haveAccount ?<div className='singUp-wrapper'>
      <h2  className='heading'> SignIn to <span>Financly</span></h2>
 
      <form>
         <Input label={'Email'} type="email" state={email} setState={setEmail} placeholder={'Gautam@333gmail.com' }/>
         <Input label={'Password'} type='password' state={password} setState={setPassword} placeholder={'Gautam@123' }/>
         <Button text={loading?'Loading...':'SignIn Using Email and Password'} onClick={loginwithEmail} disable={loading}/>
         <p className='Or-text'>Or</p>
         <Button text={loading?'Loading...':'SignIn Using Google'} onClick={googleAuth} blue={true}  />
         <p className='click-text'  onClick={()=>setHaveAccount(!haveAccount)} >Or Don't have account , Click here!</p>

      </form>
    </div> : 
    <div className='singUp-wrapper'>
      <h2  className='heading'> Signup On <span>Financly</span></h2>
 
      <form>
         <Input label={'Full Name'}  type="text" state={name} setState={setName} placeholder={'Gautam Varma' }/>
         <Input label={'Email'} type="email" state={email} setState={setEmail} placeholder={'Gautam@333gmail.com' }/>
         <Input label={'Password'} type='password' state={password} setState={setPassword} placeholder={'Gautam@123' }/>
         <Input label={'Confirm Password'} type='password' state={confirmPassword} setState={setConfirmPassword} placeholder={'Gautam@123' }/>
         <Button text={loading?'Loading...':'SignUp Using Email and Password'} onClick={signupwithEmail} disable={loading}/>
         <p className='Or-text'>Or</p>
         <Button text={loading?'Loading...':'SignUp Using Google'} onClick={googleAuth} blue={true}  />
         <p className='click-text' onClick={()=>setHaveAccount(!haveAccount)}>Or Already have an account, Click here!</p>
      </form>
    </div>
    }
    </>
  )
}

export default SignUpSignIn
