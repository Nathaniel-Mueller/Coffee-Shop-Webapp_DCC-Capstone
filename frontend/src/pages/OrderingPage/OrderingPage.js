import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCustomForm from '../../hooks/useCustomForm'
import { GroupMeKey } from './LocalKeys';
import InventoryPopUp from '../../components/InventoryPopUp/InventoryPopUp';
import './OrderingPage.css'
const OrderingPage = (props) => {

    const navigate = useNavigate()
    const [user] = useAuth()
    const [itemsToOrder, setItemsToOrder] = useState([])
    const [submitted, setSubmitted] = useState(false)
    let formValues = {
        'text': ''
    }
    const [formData, handleInputChange] = useCustomForm(formValues, sendInventory)
    const getItems = itemsToOrder.map((item) => {
       return `${item.quantity} ${item.item}`
    })
    const formText = `Stuff we need:\n\n${getItems.join('\n')}\n\nSent by ${user.first_name}`

    async function sendInventory() {
        const response = await axios.post(`https://api.groupme.com/v3/groups/92741472/messages`, {message: {text: formText}}, {
            headers: {
                'X-Access-Token': GroupMeKey
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (itemsToOrder.length > 0){
            setSubmitted(true)
            sendInventory()
        }
    }

    function addItems(i, type){
        if (i.trim().length > 0 && (!isNaN(i) || i === '1/2')){
            if (i === '0.5'){
                i = '1/2'
            }
            setItemsToOrder([...itemsToOrder, {quantity: i, item: type}])
        }
    }
    
    return (
        <div>
            {submitted && <InventoryPopUp />}
            <form onSubmit={handleSubmit}>
                <table className="table table-striped table-bordered table-margin">
                    <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Par</th>
                            <th scope="col">Description</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Whole Milk</th>
                            <td>1 gallon</td>
                            <td>Whole Fat Milk</td>
                            <td>
                                <input  type='text'
                                        name='wholeMilk'
                                        value={formData.wholeMilk || ''}
                                        onChange={handleInputChange}
                                        onBlur={() => {addItems(formData.wholeMilk, 'gallon(s) of whole milk')}} />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2% Milk</th>
                            <td>1 gallon</td>
                            <td>2% Fat Milk</td>
                            <td>
                                <input  type='text'
                                        name='lowFatMilk'
                                        value={formData.lowFatMilk || ''}
                                        onChange={handleInputChange}
                                        onBlur={() => {addItems(formData.lowFatMilk, 'gallon(s) of 2% milk')}} />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Nonfat Milk</th>
                            <td>1/2 gallon</td>
                            <td>Fat Free/Nonfat Milk (use 0.5 for 1/2 gallon)</td>
                            <td className='quantity'>
                                <input  type='text'
                                        name='nonFatMilk'
                                        value={formData.nonFatMilk || ''}
                                        onChange={handleInputChange}
                                        onBlur={() => {addItems(formData.nonFatMilk, 'gallon of nonfat milk')}} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button>submit</button>
            </form>
        </div>
    );
}

export default OrderingPage;