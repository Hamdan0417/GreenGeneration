import emailjs from 'emailjs-com';

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

export async function sendContactEmail(payload: ContactPayload) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {status: 'mocked'};
  }

  return emailjs.send(serviceId, templateId, payload, publicKey);
}
