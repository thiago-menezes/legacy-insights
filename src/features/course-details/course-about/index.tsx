import { Divider, Text, View } from 'reshaped';
import { MarkdownContent } from '@/components';
import styles from './styles.module.scss';

export type CourseAboutProps = {
  description: string;
};

export const CourseAbout = ({ description }: CourseAboutProps) => {
  return (
    <div id="sobre">
      <View className={styles.about}>
        <Divider />
        <Text as="h2" variant="featured-3" weight="bold">
          Sobre o curso
        </Text>

        <MarkdownContent content={description} className={styles.description} />
      </View>
    </div>
  );
};
