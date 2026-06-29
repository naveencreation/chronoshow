import { whatsappConfig } from '@/config/whatsapp';

describe('whatsappConfig', () => {
  describe('messageTemplates.product', () => {
    it('should include product name, model number, and price', () => {
      const message = whatsappConfig.messageTemplates.product({
        name: 'Titan Edge',
        model_number: 'TE-100',
        selling_price: 5000,
      });
      expect(message).toContain('Titan Edge');
      expect(message).toContain('TE-100');
      expect(message).toContain('₹5000');
    });

    it('should fall back to sku when model_number is missing', () => {
      const message = whatsappConfig.messageTemplates.product({
        name: 'Fastrack Watch',
        sku: 'FW-200',
        selling_price: 2000,
      });
      expect(message).toContain('FW-200');
    });

    it('should show N/A when both model_number and sku are missing', () => {
      const message = whatsappConfig.messageTemplates.product({
        name: 'Casio Digital',
        selling_price: 1500,
      });
      expect(message).toContain('N/A');
    });
  });

  describe('messageTemplates.cart', () => {
    it('should format cart items as numbered list', () => {
      const items = [
        { name: 'Titan Watch', quantity: 2, total_price: 9000 },
        { name: 'Fastrack Watch', quantity: 1, total_price: 2000 },
      ];
      const message = whatsappConfig.messageTemplates.cart(items, 11000);
      expect(message).toContain('1. Titan Watch - Qty: 2 - ₹9000');
      expect(message).toContain('2. Fastrack Watch - Qty: 1 - ₹2000');
      expect(message).toContain('Total: ₹11000');
    });
  });

  describe('messageTemplates.custom', () => {
    it('should return the message as-is', () => {
      expect(whatsappConfig.messageTemplates.custom('Hello!')).toBe('Hello!');
    });
  });

  describe('generateLink', () => {
    it('should generate a valid wa.me link', () => {
      const link = whatsappConfig.generateLink('Hello World');
      expect(link).toMatch(/^https:\/\/wa\.me\//);
      expect(link).toContain('Hello%20World');
    });

    it('should encode the message for URL', () => {
      const link = whatsappConfig.generateLink('Hello & welcome!');
      expect(link).not.toContain('&');
      expect(link).toContain('Hello');
    });
  });
});
