class BillingAddress {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public address: string,
        public city: string,
        public country: string,
        public postalCode: string,
        public number: string,
        public email: string
      ) {}

      update() {
        console.log('Update billing address')
      }

      delete() {
        console.log('Delete billing address')
      }

      save() {
        console.log('Save billing address')
      }
}