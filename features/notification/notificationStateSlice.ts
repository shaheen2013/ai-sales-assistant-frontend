import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface NotificationStateInterface {
    totalUnread: number;
}

const initialState: NotificationStateInterface = {
    totalUnread: 0
}

export const notificationStateSlice = createSlice({
    name: "notificationState",
    initialState,
    reducers: {
        setTotalUnreadNotification: (state, action: PayloadAction<number>) => {
            state.totalUnread = action.payload
        }
    }
})

export const { setTotalUnreadNotification } = notificationStateSlice.actions

export default notificationStateSlice.reducer