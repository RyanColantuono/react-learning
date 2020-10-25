import * as types from './types'

export default class Utility {
  
  static formatPrice = (cents: number): string =>  {
    return (cents / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  }
  
  static calculateTotal = (menuItems: types.MenuItem[], orderItems: types.OrderItem[]): number => {
    return orderItems.reduce((prevTotal, orderItem) => {
        const item = menuItems.find(item => item.id === orderItem.menuItemId);
        const itemTotal = (item?.price ?? 0)  * orderItem.quantity;
        return prevTotal + itemTotal;
    }, 0);
  }
}
