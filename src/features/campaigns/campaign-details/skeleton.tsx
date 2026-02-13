import { Card, View } from 'reshaped';

const SkeletonBlock = ({ height }: { height: number }) => (
  <div
    style={{
      height,
      borderRadius: 'var(--rs-unit-x2)',
      background: 'var(--rs-color-background-neutral-faded)',
      animation: 'pulse 1.5s ease-in-out infinite',
    }}
  />
);

export const CampaignDetailsSkeleton = () => (
  <View gap={6}>
    <Card padding={4}>
      <View gap={3}>
        <SkeletonBlock height={24} />
        <SkeletonBlock height={16} />
      </View>
    </Card>

    <SkeletonBlock height={40} />

    <View
      direction="row"
      gap={4}
      attributes={{
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--rs-unit-x4)',
        },
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} padding={4}>
          <View gap={3}>
            <SkeletonBlock height={16} />
            <SkeletonBlock height={32} />
          </View>
        </Card>
      ))}
    </View>

    <Card padding={4}>
      <SkeletonBlock height={350} />
    </Card>

    <Card padding={4}>
      <SkeletonBlock height={100} />
    </Card>
  </View>
);
