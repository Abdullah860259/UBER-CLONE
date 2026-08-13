import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  from: null,
  to: null,
  isAccepted: false,
  duration: null,
  vehicle:null,
  distance: null,
  fare: null,
  captain: null,
};

export const rideSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {
    updateRide: (state, action) => {
      Object.assign(state, action.payload);
    },
    setVehicle:(state, action)=>{
      state.vehicle = action.payload.vehicle;
    }
  },
});

export const { updateRide , setVehicle} = rideSlice.actions;
export default rideSlice.reducer;
