const initialState = {
    user: null
}

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload
            }
      
        default:
            return state
    }
}