
import Signup from '../../Components/Signup';
import Signin from '../../Components/Signin';
import '../../styles/auth.css';


 const SignupPage = () => {

  return (
      <div className="left">
      <div className="right">
        <Signin setFormType={'signin'}/>
      </div>
      <div className="right">
        <Signup setFormType={'signup'}/>
      </div>
    </div>
  );
}
export default SignupPage;
