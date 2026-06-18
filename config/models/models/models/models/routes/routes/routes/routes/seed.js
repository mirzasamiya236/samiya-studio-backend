require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Client = require('./models/Client');
const Order = require('./models/Order');
const Appointment = require('./models/Appointment');
const CatalogItem = require('./models/CatalogItem');

const clients = [
  { name:'Amna Malik', phone:'0300-1234567', city:'Lahore', orders:4, spent:'PKR 1,20,000', status:'done', initials:'AM' },
  { name:'Sara Hussain', phone:'0321-9876543', city:'Karachi', orders:2, spent:'PKR 36,000', status:'progress', initials:'SH' },
  { name:'Zara Ahmed', phone:'0333-5551234', city:'Islamabad', orders:1, spent:'PKR 14,000', status:'done', initials:'ZA' },
  { name:'Nadia Baig', phone:'0345-7778888', city:'Lahore', orders:3, spent:'PKR 58,500', status:'progress', initials:'NB' },
  { name:'Farah Khan', phone:'0311-2223333', city:'Multan', orders:1, spent:'PKR 85,000', status:'new', initials:'FK' },
];

const orders = [
  { orderRef:'ORD-001', client:'Amna Malik', item:'Bridal Lehnga', due:'15 May 2025', status:'progress', amount:'PKR 85,000', initials:'AM' },
  { orderRef:'ORD-002', client:'Sara Hussain', item:'Party Dress', due:'20 May 2025', status:'pending', amount:'PKR 22,000', initials:'SH' },
  { orderRef:'ORD-003', client:'Zara Ahmed', item:'Eid Pret Set', due:'Delivered', status:'done', amount:'PKR 14,000', initials:'ZA' },
  { orderRef:'ORD-004', client:'Nadia Baig', item:'Formal Suit', due:'25 May 2025', status:'progress', amount:'PKR 18,500', initials:'NB' },
  { orderRef:'ORD-005', client:'Farah Khan', item:'Bridal Sharara', due:'1 Jun 2025', status:'pending', amount:'PKR 65,000', initials:'FK' },
];

const appointments = [
  { day:'Mon', time:'10:00', name:'Farah Khan', service:'Bridal Consultation', note:'New client' },
  { day:'Mon', time:'11:30', name:'Maryam Ali', service:'Fitting Session', note:'2nd fitting' },
  { day:'Tue', time:'2:00', name:'Sana Tariq', service:'Style Consultation', note:'Wardrobe overhaul' },
  { day:'Wed', time:'4:30', name:'Hina Mirza', service:'Order Pickup', note:'ORD-003 ready' },
  { day:'Thu', time:'12:00', name:'Amna Malik', service:'Final Fitting', note:'Bridal lehnga' },
  { day:'Sat', time:'3:00', name:'Walk-in', service:'General Consultation', note:'' },
];

const catalog = [
  { name:'Bridal Lehnga — Classic Red', category:'Bridal', price:'PKR 65,000+', color:'#e8356d' },
  { name:'Party Gown — Gold Formal', category:'Formal', price:'PKR 28,000+', color:'#c9a84c' },
  { name:'Eid Pret — Teal Co-ord', category:'Pret', price:'PKR 12,000+', color:'#5dcaa5' },
  { name:'Casual Kurta — Pink', category:'Pret', price:'PKR 8,000+', color:'#ff6b9d' },
  { name:'Formal Suit — Black Rose', category:'Formal', price:'PKR 18,000+', color:'#e8356d' },
  { name:'Walima Dress — Gold Embroidery', category:'Bridal', price:'PKR 45,000+', color:'#c9a84c' },
  { name:'Kids Frock — Festive', category:'Kids', price:'PKR 5,000+', color:'#ff6b9d' },
  { name:'Office Sharara — Maroon', category:'Formal', price:'PKR 15,000+', color:'#8b3a3a' },
];

const seed = async () => {
  await connectDB();
  await Client.deleteMany({});
  await Order.deleteMany({});
  await Appointment.deleteMany({});
  await CatalogItem.deleteMany({});
  await Client.insertMany(clients);
  await Order.insertMany(orders);
  await Appointment.insertMany(appointments);
  await CatalogItem.insertMany(catalog);
  console.log('Database seeded successfully!');
  mongoose.connection.close();
};

seed().catch((err) => { console.error(err); mongoose.connection.close(); });
