import React, { useContext } from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../Context/AuthContext';
import swal from 'sweetalert';

function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root')

const AppointMentForm = ({modalIsOpen, appointMentDate, closeModal, date }) => {
    // const baseUrl = process.env.REACT_APP_BASE_URL;
    // const {user} = useContext(AuthContext);
    // const { data, loading, error } = useFetch(`${baseUrl}/auth/doctors`);
    // const {register,handleSubmit, errors} = useForm()
    // const navigate = useNavigate();
    // const onSubmit = async(data) =>{
    //     data.appointmantDate = date;
    //     data.serviceTitle = appointMentDate;
    //     data.user_id = user._id;
    //     try{
    //         const token = sessionStorage.getItem('access_token');
    //         data.token=token
    //         console.log(token)
    //         await axios.post(`${baseUrl}/auth/addAppointMent`,data)
    //         closeModal();
    //         swal({
    //             icon:'success',
    //             text:'Successfully Appointment Submited',
    //             timer: 2000
    //         })
    //         navigate("/");
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { user } = useContext(AuthContext);
    const { data, loading, error } = useFetch(`${baseUrl}/auth/doctors`);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        formData.appointmantDate = date;
        formData.serviceTitle = appointMentDate;
        formData.user_id = user._id;

        try {
            const access_token = getCookie("access_token")
            // console.log(access_token)
            // console.log(token)

            // if (!token) {
            //     throw new Error('No access token found. Please log in again.');
            // }

            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            };

            await axios.post(`${baseUrl}/auth/addAppointMent`, formData, config);
            closeModal();
            swal({
                icon: 'success',
                text: 'Successfully Submitted Appointment',
                timer: 2000
            });
            navigate("/");
        } catch (err) {
            console.error('Error submitting appointment:', err);
            swal({
                icon: 'error',
                text: 'Failed to submit appointment. Please try again.',
            });
        }
    };
    return (

        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <FontAwesomeIcon icon={faWindowClose} onClick={closeModal} className="m-2 text-primary"/>
                <h1 className="text-center brand-color">{appointMentDate}</h1>
                <p className="text-secondary text-center"> On {date.toDateString()}</p>
                <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-2">
                        <input type="text" {...register("username",{required: true})} name="username" placeholder="Your Name" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                        <input type="text" {...register("phone", { required: true })} name="phone" placeholder="Phone Number" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                        <input type="text" {...register("email", { required: true })} name="email" placeholder="Email" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                            <select className="form-control" name="doctor_id"  {...register("doctor_id", { required: true })}>
                                <option disabled={true} value="Not set">Select Doctor</option>
                                {
                                    data && data.map((item) =>(
                                        <option value={item._id} key={item._id + 20000}>{item.username}</option>
                                    ))
                                }
                            </select>
                    </div>
                    <div className="form-group row">
                        <div className="col-4">
                            <select className="form-control" name="gender"  {...register("gender", { required: true })}>
                                <option disabled={true} value="Not set">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Not set">Other</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <input {...register("age", { required: true })} className="form-control" name="age" placeholder="Your Age" type="number" />
                        </div>
                        <div className="col-4">
                            <input {...register("weight", { required: true })} className="form-control" name="weight" placeholder="Weight" type="number" />
                        </div>
                    </div>

                    <div className="form-group text-right mt-2">
                        <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                </form>

            </Modal>

        </div>
    );
};

export default AppointMentForm;