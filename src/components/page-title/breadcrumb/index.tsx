import Link from 'next/link';
import { Breadcrumbs, View } from 'reshaped';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  action?: () => void;
};

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  if (!items) {
    return null;
  }

  return (
    <View gap={2} paddingBottom={2}>
      <Breadcrumbs>
        {items.map((item) => (
          <BreadcrumbItem key={item.label} {...item} />
        ))}
      </Breadcrumbs>
    </View>
  );
};

const BreadcrumbItem = ({ label, href, action }: BreadcrumbItem) => {
  if (href) {
    return (
      <Link href={href}>
        <Breadcrumbs.Item key={label} href={href}>
          {label}
        </Breadcrumbs.Item>
      </Link>
    );
  }

  if (action) {
    return (
      <Breadcrumbs.Item key={label} onClick={action}>
        {label}
      </Breadcrumbs.Item>
    );
  }

  return <Breadcrumbs.Item key={label}>{label}</Breadcrumbs.Item>;
};
