
import { useContext } from 'react';
import { handlePayment } from './services/payment';
import { AuthStore } from '../../Store/AuthStore';

const Premium = () => {
    const { setUser, user } = useContext(AuthStore)

    const silverMemPrice = 500000
    const goldMemPrice = 700000

    return (
        <div className="" >
            {user.isPremium ? 
            <p className='text-white text-2xl p-10'>You are already a premium member !!</p>
            :
                <div className='flex w-[70%] mx-auto flex-col items-center gap-2 lg:flex-row my-20'>
                    <div className="card bg-gray-600 text-white rounded-box grid grow px-10 py-2">
                        <h1 className="font-bold text-xl my-3">
                            Silver Membership 💎 - {silverMemPrice / 100} INR
                        </h1>
                        <ul>
                            <li>✅ Unlock Chat Feature</li>
                            <li>✅ Show verfied badge</li>
                            <li>✅ 3 Months</li>
                            <li>✅ 100 Connection Request Per Day</li>
                        </ul>
                        <button
                            onClick={() => {
                                handlePayment("silver", setUser);
                            }}
                            className="btn bg-gray-900 text-white outline-none border-none w-fit my-3 px-10"
                        >
                            Buy
                        </button>
                    </div>
                    <div className="text-white">OR</div>
                    <div className="card bg-gray-600 text-white rounded-box grid grow px-10 py-2">
                        <h1 className="font-bold text-xl my-3">
                            Gold Membership 👑 - {goldMemPrice / 100} INR
                        </h1>
                        <ul>
                            <li>✅ Unlock Chat Feature</li>
                            <li>✅ Show verfied badge</li>
                            <li>✅ 6 Months</li>
                            <li>✅ Unlimited Connection Request Per Day</li>
                        </ul>
                        <button
                            onClick={() => {
                                handlePayment("gold", setUser);
                            }}
                            className="btn bg-gray-900 text-white outline-none border-none w-fit my-3 px-10"
                        >
                            Buy
                        </button>
                    </div>
                </div>
            }
        </div >
    )
}

export default Premium