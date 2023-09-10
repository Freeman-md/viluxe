import { db } from "../config/firebase";
import { child, get, onValue, push, ref, remove } from "firebase/database";
import store from "../store";
import { setBillingAddresses } from "../store/user/user-slice";


class BillingAddress {
  constructor(
    public firstName: string,
    public lastName: string,
    public address: string,
    public city: string,
    public country: string,
    public postalCode: string,
    public phone: string,
    public email: string,
    public id?: number,
  ) { }

  static dbUrl = process.env.REACT_APP_FIREBASE_REALTIME_DATABASE_URL + '/billing-addresses.json'

  update(){
    console.log('Update billing address')
  }

  async delete(){
    const billingAddressRef = ref(db, 'billing-addresses/' + this.id)

    await remove(billingAddressRef)
  }

  async save() {
    // Convert the BillingAddress instance to a JSON object
    const billingAddressData = this.toJson();

    // Push the billing address data to the 'billingAddresses' node (or your preferred node name)
    await push(ref(db, 'billing-addresses'), billingAddressData)
  }

  // method to get all billing addresses from database
  static all() {
    const dbRef = ref(db);

    return get(child(dbRef, 'billing-addresses')).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      }
    });
  }

  static generateUniqueId = (): string  => {
    // Generate a random string of letters and numbers
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 10; // Adjust the length as needed
    let id = '';
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
  }

  // Method to convert a JSON object to a BillingAddress instance
  static fromJson(json: any): BillingAddress {
    return new BillingAddress(
      json.firstName,
      json.lastName,
      json.address,
      json.city,
      json.country,
      json.postalCode,
      json.phone,
      json.email,
      json.id || null,
    );
  }

  // Method to convert a BillingAddress instance to a JSON object
  toJson(): any {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      city: this.city,
      country: this.country,
      postalCode: this.postalCode,
      phone: this.phone,
      email: this.email,
    };
  }

}

export default BillingAddress