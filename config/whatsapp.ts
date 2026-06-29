export const whatsappConfig = {
  phoneNumber: process.env.NEXT_PUBLIC_STORE_WHATSAPP || '',
  messageTemplates: {
    product: (product: {
      name: string;
      model_number?: string;
      sku?: string;
      selling_price: number;
    }) =>
      `Hello, I'm interested in ${product.name} (Model: ${product.model_number || product.sku || 'N/A'}) at ₹${product.selling_price}. Can you confirm availability?`,

    cart: (
      items: Array<{ name: string; quantity: number; total_price: number }>,
      total: number
    ) => {
      const itemList = items
        .map((item, i) => `${i + 1}. ${item.name} - Qty: ${item.quantity} - ₹${item.total_price}`)
        .join('\n');
      return `Hello, I would like to order:\n${itemList}\n\nTotal: ₹${total}\n\nPlease confirm availability.`;
    },

    custom: (message: string) => message,
  },
  generateLink: (message: string) => {
    const phone = whatsappConfig.phoneNumber.replace(/\D/g, '');
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  },
} as const;
