
export const API_PATH = "https://172.16.50.23:3000/";

export const TOKEN_NAME = "app-delivery-token";
export const REFRESH_TOKEN_NAME = "app-delivery-refresh-token";

export const CONFIG = {
    headers: {
        "Authorization": localStorage.getItem(TOKEN_NAME)
    }
}

export const ROLE_NAME = [
    "Администратор",
    "Партнер",
    "Сотрудник ФО"
]

export const CARD_TYPES = [
    "UzCard",
    "Humo",
    "Visa",
    "MasterCard",
    "UnionPay"
];
