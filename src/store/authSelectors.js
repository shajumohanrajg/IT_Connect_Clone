// redux/selectors/authSelectors.js

export const selectAuthToken = (state) => state.auth?.token || '';
