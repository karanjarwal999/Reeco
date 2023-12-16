import axios from "axios";

export const addItem= (data) =>async (dispatch)=> {
    try {
        let res= await axios.post(' https://poised-underclothes-tick.cyclic.app/orders/add',{...data});
        dispatch({type:"addItem",payload:{...data,"status":""}})
    } catch (error) {
        console.log(error);
    }
}

export const getItems=async (dispatch)=> {
    try {
        let res= await axios.get(' https://poised-underclothes-tick.cyclic.app/orders');
        dispatch({type:"updateItems",payload:res.data})
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus=(id,status)=>async (dispatch)=> {
    try {
        dispatch({type:"updateStatus",payload:{id,status}})
        let res= await axios.patch(` https://poised-underclothes-tick.cyclic.app/orders/status/${id}`,{status});
    } catch (error) {
        console.log(error);
    }
}
export const updateItem=({_id,quantity,price})=>async (dispatch)=> {
    try {
        let res= await axios.patch(` https://poised-underclothes-tick.cyclic.app/orders/${_id}/update`,{quantity,price});
        dispatch(getItems)
    } catch (error) {
        console.log(error);
    }
}