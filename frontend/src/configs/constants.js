export const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY || "user";
export const USER_KEY = process.env.REACT_APP_USER_KEY || "USER_DATA";

export const parseTime = (s) => {
    var c = s.split(":");
    return parseInt(c[0]) * 60 + parseInt(c[1]);
}


