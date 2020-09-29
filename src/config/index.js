export const routes = {
  pathToLogin: '/',
  pathToProducts: '/products',
  pathToOrders: '/orders',
  pathToBanners: '/banners'
};

export const SNACKBAR_MESSAGES = {
  add: {
    success: 'Додано успішно',
    error: 'Щось пішло не так'
  },
  update: {
    success: 'Зміненно успішно',
    error: 'Не вдалось оновити'
  },
  delete: {
    success: 'Видалено успішно',
    error: 'Не вдалось видалити'
  },
  login: {
    success: 'Вітаємо! Вхід успішний'
  },
  upload: {
    success: 'Завантажено',
    error: 'Не вдалось завантажити'
  },
  deleteImages: {
    success: 'Успішно видалено незбрежені зображення',
    error: 'Не вдалось видалити зображення'
  }
};

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

export const BANNER_DEFAULT = {
  title: '',
  description: '',
  toSlider: false
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
  { hex: '#000000', name: 'Чорний', type: 'black' },
  { hex: '#6c757d', name: 'Сірий', type: 'silver' },
  { hex: '#ffffff', name: 'Білий', type: 'white' },
  { hex: '#007bff', name: 'Синій', type: 'blue' },
  { hex: '#ffc107', name: 'Жовтий', type: 'yellow' },
  { hex: '#fd7e14', name: 'Оранжевий', type: 'orange' },
  { hex: '#dc3545', name: 'Червоний', type: 'red' },
  { hex: '#28a745', name: 'Зелений', type: 'green' },
  { hex: '#e83e8c', name: 'Рожейвий', type: 'pink' },
  { hex: '#6f42c1', name: 'Фіолетовий', type: 'purple' },
  { hex: '#692e19', name: 'Коричневий', type: 'brown' }
];

export const ORDER_STATUSES = {
  done: { name: 'Виконані', status: 'done' },
  processing: { name: 'Обробляються', status: 'processing' },
  canceled: { name: 'Скасовано', status: 'canceled' }
};

export const MENU_ITEMS = [
  {
    name: 'Продукти',
    link: '/products',
    color: '#52a360',
    icon: 'shopping bag'
  },
  { name: 'Замовлення', link: '/orders', color: '#674794', icon: 'handshake' },
  { name: 'Баннери', link: '/banners', color: '#d03d03', icon: 'image' },
  { name: 'Налаштування', link: '/settings', color: '#212529' }
];

export const PRODUCT_FILTER_OPTIONS = [
  { name: 'В наявності', status: 'available' },
  { name: 'Хіт продаж', status: 'hot' },
  { name: 'Новинки', status: 'newItem' },
  { name: 'Розпродаж', status: 'sale' }
];
