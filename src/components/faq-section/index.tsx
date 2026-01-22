import { Accordion, Divider, Text, View } from 'reshaped';
import styles from './styles.module.scss';

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQSectionProps = {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  showDivider?: boolean;
};

export const FAQSection = ({
  items,
  title = 'Perguntas frequentes',
  subtitle,
  showDivider = true,
}: FAQSectionProps) => {
  if (!items || items.length === 0) return null;

  return (
    <section
      className={styles.section}
      aria-labelledby="faq-section-title"
      id="faq"
    >
      <div className={styles.container}>
        <View className={styles.content}>
          {showDivider && <Divider />}
          <View className={styles.header}>
            <Text
              as="h2"
              variant="featured-2"
              weight="medium"
              className={styles.title}
            >
              {title}
            </Text>
            {subtitle && (
              <Text as="p" variant="body-3" className={styles.subtitle}>
                {subtitle}
              </Text>
            )}
          </View>

          <View className={styles.faqList}>
            {items.map((item, index) => (
              <Accordion key={index} className={styles.faqItem}>
                <Accordion.Trigger>
                  <Text as="h3" className={styles.faqQuestion}>
                    <strong>{item.question}</strong>
                  </Text>
                </Accordion.Trigger>

                <Accordion.Content>
                  <Text variant="body-3" className={styles.faqAnswer}>
                    {item.answer}
                  </Text>
                </Accordion.Content>
              </Accordion>
            ))}
          </View>
        </View>
      </div>
    </section>
  );
};
