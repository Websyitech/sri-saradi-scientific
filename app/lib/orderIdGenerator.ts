import prisma from "./prisma";

/**
 * Generates a custom order ID in the format SSS-001
 * SSS = Sri Saradi Scientific
 * 001 = Sequential number
 */
export async function generateOrderId(): Promise<string> {
  try {
    // Get the count of existing orders to determine the next number
    const orderCount = await prisma.quoteRequest.count();
    
    // Add 1 to get the next sequential number
    const nextNumber = orderCount + 1;
    
    // Format as SSS-XXX with zero padding (3 digits minimum)
    const formattedNumber = nextNumber.toString().padStart(3, '0');
    
    const orderId = `SSS-${formattedNumber}`;
    
    // Check if this orderId already exists (in case of race conditions)
    const existingOrder = await prisma.quoteRequest.findUnique({
      where: { orderId }
    });
    
    if (existingOrder) {
      // If it exists, recursively try the next number
      // This handles race conditions where two orders are created simultaneously
      return generateOrderId();
    }
    
    return orderId;
  } catch (error) {
    console.error('Error generating order ID:', error);
    // Fallback to timestamp-based ID if database query fails
    const timestamp = Date.now().toString().slice(-6);
    return `SSS-${timestamp}`;
  }
}