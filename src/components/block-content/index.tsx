import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { Text } from 'reshaped';
import { buildHeadingLevel } from './utils';

export const BlockContent = ({ content }: { content: BlocksContent }) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        heading: ({ level, ...props }) => (
          <Text {...props} {...buildHeadingLevel(level)} />
        ),
        paragraph: (props) => <Text {...props} />,
        list: (props) => <ul {...props} />,
        ['list-item']: (props) => <li {...props} />,
        image: ({ image, ...props }) => (
          <Image
            src={image.url}
            width={image.width}
            height={image.height}
            alt={image.alternativeText || ''}
            {...props}
          />
        ),
        link: ({ url, children, ...props }) => (
          <Link {...props} href={url}>
            {children}
          </Link>
        ),
      }}
    />
  );
};
