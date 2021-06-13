import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { isEmpty, isEmail, isLength, isMatch } from '../../utils/validation/Validation'

const initialState = {
    name: '',
    email: '',
    Phone_Number: '',
    Adhaar_Number: '',
    Shop_Name: '',
    password: '',
    cf_password: '',
    err: '',
    success: '',
}
function Register() {
    const [user, setUser] = useState(initialState)

    const { name, email, Phone_Number, Adhaar_Number, Shop_Name, password, cf_password, err, success } = user
    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, err: '', success: '' })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (isEmpty(name) || isEmpty(password))
            return setUser({ ...user, err: "PLease enter all the fields", success: '' })

        if (!isEmail(email))
            return setUser({ ...user, err: "Invalid emails.", success: '' })

        if (isLength(password))
            return setUser({ ...user, err: "Password must be at least 6 characters.", success: '' })

        if (!isMatch(password, cf_password))
            return setUser({ ...user, err: "Password did not match.", success: '' })
        try {
            const res = await axios.post('/user/register', {
                name, email, password
            })

            setUser({ ...user, err: '', success: res.data.msg })
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
        }
    }
    return (
        <div className='login_page'>
            <h2>Register</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter your name" id="name"
                        value={name} name="name" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Enter email address" id="email"
                        value={email} name="email" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="Phone_number">Phone Number</label>
                    <input type="number" placeholder="Enter phone number" id="Phone_Number"
                        value={Phone_Number} name="Phone_Number" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="Adhaar_Number">Adhaar Number</label>
                    <input type="number" placeholder="Enter Adhaar Number" id="Adhaar_Number"
                        value={Adhaar_Number} name="Adhaar_Number" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="Shop_Name">Shop name</label>
                    <input type="text" placeholder="Enter Shop name" id="Shop_Name"
                        value={Shop_Name} name="Shop_Name" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"
                        value={password} name="password" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="cf_password">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" id="cf_password"
                        value={cf_password} name="cf_password" onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <button type="submit">Register</button>
                </div>
            </form>

            <p>Already Registered?<Link to='/login'>Login</Link></p>
        </div>
    )

}
export default Register;