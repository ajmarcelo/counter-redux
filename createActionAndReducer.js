const { createAction, createReducer, configureStore } = require('@reduxjs/toolkit');
const logger = require('redux-logger').createLogger()

// Initial State of the application
const initialState = {
    counter:0,
}

// 1. CreateAction - Action creators 
const increment = createAction("INCREMENT");
const decrement = createAction("DECREMENT");
const resetCounter = createAction("RESET");
    // 1.1. customized CreateAction
const incrementBy = createAction("INCREMENT_BY", (amount)=>{
    return {
        payload:{
            amount,
        }
    }
});

// 2. CreateReducer
// 2.1. Builder callback notation --> recommended as it works best in TS and most IDEs
const counterSlice1 = createReducer(initialState, (builder)=>{
    // increment
    builder.addCase(increment,(state)=>{
        state.counter+=1;
    })
    
    // decrement
    builder.addCase(decrement,(state)=>{
        state.counter-=1;
    }) 
    
    // reset
    builder.addCase(resetCounter,(state)=>{
        state.counter=0;
    })   
    
    // incrementBy
    builder.addCase(incrementBy,(state,action)=>{
        state.counter += action.payload.amount;
    })
})

// 2.2. Map object notation
// const counterSlice2 = createAction(initialState,{
//     // increment
//     [increment]:(state)=>{
//         state.counter +=1;
//     },

//     // decrement
//     [decrement]:(state)=>{
//         state.counter -=1;
//     },

//     // reset
//     [resetCounter]:(state)=>{
//         state.counter =0;
//     },

//     // incrementBy
//     [incrementBy]:(state, action)=>{
//         state.counter +=action.payload.amount;
//     }
// })

// 3. Store 
const store = configureStore({
    reducer: counterSlice1,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


// Dispatch (Testing the actions!)
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(incrementBy(100));
console.log(store.getState())