import userModel  from '../Models/users.js';
import bcrypt from 'bcrypt';





export const signupUser = async (req, res) => {

    const { email, password, confirmPassword } = req.body   

    if (password == confirmPassword){

    
    try {
        let checkUser = await userModel.findOne({ email: email  })
      
        if (!checkUser) {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);


            // enter user if it does not exist already
            let result = await userModel.create({
                ...req.body,
                password: passwordHash
            })
            res.send({
                data: result,
                message: "user created",
                status: true
            })
        } else {
            res.status(403).json({ status: false, error: "user already exist" })
        }



    } catch (error) {
        res.status(403).json({ status: false, error: error })
    }

    } else{
        res.status(403).json({ status: false, error: "password should be equal to confirm password" })

    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await userModel.findOne({ email: email })
        if (result) {
            console.log(result);
            // return;
            // if result true compare database password and user given password
            const isPasswordValid = await bcrypt.compare(password, result.password)
            if (isPasswordValid) {
              
                res.send({
                    status: true,
                    message: "user loggedIn successfully"
                })
            } else {
                res.status(403).json({ status: false, error: "Incorrect Details" })
            }

        } else {
            res.status(403).json({ status: false, error: "user not found" })
        }

    } catch (error) {
        res.status(403).json({ status: false, error: error })
    }

}

