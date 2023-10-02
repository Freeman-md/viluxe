import { db } from "../config/firebase";
import { child, get, push, ref, remove, update } from "firebase/database";
import { Product } from "./product";

class Order {
  constructor(
    public items: Product[],
    public date: Date,
    public total: number,
    public status?: string,
    public id?: string,
  ) {}

  static dbUrl = process.env.REACT_APP_FIREBASE_REALTIME_DATABASE_URL + '/orders.json';

  async update() {
    const orderData = this.toJson();
    await update(ref(db, 'orders/' + this.id), orderData);
  }

  async delete() {
    const orderRef = ref(db, 'orders/' + this.id);
    await remove(orderRef);
  }

  async save() {
    const orderData = this.toJson();
    await push(ref(db, 'orders'), orderData);
  }

  static fetch(id?: string) {
    const dbRef = ref(db);
    const path = id ? `orders/${id}` : 'orders'

    return get(child(dbRef, path)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      }
    });
  }

  static generateUniqueId = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 10;
    let id = '';
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
  }

  static fromJson(json: any): Order {
    return new Order(
      json.items,
      json.date,
      json.total,
      json.status,
      json.id || null,
    );
  }

  toJson(): any {
    return {
      id: this.id,
      items: this.items,
      total: this.total,
      date: this.date,
      status: this.status,
    };
  }
}

export default Order;
