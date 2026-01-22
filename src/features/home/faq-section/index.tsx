'use client';

import { FAQSection } from '@/components';
import { useCurrentInstitution } from '@/hooks';
import { useFAQ } from './api';

const DEFAULT_FAQ_ITEMS = [
  {
    question: 'Como funciona o processo seletivo?',
    answer:
      'O processo seletivo pode ser realizado através de Vestibular online, utilização de notas do ENEM dos últimos 5 anos, Transferência de outra instituição ou utilização de outro diploma de nível superior.',
  },
  {
    question: 'A instituição possui PROUNI, FIES ou algum financiamento?',
    answer:
      'Sim, aceitamos PROUNI e FIES. Além disso, oferecemos financiamento estudantil através de parceiros, que permite parcelar até 100% do valor do curso. Entre em contato conosco para mais informações sobre as condições.',
  },
  {
    question: 'Quais modalidades de ensino são oferecidas?',
    answer:
      'Oferecemos cursos em modalidade presencial, semipresencial, digital (EAD) e ao vivo, proporcionando flexibilidade para que você escolha a melhor opção para sua rotina.',
  },
  {
    question: 'A instituição é reconhecida pelo MEC?',
    answer:
      'Sim, a instituição é reconhecida pelo MEC. Você pode consultar o cadastro da instituição no e-MEC através do QR code disponível no rodapé do site.',
  },
  {
    question: 'Como posso entrar em contato?',
    answer:
      'Você pode entrar em contato através do nosso site, telefone, WhatsApp ou visitando uma de nossas unidades. Nossa equipe está pronta para esclarecer todas as suas dúvidas.',
  },
  {
    question: 'Existe algum programa de bolsas de estudo?',
    answer:
      'Sim, oferecemos diversos programas de bolsas de estudo e descontos. Entre em contato conosco para conhecer todas as opções disponíveis e verificar sua elegibilidade.',
  },
];

export const HomeFAQSection = () => {
  const { institutionId } = useCurrentInstitution();
  const { data: faqResponse } = useFAQ(institutionId);

  const items =
    faqResponse?.items && faqResponse.items.length > 0
      ? faqResponse.items
      : DEFAULT_FAQ_ITEMS;

  return (
    <FAQSection
      items={items}
      title="Perguntas frequentes"
      subtitle="Tire suas dúvidas sobre nossa instituição e processos de matrícula."
    />
  );
};
