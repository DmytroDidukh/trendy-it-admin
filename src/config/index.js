export const routes = {
    pathToLogin: '/',
    pathToProducts: '/products',
    pathToOrders: '/orders',
    pathToBanners: '/banners'
};

export const SNACKBAR_MESSAGES = {
    add: {
        success: 'Додано успішно',
        error: 'Щось пішло не так',
    },
    update: {
        success: 'Зміненно успішно',
        error: 'Не вдалось оновити',
    },
    delete: {
        success: 'Видалено успішно',
        error: 'Не вдалось видалити',
    },
    login: {
        success: 'Вітаємо! Вхід успішний'
    }
}

export const PRODUCT_DEFAULT = {
    name: '',
    price: 0,
    oldPrice: 0,
    description: '',
    newItem: false,
    sale: false,
    available: false,
    toSlider: false
};

export const IMAGES_DEFAULT = {
    slider: '',
    product: [
        {link: ''}
    ]
};

export const COLORS_DEFAULT = {
    black: false,
    silver: false,
    white: false,
    red: false,
    yellow: false,
    orange: false,
    blue: false,
    green: false,
    purple: false,
    pink: false,
    brown: false
};

export const COLORS_DATA = [
    {hex: '#000000', name: 'Чорний', type: 'black'},
    {hex: '#949494', name: 'Сірий', type: 'silver'},
    {hex: '#ffffff', name: 'Білий', type: 'white'},
    {hex: '#00308c', name: 'Синій', type: 'blue'},
    {hex: '#eeca07', name: 'Жовтий', type: 'yellow'},
    {hex: '#ee4807', name: 'Оранжевий', type: 'orange'},
    {hex: '#ff0000', name: 'Червоний', type: 'red'},
    {hex: '#2eae1c', name: 'Зелений', type: 'green'},
    {hex: '#e607ee', name: 'Рожейвий', type: 'pink'},
    {hex: '#5800fc', name: 'Фіолетовий', type: 'purple'},
    {hex: '#692e19', name: 'Коричневий', type: 'brown'},
];

export const ORDER_STATUSES = {
    done: {name: 'Виконані', status: 'done'},
    processing: {name: 'Обробляються', status: 'processing'},
    canceled: {name: 'Скасовано', status: 'canceled'},
}

export const MENU_ITEMS = [
    {name: 'Продукція', link: '/products', color: '#52a360'},
    {name: 'Замовлення', link: '/orders', color: '#674794'},
    {name: 'Баннери', link: '/banners', color: '#d03d03'},
    {name: 'Налаштування', link: '/settings', color: '#212529'},
]

export const PRODUCT_FILTER_OPTIONS = [
    {name: 'В наявності', status: 'available'},
    {name: 'Хіт продаж', status: 'hot'},
    {name: 'Новинки', status: 'newItem'},
    {name: 'Розпродаж', status: 'sale'}
]
