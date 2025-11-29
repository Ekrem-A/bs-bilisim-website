// import { NextRequest, NextResponse } from 'next/server';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { items, customer, totalAmount } = body;

//     // Generate order number
//     const orderNumber = `BS${Date.now()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

//     // Create email content
//     const emailHtml = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="utf-8">
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//             .header { background: linear-gradient(to right, #06b6d4, #2563eb); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
//             .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
//             .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
//             .product-item { border-bottom: 1px solid #e2e8f0; padding: 15px 0; }
//             .product-item:last-child { border-bottom: none; }
//             .total { font-size: 20px; font-weight: bold; color: #06b6d4; margin-top: 20px; padding-top: 20px; border-top: 2px solid #e2e8f0; }
//             .customer-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
//             .footer { text-align: center; color: #64748b; font-size: 12px; margin-top: 30px; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>🎉 Yeni Sipariş Alındı!</h1>
//               <p>Sipariş No: ${orderNumber}</p>
//             </div>
            
//             <div class="content">
//               <h2>Müşteri Bilgileri</h2>
//               <div class="customer-info">
//                 <p><strong>Ad Soyad:</strong> ${customer.fullName}</p>
//                 <p><strong>E-posta:</strong> ${customer.email}</p>
//                 <p><strong>Telefon:</strong> ${customer.phone}</p>
//                 <p><strong>Adres:</strong> ${customer.address}</p>
//                 <p><strong>Şehir:</strong> ${customer.city}</p>
//                 ${customer.postalCode ? `<p><strong>Posta Kodu:</strong> ${customer.postalCode}</p>` : ''}
//                 ${customer.notes ? `<p><strong>Not:</strong> ${customer.notes}</p>` : ''}
//               </div>

//               <h2>Sipariş Detayları</h2>
//               <div class="order-details">
//                 ${items.map((item: any) => `
//                   <div class="product-item">
//                     <p><strong>${item.productBrand} - ${item.productName}</strong></p>
//                     <p>Miktar: ${item.quantity} adet</p>
//                     <p>Birim Fiyat: ${item.unitPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</p>
//                     <p><strong>Toplam: ${item.totalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</strong></p>
//                   </div>
//                 `).join('')}
                
//                 <div class="total">
//                   Genel Toplam: ${totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
//                 </div>
//               </div>

//               <div class="footer">
//                 <p>Bu e-posta BS Bilişim siparişleriniz için otomatik olarak gönderilmiştir.</p>
//                 <p>© 2024 BS Bilişim - Tüm hakları saklıdır.</p>
//               </div>
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     // Send email to admin
//     const adminEmail = process.env.ADMIN_EMAIL || 'info@bsbilisim.com';
    
//     await resend.emails.send({
//       from: 'BS Bilişim <onboarding@resend.dev>', // Change this to your verified domain
//       to: adminEmail,
//       subject: `🛒 Yeni Sipariş: ${orderNumber}`,
//       html: emailHtml,
//     });

//     // Send confirmation email to customer
//     await resend.emails.send({
//       from: 'BS Bilişim <onboarding@resend.dev>',
//       to: customer.email,
//       subject: `Siparişiniz Alındı - ${orderNumber}`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <meta charset="utf-8">
//             <style>
//               body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//               .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//               .header { background: linear-gradient(to right, #06b6d4, #2563eb); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
//               .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
//               .message { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <div class="header">
//                 <h1>✅ Siparişiniz Alındı!</h1>
//               </div>
//               <div class="content">
//                 <div class="message">
//                   <p>Sayın <strong>${customer.fullName}</strong>,</p>
//                   <p>Siparişiniz başarıyla alındı ve en kısa sürede işleme alınacaktır.</p>
//                   <p><strong>Sipariş Numaranız:</strong> ${orderNumber}</p>
//                   <p><strong>Toplam Tutar:</strong> ${totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</p>
//                   <p>Sipariş durumunuz hakkında en kısa sürede tarafınıza bilgi vereceğiz.</p>
//                   <p>Teşekkür ederiz,<br><strong>BS Bilişim Ekibi</strong></p>
//                 </div>
//               </div>
//             </div>
//           </body>
//         </html>
//       `,
//     });

//     return NextResponse.json({
//       success: true,
//       orderNumber,
//       message: 'Sipariş başarıyla oluşturuldu',
//     });

//   } catch (error) {
//     console.error('Order creation error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Sipariş oluşturulamadı' },
//       { status: 500 }
//     );
//   }
// }
