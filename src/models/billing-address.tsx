import { db } from "../config/firebase";
import { ref, set } from "firebase/database";


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

  update(){
    console.log('Update billing address')
  }

  delete(){
    console.log('Delete billing address')
  }

  async save() {
    // Convert the BillingAddress instance to a JSON object
    const billingAddressData = this.toJson();

    // Push the billing address data to the 'billingAddresses' node (or your preferred node name)
    await set(ref(db, 'billing-addresses'), billingAddressData)

    console.log('Billing address saved successfully to Firebase!');
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
      json.id || BillingAddress.generateUniqueId(),
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