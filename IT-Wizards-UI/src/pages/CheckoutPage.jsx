import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaidLinkButton from '../components/PlaidLinkButton';
import { CartContext } from '../components/CartContext';
import cauldron from '../assets/images/cauldron.png';
import RightSidebar from '../components/RightSidebar';
import AddressForm from '../components/AddressForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CheckoutPage = () => {
  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(false);
    const [userAddress, setUserAddress] = useState({
      address: '',
      city: '',
      state: '',
      zipcode: '',
    });
    const { address, city, state, zipcode } = userAddress;

    const userName = localStorage.getItem('user');

    const onInputChange = (e) => {
      setUserAddress({ ...userAddress, [e.target.name]: e.target.value });
      console.log(userAddress);
    };

    const handleOnSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log(paymentStatus);
        await axios.post(
          `http://localhost:8080/addresses?userName=${userName}`,
          {
            ...userAddress,
          }
        );
        notifyOrderSubmitted();
        cart.clearCart();
        setPaymentStatus(false);
        return navigate('/');
      } catch (error) {
        console.log('error', error);
      }
    };

  const notifyOrderSubmitted = () =>
    toast.success('Your order has successfully been submitted!');

  return (
    <div className="flex flex-row h-[calc(100vh-5rem)]">
      <div className="flex-col-1 w-11/12 justify-center border-b-4 pb-20 border-black overflow-y-auto bg-purple-400">
        <div className="container py-8 text-left text-white text-4xl font-bold w-full">
          Your cart contents:
        </div>
        <div className="container px-20 text-indigo-700">
          <form onSubmit={(e) => handleOnSubmit(e)} className="bg-white  py-4 mb-4 shadow-md rounded-md border m-4 md:m-0">
            {cart.itemsHeldInCart.map((item) => (
              <div
                key={item.id}
                className="grid grid-flow-row justify-items-center items-center auto-rows-min grid-cols-2 border-b-4 border-green-400"
              >
                <div>
                  <img
                    className="items-center border-4 rounded-xl border-purple-700 size-56 justify-center "
                    src={cauldron}
                  />
                </div>
                <div className="container mb-10 mt-10" key={item.id}>
                  <h1 className="text-xl underline font-extrabold">
                    {item.name}
                  </h1>
                  <h2 className="text-base font-semibold mt-2 mb-2">
                    {item.quantity} in cart
                  </h2>
                  <h2 className="text-base font-semibold mt-2 mb-2">
                    {item.description}
                  </h2>
                  <h2 className="text-base font-semibold mt-2 mb-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </h2>
                  <button
                    onClick={() => cart.addOneToCart(item)}
                    className=" mx-2 align-bottom bg-green-500  text-slate-700 text-base font-bold rounded-full w-8 h-min"
                  >
                    +
                  </button>
                  <button
                    onClick={() => cart.removeOneFromCart(item)}
                    className="size-20 mx-2 align-bottom bg-red-500 text-slate-700 text-base font-bold rounded-full w-8 h-min"
                  >
                    -
                  </button>
                  <button
                    className="flex bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded-full w-auto mt-2 mb-2 focus:outline-none focus:shadow-outline"
                    onClick={() => cart.deleteFromCart(item)}
                  >
                    Remove all from cart
                  </button>
                </div>
              </div>
            ))}
            <h1 className="container text-2xl w-1/4 text-center border-4 rounded-xl border-purple-700 mt-10 mb-10 font-bold">
              Your Total: ${cart.getTotalCost().toFixed(2)}
            </h1>
            <div className="flex justify-center border-t-4 pt-4  border-green-400 mb-4">
              <PlaidLinkButton
                onFinished={() => {
                  setPaymentStatus(true);
                }}
              />
            </div>

            <h2 className="text-3xl container font-semibold border-t-4 pt-4  border-green-400 mb-4">
              Shipping Info
            </h2>

            <form onSubmit={(e) => handleOnSubmit(e)}>
              <div className="flex ml-20">
                <div className=" mr-10">
                  <label className="block text-gray-700 font-bold mb-2">
                    First Name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    className="border rounded w-full py-2 px-3"
                    rows="1"
                    placeholder="First name"
                    required
                  ></input>
                </div>

                <div className=" ml-10">
                  <label className="block text-gray-700 font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    className="border rounded w-full py-2 px-3"
                    rows="3"
                    placeholder="Last Name"
                    required
                  ></input>
                </div>
              </div>
              <div className="px-20 my-6 pb-4 border-b-4 border-green-400 w-full">
                <AddressForm
                  onInputChange={onInputChange}
                  userAddress={userAddress}
                />
              </div>

              <div className="flex justify-center">
                {paymentStatus === false ? (
                  <button
                    disabled
                    className="w-fit my-6 py-2 font-extrabold border-4 align-middle text-slate-400 border-slate-400 rounded-xl px-2"
                  >
                    Confirm Purchase
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-fit my-6 py-2 font-extrabold border-4 align-middle border-purple-700 rounded-xl px-2"
                  >
                    Confirm Purchase
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-1/12">
        <RightSidebar />
      </div>
    </div>
  );
};

export default CheckoutPage;
