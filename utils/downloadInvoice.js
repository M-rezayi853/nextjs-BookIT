import easyinvoice from 'easyinvoice'

const downloadInvoice = async (booking) => {
  const data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    customize: {
      //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
    },
    images: {
      // The logo on top of your invoice
      logo: 'https://res.cloudinary.com/bookit/image/upload/v1617904918/bookit/bookit_logo_cbgjzv.png',
      // The invoice background
      // background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg',
    },
    // Your own data
    sender: {
      company: 'Bookit IT',
      address: '13th Street. 47 W 13th St',
      zip: '10001',
      city: 'New York',
      country: 'United States',
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    // Your recipient
    client: {
      company: `${booking.user.name}`,
      address: `${booking.user.email}`,
      zip: '',
      city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
        'en-US'
      )}`,
      country: `Check Out ${new Date(booking.checkInDate).toLocaleString(
        'en-US'
      )}`,
      // "custom1": "custom value 1",
      // "custom2": "custom value 2",
      // "custom3": "custom value 3"
    },
    information: {
      // Invoice number
      number: `${booking._id}`,
      // Invoice data
      date: `${new Date(Date.now()).toLocaleString('en-US')}`,
      // Invoice due date
      'due-date': '31-12-2021',
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    products: [
      {
        quantity: `${booking.daysOfStay}`,
        description: `${booking.room.name}`,
        'tax-rate': 0,
        price: `${booking.room.pricePerNight}`,
      },
    ],
    // The message you would like to display on the bottom of your invoice
    'bottom-notice':
      'This is auto generated Invoice of your booking on Book IT.',
    // Settings to customize your invoice
    settings: {
      currency: 'USD', // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
      // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
      // "tax-notation": "gst", // Defaults to 'vat'
      // "margin-top": 25, // Defaults to '25'
      // "margin-right": 25, // Defaults to '25'
      // "margin-left": 25, // Defaults to '25'
      // "margin-bottom": 25, // Defaults to '25'
      // "format": "A4" // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
    },
    // Translate your invoice to your preferred language
    translate: {
      // "invoice": "FACTUUR",  // Default to 'INVOICE'
      // "number": "Nummer", // Defaults to 'Number'
      // "date": "Datum", // Default to 'Date'
      // "due-date": "Verloopdatum", // Defaults to 'Due Date'
      // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
      // "products": "Producten", // Defaults to 'Products'
      // "quantity": "Aantal", // Default to 'Quantity'
      // "price": "Prijs", // Defaults to 'Price'
      // "product-total": "Totaal", // Defaults to 'Total'
      // "total": "Totaal" // Defaults to 'Total'
    },
  }

  const result = await easyinvoice.createInvoice(data)
  easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf)
}

export default downloadInvoice
