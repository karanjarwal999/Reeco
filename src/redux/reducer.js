const initialState = {
    items:[]
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "addItem":
    return { ...state, items:[...state.items,payload] }

  case "updateItems":
    return { ...state, items:payload }

  case "updateStatus":
    return { ...state, items:state.items.map(el=>el._id==payload.id?{...el,"status":payload.status}:el) }

  case "updateItem":
    return { ...state, items:state.items.map(el=>el._id==payload.id?{...el,"quantity":payload.quantity,"price":payload.price}:el) }

  default:
    return state
  }
}
