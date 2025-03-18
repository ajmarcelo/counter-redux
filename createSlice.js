// createSlice - combination of CreateAction and CreateReducer to generate both actions and reducers.
//             - shorter code

const {createSlice, configureStore } = require('@reduxjs/toolkit')

// 1. Initial State
const initialState = {
    counter: 0,
}

// 2. CreateSlice
const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers: {
        // increment
        increment: (state, action) => {
            state.counter += 1;
        },

        // decrement 
        decrement: (state, action) => {
            state.counter -= 1;
        },

        // resetCounter
        resetCounter: (state, action) => {
            state.counter = 0;
        },

        // incrementBy
        incrementBy: (state, action) => {
            state.counter += action.payload;
        },
    }
})

// 3. Generate actions
const {increment, decrement, resetCounter, incrementBy} = counterSlice.actions;

// 4. Generate reducer
const counterReducer = counterSlice.reducer;

// 5. Store
const store = configureStore({
    reducer: counterReducer,
})

// 6. Dispatch (Testing the actions!)
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(incrementBy(200));
store.dispatch(resetCounter());
console.log(store.getState())
