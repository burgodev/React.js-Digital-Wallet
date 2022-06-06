// import api from "../services/api";

const LOGIN = "user/fetchSuccess";

const initialState = {
  loading: false,
  error: null,
  data: {
    name: "",
    birthday: "",
    cpf: "",
    // ddd: "",
    telephone: "",
    adress: "",
    state: "",
    city: "",
  },
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }

    default:
      return state;
  }
}

export const login = (data) => ({
  type: LOGIN,
  payload: data,
});

export const saveUser = (payload) => async (dispatch) => {
  try {
    // api.post(`/user`, payload, {
    //   headers: { "Content-Type": "application/json" },
    // });
    console.log("payload", payload);
    dispatch(login(payload));
  } catch (error) {
    console.log(error);
  }
};
