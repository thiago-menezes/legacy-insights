export const PLATFORM_PAYLOADS = {
  kiwify: {
    order_id: 'TEST-123456',
    order_status: 'paid',
    amount: 9700,
    customer_email: 'test@example.com',
    customer_name: 'Test User',
  },
  hotmart: {
    event: 'PURCHASE_APPROVED',
    hottok: 'YOUR_HOTTOK_HERE',
    data: {
      purchase: {
        transaction: 'HP-123456',
        price: { value: 97.0 },
        sck: 'source_test',
      },
      buyer: {
        email: 'test@example.com',
        name: 'Test User',
      },
    },
  },
  kirvano: {
    event: 'PAYMENT_APPROVED',
    sale_id: 'KV-123456',
    total_price: 'R$ 97,00',
    customer: {
      email: 'test@example.com',
      name: 'Test User',
    },
  },
  default: {
    event: 'test_event',
    id: 'test_id_123',
    amount: 100,
  },
};
