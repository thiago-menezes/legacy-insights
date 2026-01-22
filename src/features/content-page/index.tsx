import { Container, View } from 'reshaped';
import { MarkdownContent } from '@/components/markdown-content';

export type ContentPageProps = {
  content: string;
};

export const ContentPage = ({ content }: ContentPageProps) => {
  return (
    <View paddingTop={6}>
      <Container width="1144px">
        <MarkdownContent content={content} />
      </Container>
    </View>
  );
};
