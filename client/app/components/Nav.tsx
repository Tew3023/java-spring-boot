'use client'
import Link from 'next/link'
import { CircleUserRound ,ShoppingCart  } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Nav(){
    const router = useRouter();
     const [popup, setPopup] = useState(false)
        const [regis, setRegis] = useState(false)
        const [value1, setValue1] = useState({
            email: '',
            password: ''
        })
        const [value2, setValue2] = useState({
            email: '',
            password: '',
            confirmpass: ''
        })
        const [role , setRole] = useState('customer')
        const [error, setError] = useState('')
    
        const popupHandle = () => {
            setPopup(prev => !prev)
        }
    
        const regisHandle = () => {
            setRegis(prev => !prev)
        }
    
        const closePopup = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.target === e.currentTarget) {
                setPopup(false)
                setRegis(false)
            }
        }
    
        const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue1({
                ...value1,
                [e.target.name]: e.target.value
            })
        }
    
        const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue2({
                ...value2,
                [e.target.name]: e.target.value
            })
        }
    
        const handleLoginSubmit = async () => {
            if (!value1.email || !value1.password) {
                setError('Please fill in all fields');
                return; 
            }
        
            setError('');
        
            try {
                const res = await axios.post('http://localhost:8080/login', value1, { withCredentials: true });
        
                if (res.data.success) { 
                    setPopup(false);
        
                    if (res.data.role === "admin") {
                        router.push('/admin');
                    } else {
                        router.push('/'); 
                    }
                } else {
                    setError(res.data.message || "Wrong password or email!"); 
                }
            } catch (err) {
                console.log(err);
                setError("An error occurred during login.");
            }
        };
        
        const handleRegisterSubmit = async () => {
            if (!value2.email || !value2.password || !value2.confirmpass) {
                setError('Please fill in all fields')
            } else if (value2.password !== value2.confirmpass) {
                setError('Passwords do not match')
            } else {
                setError('')
              
            }

            const valueFormatted = {
                email: value2.email,
                password: value2.password,
                role : role
            };

              try{
                const res = await axios.post('http://localhost:8080/user',valueFormatted)
                if(res.status === 200){
                    location.replace('/')
                }

              }catch(err){
                console.log(err)
              }

        }
    return(
        <div>
        <div className="sticky top-0 w-full h-20 border-b border-zinc-300 bg-white text-black backdrop-blur-xl z-50">
            <div className="max-w-screen-lg mx-auto h-full flex items-center justify-between">
                <Link href={'/'} className="font-semibold text-xl">EATTHISSHEET</Link>
                <div className="flex space-x-5 font-semibold">
                    <Link className='hover:text-green-400 transition-all' href={'/'} ><p>Home</p></Link>
                    <Link className='hover:text-green-400 transition-all' href={'/Aboutus'} ><p>About us</p></Link>
                    <Link className='hover:text-green-400 transition-all' href={'/Restaurants'} ><p>Restaurants</p></Link>
                    <Link className='hover:text-green-400 transition-all' href={'/Contact'} ><p>Contact us</p></Link>
                </div>
                <div  className='cursor-pointer flex gap-5'>
                    <Link href={'/Cart'}><ShoppingCart   className='w-5 h-5' /></Link>
                    <CircleUserRound onClick={popupHandle} className='w-5 h-5' />
                </div>
            </div>
        </div>
        {popup && (
                <div
                    onClick={closePopup}
                    className='fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]'
                >
                    <div className='bg-white p-6 text-black relative space-y-5 rounded-md w-1/3 shadow-lg'>
                        <div className='flex justify-center text-xl font-semibold'>
                            Login with EatThisSheet
                        </div>
                        <div className='space-y-2'>
                            <p>Enter your Email</p>
                            <input
                                type="email"
                                name="email"
                                value={regis ? value2.email : value1.email}
                                onChange={regis ? handleRegisterChange : handleLoginChange}
                                placeholder='loginmail@gmail.com'
                                className='w-full px-3 py-2 border-zinc-400 border rounded-md'
                            />
                        </div>
                        <div className='space-y-2'>
                            <p>Enter your Password</p>
                            <input
                                type="password"
                                name="password"
                                value={regis ? value2.password : value1.password}
                                onChange={regis ? handleRegisterChange : handleLoginChange}
                                placeholder='password!@#$'
                                className='w-full px-3 py-2 border-zinc-400 border rounded-md'
                            />
                        </div>
                        {regis && (
                            <div className='space-y-2'>
                                <p>Confirm your Password</p>
                                <input
                                    type="password"
                                    name="confirmpass"
                                    value={value2.confirmpass}
                                    onChange={handleRegisterChange}
                                    placeholder='confirm password!@#$'
                                    className='w-full px-3 py-2 border-zinc-400 border rounded-md'
                                />
                            </div>
                        )}
                        {error && <div className="text-red-500 text-center">{error}</div>}
                        <div className='flex justify-center'>
                            {regis ? (
                                <div onClick={handleRegisterSubmit} className='flex justify-center bg-blue-500 text-white w-full rounded-lg py-2 cursor-pointer'>
                                    Register
                                </div>
                            ) : (
                                <div onClick={handleLoginSubmit} className='flex justify-center bg-blue-500 text-white w-full rounded-lg py-2 cursor-pointer'>
                                    Login
                                </div>
                            )}
                        </div>

                        <div className='flex space-x-2 justify-center'>
                            <p>Don't have an account? </p>
                            <p onClick={regisHandle} className='text-blue-500 font-semibold cursor-pointer'>
                                {regis ? 'Sign In' : 'Sign Up'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}