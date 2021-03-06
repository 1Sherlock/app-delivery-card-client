
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


export const PAYMENT_TYPES = [
    "",
    "Создан",
    "Успешный Hold",
    "Возврат к обработке",
    "",
    "",
    "",
    "",
    "",
    "",
    "Успешный платеж",
    "Возврат",
    "Отклонен",
    "Истек срок оплаты",
]

export const ORDER_TYPES = [
    "Новая карта",
    "Перевыпуск"
]

export const ORDER_STATUS = [
    "",
    "Создан",
    "Ожидания платежа",
    "В обработке",
    "",
    "Ожидание курьера",
    "Выдан курьеру на доставку",
    "",
    "",
    "",
    "Готово",
    "Не доставлен (Возврат/Отмена)",
    "Истек срок подтверждения",
]

export const ORDER_STATUSES = [
    "",
    "",
    "",
    "",
    "",
    "",
    "Выдан курьеру на доставку",
    "",
    "",
    "",
    "Готово",
    "",
    "",
]